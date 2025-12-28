import React from 'react';
import { useTranslation } from 'react-i18next';

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
                alt="Blue City Parivar Logo" 
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
                <a href="#about" className="hover:text-blue-city-primary transition-colors">
                  {t('footer.aboutUs')}
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-blue-city-primary transition-colors">
                  {t('footer.events')}
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-blue-city-primary transition-colors">
                  {t('footer.gallery')}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-city-primary transition-colors">
                  {t('footer.contact')}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-blue-city-text mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2 text-gray-600">
              <li>
                <a href="#" className="hover:text-blue-city-primary transition-colors">
                  {t('footer.privacyPolicy')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-city-primary transition-colors">
                  {t('footer.termsOfService')}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-city-primary transition-colors">
                  {t('footer.membershipGuidelines')}
                </a>
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




