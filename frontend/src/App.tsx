import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlertContainer } from './components/ui/Alert';
import { Spinner } from './components/ui/Spinner';
import { LanguageProvider } from './components/LanguageProvider';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ROUTES } from './utils/constants';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Festivals = lazy(() => import('./pages/Festivals').then((m) => ({ default: m.Festivals })));
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const JoinUs = lazy(() => import('./pages/JoinUs').then((m) => ({ default: m.JoinUs })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

// About subsection pages
const WhoWeAre = lazy(() => import('./pages/about/WhoWeAre').then((m) => ({ default: m.WhoWeAre })));
const ManagementTeam = lazy(() => import('./pages/about/ManagementTeam').then((m) => ({ default: m.ManagementTeam })));
const Vision = lazy(() => import('./pages/about/Vision').then((m) => ({ default: m.Vision })));
const Mission = lazy(() => import('./pages/about/Mission').then((m) => ({ default: m.Mission })));
const Objectives = lazy(() => import('./pages/about/Objectives').then((m) => ({ default: m.Objectives })));
const OurHistory = lazy(() => import('./pages/about/OurHistory').then((m) => ({ default: m.OurHistory })));

// Help subsection pages
const Medical = lazy(() => import('./pages/help/Medical').then((m) => ({ default: m.Medical })));
const Education = lazy(() => import('./pages/help/Education').then((m) => ({ default: m.Education })));
const GeneralHelp = lazy(() => import('./pages/help/GeneralHelp').then((m) => ({ default: m.GeneralHelp })));
const GeneralRules = lazy(() => import('./pages/help/GeneralRules').then((m) => ({ default: m.GeneralRules })));

// Activities subsection pages
const SocialWork = lazy(() => import('./pages/activities/SocialWork').then((m) => ({ default: m.SocialWork })));
const Cultural = lazy(() => import('./pages/activities/Cultural').then((m) => ({ default: m.Cultural })));
const GetTogether = lazy(() => import('./pages/activities/GetTogether').then((m) => ({ default: m.GetTogether })));

// Gallery pages
const SocialWorkGallery = lazy(() => import('./pages/gallery/SocialWorkGallery').then((m) => ({ default: m.SocialWorkGallery })));
const CommunityGallery = lazy(() => import('./pages/gallery/CommunityGallery').then((m) => ({ default: m.CommunityGallery })));
const PressCoverage = lazy(() => import('./pages/gallery/PressCoverage').then((m) => ({ default: m.PressCoverage })));

// Matrimony pages
const MatrimonyHome = lazy(() => import('./pages/matrimony/MatrimonyHome').then((m) => ({ default: m.MatrimonyHome })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-blue-city-background">
    <Spinner size="lg" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <LanguageProvider>
        <AlertContainer />
        <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.FESTIVALS} element={<Festivals />} />
          <Route path={ROUTES.GALLERY} element={<Gallery />} />

          {/* About Subsection Routes */}
          <Route path={ROUTES.ABOUT_WHO_WE_ARE} element={<WhoWeAre />} />
          <Route path={ROUTES.ABOUT_MANAGEMENT_TEAM} element={<ManagementTeam />} />
          <Route path={ROUTES.ABOUT_VISION} element={<Vision />} />
          <Route path={ROUTES.ABOUT_MISSION} element={<Mission />} />
          <Route path={ROUTES.ABOUT_OBJECTIVES} element={<Objectives />} />
          <Route path={ROUTES.ABOUT_HISTORY} element={<OurHistory />} />

          {/* Help Subsection Routes */}
          <Route path={ROUTES.HELP_MEDICAL} element={<Medical />} />
          <Route path={ROUTES.HELP_EDUCATION} element={<Education />} />
          <Route path={ROUTES.HELP_GENERAL} element={<GeneralHelp />} />
          <Route path={ROUTES.HELP_RULES} element={<GeneralRules />} />

          {/* Activities Subsection Routes */}
          <Route path={ROUTES.ACTIVITIES_SOCIAL_WORK} element={<SocialWork />} />
          <Route path={ROUTES.ACTIVITIES_CULTURAL} element={<Cultural />} />
          <Route path={ROUTES.ACTIVITIES_GET_TOGETHER} element={<GetTogether />} />

          {/* Gallery Routes */}
          <Route path={ROUTES.GALLERY_SOCIAL_WORK} element={<SocialWorkGallery />} />
          <Route path={ROUTES.GALLERY_COMMUNITY} element={<CommunityGallery />} />
          <Route path={ROUTES.GALLERY_PRESS} element={<PressCoverage />} />

          {/* Membership - Public */}
          <Route path={ROUTES.JOIN_US} element={<JoinUs />} />

          {/* Matrimony Routes */}
          <Route path={ROUTES.MATRIMONY} element={<MatrimonyHome />} />

          {/* 404 - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
