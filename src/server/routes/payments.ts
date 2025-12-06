import express, { Router, Request, Response } from 'express';
import stripe from 'stripe';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router: Router = express.Router();
const stripeClient = new stripe(process.env.STRIPE_SECRET_KEY || '');

// Create payment intent
router.post('/create-intent', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { amount, courseId, gigId } = req.body;

    const paymentIntent = await stripeClient.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      metadata: {
        userId: req.user?.id,
        courseId,
        gigId,
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

export default router;
