# WriteGigs Platform - Setup & Getting Started

## 🎉 Project Overview

WriteGigs is a full-stack online platform for writing courses and freelance gigs with three enrollment tiers:
- **Basic Tier**: $300/month - 5 courses, community support
- **Pro Tier**: $500/month - 15 courses, priority support, coaching
- **Premium Tier**: $1000/month - All courses, VIP support, exclusive gigs

## 📋 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages for both frontend and backend.

### 2. Setup Environment Variables

Create `.env.local` in the project root with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
MONGODB_URI=mongodb://localhost:27017/writing-gigs
JWT_SECRET=your-secret-key-here
STRIPE_SECRET_KEY=sk_test_xxxxx
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_xxxxx
NODE_ENV=development
```

### 3. Start MongoDB

**Using Docker (recommended):**
```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

**Or ensure MongoDB is running locally**

### 4. Start Development Servers

```bash
npm run dev
```

This command:
- Starts Next.js frontend on http://localhost:3000
- Starts Express backend on http://localhost:5000

## 📁 Project Structure

```
writing-gigs-platform/
├── src/
│   ├── app/                  # Next.js app (frontend)
│   │   ├── auth/            # Login/Register pages
│   │   ├── courses/         # Courses listing
│   │   ├── gigs/            # Gigs marketplace
│   │   ├── pricing/         # Pricing page
│   │   └── page.tsx         # Home page
│   │
│   ├── components/          # Reusable React components
│   │   ├── Button.tsx
│   │   ├── Navigation.tsx
│   │   ├── PricingCard.tsx
│   │   └── ProtectedRoute.tsx
│   │
│   ├── server/              # Express backend
│   │   ├── middleware/
│   │   │   └── auth.ts      # JWT authentication
│   │   ├── models/          # Mongoose schemas
│   │   │   ├── User.ts
│   │   │   ├── Course.ts
│   │   │   ├── Gig.ts
│   │   │   └── Enrollment.ts
│   │   ├── routes/          # API endpoints
│   │   │   ├── auth.ts
│   │   │   ├── courses.ts
│   │   │   ├── gigs.ts
│   │   │   ├── enrollments.ts
│   │   │   └── payments.ts
│   │   └── index.ts         # Server entry point
│   │
│   ├── types/               # TypeScript interfaces
│   ├── stores/              # Zustand state management
│   ├── lib/                 # Utility functions
│   └── globals.css          # Global styles
│
├── public/                  # Static files
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.local              # Environment variables
├── .env.local.example      # Example env file
├── .gitignore
├── README.md               # Full documentation
├── DEVELOPMENT.md          # Development guide
└── QUICKSTART.md           # This file
```

## 🚀 Available Commands

```bash
# Development
npm run dev              # Start both frontend and backend

# Development individual
npm run dev:client       # Start only frontend (port 3000)
npm run dev:server       # Start only backend (port 5000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Utilities
npm run lint             # Run ESLint
npm test                 # Run tests
```

## 🔐 Authentication Flow

1. User registers at `/auth/register`
2. Password is hashed with bcrypt
3. JWT token is generated and stored in localStorage
4. Token is sent with each authenticated request
5. Backend validates token with middleware

## 💳 Enrollment Tiers

### Database Storage
Each user has an `enrollmentTier` field: `'basic' | 'pro' | 'premium'`

### Tier-Based Access
- Courses filtered by tier
- Gigs only shown if user meets tier requirement
- Payment processing by tier

## 📡 API Endpoints Quick Reference

### Auth
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile (requires auth)
- `POST /api/auth/upgrade-tier` - Upgrade membership

### Courses
- `GET /api/courses` - List all courses
- `GET /api/courses/:id` - Get course details
- `POST /api/courses` - Create course (requires auth)
- `POST /api/courses/:id/lessons` - Add lesson

### Gigs
- `GET /api/gigs` - List all gigs
- `GET /api/gigs/open/available` - List open gigs
- `POST /api/gigs` - Post new gig (requires auth)
- `POST /api/gigs/:id/assign` - Apply for gig

### Enrollments
- `GET /api/enrollments/user/me` - Get my enrollments
- `POST /api/enrollments` - Enroll in course
- `POST /api/enrollments/:id/complete-lesson` - Mark lesson done

### Payments
- `POST /api/payments/create-intent` - Create Stripe payment

## 🛠️ Common Development Tasks

### Adding a New Page

1. Create file in `src/app/newpage/page.tsx`
2. Export default component
3. Add route link in Navigation component

### Adding a New API Route

1. Create route file in `src/server/routes/newroute.ts`
2. Import in `src/server/index.ts`
3. Register with `app.use('/api/path', route)`

### Adding Database Model

1. Create schema in `src/server/models/Model.ts`
2. Use in routes with `Model.find()`, `Model.create()`, etc.

### Styling

Uses Tailwind CSS with custom color variables:
- `primary`: #667eea (purple-blue)
- `secondary`: #764ba2 (darker purple)
- `accent`: #f093fb (pink)

## 🔧 Troubleshooting

### Ports already in use
```bash
npx kill-port 3000 5000
```

### MongoDB connection failed
- Check MongoDB is running: `docker ps` or `mongod`
- Verify connection string in `.env.local`

### Modules not found
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build errors
```bash
npm run lint
npm run build
```

## 📚 Next Steps

1. **Configure Stripe**: Get API keys from stripe.com
2. **Setup Email**: Add email service for notifications
3. **Add Video**: Implement video upload/streaming
4. **Analytics**: Track user engagement
5. **Admin Panel**: Build admin dashboard

## 🚢 Deployment

### Frontend (Vercel recommended)
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Backend (Heroku/Railway)
1. Add MongoDB Atlas connection
2. Deploy with git push or web interface

## 📖 Documentation

- **README.md** - Full feature documentation
- **DEVELOPMENT.md** - Detailed development guide
- **QUICKSTART.md** - This file

## 🤝 Support

For issues:
1. Check DEVELOPMENT.md troubleshooting
2. Review API endpoint documentation
3. Check browser console for errors
4. Check server logs for backend errors

## 📝 License

MIT - Free to use for personal and commercial projects

---

**Happy coding! 🎉**
