# Blue City Parivar - Complete Technical Documentation

This document provides comprehensive technical documentation for the Blue City Parivar platform, covering architecture, design decisions, implementation details, and code organization.

**Last Updated:** December 28, 2025  
**Version:** 2.0

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture](#architecture)
3. [Tech Stack](#tech-stack)
4. [Backend Documentation](#backend-documentation)
5. [Frontend Documentation](#frontend-documentation)
6. [Database Schema](#database-schema)
7. [API Reference](#api-reference)
8. [Authentication & Authorization](#authentication--authorization)
9. [Payment Integration](#payment-integration)
10. [File Upload Strategy](#file-upload-strategy)
11. [Internationalization (i18n)](#internationalization-i18n)
12. [Design System](#design-system)

---

## Project Overview

**Blue City Parivar** is a community platform for Jodhpur natives living in Ahmedabad. It features:

- **Membership Management:** User registration, admin approval, lifetime membership (₹7,000)
- **Matrimony Platform:** Profile creation with tiered access (free for members, ₹400 for non-members)
- **Events & Gallery:** Public event listings and community photo gallery
- **Admin Panel:** User management, profile approvals, content moderation

---

## Architecture

### Monorepo Structure

```
bluecity-jodhpur/
├── frontend/              # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── services/     # API services
│   │   ├── store/        # Zustand state management
│   │   ├── types/        # TypeScript types
│   │   ├── utils/        # Utility functions
│   │   └── i18n/         # Internationalization
│   └── public/           # Static assets
│
├── backend/              # Node.js + Express + TypeScript
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── controllers/  # Route controllers
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # API routes
│   │   ├── services/     # External services
│   │   ├── jobs/         # Cron jobs
│   │   └── utils/        # Utility functions
│   └── logs/             # Application logs
│
└── .github/workflows/    # CI/CD pipelines
```

### System Architecture

```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   Browser   │────────>│   Frontend  │────────>│   Backend   │
│  (React)    │         │ (Vite/React)│         │  (Node.js)  │
└─────────────┘         └─────────────┘         └─────────────┘
                                                        │
                        ┌───────────────────────────────┼────────────────┐
                        │                               │                │
                        v                               v                v
                ┌──────────────┐              ┌─────────────┐   ┌─────────────┐
                │   MongoDB    │              │ Cloudinary  │   │   Mailgun   │
                │  (Database)  │              │  (Images)   │   │   (Email)   │
                └──────────────┘              └─────────────┘   └─────────────┘
                                                      
                                              ┌─────────────┐
                                              │  Razorpay   │
                                              │ (Payments)  │
                                              └─────────────┘
```

---

## Tech Stack

### Frontend

| Technology | Purpose | Version |
|-----------|---------|---------|
| React | UI Framework | 19.2.0 |
| TypeScript | Type Safety | 5.9.3 |
| Vite | Build Tool | 7.2.2 |
| Tailwind CSS | Styling | 3.4.18 |
| Framer Motion | Animations | 12.23.24 |
| Zustand | State Management | 5.0.8 |
| React Router | Routing | 7.9.6 |
| React Hook Form | Form Handling | 7.66.1 |
| Zod | Validation | 4.1.12 |
| Axios | HTTP Client | 1.13.2 |
| i18next | Internationalization | 25.7.3 |
| date-fns | Date Utilities | 4.1.0 |

### Backend

| Technology | Purpose | Version |
|-----------|---------|---------|
| Node.js | Runtime | 18+ |
| TypeScript | Type Safety | 5.x |
| Express | Web Framework | 4.x |
| MongoDB | Database | Latest |
| Mongoose | ODM | 8.x |
| Passport | Authentication | Latest |
| JWT | Token Auth | Latest |
| Razorpay | Payments | Latest |
| Cloudinary | Image Storage | Latest |
| Mailgun | Email Service | Latest |
| Winston | Logging | Latest |
| Node-cron | Scheduled Jobs | Latest |

---

## Backend Documentation

### Project Structure

```
backend/src/
├── app.ts                    # Express app configuration
├── server.ts                 # Server entry point
├── config/
│   ├── database.ts          # MongoDB connection
│   ├── passport.ts          # OAuth strategies
│   └── cloudinary.ts        # Cloudinary setup
├── controllers/
│   ├── auth.controller.ts   # Authentication logic
│   ├── admin.controller.ts  # Admin operations
│   ├── event.controller.ts  # Event management
│   ├── gallery.controller.ts # Gallery management
│   ├── matrimony.controller.ts # Matrimony profiles
│   ├── membership.controller.ts # Membership payments
│   └── upload.controller.ts  # File uploads
├── middleware/
│   ├── auth.middleware.ts   # JWT verification
│   ├── error.middleware.ts  # Error handling
│   ├── rateLimiter.middleware.ts # Rate limiting
│   ├── upload.middleware.ts # File upload handling
│   └── validation.middleware.ts # Request validation
├── models/
│   ├── User.ts              # User schema
│   ├── MatrimonyProfile.ts  # Matrimony schema
│   ├── Event.ts             # Event schema
│   ├── GalleryPhoto.ts      # Gallery schema
│   └── PasswordReset.ts     # Password reset schema
├── routes/
│   ├── index.ts             # Route aggregator
│   ├── auth.routes.ts       # Auth endpoints
│   ├── admin.routes.ts      # Admin endpoints
│   ├── event.routes.ts      # Event endpoints
│   ├── gallery.routes.ts    # Gallery endpoints
│   ├── matrimony.routes.ts  # Matrimony endpoints
│   ├── membership.routes.ts # Membership endpoints
│   └── upload.routes.ts     # Upload endpoints
├── services/
│   ├── cloudinary.service.ts # Cloudinary operations
│   ├── mailgun.service.ts    # Email sending
│   └── razorpay.service.ts   # Payment processing
├── jobs/
│   └── matrimonyCleanup.ts  # Scheduled cleanup job
└── utils/
    ├── jwt.ts               # JWT utilities
    ├── logger.ts            # Winston logger
    └── otp.ts               # OTP generation
```

### Key Design Patterns

**1. Controller Pattern:**
- Controllers handle HTTP request/response
- Business logic separated from routing
- Consistent error handling

**2. Service Layer:**
- External service integrations isolated
- Reusable across controllers
- Easy to mock for testing

**3. Middleware Chain:**
- Request validation
- Authentication & authorization
- Error handling
- Rate limiting

**4. Schema Validation:**
- Joi schemas for request validation
- Mongoose schemas for data modeling
- Type-safe with TypeScript

### API Versioning

- Current: `/api/v1`
- All routes prefixed with `/api/v1`
- Future versions: `/api/v2`, etc.

---

## Frontend Documentation

### Project Structure

```
frontend/src/
├── App.tsx                   # Main app component
├── main.tsx                  # Entry point
├── index.css                 # Global styles
├── components/
│   ├── ui/                  # Base UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Textarea.tsx
│   │   ├── Modal.tsx
│   │   ├── Spinner.tsx
│   │   ├── Alert.tsx
│   │   └── Badge.tsx
│   ├── layout/              # Layout components
│   │   ├── Layout.tsx
│   │   ├── AuthLayout.tsx
│   │   └── DashboardLayout.tsx
│   ├── common/              # Common components
│   │   ├── ProtectedRoute.tsx
│   │   ├── Pagination.tsx
│   │   └── ConfirmDialog.tsx
│   ├── Navbar.tsx           # Navigation bar
│   ├── Footer.tsx           # Footer
│   ├── Hero.tsx             # Landing hero
│   ├── About.tsx            # About section
│   ├── Events.tsx           # Events section
│   ├── Gallery.tsx          # Gallery section
│   ├── Stories.tsx          # Testimonials
│   ├── CTA.tsx              # Call-to-action
│   └── LanguageProvider.tsx # i18n provider
├── pages/
│   ├── Home.tsx             # Landing page
│   ├── About.tsx            # About page
│   ├── Contact.tsx          # Contact page
│   ├── Login.tsx            # Login/register
│   ├── LoginSuccess.tsx     # OAuth success
│   ├── LoginFail.tsx        # OAuth failure
│   ├── ResetPassword.tsx    # Password reset
│   ├── Account.tsx          # User dashboard
│   ├── JoinUs.tsx           # Membership
│   ├── Events.tsx           # Events list
│   ├── Gallery.tsx          # Gallery page
│   ├── matrimony/           # Matrimony pages
│   │   ├── MatrimonyList.tsx
│   │   ├── MatrimonyCreate.tsx
│   │   ├── MatrimonyEdit.tsx
│   │   └── MatrimonyProfile.tsx
│   ├── about/               # About sub-pages
│   │   ├── WhoWeAre.tsx
│   │   ├── OurMission.tsx
│   │   ├── Leadership.tsx
│   │   ├── JoinCommunity.tsx
│   │   └── History.tsx
│   ├── activities/          # Activities pages
│   │   ├── CulturalEvents.tsx
│   │   ├── Festivals.tsx
│   │   └── SocialGatherings.tsx
│   ├── help/                # Help pages
│   │   ├── FAQ.tsx
│   │   ├── Support.tsx
│   │   └── Guidelines.tsx
│   ├── admin/               # Admin pages
│   │   ├── AdminDashboard.tsx
│   │   ├── UserManagement.tsx
│   │   └── MatrimonyManagement.tsx
│   └── NotFound.tsx         # 404 page
├── hooks/
│   ├── useAuth.ts           # Auth hook
│   ├── useInView.ts         # Intersection observer
│   ├── useRazorpay.ts       # Payment hook
│   └── useCloudinaryUpload.ts # Upload hook
├── services/
│   ├── api.ts               # Axios instance
│   ├── authService.ts       # Auth API
│   ├── eventService.ts      # Events API
│   ├── galleryService.ts    # Gallery API
│   ├── matrimonyService.ts  # Matrimony API
│   ├── adminService.ts      # Admin API
│   ├── paymentService.ts    # Payments API
│   └── uploadService.ts     # Upload API
├── store/
│   ├── authStore.ts         # Auth state
│   ├── matrimonyStore.ts    # Matrimony state
│   └── uiStore.ts           # UI state
├── types/
│   ├── auth.types.ts        # Auth types
│   ├── event.types.ts       # Event types
│   ├── gallery.types.ts     # Gallery types
│   ├── matrimony.types.ts   # Matrimony types
│   └── payment.types.ts     # Payment types
├── utils/
│   ├── validators.ts        # Zod schemas
│   ├── constants.ts         # App constants
│   ├── helpers.ts           # Helper functions
│   └── formatters.ts        # Format utilities
└── i18n/
    ├── config.ts            # i18n configuration
    └── locales/
        ├── en.json          # English translations
        └── hi.json          # Hindi translations
```

### State Management (Zustand)

**Auth Store:**
```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}
```

**Matrimony Store:**
```typescript
interface MatrimonyStore {
  profiles: MatrimonyProfile[];
  myProfiles: MatrimonyProfile[];
  filters: FilterState;
  pagination: PaginationState;
  fetchProfiles: (filters: FilterState) => Promise<void>;
  createProfile: (data: MatrimonyFormData) => Promise<void>;
}
```

**UI Store:**
```typescript
interface UIStore {
  alerts: Alert[];
  modals: { [key: string]: boolean };
  showAlert: (message: string, type: AlertType) => void;
  openModal: (key: string) => void;
  closeModal: (key: string) => void;
}
```

### Routing Structure

**Public Routes:**
- `/` - Home (Landing page)
- `/about/*` - About pages
- `/activities/*` - Activities pages
- `/help/*` - Help pages
- `/gallery` - Public gallery
- `/events` - Public events
- `/login` - Login/register

**Protected Routes (Authenticated):**
- `/account` - User dashboard
- `/joinus` - Membership payment

**Protected Routes (Approved):**
- `/matrimony` - Matrimony home
- `/matrimony/create` - Create profile
- `/matrimony/edit/:id` - Edit profile
- `/matrimony/profile/:id` - View profile

**Protected Routes (Approved + Access):**
- `/matrimony/list` - Browse profiles

**Protected Routes (Admin):**
- `/admin` - Admin dashboard
- `/admin/users` - User management
- `/admin/matrimonies` - Matrimony management

---

## Database Schema

### User Collection

```typescript
{
  _id: ObjectId,
  email: String (unique, required),
  password: String, // Hashed
  googleId: String (unique, sparse),
  name: String (required),
  phone: String (required),
  profilePhoto: String,
  
  // Status
  isApproved: Boolean (default: false),
  isSuspended: Boolean (default: false),
  isEmailVerified: Boolean (default: false),
  isMember: Boolean (default: false),
  isAdmin: Boolean (default: false),
  
  // Payment
  membershipPayment: {
    amount: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    paidAt: Date
  },
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### Matrimony Profile Collection

```typescript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  
  // Payment
  paymentRequired: Boolean,
  isPaid: Boolean,
  payment: {
    amount: Number,
    razorpayOrderId: String,
    razorpayPaymentId: String,
    razorpaySignature: String,
    paidAt: Date
  },
  
  // Status
  isApproved: Boolean (default: false),
  isHidden: Boolean (default: false),
  isCompleted: Boolean (default: false),
  scheduledDeletion: Date,
  
  // Personal Info
  fullName: String (required),
  dateOfBirth: Date (required),
  age: Number (required),
  gender: String (required),
  height: String,
  maritalStatus: String (required),
  
  // Contact
  phone: String (required),
  email: String (required),
  city: String (required),
  state: String (required),
  
  // Family
  fatherName: String (required),
  motherName: String (required),
  siblings: String,
  
  // Education & Career
  highestEducation: String (required),
  occupation: String (required),
  annualIncome: String,
  
  // Lifestyle
  diet: String,
  smoking: String,
  drinking: String,
  hobbies: String,
  
  // Photos
  photos: [{
    url: String,
    publicId: String,
    isProfile: Boolean
  }],
  
  // Timestamps
  createdAt: Date,
  updatedAt: Date
}
```

### Event Collection

```typescript
{
  _id: ObjectId,
  title: String (required),
  startDate: Date (required),
  endDate: Date,
  venue: {
    name: String (required),
    address: String (required),
    city: String,
    googleMapsLink: String
  },
  images: [String],
  organizer: String,
  status: String (enum: ['upcoming', 'ongoing', 'completed']),
  isPublished: Boolean,
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### Gallery Photo Collection

```typescript
{
  _id: ObjectId,
  title: String,
  description: String,
  imageUrl: String (required),
  cloudinaryPublicId: String (required),
  eventId: ObjectId (ref: Event),
  tags: [String],
  uploadedBy: ObjectId (ref: User),
  isVisible: Boolean (default: true),
  uploadDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## API Reference

### Base URL

```
Development: http://localhost:5002/api/v1
Production: https://api.yourdomain.com/api/v1
```

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register with email/password | No |
| POST | `/auth/verify-otp` | Verify email OTP | No |
| POST | `/auth/resend-otp` | Resend OTP | No |
| POST | `/auth/login` | Login with credentials | No |
| GET | `/auth/google` | Google OAuth login | No |
| GET | `/auth/google/callback` | OAuth callback | No |
| GET | `/auth/me` | Get current user | Yes |
| POST | `/auth/logout` | Logout | Yes |

### Membership Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/membership/create-order` | Create Razorpay order | Yes |
| POST | `/membership/verify-payment` | Verify payment | Yes |

### Matrimony Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/matrimony/profiles` | Create profile | Yes (Approved) |
| GET | `/matrimony/profiles` | List profiles | Yes (Approved + Access) |
| GET | `/matrimony/profiles/my` | Get my profiles | Yes (Approved) |
| GET | `/matrimony/profiles/:id` | Get single profile | Yes (Approved) |
| PATCH | `/matrimony/profiles/my/:id` | Update profile | Yes (Owner) |
| DELETE | `/matrimony/profiles/my/:id` | Delete profile | Yes (Owner) |
| PATCH | `/matrimony/profiles/my/:id/hide` | Hide profile | Yes (Owner) |
| POST | `/matrimony/create-order/:id` | Create payment order | Yes |
| POST | `/matrimony/verify-payment` | Verify payment | Yes |

### Admin Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/admin/users` | Get all users | Admin |
| GET | `/admin/users/pending` | Get pending approvals | Admin |
| PATCH | `/admin/users/:id/approve` | Approve user | Admin |
| DELETE | `/admin/users/:id/reject` | Reject user | Admin |
| POST | `/admin/users/bulk-approve` | Bulk approve | Admin |
| PATCH | `/admin/users/:id/suspend` | Suspend user | Admin |
| GET | `/admin/matrimony/pending` | Get pending profiles | Admin |
| PATCH | `/admin/matrimony/:id/approve` | Approve profile | Admin |
| PATCH | `/admin/matrimony/:id/complete` | Mark completed | Admin |

---

## Authentication & Authorization

### JWT Token Structure

```typescript
{
  userId: string;      // MongoDB ObjectId
  email: string;       // User email
  isAdmin: boolean;    // Admin flag
  iat: number;         // Issued at
  exp: number;         // Expiry (7 days)
}
```

### Authorization Middleware

**1. verifyToken:**
- Verifies JWT from Authorization header
- Attaches user to `req.user`
- Returns 401 if invalid

**2. checkApproved:**
- Ensures user is approved by admin
- Returns 403 if not approved

**3. checkAdmin:**
- Ensures user has admin privileges
- Returns 403 if not admin

**4. checkMatrimonyAccess:**
- Checks if user can access matrimony list
- Logic: `isMember` OR `has paid matrimony profile`

---

## Payment Integration

### Razorpay Flow

**1. Create Order:**
```typescript
POST /api/v1/membership/create-order
Response: {
  orderId: string;
  amount: number;
  currency: string;
  key: string;
}
```

**2. Frontend Integration:**
```typescript
const options = {
  key: RAZORPAY_KEY_ID,
  amount: amount,
  currency: "INR",
  order_id: orderId,
  handler: (response) => {
    // Verify payment
    verifyPayment(response);
  }
};
const razorpay = new Razorpay(options);
razorpay.open();
```

**3. Verify Payment:**
```typescript
POST /api/v1/membership/verify-payment
Body: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
```

---

## File Upload Strategy

### Cloudinary Direct Upload

**1. Get Signed Params:**
```typescript
GET /api/v1/upload/signed-params?folder=matrimony
Response: {
  signature: string;
  timestamp: number;
  apiKey: string;
  cloudName: string;
  folder: string;
}
```

**2. Upload to Cloudinary:**
```typescript
const formData = new FormData();
formData.append('file', file);
formData.append('signature', params.signature);
formData.append('timestamp', params.timestamp);
formData.append('api_key', params.apiKey);

const response = await axios.post(
  `https://api.cloudinary.com/v1_1/${params.cloudName}/image/upload`,
  formData
);
```

**3. Save Metadata:**
- Store `secure_url` and `public_id` from response
- Associate with user/profile in database

### Folder Structure

```
bluecity/
├── matrimony/       # Matrimony photos
├── profiles/        # Profile pictures
├── gallery/         # Gallery photos
└── events/          # Event photos
```

---

## Internationalization (i18n)

### Supported Languages

- **English (en)** - Default
- **Hindi (hi)** - Secondary

### Implementation

**Configuration** (`frontend/src/i18n/config.ts`):
```typescript
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      hi: { translation: hiTranslations }
    },
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });
```

**Usage:**
```typescript
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <button onClick={() => i18n.changeLanguage('hi')}>
        हिंदी
      </button>
    </div>
  );
}
```

### Translation Keys Structure

```json
{
  "nav": { "home": "Home", "about": "About" },
  "hero": { "title": "Welcome", "subtitle": "Community" },
  "footer": { "contact": "Contact Us" },
  "auth": { "login": "Login", "register": "Register" },
  "matrimony": { "create": "Create Profile" }
}
```

---

## Design System

### Color Palette

```css
--royal-blue: #3A6EA5;      /* Primary */
--sandstone: #D9C3A1;        /* Secondary */
--terracotta: #C66A2B;       /* Accent */
--cream: #FFF8F0;            /* Background */
--charcoal: #2F2F2F;         /* Text */
```

### Typography

```css
font-family: 'Playfair Display', serif;  /* Headings */
font-family: 'Inter', sans-serif;        /* Body */
```

### Component Variants

**Button:**
- `primary` - Blue background
- `secondary` - Sandstone background
- `outline` - Border only
- `ghost` - Transparent

**Card:**
- `elevated` - Shadow
- `flat` - No shadow
- `bordered` - Border only

**Alert:**
- `success` - Green
- `error` - Red
- `warning` - Yellow
- `info` - Blue

### Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large */
2xl: 1536px /* 2X large */
```

---

## Key Features & Implementation

### 1. Multi-Profile Support

Users can create multiple matrimony profiles:
- Each profile requires individual payment (non-members)
- Each profile requires admin approval
- Users can hide/unhide profiles
- Profiles have individual `isPaid` status

### 2. Automatic Profile Cleanup

**Cron Job** (runs daily at 2 AM):
```typescript
cron.schedule('0 2 * * *', async () => {
  const profiles = await MatrimonyProfile.find({
    scheduledDeletion: { $lte: new Date() }
  });
  
  for (const profile of profiles) {
    // Delete photos from Cloudinary
    for (const photo of profile.photos) {
      await cloudinary.uploader.destroy(photo.publicId);
    }
    // Delete profile from database
    await profile.deleteOne();
  }
});
```

### 3. Folder-Based Upload Permissions

```typescript
const folderPermissions = {
  matrimony: ['user', 'admin'],
  profiles: ['user', 'admin'],
  gallery: ['admin'],
  events: ['admin']
};
```

### 4. Rate Limiting

```typescript
// Auth routes: 10 requests per 15 minutes
authLimiter: rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10
});

// OTP requests: 3 per 15 minutes
otpLimiter: rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3
});
```

### 5. Form Validation

**Zod Schema Example:**
```typescript
const matrimonySchema = z.object({
  fullName: z.string().min(2),
  dateOfBirth: z.date(),
  gender: z.enum(['male', 'female', 'other']),
  phone: z.string().regex(/^[0-9]{10}$/),
  email: z.string().email()
});
```

---

## Performance Optimizations

### Frontend

1. **Code Splitting:** Lazy load routes with React.lazy
2. **Image Optimization:** Cloudinary transformations
3. **Debouncing:** Search inputs debounced (300ms)
4. **Memoization:** React.memo for expensive components
5. **Bundle Size:** Tree-shake unused code

### Backend

1. **Database Indexing:** Indexes on frequently queried fields
2. **Query Optimization:** Select only required fields
3. **Caching:** Consider Redis for frequently accessed data (future)
4. **Connection Pooling:** MongoDB connection pooling enabled
5. **Compression:** gzip compression for responses

---

## Security Measures

1. **Password Hashing:** bcrypt with salt rounds
2. **JWT Secret:** Strong, environment-specific secret
3. **CORS:** Restricted origins
4. **Rate Limiting:** Prevents brute force attacks
5. **Input Validation:** All inputs validated with Joi/Zod
6. **SQL Injection:** Prevented by Mongoose ODM
7. **XSS Protection:** React escapes by default
8. **HTTPS:** Enforced in production

---

## Testing Strategy

### Backend Testing

```bash
# Unit tests
npm test

# Integration tests
npm run test:integration

# Coverage
npm run test:coverage
```

### Frontend Testing

```bash
# Component tests
npm test

# E2E tests (Playwright)
npm run test:e2e
```

### Manual Testing Checklist

- [ ] User registration flow
- [ ] OTP verification
- [ ] Google OAuth login
- [ ] Membership payment
- [ ] Matrimony profile creation
- [ ] Image upload
- [ ] Admin approval workflow
- [ ] Mobile responsiveness
- [ ] Cross-browser compatibility

---

## Future Enhancements

### Phase 1 (Completed)
- ✅ Authentication system
- ✅ Membership management
- ✅ Matrimony platform
- ✅ Admin panel
- ✅ Payment integration
- ✅ Image upload
- ✅ Internationalization

### Phase 2 (Planned)
- [ ] In-app notifications
- [ ] Chat/messaging system
- [ ] Advanced search filters
- [ ] Event RSVP system
- [ ] Member directory
- [ ] Blog/news section
- [ ] Mobile app (React Native)

### Phase 3 (Future)
- [ ] AI-powered match suggestions
- [ ] Video profiles
- [ ] Live streaming events
- [ ] Payment analytics
- [ ] WhatsApp integration

---

## Contributing Guidelines

### Code Style

- **TypeScript:** Strict mode enabled
- **ESLint:** Follow project rules
- **Prettier:** Auto-format on save
- **Naming:** camelCase for variables, PascalCase for components

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Commit with descriptive message
git commit -m "feat: add matrimony search filters"

# Push and create PR
git push origin feature/your-feature-name
```

### Commit Messages

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructure
- `test:` Tests
- `chore:` Maintenance

---

## Glossary

| Term | Definition |
|------|------------|
| **Matrimony Profile** | User's marriage bio/resume on the platform |
| **Paid Member** | User who paid ₹7,000 lifetime membership |
| **Approved User** | User approved by admin after registration |
| **OAuth** | Open Authorization (Google login) |
| **JWT** | JSON Web Token (authentication) |
| **OTP** | One-Time Password (email verification) |
| **Razorpay** | Payment gateway provider |
| **Cloudinary** | Image hosting and CDN service |
| **Mailgun** | Transactional email service |
| **i18n** | Internationalization (multi-language support) |
| **Cron Job** | Scheduled background task |

---

**Document Version:** 2.0  
**Last Updated:** December 28, 2025  
**Maintained By:** Development Team

For additional information or clarification, refer to inline code comments or contact the development team.

