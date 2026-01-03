import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;
    
    // Update body class for CSS styling
    document.body.className = document.body.className.replace(/lang-\w+/, '');
    document.body.classList.add(`lang-${i18n.language}`);
  }, [i18n.language]);

  return <>{children}</>;
};




