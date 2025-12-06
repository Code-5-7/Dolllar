# Project Directory Index

## Root Level Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and scripts |
| `tsconfig.json` | TypeScript configuration |
| `next.config.js` | Next.js configuration |
| `tailwind.config.js` | Tailwind CSS setup |
| `postcss.config.js` | PostCSS configuration |
| `.babelrc` | Babel transpiler config |
| `.eslintrc.json` | ESLint rules |
| `.gitignore` | Git ignore patterns |
| `.env.local` | Environment variables (local) |
| `.env.local.example` | Environment template |

## Documentation Files

| File | Content |
|------|---------|
| `README.md` | Complete project documentation |
| `DEVELOPMENT.md` | Development workflow guide |
| `QUICKSTART.md` | Quick reference guide |
| `SETUP.md` | Setup instructions |
| `PROJECT_INDEX.md` | This file |

## Source Directory (`src/`)

### Frontend Application (`src/app/`)

**Pages (Routes):**
- `page.tsx` - Home page with hero section
- `layout.tsx` - Root layout with navigation
- `globals.css` - Global styles

**Auth Pages:**
- `auth/login/page.tsx` - Login page
- `auth/register/page.tsx` - Registration page

**Feature Pages:**
- `courses/page.tsx` - Browse and enroll in courses
- `gigs/page.tsx` - Browse and apply for gigs
- `pricing/page.tsx` - Pricing and tier information

### Components (`src/components/`)

| Component | Purpose |
|-----------|---------|
| `Button.tsx` | Reusable button component |
| `Navigation.tsx` | Top navigation bar |
| `PricingCard.tsx` | Pricing tier card |
| `ProtectedRoute.tsx` | Protected route wrapper |

### Backend Server (`src/server/`)

**Server Entry:**
- `index.ts` - Express server setup and routes

**Middleware (`src/server/middleware/`):**
- `auth.ts` - JWT authentication middleware

**Database Models (`src/server/models/`):**
- `User.ts` - User schema (email, password, tier, role)
- `Course.ts` - Course schema (title, instructor, lessons)
- `Gig.ts` - Gig schema (title, budget, requirements)
- `Enrollment.ts` - Enrollment schema (progress tracking)

**API Routes (`src/server/routes/`):**
- `auth.ts` - Registration, login, profile
- `courses.ts` - Course CRUD and lessons
- `gigs.ts` - Gig posting and assignment
- `enrollments.ts` - Course enrollment management
- `payments.ts` - Stripe payment processing

### TypeScript Types (`src/types/`)
- `index.ts` - All TypeScript interfaces:
  - User, Course, Lesson, Review, Gig, Enrollment, Payment, AuthResponse

### Utilities (`src/lib/`)
- `auth-context.tsx` - React context for authentication

### State Management (`src/stores/`)
- Directory for Zustand stores (ready for expansion)

### Public Assets (`public/`)
- Directory for static assets, images, etc.

## File Relationships

```
Frontend (React/Next.js)
  ├── src/app/page.tsx (HOME)
  │   └── uses: components/Navigation.tsx
  ├── src/app/courses/page.tsx
  │   ├── calls: /api/courses
  │   └── uses: components/PricingCard.tsx
  ├── src/app/gigs/page.tsx
  │   └── calls: /api/gigs
  ├── src/app/pricing/page.tsx
  │   └── uses: components/PricingCard.tsx
  ├── src/app/auth/login/page.tsx
  │   └── calls: /api/auth/login
  └── src/app/auth/register/page.tsx
      └── calls: /api/auth/register

Backend (Express/Node.js)
  ├── src/server/index.ts (SERVER SETUP)
  ├── src/server/middleware/auth.ts (JWT VALIDATION)
  ├── src/server/routes/auth.ts
  │   └── uses: models/User.ts
  ├── src/server/routes/courses.ts
  │   ├── uses: models/Course.ts
  │   └── uses: models/Enrollment.ts
  ├── src/server/routes/gigs.ts
  │   └── uses: models/Gig.ts
  ├── src/server/routes/enrollments.ts
  │   └── uses: models/Enrollment.ts, Course.ts
  └── src/server/routes/payments.ts
      └── uses: stripe (external)

Database
  ├── User collection (users)
  ├── Course collection (courses)
  ├── Gig collection (gigs)
  └── Enrollment collection (enrollments)
```

## API Endpoint Map

### Authentication Routes (`/api/auth`)
```
POST   /api/auth/register           - Create new user
POST   /api/auth/login              - Authenticate user
GET    /api/auth/profile            - Get user profile (protected)
POST   /api/auth/upgrade-tier       - Upgrade membership tier (protected)
```

### Course Routes (`/api/courses`)
```
GET    /api/courses                 - List all courses
GET    /api/courses/:id             - Get course details
POST   /api/courses                 - Create course (protected)
POST   /api/courses/:id/lessons     - Add lesson to course (protected)
```

### Gig Routes (`/api/gigs`)
```
GET    /api/gigs                    - List all gigs
GET    /api/gigs/open/available     - List open gigs
POST   /api/gigs                    - Create new gig (protected)
POST   /api/gigs/:id/assign         - Apply for gig (protected)
```

### Enrollment Routes (`/api/enrollments`)
```
GET    /api/enrollments/user/me     - Get my enrollments (protected)
POST   /api/enrollments             - Enroll in course (protected)
POST   /api/enrollments/:id/complete-lesson - Mark lesson complete (protected)
```

### Payment Routes (`/api/payments`)
```
POST   /api/payments/create-intent  - Create Stripe payment (protected)
```

## Development Commands

```bash
# Start everything
npm run dev

# Start individual services
npm run dev:client          # Frontend only (port 3000)
npm run dev:server          # Backend only (port 5000)

# Production
npm run build               # Build for production
npm start                   # Start production server

# Code quality
npm run lint                # Run ESLint
npm test                    # Run tests
```

## Environment Variables

```
NEXT_PUBLIC_API_URL         # Frontend API endpoint
MONGODB_URI                 # Database connection
JWT_SECRET                  # JWT signing key
STRIPE_SECRET_KEY           # Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY # Stripe public key
NODE_ENV                    # development/production
```

## Data Models Overview

### User Model
```typescript
{
  email: string (unique)
  password: string (hashed)
  firstName: string
  lastName: string
  role: 'student' | 'instructor' | 'admin'
  enrollmentTier?: 'basic' | 'pro' | 'premium'
  profileImage?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}
```

### Course Model
```typescript
{
  title: string
  description: string
  instructor: ObjectId (User)
  tier: 'basic' | 'pro' | 'premium'
  price: number
  duration: number (weeks)
  lessons: Lesson[]
  enrolledStudents: ObjectId[] (User)
  rating: number
  reviews: Review[]
  createdAt: Date
  updatedAt: Date
}
```

### Gig Model
```typescript
{
  title: string
  description: string
  requiredTier: 'basic' | 'pro' | 'premium'
  budget: number
  deadline: Date
  status: 'open' | 'in-progress' | 'completed' | 'cancelled'
  client: ObjectId (User)
  assignedTo?: ObjectId (User)
  requirements: string[]
  createdAt: Date
  updatedAt: Date
}
```

### Enrollment Model
```typescript
{
  userId: ObjectId (User)
  courseId: ObjectId (Course)
  enrollmentDate: Date
  completionPercentage: number
  progress: {
    lessonId: ObjectId
    completed: boolean
    completedAt?: Date
  }[]
}
```

## Key Features by File

| Feature | File | Type |
|---------|------|------|
| User Authentication | `src/server/routes/auth.ts` | Backend |
| Tier Management | `src/server/models/User.ts` | Database |
| Course Creation | `src/server/routes/courses.ts` | Backend |
| Course Enrollment | `src/server/routes/enrollments.ts` | Backend |
| Gig Posting | `src/server/routes/gigs.ts` | Backend |
| Gig Assignment | `src/server/routes/gigs.ts` | Backend |
| Payment Processing | `src/server/routes/payments.ts` | Backend |
| Homepage | `src/app/page.tsx` | Frontend |
| Course Page | `src/app/courses/page.tsx` | Frontend |
| Gigs Page | `src/app/gigs/page.tsx` | Frontend |
| Pricing Page | `src/app/pricing/page.tsx` | Frontend |

---

## Quick Navigation

**Want to modify:**
- ✅ **Homepage?** → `src/app/page.tsx`
- ✅ **Navigation?** → `src/components/Navigation.tsx`
- ✅ **Authentication?** → `src/server/routes/auth.ts`
- ✅ **Database?** → `src/server/models/`
- ✅ **Styling?** → `src/app/globals.css` or `tailwind.config.js`
- ✅ **Routes?** → `src/server/routes/`
- ✅ **Pages?** → `src/app/*/page.tsx`

---

**Last Updated:** 2025-12-05
**Project Name:** WriteGigs Platform
**Version:** 1.0.0
