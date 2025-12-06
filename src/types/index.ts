// User types
export interface User {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  enrollmentTier?: 'basic' | 'pro' | 'premium'; // 300, 500, 1000
  profileImage?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Course types
export interface Course {
  _id: string;
  title: string;
  description: string;
  instructor: string; // User ID
  tier: 'basic' | 'pro' | 'premium';
  price: number;
  duration: number; // in weeks
  lessons: Lesson[];
  enrolledStudents: string[]; // User IDs
  rating: number;
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
}

// Lesson types
export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  content: string;
  videoUrl?: string;
  order: number;
  duration: number; // in minutes
}

// Review types
export interface Review {
  _id: string;
  userId: string;
  courseId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

// Gig types
export interface Gig {
  _id: string;
  title: string;
  description: string;
  requiredTier: 'basic' | 'pro' | 'premium';
  budget: number;
  deadline: Date;
  status: 'open' | 'in-progress' | 'completed' | 'cancelled';
  client: string; // User ID
  assignedTo?: string; // User ID
  requirements: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Enrollment types
export interface Enrollment {
  _id: string;
  userId: string;
  courseId: string;
  enrollmentDate: Date;
  completionPercentage: number;
  progress: {
    lessonId: string;
    completed: boolean;
    completedAt?: Date;
  }[];
}

// Payment types
export interface Payment {
  _id: string;
  userId: string;
  courseId?: string;
  gigId?: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  stripePaymentId: string;
  createdAt: Date;
}

// Auth response
export interface AuthResponse {
  token: string;
  user: User;
}
