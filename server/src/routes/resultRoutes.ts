import { Router, Request, Response } from 'express';
import { CompetitionResult, ICompetitionResult } from '../models/CompetitionResult.js';
import { Score } from '../models/Score.js';
import { Competition } from '../models/Competition.js';
import { Registration } from '../models/Registration.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole, ResultCategory, CompetitionStatus } from '../types/enums.js';
import { logAudit } from '../services/auditService.js';
import { broadcastToRoles } from '../services/notificationService.js';

const router = Router();

// GET /api/results/competition/:competitionId - Get results for competition
router.get('/competition/:competitionId', async (req: Request, res: Response): Promise<void> => {
  try {
    const results = await CompetitionResult.find({ competitionId: req.params.competitionId })
      .populate('registrationId')
      .populate('school', 'name code')
      .populate('publishedBy', 'name email')
      .sort({ rank: 1 });

    const competition = await Competition.findById(req.params.competitionId).select('title code status prizeDetails');

    res.json({ success: true, count: results.length, data: { competition, results } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/results/competition/:competitionId/generate - Compute ranks from scores
router.post(
  '/competition/:competitionId/generate',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN, UserRole.SCHOOL_COORDINATOR, UserRole.COMPETITION_ORGANIZER),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { competitionId } = req.params;
      const competition = await Competition.findById(competitionId);
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      // Aggregate average scores across judges for each registration
      const scoreAgg = await Score.aggregate([
        { $match: { competitionId: competition._id, isSubmitted: true } },
        {
          $group: {
            _id: '$registrationId',
            avgScore: { $avg: '$totalScore' },
            scoresCount: { $sum: 1 },
          },
        },
        { $sort: { avgScore: -1 } },
      ]);

      if (scoreAgg.length === 0) {
        res.status(400).json({
          success: false,
          message: 'No submitted judge scores found for this competition yet.',
        });
        return;
      }

      // Fetch registration details
      const registrationIds = scoreAgg.map((s) => s._id);
      const registrations = await Registration.find({ _id: { $in: registrationIds } }).populate('userId school');
      const regMap = new Map();
      registrations.forEach((r) => regMap.set(r._id.toString(), r));

      const generatedResults = [];
      let rank = 1;

      for (const item of scoreAgg) {
        const reg = regMap.get(item._id.toString());
        if (!reg) continue;

        let category: ResultCategory = ResultCategory.PARTICIPATION;
        let prize = '';

        if (rank === 1) {
          category = ResultCategory.WINNER;
          prize = competition.prizeDetails?.winner || '₹10,000 + Trophy';
        } else if (rank === 2) {
          category = ResultCategory.FIRST_RUNNER_UP;
          prize = competition.prizeDetails?.firstRunnerUp || '₹5,000 + Trophy';
        } else if (rank === 3) {
          category = ResultCategory.SECOND_RUNNER_UP;
          prize = competition.prizeDetails?.secondRunnerUp || '₹2,500 + Medal';
        } else if (rank === 4 || rank === 5) {
          category = ResultCategory.SPECIAL_RECOGNITION;
          prize = 'Merit Certificate & Commendation';
        }

        const participantName = reg.participantType === 'TEAM' && reg.teamName ? reg.teamName : reg.userId?.name || 'Participant';

        const resultDoc = await CompetitionResult.findOneAndUpdate(
          { competitionId: competition._id, registrationId: reg._id },
          {
            participantName,
            school: reg.school?._id,
            rank,
            category,
            finalScore: Math.round(item.avgScore * 10) / 10,
            prizeWon: prize,
            isApprovedByDSW: false,
            isPublished: false,
          },
          { upsert: true, new: true }
        );

        generatedResults.push(resultDoc);
        rank++;
      }

      res.json({
        success: true,
        message: `Successfully computed rankings for ${generatedResults.length} participants. Ready for DSW approval.`,
        data: generatedResults,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/results/competition/:competitionId/publish - Publish official results
router.post(
  '/competition/:competitionId/publish',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { competitionId } = req.params;
      const competition = await Competition.findById(competitionId);
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      await CompetitionResult.updateMany(
        { competitionId: competition._id },
        {
          isApprovedByDSW: true,
          isPublished: true,
          publishedAt: new Date(),
          publishedBy: req.user!._id,
        }
      );

      // Transition competition to COMPLETED
      competition.status = CompetitionStatus.COMPLETED;
      await competition.save();

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'PUBLISH_COMPETITION_RESULTS',
        resourceType: 'RESULTS',
        resourceId: competition._id.toString(),
        remarks: 'Official competition results approved and published.',
        ipAddress: req.ip,
      });

      // Broadcast to students
      await broadcastToRoles(
        [UserRole.STUDENT, UserRole.FACULTY],
        `Results Announced: ${competition.title}`,
        `Official results and ranks for "${competition.title}" have been verified by DSW and published.`,
        `/competitions/${competition._id}`
      );

      res.json({ success: true, message: 'Competition results approved and published university-wide!' });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/results/:id/correct - Correct result with mandatory audit trail
router.post(
  '/:id/correct',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { rank, finalScore, prizeWon, remarks, reason } = req.body;
      if (!reason || reason.trim().length < 5) {
        res.status(400).json({ success: false, message: 'Mandatory reason required for official result modification.' });
        return;
      }

      const result = await CompetitionResult.findById(req.params.id);
      if (!result) {
        res.status(404).json({ success: false, message: 'Result record not found.' });
        return;
      }

      const previousRank = result.rank;
      const previousScore = result.finalScore;

      result.history.push({
        modifiedBy: req.user!._id,
        modifiedAt: new Date(),
        reason,
        previousRank,
        previousScore,
      });

      if (rank !== undefined) result.rank = Number(rank);
      if (finalScore !== undefined) result.finalScore = Number(finalScore);
      if (prizeWon !== undefined) result.prizeWon = prizeWon;
      if (remarks !== undefined) result.remarks = remarks;

      await result.save();

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'CORRECT_COMPETITION_RESULT',
        resourceType: 'RESULTS',
        resourceId: result._id.toString(),
        previousState: { rank: previousRank, finalScore: previousScore },
        newState: { rank: result.rank, finalScore: result.finalScore, reason },
        remarks: reason,
        ipAddress: req.ip,
      });

      res.json({ success: true, message: 'Result corrected with immutable audit trail recorded.', data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
