import { Router, Request, Response } from 'express';
import { Certificate, ICertificate } from '../models/Certificate.js';
import { CompetitionResult } from '../models/CompetitionResult.js';
import { Registration } from '../models/Registration.js';
import { Competition } from '../models/Competition.js';
import { User } from '../models/User.js';
import { authenticate, AuthRequest } from '../middleware/auth.js';
import { requireRoles } from '../middleware/rbac.js';
import { UserRole, CertificateType, ResultCategory } from '../types/enums.js';
import { generateQRCodeDataUrl } from '../services/qrService.js';
import { logAudit } from '../services/auditService.js';

const router = Router();

// GET /api/certificates/verify/:certNumber - Public Verification Endpoint
router.get('/verify/:certNumber', async (req: Request, res: Response): Promise<void> => {
  try {
    const certNumber = req.params.certNumber.toUpperCase().trim();
    const certificate = await Certificate.findOne({
      $or: [{ certificateNumber: certNumber }, { verificationCode: certNumber }],
    }).populate('competitionId', 'title code proposedDate category');

    if (!certificate) {
      res.status(404).json({
        success: false,
        isValid: false,
        message: 'No certificate found matching the provided certificate identifier.',
      });
      return;
    }

    if (certificate.isRevoked) {
      res.status(400).json({
        success: false,
        isValid: false,
        message: 'This certificate has been revoked by CT University administration.',
        data: certificate,
      });
      return;
    }

    res.json({
      success: true,
      isValid: true,
      message: 'Certificate verified as authentic by CT University Competition Hub.',
      data: {
        certificateNumber: certificate.certificateNumber,
        verificationCode: certificate.verificationCode,
        recipientName: certificate.recipientName,
        recipientRole: certificate.recipientRole,
        schoolName: certificate.schoolName,
        competitionTitle: certificate.competitionTitle,
        type: certificate.type,
        achievement: certificate.achievement,
        issueDate: certificate.issueDate,
        authorizedSignatures: certificate.authorizedSignatures,
        isRevoked: certificate.isRevoked,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/certificates/my - Student / Faculty view own certificates
router.get('/my', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const certificates = await Certificate.find({ recipientId: req.user!._id, isRevoked: false })
      .populate('competitionId', 'title code proposedDate')
      .sort({ issueDate: -1 });

    res.json({ success: true, count: certificates.length, data: certificates });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /api/certificates/:id - Detail view
router.get('/:id', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const certificate = await Certificate.findById(req.params.id).populate('competitionId');
    if (!certificate) {
      res.status(404).json({ success: false, message: 'Certificate not found.' });
      return;
    }
    res.json({ success: true, data: certificate });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// POST /api/certificates/issue - Issue certificates for competition winners and participants
router.post(
  '/issue',
  authenticate,
  requireRoles(UserRole.DSW_ADMIN, UserRole.SUPER_ADMIN),
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { competitionId, type = CertificateType.WINNER } = req.body;
      const competition = await Competition.findById(competitionId).populate('organizingSchool');
      if (!competition) {
        res.status(404).json({ success: false, message: 'Competition not found.' });
        return;
      }

      const results = await CompetitionResult.find({ competitionId, isPublished: true }).populate({
        path: 'registrationId',
        populate: { path: 'userId' },
      });

      if (results.length === 0) {
        res.status(400).json({
          success: false,
          message: 'No published results found for this competition. Please publish results first.',
        });
        return;
      }

      const issuedCertificates = [];

      for (const resItem of results) {
        const reg = resItem.registrationId as any;
        if (!reg || !reg.userId) continue;

        const recipientUser = reg.userId;
        const count = await Certificate.countDocuments();
        const certificateNumber = `CTU-CERT-2026-${String(count + 1001).padStart(5, '0')}`;
        const verificationCode = `CTU-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

        // QR verification URL
        const verifyUrl = `${req.protocol}://${req.get('host')}/verify-certificate/${certificateNumber}`;
        const qrCodeData = await generateQRCodeDataUrl(verifyUrl);

        let achievement = 'Certificate of Participation';
        let certType = CertificateType.PARTICIPANT;

        if (resItem.rank === 1) {
          achievement = 'First Prize - Winner';
          certType = CertificateType.WINNER;
        } else if (resItem.rank === 2) {
          achievement = 'Second Prize - 1st Runner-Up';
          certType = CertificateType.WINNER;
        } else if (resItem.rank === 3) {
          achievement = 'Third Prize - 2nd Runner-Up';
          certType = CertificateType.WINNER;
        } else if (resItem.rank <= 5) {
          achievement = 'Special Commendation & Recognition';
          certType = CertificateType.WINNER;
        }

        const cert = await Certificate.findOneAndUpdate(
          { competitionId: competition._id, recipientId: recipientUser._id, type: certType },
          {
            certificateNumber,
            verificationCode,
            competitionId: competition._id,
            recipientId: recipientUser._id,
            recipientName: recipientUser.name,
            recipientRole: 'Student Participant',
            schoolName: (competition.organizingSchool as any)?.name || 'CT University',
            competitionTitle: competition.title,
            type: certType,
            achievement,
            issueDate: new Date(),
            authorizedSignatures: [
              { name: 'Dr. Gurpreet Singh', title: 'Director Student Welfare (DSW)' },
              { name: 'Dr. Satish Kumar', title: 'Vice Chancellor, CT University' },
            ],
            qrCodeData,
            isRevoked: false,
          },
          { upsert: true, new: true }
        );

        issuedCertificates.push(cert);
      }

      await logAudit({
        user: req.user!._id,
        userName: req.user!.name,
        role: req.user!.roles[0],
        action: 'ISSUE_CERTIFICATES',
        resourceType: 'CERTIFICATE',
        resourceId: competition._id.toString(),
        remarks: `Issued ${issuedCertificates.length} certificates for "${competition.title}".`,
        ipAddress: req.ip,
      });

      res.status(200).json({
        success: true,
        message: `Successfully issued ${issuedCertificates.length} authenticated certificates with digital QR codes!`,
        count: issuedCertificates.length,
        data: issuedCertificates,
      });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

export default router;
