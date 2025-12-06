# Development Guide

## Setup Instructions

### Prerequisites
- Node.js 18+
- MongoDB 5+
- npm or yarn

### Initial Setup

1. **Install dependencies**
```bash
npm install
```

2. **Setup MongoDB**
```bash
# Using Docker (recommended)
docker run -d -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=password --name mongodb mongo

# Connection string
mongodb+srv://admin:password@localhost:27017/writing-gigs?authSource=admin
```

3. **Configure environment**
- Copy `.env.local.example` to `.env.local`
- Update with your configuration values
- Add Stripe API keys from https://dashboard.stripe.com/apikeys

4. **Run development server**
```bash
npm run dev
```

## Project Workflow

### Adding a New Feature

1. **Create Feature Branch**
```bash
git checkout -b feature/feature-name
```

2. **Create Types** (if needed)
```typescript
// src/types/index.ts
export interface NewFeature {
  // Define your interface
}
```

3. **Create Backend Route**
```typescript
// src/server/routes/newfeature.ts
import express from 'express';
const router = express.Router();

router.get('/', (req, res) => {
  // Implementation
});

export default router;
```

4. **Create Frontend Component**
```typescript
// src/components/NewFeature.tsx
'use client';

import React from 'react';

export const NewFeature = () => {
  // Implementation
  return <div></div>;
};
```

5. **Create Frontend Page** (if needed)
```typescript
// src/app/newfeature/page.tsx
'use client';

import React from 'react';

export default function NewFeaturePage() {
  return <div></div>;
}
```

### Testing

```bash
# Run tests
npm test

# Run linter
npm run lint
```

### Building for Production

```bash
npm run build
npm start
```

## Common Tasks

### Adding a New Database Model

1. Create schema in `src/server/models/`
2. Export model at bottom of file
3. Import and use in routes

### Adding Authentication to Routes

```typescript
import { authMiddleware } from '../middleware/auth';

router.get('/protected', authMiddleware, (req: AuthRequest, res) => {
  // req.user?.id is available
});
```

### Adding a New API Endpoint

1. Create route in `src/server/routes/`
2. Import route in `src/server/index.ts`
3. Register with `app.use('/api/path', route)`

## Debugging

### Enable Debug Logging

```typescript
// Set in .env.local
DEBUG=*
```

### MongoDB Connection Issues

- Check MongoDB is running: `mongo --version`
- Verify connection string in `.env.local`
- Check firewall for port 27017

### Port Already in Use

```bash
# Kill process on port
npx kill-port 3000 5000
```

## Performance Tips

1. Use Next.js Image optimization for images
2. Implement lazy loading for routes
3. Use Zustand for state management instead of Redux
4. Cache API responses where appropriate
5. Use indexes in MongoDB for frequently queried fields

## Deployment

### Vercel (Recommended for Frontend)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Heroku (For Backend)

1. Create Heroku app
2. Add MongoDB Atlas connection string
3. Deploy using git push

### Self-Hosted

1. Build: `npm run build`
2. Install production dependencies
3. Start: `npm start`
4. Use PM2 for process management
