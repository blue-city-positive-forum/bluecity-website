# Bluecity Backend

Backend API for Jodhpur Community Ahmedabad website.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT + Passport (Google OAuth)
- **Payment**: Razorpay
- **Email**: Mailgun
- **File Storage**: Cloudinary
- **Logging**: Winston
- **Background Jobs**: Node-cron

## Features

- ✅ User authentication (Email/Password + Google OAuth)
- ✅ OTP email verification
- ✅ Membership payment integration (₹7,000 lifetime)
- ✅ Matrimony profiles with multiple profiles per user
- ✅ Matrimony payment for non-paid members (₹400 per profile)
- ✅ Admin panel for user and matrimony management
- ✅ Events management (public access)
- ✅ Gallery management (public access)
- ✅ User suspension system
- ✅ Bulk approve/reject operations
- ✅ Automated matrimony profile cleanup (cron job)
- ✅ Rate limiting
- ✅ File upload to Cloudinary
- ✅ Email notifications

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

### Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file by copying `env.example`:
```bash
cp env.example .env
```

4. Update the `.env` file with your actual credentials:
   - MongoDB connection string
   - JWT secret
   - Google OAuth credentials
   - Razorpay API keys
   - Cloudinary credentials
   - Mailgun API keys
   - etc.

5. Create logs directory:
```bash
mkdir logs
```

### Running the Application

**Development mode** (with hot reload):
```bash
npm run dev
```

**Build for production**:
```bash
npm run build
```

**Run production build**:
```bash
npm start
```

### API Endpoints

Base URL: `http://localhost:5000/api/v1`

#### Authentication
- `POST /auth/register` - Register with email/password
- `POST /auth/verify-otp` - Verify email with OTP
- `POST /auth/resend-otp` - Resend OTP
- `POST /auth/login` - Login with email/password
- `GET /auth/google` - Google OAuth login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/me` - Get current user
- `POST /auth/logout` - Logout

#### Membership
- `POST /membership/create-order` - Create Razorpay order
- `POST /membership/verify-payment` - Verify payment

#### Matrimony
- `POST /matrimony/profiles` - Create profile
- `GET /matrimony/profiles/my` - Get my profiles
- `GET /matrimony/profiles` - List all profiles (filtered)
- `GET /matrimony/profiles/:id` - Get single profile
- `PATCH /matrimony/profiles/:id` - Update profile
- `DELETE /matrimony/profiles/:id` - Delete profile
- `PATCH /matrimony/profiles/my/:profileId/hide` - Hide profile
- `PATCH /matrimony/profiles/my/:profileId/unhide` - Unhide profile
- `POST /matrimony/create-order/:profileId` - Create payment order
- `POST /matrimony/verify-payment` - Verify payment

#### Events (Public)
- `GET /events` - List all events
- `GET /events/:id` - Get single event

#### Gallery (Public)
- `GET /gallery` - List all photos
- `GET /gallery/:id` - Get single photo

#### Admin
- `GET /admin/users` - Get all users
- `GET /admin/users/pending` - Get pending approvals
- `PATCH /admin/users/:id/approve` - Approve user
- `DELETE /admin/users/:id/reject` - Reject user
- `POST /admin/users/bulk-approve` - Bulk approve
- `POST /admin/users/bulk-reject` - Bulk reject
- `PATCH /admin/users/:id/make-admin` - Make admin
- `PATCH /admin/users/:id/suspend` - Suspend user
- `PATCH /admin/users/:id/unsuspend` - Unsuspend user
- `PATCH /admin/users/:id/mark-paid` - Mark as paid member
- `GET /admin/matrimonies/pending` - Get pending matrimonies
- `PATCH /admin/matrimonies/:id/approve` - Approve matrimony
- `PATCH /admin/matrimonies/:id/complete` - Mark completed
- `DELETE /admin/matrimonies/:id` - Delete matrimony
- `POST /admin/events` - Create event
- `PATCH /admin/events/:id` - Update event
- `DELETE /admin/events/:id` - Delete event
- `POST /admin/gallery` - Upload photo
- `DELETE /admin/gallery/:id` - Delete photo

### Environment Variables

See `env.example` for all required environment variables.

### Database

The application uses MongoDB. Make sure MongoDB is running:

```bash
# If using local MongoDB
brew services start mongodb-community

# Check status
brew services list
```

### Creating First Admin

To create the first admin user, connect to MongoDB and run:

```javascript
use bluecity

db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { isAdmin: true } }
)
```

### Cron Jobs

The application runs a daily cron job (2 AM by default) to clean up completed matrimony profiles after 14 days.

### Logging

Logs are stored in the `logs/` directory:
- `error.log` - Error logs only
- `combined.log` - All logs

## Project Structure

```
backend/
├── src/
│   ├── config/         # Configuration files
│   ├── controllers/    # Route controllers
│   ├── jobs/           # Cron jobs
│   ├── middleware/     # Express middleware
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── services/       # External services
│   ├── utils/          # Utility functions
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── logs/               # Log files
├── .env               # Environment variables
├── package.json
└── tsconfig.json
```

## Development

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Deployment

1. Set `NODE_ENV=production` in environment variables
2. Update all production credentials in `.env`
3. Build the project: `npm run build`
4. Run with PM2 or similar process manager:

```bash
pm2 start dist/server.js --name bluecity-backend
```

## Support

For issues or questions, please contact the development team.

