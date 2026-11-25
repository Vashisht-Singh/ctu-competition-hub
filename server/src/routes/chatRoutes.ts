import { Router, Response } from 'express';
import { authenticateOptional, AuthRequest } from '../middleware/auth.js';
import { generateChatReply, getChatWelcome } from '../services/chatbotService.js';

const router = Router();

// GET /api/chat/welcome - Role-aware greeting and suggested prompts
router.get('/welcome', authenticateOptional, async (req: AuthRequest, res: Response) => {
  try {
    const payload = await getChatWelcome(req.user);
    res.json({ success: true, data: payload });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to load assistant.' });
  }
});

// POST /api/chat/ask - Role-aware and live-DB-aware project guidance
router.post('/ask', authenticateOptional, async (req: AuthRequest, res: Response) => {
  try {
    const { message, history } = req.body as {
      message?: string;
      history?: Array<{ sender: 'user' | 'bot'; text: string }>;
    };
    if (!message || typeof message !== 'string' || !message.trim()) {
      res.status(400).json({ success: false, message: 'Please enter a question.' });
      return;
    }

    const payload = await generateChatReply(message, req.user, Array.isArray(history) ? history : []);
    res.json({ success: true, data: payload });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Failed to generate reply.' });
  }
});

export default router;
