import { Router, Response } from 'express';
import { Competition } from '../models/Competition.js';
import { School } from '../models/School.js';
import { Registration } from '../models/Registration.js';
import { FacultyDuty } from '../models/FacultyDuty.js';
import { CompetitionResult } from '../models/CompetitionResult.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole } from '../types/enums.js';
import { generateExcelBuffer, generateCsvBuffer } from '../services/exportService.js';

const router = Router();

// GET /api/reports/dsw-overview - Central DSW Analytics
router.get(
  '/dsw-overview',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const [
        totalCompetitions,
        pendingProposals,
        approvedCompetitions,
        publishedCompetitions,
        completedCompetitions,
        totalRegistrations,
        totalDuties,
        completedDuties,
        overdueDuties,
      ] = await Promise.all([
        Competition.countDocuments(),
        Competition.countDocuments({ status: { $in: ['SUBMITTED', 'UNDER_REVIEW', 'REVISION_REQUIRED', 'RESUBMITTED'] } }),
        Competition.countDocuments({ status: 'APPROVED' }),
        Competition.countDocuments({ status: { $in: ['PUBLISHED', 'REGISTRATION_OPEN', 'IN_PROGRESS'] } }),
        Competition.countDocuments({ status: 'COMPLETED' }),
        Registration.countDocuments(),
        FacultyDuty.countDocuments(),
        FacultyDuty.countDocuments({ status: { $in: ['COMPLETED', 'VERIFIED'] } }),
        FacultyDuty.countDocuments({ status: { $in: ['ASSIGNED', 'ACKNOWLEDGED', 'IN_PROGRESS'] }, date: { $lt: new Date() } }),
      ]);

      // Category breakdown
      const categoryDistribution = await Competition.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 }, totalBudget: { $sum: '$budgetProposal' } } },
        { $sort: { count: -1 } },
      ]);

      // Scope breakdown
      const scopeDistribution = await Competition.aggregate([
        { $group: { _id: '$scope', count: { $sum: 1 } } },
      ]);

      // School-wise competition count and participation
      const schools = await School.find({ isActive: true }).select('name code');
      const schoolStats = await Promise.all(
        schools.map(async (school) => {
          const compCount = await Competition.countDocuments({ organizingSchool: school._id });
          const regCount = await Registration.countDocuments({ school: school._id });
          const dutiesCount = await FacultyDuty.countDocuments({
            competitionId: { $in: (await Competition.find({ organizingSchool: school._id }).select('_id')).map((c) => c._id) },
          });
          return {
            schoolId: school._id,
            name: school.name,
            code: school.code,
            competitionsOrganized: compCount,
            participantsRegistered: regCount,
            facultyDuties: dutiesCount,
          };
        })
      );

      res.json({
        success: true,
        data: {
          metrics: {
            totalCompetitions,
            pendingProposals,
            approvedCompetitions,
            publishedCompetitions,
            completedCompetitions,
            totalRegistrations,
            totalDuties,
            completedDuties,
            overdueDuties,
            dutyCompletionRate: totalDuties > 0 ? Math.round((completedDuties / totalDuties) * 100) : 100,
          },
          categoryDistribution,
          scopeDistribution,
          schoolStats,
        },
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

// GET /api/reports/export/:reportType - Export DSW analytics to Excel / CSV
router.get(
  '/export/:reportType',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { reportType } = req.params;
      const format = (req.query.format as string) || 'excel';

      let dataToExport: any[] = [];
      let filename = `report_${reportType}_${Date.now()}`;

      if (reportType === 'competitions') {
        const competitions = await Competition.find().populate('organizingSchool', 'name code').populate('organizer', 'name email');
        dataToExport = competitions.map((c: any) => ({
          'Code': c.code,
          'Title': c.title,
          'Category': c.category,
          'Scope': c.scope,
          'Organizing School': c.organizingSchool?.name || (c.isCentralDSW ? 'Central DSW' : 'N/A'),
          'Organizer': c.organizer?.name || 'N/A',
          'Status': c.status,
          'Venue': c.venue,
          'Proposed Date': c.proposedDate?.toLocaleDateString(),
          'Registrations': c.currentRegistrationsCount,
          'Budget (INR)': c.budgetProposal,
        }));
      } else if (reportType === 'faculty-duties') {
        const duties = await FacultyDuty.find()
          .populate('competitionId', 'title code')
          .populate('facultyId', 'name email designation department')
          .populate('assignedBy', 'name email');

        dataToExport = duties.map((d: any) => ({
          'Competition': d.competitionId?.title || 'N/A',
          'Faculty Member': d.facultyId?.name || 'N/A',
          'Designation': d.facultyId?.designation || 'N/A',
          'Department': d.facultyId?.department || 'N/A',
          'Duty Title': d.dutyTitle,
          'Category': d.dutyCategory,
          'Date': d.date?.toLocaleDateString(),
          'Venue': d.venue,
          'Priority': d.priority,
          'Status': d.status,
          'Assigned By': d.assignedBy?.name || 'N/A',
        }));
      } else if (reportType === 'schools-summary') {
        const schools = await School.find({ isActive: true });
        for (const s of schools) {
          const compCount = await Competition.countDocuments({ organizingSchool: s._id });
          const regCount = await Registration.countDocuments({ school: s._id });
          dataToExport.push({
            'School Name': s.name,
            'Code': s.code,
            'Dean': s.deanName || 'N/A',
            'Contact Email': s.contactEmail || 'N/A',
            'Competitions Organized': compCount,
            'Student Participants': regCount,
          });
        }
      }

      if (format === 'csv') {
        const csvBuffer = generateCsvBuffer(dataToExport);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.csv"`);
        res.send(csvBuffer);
      } else {
        const excelBuffer = generateExcelBuffer('Report Data', dataToExport);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${filename}.xlsx"`);
        res.send(excelBuffer);
      }
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
