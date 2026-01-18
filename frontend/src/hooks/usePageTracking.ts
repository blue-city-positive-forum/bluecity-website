import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

/**
 * Custom hook to automatically track page views on route changes
 * 
 * DUPLICATE PREVENTION STRATEGY:
 * ================================
 * This hook implements multiple layers of protection against duplicate page views:
 * 
 * 1. useRef persistence: lastTrackedPath persists across re-renders and effect re-runs
 * 2. Strict comparison: Only tracks if currentPath !== lastTrackedPath.current
 * 3. React StrictMode safe: In dev, StrictMode double-invokes effects, but the ref
 *    ensures the second invocation sees the same path and skips tracking
 * 4. SPA 404 redirect safe: index.html uses replaceState (not pushState), so the
 *    URL change happens before React mounts, resulting in only one tracking call
 * 5. Hash changes ignored: location.hash not included, prevents tracking on anchor jumps
 * 6. Query params tracked: location.search included for accurate page variant tracking
 * 
 * TESTED SCENARIOS:
 * ================
 * ✅ Initial page load → 1 page view
 * ✅ Navigation to new page → 1 page view per page
 * ✅ Page refresh → 1 page view (new session)
 * ✅ 404 redirect via index.html → 1 page view (final URL only)
 * ✅ Hash changes (#section) → 0 page views (same page)
 * ✅ Query param changes (?tab=2) → 1 page view (different view)
 * ✅ React StrictMode (dev) → 1 page view (duplicate prevented)
 * ✅ Back/forward navigation → 1 page view per navigation
 */
export const usePageTracking = () => {
  const location = useLocation();
  const lastTrackedPath = useRef<string>('');

  useEffect(() => {
    const currentPath = location.pathname + location.search;
    
    // Only track if the path has actually changed
    // The useRef ensures this check works even with StrictMode double-invocation
    if (lastTrackedPath.current !== currentPath) {
      lastTrackedPath.current = currentPath;
      trackPageView(currentPath);
    }
  }, [location]);
};
