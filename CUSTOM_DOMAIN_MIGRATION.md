# Custom Domain Migration Guide

## Summary of Changes

Successfully migrated from GitHub Pages subdirectory (`https://chaimat.github.io/bluecity-jodhpur/`) to custom domain (`mybluecity.com`).

## Files Modified

### 1. Configuration Files
- **`frontend/vite.config.ts`**: Changed `base: '/bluecity-jodhpur/'` to `base: '/'`
- **`frontend/src/App.tsx`**: Removed `basename="/bluecity-jodhpur"` from BrowserRouter
- **`frontend/index.html`**: Updated favicon path from `/bluecity-jodhpur/bluecity_logo_nobg.png` to `/bluecity_logo_nobg.png`

### 2. Component Files
- **`frontend/src/components/Stories.tsx`**: Updated video paths
  - Changed `/bluecity-jodhpur/our_stories/story1.mp4` → `/our_stories/story1.mp4`
  - Changed `/bluecity-jodhpur/our_stories/story2.mp4` → `/our_stories/story2.mp4`

- **`frontend/src/pages/about/OurHistory.tsx`**: Updated all Marwar history image paths
  - Changed all `/bluecity-jodhpur/marwar_history/*` → `/marwar_history/*`

### 3. Locale Files
- **`frontend/src/i18n/locales/en.json`**: Updated all management team image paths
- **`frontend/src/i18n/locales/hi.json`**: Updated all management team image paths
  - Changed all `/bluecity-jodhpur/management_team/*` → `/management_team/*`

### 4. Domain Configuration
- **`frontend/public/CNAME`**: Created file with custom domain `mybluecity.com`

## Files Using BASE_URL (Already Correct)

The following files already use `${import.meta.env.BASE_URL}` which automatically adjusts with the vite config:
- `frontend/src/components/Navbar.tsx` (logo)
- `frontend/src/components/Hero.tsx` (uses import)
- `frontend/src/components/About.tsx` (uses import)
- `frontend/src/pages/activities/SocialWork.tsx`
- `frontend/src/pages/gallery/SocialWorkGallery.tsx`
- `frontend/src/pages/gallery/CommunityGallery.tsx`
- `frontend/src/pages/gallery/PressCoverage.tsx`

## Next Steps for Deployment

### 1. DNS Configuration
Configure your DNS records for `mybluecity.com`:

**Option A: Apex Domain (mybluecity.com)**
```
Type: A
Name: @
Value: 185.199.108.153
```
```
Type: A
Name: @
Value: 185.199.109.153
```
```
Type: A
Name: @
Value: 185.199.110.153
```
```
Type: A
Name: @
Value: 185.199.111.153
```

**Option B: Subdomain (www.mybluecity.com)**
```
Type: CNAME
Name: www
Value: chaimat.github.io
```

### 2. Build and Deploy
```bash
cd frontend
npm run build
npm run deploy
```

### 3. GitHub Repository Settings
1. Go to your repository: `https://github.com/chaimat/bluecity-jodhpur`
2. Navigate to **Settings** → **Pages**
3. Under "Custom domain", enter: `mybluecity.com`
4. Click **Save**
5. Wait for DNS check to complete (may take a few minutes)
6. Enable **Enforce HTTPS** (recommended)

### 4. Verification
After deployment and DNS propagation (can take 24-48 hours):
- Visit `mybluecity.com` - should load your site
- Check all routes work correctly (no 404s)
- Verify all images and videos load properly
- Test both English and Hindi/Marwari languages
- Test navigation between all pages

## Rollback Instructions

If you need to rollback to GitHub Pages subdirectory:

1. **Revert vite.config.ts**:
   ```typescript
   base: '/bluecity-jodhpur/',
   ```

2. **Revert App.tsx**:
   ```typescript
   <BrowserRouter basename="/bluecity-jodhpur">
   ```

3. **Delete CNAME file**:
   ```bash
   rm frontend/public/CNAME
   ```

4. **Run global find-replace**:
   - Find: `"/management_team/`
   - Replace: `"/bluecity-jodhpur/management_team/`
   
   - Find: `"/marwar_history/`
   - Replace: `"/bluecity-jodhpur/marwar_history/`
   
   - Find: `"/our_stories/`
   - Replace: `"/bluecity-jodhpur/our_stories/`
   
   - Find: `href="/bluecity_logo_nobg.png"`
   - Replace: `href="/bluecity-jodhpur/bluecity_logo_nobg.png"`

## Testing Locally

Before deploying, test locally:

```bash
cd frontend
npm run build
npm run preview
```

Visit `http://localhost:4173` and verify:
- All pages load correctly
- All images display properly
- All videos play correctly
- Navigation works as expected
- Both language versions work

## Important Notes

1. **DNS Propagation**: DNS changes can take 24-48 hours to propagate globally
2. **HTTPS**: GitHub Pages automatically provisions SSL certificates for custom domains
3. **WWW vs Non-WWW**: Decide if you want to use `www.mybluecity.com` or `mybluecity.com` (or both with redirect)
4. **Email Records**: If you plan to use email with this domain, ensure you don't override existing MX records
5. **Backup**: Keep a backup of your current deployed site until you verify the new domain works correctly

## Verification Checklist

- [ ] DNS records configured correctly
- [ ] CNAME file exists in `frontend/public/CNAME`
- [ ] Build completes without errors
- [ ] Local preview works correctly
- [ ] All images load in local preview
- [ ] All videos play in local preview
- [ ] Deployed to GitHub Pages
- [ ] Custom domain configured in GitHub settings
- [ ] DNS check passed in GitHub Pages settings
- [ ] HTTPS enabled
- [ ] Website accessible via custom domain
- [ ] All routes work (test each page)
- [ ] All media loads correctly on live site
- [ ] Both languages work correctly

## Support

If you encounter issues:
1. Check GitHub Pages deployment logs
2. Verify DNS configuration with `dig mybluecity.com` or online tools
3. Clear browser cache and test in incognito mode
4. Check browser console for any 404 errors
5. Ensure CNAME file is present in the deployed `dist` folder

---

**Migration completed successfully on:** January 18, 2026
**All path references verified:** ✅ No remaining `/bluecity-jodhpur/` references found
