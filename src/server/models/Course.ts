import mongoose, { Schema } from 'mongoose';
import { Course } from '@/types';

const CourseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tier: {
    type: String,
    enum: ['basic', 'pro', 'premium'],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  lessons: [
    {
      _id: Schema.Types.ObjectId,
      title: String,
      content: String,
      videoUrl: String,
      order: Number,
      duration: Number,
    },
  ],
  enrolledStudents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  rating: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      userId: Schema.Types.ObjectId,
      rating: Number,
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Course || mongoose.model('Course', CourseSchema);
