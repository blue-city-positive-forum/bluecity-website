import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/Button';
import { useAuth } from '../hooks/useAuth';
import { useAuthStore } from '../store/authStore';
import { ROUTES } from '../utils/constants';
import { trackGA4Event } from '../utils/analytics';

interface DropdownItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path?: string;
  dropdown?: DropdownItem[];
}

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin } = useAuth();
  const logout = useAuthStore((state) => state.logout);
  const { t, i18n } = useTranslation();

  const currentLanguage = i18n.language || 'en';

  const changeLanguage = (lang: string) => {
    if (lang !== currentLanguage) {
      trackGA4Event('language_change', {
        from_language: currentLanguage,
        to_language: lang,
        location: 'Navbar'
      });
      i18n.changeLanguage(lang);
    }
  };

  // Helper function to track navigation clicks
  const trackNavClick = (linkName: string, linkPath: string, isMobile: boolean = false) => {
    trackGA4Event('navigation_click', {
      link_name: linkName,
      link_path: linkPath,
      device_type: isMobile ? 'mobile' : 'desktop'
    });
  };

  const navItems: NavItem[] = [
    { name: t('nav.home'), path: ROUTES.HOME },
    {
      name: t('nav.about'),
      dropdown: [
        { name: t('about.whoWeAre'), path: ROUTES.ABOUT_WHO_WE_ARE },
        { name: t('about.managementTeam'), path: ROUTES.ABOUT_MANAGEMENT_TEAM },
        { name: t('about.objectives'), path: ROUTES.ABOUT_OBJECTIVES },
      ],
    },
    {
      name: t('nav.help'),
      dropdown: [
        { name: t('help.medical'), path: ROUTES.HELP_MEDICAL },
        { name: t('help.education'), path: ROUTES.HELP_EDUCATION },
        { name: t('help.generalHelp'), path: ROUTES.HELP_GENERAL },
        { name: t('help.rules'), path: ROUTES.HELP_RULES },
      ],
    },
    {
      name: t('nav.activities'),
      dropdown: [
        { name: t('activities.socialWork'), path: ROUTES.ACTIVITIES_SOCIAL_WORK },
        { name: t('activities.cultural'), path: ROUTES.ACTIVITIES_CULTURAL },
        { name: t('activities.getTogether'), path: ROUTES.ACTIVITIES_GET_TOGETHER },
      ],
    },
    {
      name: t('nav.gallery'),
      dropdown: [
        { name: t('gallery.socialWork'), path: ROUTES.GALLERY_SOCIAL_WORK },
        { name: t('gallery.community'), path: ROUTES.GALLERY_COMMUNITY },
        { name: t('gallery.press'), path: ROUTES.GALLERY_PRESS },
      ],
    },
    // { name: t('nav.joinUs'), path: ROUTES.JOIN_US }, // Hidden temporarily
    { name: t('nav.matrimony'), path: ROUTES.MATRIMONY },
    { name: t('nav.membership'), path: ROUTES.JOIN_US },
    { name: t('nav.contact'), path: ROUTES.CONTACT },
  ];

  const handleLogout = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  const toggleMobileDropdown = (name: string) => {
    setOpenMobileDropdown(openMobileDropdown === name ? null : name);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-soft">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <Link to={ROUTES.HOME} className="flex items-center gap-2">
              <img 
                src={`${import.meta.env.BASE_URL}bluecity_logo_nobg.png`}
                alt="Blue City Positive Forum Logo" 
                className="h-10 w-10 object-contain"
              />
              <h1 className="text-sm sm:text-base md:text-lg font-bold text-gradient whitespace-nowrap">Blue City Positive Forum</h1>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2 lg:space-x-4">
            {navItems.map((item) => (
              <div
                key={item.name}
                className="relative group"
                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {item.dropdown ? (
                  <>
                    <button className="text-sm text-blue-city-text hover:text-blue-city-primary transition-colors duration-300 font-medium flex items-center gap-0.5 py-2 px-0">
                      {item.name}
                      <svg
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          openDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 top-full mt-1 w-56 bg-white rounded-md shadow-xl py-2 border border-gray-200 z-50"
                        >
                          {item.dropdown.map((subItem, index) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              onClick={() => trackNavClick(subItem.name, subItem.path)}
                              className={`block px-5 py-3 text-sm text-blue-city-text hover:bg-blue-city-primary/10 hover:text-blue-city-primary transition-colors ${
                                index !== item.dropdown!.length - 1 ? 'border-b border-gray-100' : ''
                              }`}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path!}
                    onClick={() => trackNavClick(item.name, item.path!)}
                    className="text-sm text-blue-city-text hover:text-blue-city-primary transition-colors duration-300 font-medium px-0"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Language Toggle */}
            <div className="relative inline-flex items-center p-0.5 bg-blue-city-secondary/20 rounded-full">
              <button
                onClick={() => changeLanguage('en')}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                  currentLanguage === 'en'
                    ? 'bg-blue-city-primary text-white shadow-md'
                    : 'text-blue-city-text hover:text-blue-city-primary'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => changeLanguage('hi')}
                className={`px-2 py-0.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                  currentLanguage === 'hi'
                    ? 'bg-blue-city-primary text-white shadow-md'
                    : 'text-blue-city-text hover:text-blue-city-primary'
                }`}
              >
                हिं/मा
              </button>
            </div>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to={ROUTES.ADMIN}
                    className="text-sm text-blue-city-accent hover:text-blue-city-primary transition-colors duration-300 font-medium px-0"
                  >
                    {t('nav.admin')}
                  </Link>
                )}
                <Link to={ROUTES.ACCOUNT}>
                  <Button size="sm" variant="outline" className="px-2 py-1">
                    {t('nav.myAccount')}
                  </Button>
                </Link>
                <Button size="sm" variant="secondary" onClick={handleLogout} className="px-2 py-1">
                  {t('nav.logout')}
                </Button>
              </>
            ) : null /* Login button hidden temporarily */}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg text-blue-city-text hover:bg-blue-city-secondary/20 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden pb-4 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            {navItems.map((item) => (
              <div key={item.name} className="border-b border-gray-100 last:border-b-0">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => toggleMobileDropdown(item.name)}
                      className="w-full flex items-center justify-between py-3 text-blue-city-text hover:text-blue-city-primary transition-colors"
                    >
                      <span className="font-medium">{item.name}</span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${
                          openMobileDropdown === item.name ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {openMobileDropdown === item.name && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="pl-4 pb-2 bg-blue-city-secondary/10 rounded-lg mb-2"
                        >
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block py-2.5 px-3 text-sm text-gray-700 hover:text-blue-city-primary hover:bg-white/50 rounded transition-colors"
                              onClick={() => {
                                trackNavClick(subItem.name, subItem.path, true);
                                setIsOpen(false);
                                setOpenMobileDropdown(null);
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={item.path!}
                    className="block py-3 text-blue-city-text hover:text-blue-city-primary transition-colors font-medium"
                    onClick={() => {
                      trackNavClick(item.name, item.path!, true);
                      setIsOpen(false);
                    }}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}

            {/* Language Toggle for Mobile */}
            <div className="border-t border-gray-100 pt-4 mt-2">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-sm text-gray-600 font-medium">Language:</span>
              </div>
              <div className="flex items-center p-1.5 bg-blue-city-secondary/20 rounded-full max-w-xs mx-auto">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                    currentLanguage === 'en'
                      ? 'bg-blue-city-primary text-white shadow-md'
                      : 'text-blue-city-text'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => changeLanguage('hi')}
                  className={`flex-1 px-4 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 ${
                    currentLanguage === 'hi'
                      ? 'bg-blue-city-primary text-white shadow-md'
                      : 'text-blue-city-text'
                  }`}
                >
                  मारवाड़ी
                </button>
              </div>
            </div>

            {isAuthenticated ? (
              <>
                {isAdmin && (
                  <Link
                    to={ROUTES.ADMIN}
                    className="block py-2 text-blue-city-accent hover:text-blue-city-primary transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.adminPanel')}
                  </Link>
                )}
                <Link to={ROUTES.ACCOUNT} onClick={() => setIsOpen(false)}>
                  <Button className="w-full mt-4" variant="outline">
                    {t('nav.myAccount')}
                  </Button>
                </Link>
                <Button
                  className="w-full mt-2"
                  variant="secondary"
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                >
                  {t('nav.logout')}
                </Button>
              </>
            ) : null /* Login button hidden temporarily in mobile */}
          </motion.div>
        )}
      </div>
    </nav>
  );
};
