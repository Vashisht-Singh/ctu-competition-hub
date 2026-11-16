import { Router, Response } from 'express';
import { JudgingRubric } from '../models/JudgingRubric.js';
import { Score } from '../models/Score.js';
import { Registration } from '../models/Registration.js';
import { Competition } from '../models/Competition.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole, RegistrationStatus } from '../types/enums.js';
import { logAudit } from '../services/auditService.js';

const router = Router();

// GET /api/judging/rubric/:competitionId - Get rubric
router.get('/rubric/:competitionId', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let rubric = await JudgingRubric.findOne({ competitionId: req.params.competitionId });
    if (!rubric) {
      // Default standard rubric if not explicitly defined
      rubric = new JudgingRubric({
        competitionId: req.params.competitionId,
        criteria: [
          { name: 'Originality & Innovation', description: 'Novelty and creativity of concept', maxMarks: 25, weightagePercent: 25 },
          { name: 'Technical Execution / Skill', description: 'Proficiency, quality and craft', maxMarks: 35, weightagePercent: 35 },
          { name: 'Presentation & Defense', description: 'Clarity, stage presence, answering judges', maxMarks: 25, weightagePercent: 25 },
          { name: 'Adherence to Rules & Timing', description: 'Compliance with competition specifications', maxMarks: 15, weightagePercent: 15 },
        ],
        totalMarks: 100,
        guidelines: 'Evaluate each participant objectively based on the criteria specified.',
      });
      await rubric.save();
    }
    res.json({ success: true, data: rubric });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/judging/rubric/:competitionId - Configure rubric
router.post(
  '/rubric/:competitionId',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN, UserRole.SCHOOL_COORDINATOR, UserRole.COMPETITION_ORGANIZER, UserRole.JUDGE),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { criteria, totalMarks, guidelines } = req.body;
      if (!criteria || !Array.isArray(criteria) || criteria.length === 0) {
        res.status(400).json({ success: false, message: 'Valid criteria array is required.' });
        return;
      }

      let rubric = await JudgingRubric.findOne({ competitionId: req.params.competitionId });
      if (rubric) {
        rubric.criteria = criteria;
        rubric.totalMarks = totalMarks || 100;
        rubric.guidelines = guidelines;
        await rubric.save();
      } else {
        rubric = new JudgingRubric({
          competitionId: req.params.competitionId,
          criteria,
          totalMarks: totalMarks || 100,
          guidelines,
        });
        await rubric.save();
      }

      res.json({ success: true, message: 'Judging rubric saved successfully.', data: rubric });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/judging/competition/:competitionId/evaluations - Participants list for judge
router.get(
  '/competition/:competitionId/evaluations',
  authenticate,
  requireRoles(UserRole.JUDGE, UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN, UserRole.SCHOOL_COORDINATOR, UserRole.COMPETITION_ORGANIZER),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { competitionId } = req.params;
      const roundNumber = Number(req.query.roundNumber) || 1;

      // Get participants who are confirmed or checked in
      const participants = await Registration.find({
        competitionId,
        status: { $in: [RegistrationStatus.CONFIRMED, RegistrationStatus.CHECKED_IN] },
      })
        .populate('userId', 'name email registrationNumber department programme')
        .populate('school', 'name code');

      // Get scores submitted by this judge
      const judgeScores = await Score.find({
        competitionId,
        judgeId: req.user!._id,
        roundNumber,
      });

      const scoreMap = new Map();
      judgeScores.forEach((s) => scoreMap.set(s.registrationId.toString(), s));

      const evaluationList = participants.map((p) => ({
        registration: p,
        score: scoreMap.get(p._id.toString()) || null,
        isEvaluated: scoreMap.has(p._id.toString()),
      }));

      res.json({ success: true, count: evaluationList.length, data: evaluationList });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// POST /api/judging/score - Submit Score
router.post(
  '/score',
  authenticate,
  requireRoles(UserRole.JUDGE, UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { competitionId, registrationId, roundNumber = 1, criteriaScores, remarks } = req.body;

      if (!competitionId || !registrationId || !criteriaScores || !Array.isArray(criteriaScores)) {
        res.status(400).json({ success: false, message: 'Competition, Registration, and Criteria Scores are required.' });
        return;
      }

      // Calculate total score
      const totalScore = criteriaScores.reduce((sum: number, c: any) => sum + (Number(c.score) || 0), 0);

      const score = await Score.findOneAndUpdate(
        {
          competitionId,
          judgeId: req.user!._id,
          registrationId,
          roundNumber,
        },
        {
          criteriaScores,
          totalScore,
          remarks,
          isSubmitted: true,
          submittedAt: new Date(),
        },
        { upsert: true, new: true }
      );

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'SUBMIT_JUDGE_SCORE',
        resourceType: 'SCORE',
        resourceId: score._id.toString(),
        newState: { totalScore, remarks },
        ipAddress: req.ip,
      });

      res.json({ success: true, message: 'Score successfully recorded.', data: score });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
