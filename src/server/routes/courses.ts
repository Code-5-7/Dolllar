import express, { Router, Request, Response } from 'express';
import Course from '../models/Course';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router: Router = express.Router();

// Get all courses
router.get('/', async (req: Request, res: Response) => {
  try {
    const courses = await Course.find().populate('instructor', 'firstName lastName email');
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get course by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id).populate('instructor', 'firstName lastName email');
    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Create course (instructor only)
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, tier, price, duration } = req.body;

    const newCourse = new Course({
      title,
      description,
      instructor: req.user?.id,
      tier,
      price,
      duration,
      lessons: [],
      enrolledStudents: [],
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Add lesson to course
router.post('/:id/lessons', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    const { title, content, videoUrl, duration } = req.body;
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    const lesson = {
      _id: require('mongoose').Types.ObjectId(),
      title,
      content,
      videoUrl,
      order: course.lessons.length + 1,
      duration,
    };

    course.lessons.push(lesson as any);
    await course.save();

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add lesson' });
  }
});

export default router;
