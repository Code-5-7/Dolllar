import mongoose, { Schema } from 'mongoose';
import { Enrollment } from '@/types';

const EnrollmentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  enrollmentDate: {
    type: Date,
    default: Date.now,
  },
  completionPercentage: {
    type: Number,
    default: 0,
  },
  progress: [
    {
      lessonId: Schema.Types.ObjectId,
      completed: Boolean,
      completedAt: Date,
    },
  ],
});

export default mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema);
