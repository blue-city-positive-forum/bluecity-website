# Google Analytics 4 Setup Guide

## Overview

This project is now integrated with Google Analytics 4 (GA4) using the `react-ga4` library. The implementation includes automatic page view tracking and custom event tracking capabilities.

## 🚀 Quick Start

### 1. Get Your Google Analytics Measurement ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Create a new property (or use an existing one):
   - Click **Admin** (gear icon in bottom left)
   - Under **Property**, click **Create Property**
   - Fill in your website details
   - Choose **Web** as the platform
   - Enter your website URL
4. After creation, you'll see your **Measurement ID** (format: `G-XXXXXXXXXX`)
5. Copy this Measurement ID

### 2. Configure Your Environment

1. Create a `.env` file in the `frontend` directory (if it doesn't exist):
   ```bash
   cd frontend
   cp env.template .env
   ```

2. Open `.env` and add your Measurement ID:
   ```env
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### 3. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to your app

3. Open the browser's Developer Console (F12)

4. Look for console messages:
   - `Google Analytics initialized with ID: G-XXXXXXXXXX`
   - `Page view tracked: /`
   - When clicking the "Become Member" button: `GA4 Event tracked: button_click`

5. Verify in Google Analytics:
   - Go to **Reports** → **Realtime** in Google Analytics
   - You should see your active session
   - Navigate between pages to see page views

## 📊 What's Already Tracked

### Automatic Tracking

✅ **Page Views** - Every route change is automatically tracked
- Uses React Router's location changes
- Includes query parameters
- Logs the page path to console in development mode

### Test Event Tracking (Already Implemented)

✅ **Button Clicks on Home Page CTA**
- "Become Member" button click
- Tracks button name and location

✅ **Outbound Links**
- Instagram link clicks
- Tracks URL and source location

## 🛠️ How to Add More Event Tracking

### Available Tracking Functions

The project includes several utility functions in `src/utils/analytics.ts`:

#### 1. Track Button Clicks
```typescript
import { trackButtonClick } from '../utils/analytics';

<button onClick={() => trackButtonClick('Button Name', 'Page/Section')}>
  Click Me
</button>
```

#### 2. Track Form Submissions
```typescript
import { trackFormSubmission } from '../utils/analytics';

const handleSubmit = (data) => {
  trackFormSubmission('Contact Form');
  // ... your form logic
};
```

#### 3. Track Outbound Links
```typescript
import { trackOutboundLink } from '../utils/analytics';

<a 
  href="https://example.com" 
  onClick={() => trackOutboundLink('https://example.com', 'Description')}
>
  External Link
</a>
```

#### 4. Track Custom GA4 Events
```typescript
import { trackGA4Event } from '../utils/analytics';

trackGA4Event('video_play', {
  video_title: 'Introduction Video',
  video_duration: 120,
  page_location: 'Home'
});
```

#### 5. Track User Engagement
```typescript
import { trackUserEngagement } from '../utils/analytics';

trackUserEngagement('scroll', {
  scroll_depth: '75%',
  page: '/about'
});
```

### Example: Track Download Button

```typescript
import { trackGA4Event } from '../utils/analytics';

const handleDownload = (fileName: string) => {
  trackGA4Event('file_download', {
    file_name: fileName,
    file_type: 'pdf',
    page_location: window.location.pathname
  });
  
  // ... your download logic
};
```

### Example: Track Gallery Image Views

```typescript
import { trackGA4Event } from '../utils/analytics';

const handleImageClick = (imageTitle: string) => {
  trackGA4Event('image_view', {
    image_title: imageTitle,
    gallery_section: 'Social Work'
  });
};
```

## 📈 Recommended Events to Track

Based on your website structure, here are suggested events to track:

### High Priority
- **Membership Form Submissions** - Track when users submit the join us form
- **Contact Form Submissions** - Track contact form interactions
- **Gallery Image Views** - Track which gallery images users view
- **Festival Calendar Downloads** - Track calendar PDF downloads
- **Matrimony Profile Views** - Track profile interactions (if implemented)

### Medium Priority
- **Navigation Clicks** - Track main menu item clicks
- **Social Media Clicks** - Track all social media link clicks
- **Video Plays** - Track story video plays
- **Section Scroll** - Track how far users scroll on key pages

### Low Priority
- **Language Changes** - Track when users switch language
- **Search Actions** - If you add search functionality
- **Share Buttons** - If you add social sharing

## 🔍 Debugging

### Development Mode Features
- Console logs for all GA events (automatically enabled in development)
- Debug mode enabled in GA4 (set via `debug_mode` option)

### Check if GA is Working
```typescript
// Add this temporarily to any component
import ReactGA from 'react-ga4';

console.log('GA Initialized:', ReactGA.isInitialized);
```

### Common Issues

1. **Events not showing up**
   - Check that `.env` file has the correct Measurement ID
   - Verify the Measurement ID format: `G-XXXXXXXXXX`
   - Check browser console for error messages
   - Ad blockers may block GA - test in incognito mode

2. **Page views not tracking**
   - Ensure `usePageTracking` hook is called in `App.tsx`
   - Check that navigation is working correctly

3. **Custom events not working**
   - Verify you imported the tracking function correctly
   - Check console for event logs in development mode
   - Events may take 24-48 hours to appear in standard reports (use Realtime view for immediate testing)

## 🎯 Best Practices

### DO:
✅ Use descriptive event names (lowercase with underscores)
✅ Include context in event parameters
✅ Test events in Realtime view before deploying
✅ Document new events you add
✅ Use consistent naming conventions

### DON'T:
❌ Track Personally Identifiable Information (PII)
❌ Track sensitive data (passwords, payment info)
❌ Create too many similar events (consolidate when possible)
❌ Track on every tiny interaction (focus on meaningful actions)

## 📚 Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [react-ga4 GitHub](https://github.com/codler/react-ga4)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [GA4 Best Practices](https://support.google.com/analytics/answer/9267735)

## 🔐 Privacy Considerations

- Always comply with GDPR, CCPA, and local privacy laws
- Consider adding a cookie consent banner
- Review Google Analytics data retention settings
- Add a Privacy Policy page mentioning analytics usage
- Consider anonymizing IP addresses if required by your jurisdiction

## 📝 File Structure

```
frontend/src/
├── utils/
│   └── analytics.ts          # GA utility functions
├── hooks/
│   └── usePageTracking.ts    # Page view tracking hook
└── App.tsx                    # GA initialization
```

## 🚀 Deployment Checklist

Before deploying to production:

- [ ] Replace test Measurement ID with production ID
- [ ] Test all tracked events in staging environment
- [ ] Verify events appear in Google Analytics Realtime
- [ ] Remove or reduce console.log statements for production (currently logs only in dev mode)
- [ ] Add cookie consent if required
- [ ] Update Privacy Policy with GA usage
- [ ] Test with ad blockers disabled
- [ ] Set up Goals and Conversions in GA4 dashboard

## 💡 Next Steps

1. **Set up Goals in GA4**
   - Define conversion events (e.g., membership signup, contact form submission)
   - Create funnels for user journeys

2. **Create Custom Reports**
   - Build reports for specific metrics important to your organization
   - Set up automated email reports

3. **Monitor Regularly**
   - Check analytics weekly to understand user behavior
   - Adjust tracking based on insights
   - Optimize pages with low engagement

4. **Expand Tracking**
   - Add more custom events as needed
   - Track user demographics (age, location)
   - Implement enhanced e-commerce tracking if applicable

---

**Need Help?** Check the console for debug information or refer to the GA4 documentation linked above.
