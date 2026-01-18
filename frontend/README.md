# Blue City Parivar - Frontend

Modern React static website for the Blue City Parivar community, built with Vite, TypeScript, and Tailwind CSS. Deployed on GitHub Pages.

## 🏗️ Architecture Overview

This is a **static informational website** with no backend connection. It's built with a clean, modular architecture focused on performance, accessibility, and bilingual content delivery.

### Core Philosophy

**Component-Driven Development** - Reusable, composable components organized by function  
**Type Safety First** - TypeScript throughout for better developer experience  
**Performance-Conscious** - Lazy loading, code splitting, and mobile optimization  
**Content-First Design** - Minimal card usage, clean borders, elegant simplicity  
**Bilingual by Default** - Full i18n support with English and Hindi  
**Static & Fast** - No backend dependencies, blazing-fast page loads

## 📂 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base components (Button, Card, Input, etc.)
│   ├── layout/          # Layout components (Layout)
│   ├── common/          # Shared components (PageHero)
│   ├── Navbar.tsx       # Site navigation with language toggle
│   ├── Footer.tsx       # Site footer with links
│   ├── Hero.tsx         # Landing page hero section
│   ├── About.tsx        # About section preview
│   ├── Events.tsx       # Events section preview
│   ├── Gallery.tsx      # Gallery section preview
│   └── Stories.tsx      # Video testimonials
│
├── pages/               # Page components
│   ├── Home.tsx         # Landing page
│   ├── Contact.tsx      # Contact form (EmailJS)
│   ├── about/           # About section pages
│   │   ├── WhoWeAre.tsx
│   │   ├── OurMission.tsx
│   │   ├── Leadership.tsx
│   │   ├── JoinCommunity.tsx
│   │   └── OurHistory.tsx
│   ├── activities/      # Activities pages
│   │   ├── SocialWork.tsx
│   │   ├── CommunityGatherings.tsx
│   │   └── MediaFootprint.tsx
│   ├── help/            # Help & support pages
│   │   ├── EducationalHelp.tsx
│   │   ├── HealthcareHelp.tsx
│   │   ├── BusinessSupport.tsx
│   │   └── LegalAssistance.tsx
│   ├── gallery/         # Gallery pages
│   │   ├── SocialWorkGallery.tsx
│   │   ├── CommunityGallery.tsx
│   │   └── PressCoverage.tsx
│   └── NotFound.tsx     # 404 page
│
├── hooks/               # Custom React hooks
│   ├── useInView.ts              # Intersection Observer for lazy loading
│   ├── usePerformance.ts         # Performance optimization utilities
│   └── useScrollToTop.ts         # Auto-scroll on route change
│
├── utils/               # Utility functions
│   ├── validators.ts    # Zod schemas for form validation
│   ├── constants.ts     # App-wide constants
│   ├── helpers.ts       # Helper functions
│   └── formatters.ts    # Date, phone formatters
│
├── i18n/                # Internationalization
│   ├── config.ts        # i18next configuration
│   └── locales/
│       ├── en.json      # English translations
│       └── hi.json      # Hindi translations
│
├── App.tsx              # Root component with routing
├── main.tsx             # Application entry point
└── index.css            # Global styles and Tailwind directives
```

## 🌐 Available Pages

### Main Navigation
All pages are static content with no backend connection:

**Home (`/`)**
- Hero section with community introduction
- About preview
- Events preview
- Gallery preview
- Video testimonials
- Call to action

**About (`/about/*`)**
- `/about/who-we-are` - Community introduction
- `/about/objectives` - Community objectives and mission
- `/about/leadership` - Management team with photos
- `/about/history` - Marwar heritage and historical background
- `/about/join` - How to join the community

**Activities (`/activities/*`)**
- `/activities/social-work` - Social welfare initiatives
- `/activities/community-gatherings` - Community events and gatherings
- `/activities/media-footprint` - Media coverage and press

**Gallery (`/gallery/*`)**
- `/gallery/social-work` - Social work photo gallery
- `/gallery/community-gatherings` - Community event photos
- `/gallery/press-coverage` - Press and media photos

**Help (`/help/*`)**
- `/help/educational` - Educational assistance information
- `/help/healthcare` - Healthcare support services
- `/help/business` - Business support and networking
- `/help/legal` - Legal assistance information

**Contact (`/contact`)**
- Contact form powered by EmailJS (no backend needed)

## 🎯 Key Features

### 1. Internationalization (i18n)

**Technology:** React-i18next  
**Languages:** English (default), Hindi

```typescript
// Usage in components
import { useTranslation } from 'react-i18next';

function Component() {
  const { t, i18n } = useTranslation();
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <button onClick={() => i18n.changeLanguage('hi')}>हिंदी</button>
    </div>
  );
}
```

**Features:**
- Auto-detection based on browser locale
- Persistent language preference in localStorage
- Dynamic language switching without page reload
- Fallback to English for missing translations
- Organized translation keys by feature/page

**Translation Structure:**
```json
{
  "nav": { "home": "Home", "about": "About" },
  "hero": { "title": "Welcome to Blue City Parivar" },
  "footer": { "contact": "Contact Us" }
}
```

All content is fully translated in both `en.json` and `hi.json` files.

### 2. Performance Optimization

**Custom Hooks** (`hooks/usePerformance.ts`):

```typescript
// Detect user preference for reduced motion
const prefersReducedMotion = usePrefersReducedMotion();

// Detect if device is mobile
const isMobile = useIsMobile();

// Get optimized animation config
const { duration, delay, enableComplexAnimations } = useAnimationConfig();

// Detect low-performance devices
const isLowPerf = useLowPerformance();
```

**Optimization Strategies:**
- **Lazy Loading:** Images and route components load on demand
- **Reduced Motion:** Respects `prefers-reduced-motion` media query
- **Mobile Adjustments:** Shorter animations, fewer transitions on mobile
- **Code Splitting:** Automatic route-based splitting via Vite
- **Network Detection:** Adapts to slow connections (2G/3G)
- **Performance Budget:** Minimal dependencies, optimized bundle size

**Example:**
```typescript
const animationConfig = useAnimationConfig();

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: animationConfig.duration }}
>
  Content
</motion.div>
```

### 3. Routing Architecture

**Technology:** React Router v7  
**Strategy:** Declarative routing with nested routes

```typescript
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* Home */}
      <Route index element={<Home />} />
      
      {/* About Pages */}
      <Route path="about/who-we-are" element={<WhoWeAre />} />
      <Route path="about/objectives" element={<OurMission />} />
      <Route path="about/leadership" element={<Leadership />} />
      <Route path="about/history" element={<OurHistory />} />
      <Route path="about/join" element={<JoinCommunity />} />
      
      {/* Activities Pages */}
      <Route path="activities/social-work" element={<SocialWork />} />
      <Route path="activities/community-gatherings" element={<CommunityGatherings />} />
      <Route path="activities/media-footprint" element={<MediaFootprint />} />
      
      {/* Gallery Pages */}
      <Route path="gallery/social-work" element={<SocialWorkGallery />} />
      <Route path="gallery/community-gatherings" element={<CommunityGallery />} />
      <Route path="gallery/press-coverage" element={<PressCoverage />} />
      
      {/* Help Pages */}
      <Route path="help/educational" element={<EducationalHelp />} />
      <Route path="help/healthcare" element={<HealthcareHelp />} />
      <Route path="help/business" element={<BusinessSupport />} />
      <Route path="help/legal" element={<LegalAssistance />} />
      
      {/* Contact */}
      <Route path="contact" element={<Contact />} />
      
      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
</BrowserRouter>
```

**Features:**
- Nested route configuration
- Route-based code splitting
- Automatic scroll to top on navigation
- 404 fallback page
- GitHub Pages compatible routing

### 4. Contact Form (EmailJS)

**Technology:** EmailJS - No backend required!

```typescript
import emailjs from '@emailjs/browser';

const sendEmail = (formData) => {
  emailjs.send(
    import.meta.env.VITE_EMAILJS_SERVICE_ID,
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    {
      from_name: formData.name,
      from_email: formData.email,
      from_phone: formData.phone,
      subject: formData.subject,
      message: formData.message,
      to_email: 'bluecityahmedabad@gmail.com'
    },
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  );
};
```

**Features:**
- Direct email sending from client side
- No backend server required
- Gmail integration
- Form validation with Zod
- Success/error notifications
- Free tier: 200 emails/month

**Setup:**
See [EMAILJS_SETUP.md](../EMAILJS_SETUP.md) for configuration details.

### 5. Form Validation

**Technology:** React Hook Form + Zod

**Example:**
```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema } from '@/utils/validators';

const {
  register,
  handleSubmit,
  formState: { errors }
} = useForm({
  resolver: zodResolver(contactFormSchema)
});
```

**Validation Schemas (`utils/validators.ts`):**
```typescript
export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().regex(/^[0-9]{10}$/, 'Phone must be 10 digits'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters')
});
```

### 6. Design System & UI Components

**Design Philosophy:**
- **Minimal card usage** - Cards only for tables, forms, and key highlighted content
- **Content-first** - Clean borders and spacing over decorative containers
- **Inline icons** - Icons integrated with headings, not in separate containers
- **Responsive by default** - Mobile-first approach
- **Consistent spacing** - Tailwind spacing scale (4, 6, 8, 12, 16, 24, 32)
- **Blue City theme** - Brand colors throughout

**Component Library (`components/ui/`):**
- **Button** - Multiple variants (primary, secondary, outline, ghost)
- **Card** - Elevation and border styles
- **Input** - Text, email, password, number inputs
- **Select** - Dropdown select
- **Textarea** - Multi-line text input
- **Alert** - Success, error, warning, info alerts
- **Spinner** - Loading indicator

**Common Components (`components/common/`):**
- **PageHero** - Consistent page headers with background images
- **Layout** - Main layout wrapper with navbar and footer

### 7. Static Assets

All media stored in `public/` directory:

```
public/
├── management_team/       # Leadership photos
│   ├── m_m_singhi_3.jpeg
│   ├── rajendra_agarwal.jpeg
│   ├── manish_jain.jpeg
│   └── ... (more team photos)
│
├── marwar_history/        # Historical images
│   ├── mehrangarh_fort.jpeg
│   ├── jodhpur_city.jpeg
│   └── ... (historical photos)
│
├── social_work_images/media/    # Social work photos
├── community_gettogether_images/media/  # Event photos
├── media_footprint_images/media/        # Press photos
│
├── our_stories/           # Video testimonials
│   ├── story1.mp4
│   └── story2.mp4
│
└── bluecity_logo_nobg.png # Logo
```

## 🎨 Styling & Theming

**Tailwind CSS Configuration:**
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        'blue-city': {
          primary: '#3A6EA5',    // Royal blue
          accent: '#D9C3A1',     // Sandstone
          terracotta: '#C66A2B', // Accent
          cream: '#FFF8F0',      // Background
          charcoal: '#2F2F2F'    // Text
        }
      }
    }
  }
}
```

**Custom Utilities:**
```css
/* index.css */
@layer utilities {
  .gradient-blue-city {
    @apply bg-gradient-to-r from-blue-city-primary to-blue-city-accent;
  }
}
```

## 🧪 Development Workflow

### Run Development Server
```bash
npm run dev
# http://localhost:5173
```

### Build for Production
```bash
npm run build
# Outputs to dist/
```

### Preview Production Build
```bash
npm run preview
# http://localhost:4173
```

### Linting
```bash
npm run lint
```

### Deploy to GitHub Pages
```bash
npm run deploy
```

## 🔌 Environment Variables

Create `.env` in frontend root:

```env
# EmailJS (Contact Form)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
```

No other environment variables needed - this is a static site!

## 📦 Dependencies

### Core
- **react** (19.2.0) - UI library
- **react-dom** (19.2.0) - React DOM renderer
- **react-router-dom** (7.9.6) - Client-side routing
- **typescript** (5.9.3) - Type safety

### Forms & Validation
- **react-hook-form** (7.66.1) - Form handling
- **zod** (4.1.12) - Schema validation
- **@hookform/resolvers** (5.2.2) - Zod resolver for react-hook-form

### UI & Animation
- **framer-motion** (12.23.24) - Smooth animations
- **lucide-react** (0.562.0) - Icon library
- **tailwindcss** (3.4.18) - Utility-first CSS

### Internationalization
- **i18next** (25.7.3) - i18n core
- **react-i18next** (16.5.0) - React bindings
- **i18next-browser-languagedetector** (8.2.0) - Language detection

### External Services
- **@emailjs/browser** (4.4.1) - Contact form emails (no backend needed)

### Build Tools
- **vite** (7.2.2) - Build tool and dev server
- **@vitejs/plugin-react** (5.1.0) - React plugin for Vite

## 🚀 Build Optimization

Vite automatically provides:
- **Code splitting** - Separate chunks for routes
- **Tree shaking** - Remove unused code
- **Minification** - Compressed production builds
- **Asset optimization** - Image and font optimization
- **Modern ESM** - Fast native ES modules

## 📱 Responsive Design

**Breakpoints:**
- **sm:** 640px (small phones)
- **md:** 768px (tablets)
- **lg:** 1024px (laptops)
- **xl:** 1280px (desktops)
- **2xl:** 1536px (large screens)

**Mobile-First Approach:**
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## 🌐 Deployment

Deployed on **GitHub Pages** as a static website:
- Custom domain: `mybluecity.com`
- Automatic HTTPS
- CDN delivery
- Automated deployment via GitHub Actions

## 📖 Further Reading

- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)
- [i18next Documentation](https://www.i18next.com)
- [Framer Motion Documentation](https://www.framer.com/motion)
- [EmailJS Documentation](https://www.emailjs.com/docs/)

---

**Maintained By:** Blue City Parivar Development Team  
**Version:** 2.0  
**Last Updated:** January 18, 2026
