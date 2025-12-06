import express, { Router, Request, Response } from 'express';
import Gig from '../models/Gig';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router: Router = express.Router();

// Get all gigs
router.get('/', async (req: Request, res: Response) => {
  try {
    const gigs = await Gig.find().populate('client assignedTo', 'firstName lastName email');
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gigs' });
  }
});

// Get open gigs
router.get('/open/available', async (req: Request, res: Response) => {
  try {
    const gigs = await Gig.find({ status: 'open' }).populate('client', 'firstName lastName email');
    res.json(gigs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gigs' });
  }
});

// Create gig
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, requiredTier, budget, deadline, requirements } = req.body;

    const newGig = new Gig({
      title,
      description,
      requiredTier,
      budget,
      deadline,
      requirements,
      client: req.user?.id,
      status: 'open',
    });

    await newGig.save();
    res.status(201).json(newGig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gig' });
  }
});

// Assign gig to user
router.post('/:id/assign', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const gig = await Gig.findByIdAndUpdate(
      req.params.id,
      { assignedTo: req.user?.id, status: 'in-progress' },
      { new: true }
    );

    res.json(gig);
  } catch (error) {
    res.status(500).json({ error: 'Failed to assign gig' });
  }
});

export default router;
