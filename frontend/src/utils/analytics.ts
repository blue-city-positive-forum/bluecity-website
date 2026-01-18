import ReactGA from 'react-ga4';

// Track if GA has been initialized to prevent double initialization
let isGAInitialized = false;

/**
 * Initialize Google Analytics
 * Should be called once when the app starts
 * 
 * DUPLICATE PREVENTION:
 * - Uses module-level flag to prevent double initialization
 * - React StrictMode safe: Second call is a no-op
 * - ReactGA.initialize is also internally idempotent
 */
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  // Prevent double initialization (important for React StrictMode in development)
  if (isGAInitialized) {
    if (import.meta.env.DEV) {
      console.log('Google Analytics already initialized, skipping...');
    }
    return;
  }
  
  if (measurementId) {
    ReactGA.initialize(measurementId, {
      gaOptions: {
        debug_mode: import.meta.env.DEV, // Enable debug mode in development
      },
    });
    isGAInitialized = true;
    if (import.meta.env.DEV) {
      console.log('Google Analytics initialized with ID:', measurementId);
    }
  } else {
    console.warn('Google Analytics Measurement ID not found. Analytics will not be tracked.');
  }
};

/**
 * Track page views
 * Call this on route changes
 */
export const trackPageView = (path: string, title?: string) => {
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    ReactGA.send({ 
      hitType: 'pageview', 
      page: path,
      title: title || document.title,
    });
    if (import.meta.env.DEV) {
      console.log('Page view tracked:', path);
    }
  }
};

/**
 * Track custom events
 * @param category - Event category (e.g., 'User', 'Navigation', 'Form')
 * @param action - Event action (e.g., 'Click', 'Submit', 'Download')
 * @param label - Optional event label for additional context
 * @param value - Optional numeric value
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
    if (import.meta.env.DEV) {
      console.log('Event tracked:', { category, action, label, value });
    }
  }
};

/**
 * Track custom events with GA4 format
 * @param eventName - Name of the event
 * @param eventParams - Event parameters as key-value pairs
 */
export const trackGA4Event = (eventName: string, eventParams?: Record<string, any>) => {
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    ReactGA.event(eventName, eventParams);
    if (import.meta.env.DEV) {
      console.log('GA4 Event tracked:', eventName, eventParams);
    }
  }
};

/**
 * Track outbound links
 */
export const trackOutboundLink = (url: string, label?: string) => {
  trackEvent('Outbound Link', 'Click', label || url);
};

/**
 * Track form submissions
 */
export const trackFormSubmission = (formName: string) => {
  trackGA4Event('form_submit', {
    form_name: formName,
  });
};

/**
 * Track button clicks
 */
export const trackButtonClick = (buttonName: string, location?: string) => {
  trackGA4Event('button_click', {
    button_name: buttonName,
    location: location,
  });
};

/**
 * Track user engagement events
 */
export const trackUserEngagement = (engagementType: string, details?: Record<string, any>) => {
  trackGA4Event('user_engagement', {
    engagement_type: engagementType,
    ...details,
  });
};
