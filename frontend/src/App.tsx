import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AlertContainer } from './components/ui/Alert';
import { Spinner } from './components/ui/Spinner';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { LanguageProvider } from './components/LanguageProvider';
import { ROUTES } from './utils/constants';

// Lazy load pages
const Home = lazy(() => import('./pages/Home').then((m) => ({ default: m.Home })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })));
const Events = lazy(() => import('./pages/Events').then((m) => ({ default: m.Events })));
const Gallery = lazy(() => import('./pages/Gallery').then((m) => ({ default: m.Gallery })));
const Login = lazy(() => import('./pages/Login').then((m) => ({ default: m.Login })));
const LoginSuccess = lazy(() => import('./pages/LoginSuccess').then((m) => ({ default: m.LoginSuccess })));
const LoginFail = lazy(() => import('./pages/LoginFail').then((m) => ({ default: m.LoginFail })));
const ResetPassword = lazy(() => import('./pages/ResetPassword').then((m) => ({ default: m.ResetPassword })));
const Account = lazy(() => import('./pages/Account').then((m) => ({ default: m.Account })));
const JoinUs = lazy(() => import('./pages/JoinUs').then((m) => ({ default: m.JoinUs })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

// About subsection pages
const WhoWeAre = lazy(() => import('./pages/about/WhoWeAre').then((m) => ({ default: m.WhoWeAre })));
const ManagementTeam = lazy(() => import('./pages/about/ManagementTeam').then((m) => ({ default: m.ManagementTeam })));
const Vision = lazy(() => import('./pages/about/Vision').then((m) => ({ default: m.Vision })));
const Mission = lazy(() => import('./pages/about/Mission').then((m) => ({ default: m.Mission })));
const Objectives = lazy(() => import('./pages/about/Objectives').then((m) => ({ default: m.Objectives })));

// Help subsection pages
const Medical = lazy(() => import('./pages/help/Medical').then((m) => ({ default: m.Medical })));
const Education = lazy(() => import('./pages/help/Education').then((m) => ({ default: m.Education })));
const GeneralHelp = lazy(() => import('./pages/help/GeneralHelp').then((m) => ({ default: m.GeneralHelp })));

// Activities subsection pages
const SocialWork = lazy(() => import('./pages/activities/SocialWork').then((m) => ({ default: m.SocialWork })));
const Cultural = lazy(() => import('./pages/activities/Cultural').then((m) => ({ default: m.Cultural })));
const GetTogether = lazy(() => import('./pages/activities/GetTogether').then((m) => ({ default: m.GetTogether })));

// Matrimony pages
const MatrimonyHome = lazy(() => import('./pages/matrimony/MatrimonyHome').then((m) => ({ default: m.MatrimonyHome })));
const MatrimonyList = lazy(() => import('./pages/matrimony/MatrimonyList').then((m) => ({ default: m.MatrimonyList })));
const MatrimonyCreate = lazy(() => import('./pages/matrimony/MatrimonyCreate').then((m) => ({ default: m.MatrimonyCreate })));
const MatrimonyEdit = lazy(() => import('./pages/matrimony/MatrimonyEdit').then((m) => ({ default: m.MatrimonyEdit })));
const MatrimonyProfile = lazy(() => import('./pages/matrimony/MatrimonyProfile').then((m) => ({ default: m.MatrimonyProfile })));

// Admin pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then((m) => ({ default: m.AdminDashboard })));
const UserManagement = lazy(() => import('./pages/admin/UserManagement').then((m) => ({ default: m.UserManagement })));
const MatrimonyManagement = lazy(() => import('./pages/admin/MatrimonyManagement').then((m) => ({ default: m.MatrimonyManagement })));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-blue-city-background">
    <Spinner size="lg" />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AlertContainer />
        <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.ABOUT} element={<About />} />
          <Route path={ROUTES.CONTACT} element={<Contact />} />
          <Route path={ROUTES.EVENTS} element={<Events />} />
          <Route path={ROUTES.GALLERY} element={<Gallery />} />

          {/* About Subsection Routes */}
          <Route path={ROUTES.ABOUT_WHO_WE_ARE} element={<WhoWeAre />} />
          <Route path={ROUTES.ABOUT_MANAGEMENT_TEAM} element={<ManagementTeam />} />
          <Route path={ROUTES.ABOUT_VISION} element={<Vision />} />
          <Route path={ROUTES.ABOUT_MISSION} element={<Mission />} />
          <Route path={ROUTES.ABOUT_OBJECTIVES} element={<Objectives />} />

          {/* Help Subsection Routes */}
          <Route path={ROUTES.HELP_MEDICAL} element={<Medical />} />
          <Route path={ROUTES.HELP_EDUCATION} element={<Education />} />
          <Route path={ROUTES.HELP_GENERAL} element={<GeneralHelp />} />

          {/* Activities Subsection Routes */}
          <Route path={ROUTES.ACTIVITIES_SOCIAL_WORK} element={<SocialWork />} />
          <Route path={ROUTES.ACTIVITIES_CULTURAL} element={<Cultural />} />
          <Route path={ROUTES.ACTIVITIES_GET_TOGETHER} element={<GetTogether />} />

          {/* Auth Routes */}
          <Route path={ROUTES.LOGIN} element={<Login />} />
          <Route path={ROUTES.LOGIN_SUCCESS} element={<LoginSuccess />} />
          <Route path={ROUTES.LOGIN_FAIL} element={<LoginFail />} />
          <Route path={ROUTES.RESET_PASSWORD} element={<ResetPassword />} />

          {/* Protected - Authenticated */}
          <Route
            path={ROUTES.ACCOUNT}
            element={
              <ProtectedRoute requireAuth>
                <Account />
              </ProtectedRoute>
            }
          />

          {/* Protected - Authenticated + Approved */}
          <Route
            path={ROUTES.JOIN_US}
            element={
              <ProtectedRoute requireAuth requireApproval>
                <JoinUs />
              </ProtectedRoute>
            }
          />

          {/* Matrimony Routes - Protected */}
          <Route path={ROUTES.MATRIMONY} element={<MatrimonyHome />} />
          <Route
            path={ROUTES.MATRIMONY_LIST}
            element={
              <ProtectedRoute requireAuth requireApproval>
                <MatrimonyList />
              </ProtectedRoute>
            }
          />
          <Route
            path={ROUTES.MATRIMONY_CREATE}
            element={
              <ProtectedRoute requireAuth requireApproval>
                <MatrimonyCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matrimony/edit/:id"
            element={
              <ProtectedRoute requireAuth requireApproval>
                <MatrimonyEdit />
              </ProtectedRoute>
            }
          />
          <Route
            path="/matrimony/profile/:id"
            element={
              <ProtectedRoute requireAuth requireApproval>
                <MatrimonyProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes - Protected */}
          <Route
            path={ROUTES.ADMIN}
            element={
              <ProtectedRoute requireAuth requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute requireAuth requireAdmin>
                <UserManagement />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/matrimonies"
            element={
              <ProtectedRoute requireAuth requireAdmin>
                <MatrimonyManagement />
              </ProtectedRoute>
            }
          />

          {/* 404 - Must be last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
