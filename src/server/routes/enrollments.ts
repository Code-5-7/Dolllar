import express, { Router, Request, Response } from 'express';
import Enrollment from '../models/Enrollment';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router: Router = express.Router();

// Get user enrollments
router.get('/user/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const enrollments = await Enrollment.find({ userId: req.user?.id }).populate('courseId');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

// Enroll in course
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.body;

    const existingEnrollment = await Enrollment.findOne({
      userId: req.user?.id,
      courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course' });
    }

    const enrollment = new Enrollment({
      userId: req.user?.id,
      courseId,
      enrollmentDate: new Date(),
      completionPercentage: 0,
      progress: [],
    });

    await enrollment.save();
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to enroll in course' });
  }
});

// Mark lesson as complete
router.post('/:id/complete-lesson', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { lessonId } = req.body;

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          progress: {
            lessonId,
            completed: true,
            completedAt: new Date(),
          },
        },
      },
      { new: true }
    );

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark lesson as complete' });
  }
});

export default router;
