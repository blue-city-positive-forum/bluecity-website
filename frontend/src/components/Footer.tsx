import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ROUTES } from '../utils/constants';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-amber-50 border-t border-blue-city-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Logo & About */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={`${import.meta.env.BASE_URL}bluecity_logo_nobg.png`}
                alt="Blue City Positive Forum Logo" 
                className="h-12 w-12 object-contain"
              />
              <h3 className="text-2xl font-bold text-gradient">{t('footer.title')}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              {t('footer.description')}
            </p>
            <div className="text-sm text-gray-600">
              <p>{t('footer.registeredOrg')}</p>
              <p>{t('footer.servingSince')}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-blue-city-text mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to={ROUTES.ABOUT_WHO_WE_ARE} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ABOUT_MANAGEMENT_TEAM} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.managementTeam')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.FESTIVALS} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.festivals')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.MATRIMONY} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.matrimony')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.CONTACT} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Activities */}
          <div>
            <h4 className="font-semibold text-blue-city-text mb-4">{t('footer.helpAndActivities')}</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <Link to={ROUTES.HELP_EDUCATION} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.education')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.HELP_MEDICAL} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.medical')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ACTIVITIES_SOCIAL_WORK} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.socialWork')}
                </Link>
              </li>
              <li>
                <Link to={ROUTES.ACTIVITIES_CULTURAL} className="hover:text-blue-city-primary transition-colors">
                  {t('footer.cultural')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-blue-city-secondary/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} {t('footer.copyright')}
          </p>
          <p className="text-gray-600 text-sm">
            {t('footer.madeWith')}
          </p>
        </div>
      </div>
    </footer>
  );
};




