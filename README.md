# Blue City Parivar

A community website for Jodhpur natives living in Ahmedabad. This is a static informational website showcasing community history, activities, leadership, and engagement.

[![Deploy Frontend to GitHub Pages](https://github.com/chaimat/bluecity-jodhpur/actions/workflows/deploy.yml/badge.svg)](https://github.com/chaimat/bluecity-jodhpur/actions/workflows/deploy.yml)

**Live Site:** [mybluecity.com](https://mybluecity.com)

## 🎯 Overview

Blue City Parivar is a static website built with React, showcasing the Marwari community from Jodhpur residing in Ahmedabad. The website provides information about:

- **Community History** - Marwar heritage and cultural background
- **Leadership Team** - Management committee members
- **Activities** - Social work, community gatherings, and media presence
- **Gallery** - Photo galleries of community events
- **Help Services** - Educational, healthcare, business, and legal assistance information
- **Contact** - Contact form powered by EmailJS
- **Bilingual Support** - Full English and Hindi translations

## 🏗️ Architecture

This is a **static frontend website** deployed on **GitHub Pages**. There is no backend or database connection.

```
bluecity/
├── frontend/          # React + Vite + TypeScript
└── .github/
    └── workflows/
        └── deploy.yml # Automated deployment to GitHub Pages
```

## 🚀 Tech Stack

- **React 19** with TypeScript
- **Vite** for blazing-fast builds
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for routing
- **i18next** for internationalization
- **EmailJS** for contact form (no backend required)
- **Google Analytics 4** for website analytics and tracking

## 📦 Quick Start

### Prerequisites
- Node.js 18+ and npm 9+
- Git

### Installation

```bash
# Clone repository
git clone git@github-personal:chaimat/bluecity-jodhpur.git
cd bluecity-jodhpur

# Install frontend dependencies
cd frontend
npm install
```

### Environment Setup

Create `frontend/.env`:
```env
# EmailJS (Contact Form - no backend needed)
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key

# Google Analytics 4 (Optional - for tracking website analytics)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

> 📊 **Google Analytics Setup:** See [GOOGLE_ANALYTICS_SETUP.md](./GOOGLE_ANALYTICS_SETUP.md) for detailed instructions on setting up and using Google Analytics 4.

### Run Development Server

```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

## 🌐 Available Pages

### Main Navigation
- **Home** - Landing page with hero section and community introduction
- **About** - Community information and history
  - Who We Are
  - Our Objectives
  - Leadership Team
  - Marwar History
  - Join Our Community
- **Activities** - Community initiatives
  - Social Work
  - Community Gatherings
  - Media Footprint
- **Gallery** - Photo galleries of events
  - Social Work Gallery
  - Community Gatherings Gallery
  - Press Coverage
- **Help** - Support services offered
  - Educational Help
  - Healthcare Help
  - Business Support
  - Legal Assistance
- **Contact** - Contact form

## 🔧 Key Features

### EmailJS Integration
Contact form submissions are handled by EmailJS directly from the frontend without requiring a backend server.

**Configuration:**
- Service connected to Gmail (bluecityahmedabad@gmail.com)
- Free tier: 200 emails/month
- Fully client-side implementation
- Setup guide: See [EMAILJS_SETUP.md](EMAILJS_SETUP.md)

### Custom Domain
The site uses a custom domain `mybluecity.com` configured via:
- CNAME file in `frontend/public/CNAME`
- DNS A records pointing to GitHub Pages IPs
- Automatic HTTPS provisioning
- Migration guide: See [CUSTOM_DOMAIN_MIGRATION.md](CUSTOM_DOMAIN_MIGRATION.md)

### GitHub Actions Deployment
Automated deployment configured in `.github/workflows/deploy.yml`:
- Triggers on push to `main` branch (only when `frontend/` changes)
- Builds frontend with environment variables from GitHub repository variables
- Deploys to GitHub Pages automatically
- Variables required: `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`

**To set GitHub Actions variables:**
1. Go to repository **Settings** → **Secrets and variables** → **Actions**
2. Click on **Variables** tab
3. Add repository variables for EmailJS credentials

### Internationalization
Full bilingual support powered by i18next:
- **English** (default)
- **Hindi** translations
- Auto-detection based on browser locale
- Persistent language preference in localStorage
- Toggle available in navbar

### Performance Optimization
- Lazy loading for images and route components
- Responsive design optimized for mobile devices
- Reduced motion support for accessibility
- Optimized animations based on device capabilities
- Code splitting for faster initial load

## 📂 Project Structure

```
frontend/
├── src/
│   ├── components/      # Reusable UI components (Navbar, Footer, Hero, etc.)
│   ├── pages/           # Page components (Home, About pages, Activities, Help, Gallery, Contact)
│   ├── hooks/           # Custom React hooks (performance, scroll)
│   ├── utils/           # Utility functions and validators
│   └── i18n/            # Internationalization (en.json, hi.json)
└── public/              # Static assets (images, videos, documents)
    ├── management_team/ # Leadership photos
    ├── marwar_history/  # Historical images
    ├── social_work_images/
    ├── community_gettogether_images/
    ├── media_footprint_images/
    └── our_stories/     # Video testimonials
```

## 🎨 Design Philosophy

The website follows a clean, content-first design approach:
- **Minimal card usage** - Cards only where they add value
- **Clean borders** - Border-top dividers between sections
- **Inline icons** - Icons integrated with headings
- **Responsive layout** - Mobile-first design
- **Blue City theme** - Brand colors (blue-city-primary, blue-city-accent)
- **Elevated but simple** - Professional without over-decoration

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)
The site automatically deploys when you push changes to the `main` branch:

```bash
git add .
git commit -m "Update content"
git push origin main
# GitHub Actions automatically builds and deploys
```

### Manual Deployment
```bash
cd frontend
npm run build
npm run deploy
```

### Monitoring Deployments
- View deployment status: https://github.com/chaimat/bluecity-jodhpur/actions
- Each push triggers the "Deploy Frontend to GitHub Pages" workflow
- Green checkmark indicates successful deployment

## 📖 Documentation

- **[frontend/README.md](frontend/README.md)** - Frontend architecture and implementation details
- **[EMAILJS_SETUP.md](EMAILJS_SETUP.md)** - EmailJS configuration for contact form
- **[CUSTOM_DOMAIN_MIGRATION.md](CUSTOM_DOMAIN_MIGRATION.md)** - Custom domain setup guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Detailed deployment instructions

## 🧪 Testing

```bash
cd frontend
npm run build
npm run preview
# Preview production build at http://localhost:4173
```

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit changes: `git commit -m "feat: add feature"`
3. Push to branch: `git push origin feature/your-feature`
4. Open a Pull Request

**Commit Convention:** Use conventional commits (feat, fix, docs, style, refactor, chore)

## 🌍 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 License

ISC License

## 👥 Maintained By

Development Team - Blue City Parivar  
Contact: bluecityahmedabad@gmail.com

---

**Version:** 2.0  
**Last Updated:** January 18, 2026
