import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { PageHero } from '../../components/common/PageHero';
import { 
  Eye, 
  Target
} from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        {/* Hero Section - Optimized for mobile */}
        <PageHero 
          title={t('pages.whoWeAre.title')}
          subtitle={t('pages.whoWeAre.subtitle')}
        />

        {/* Content Section */}
        <div className="max-w-5xl mx-auto px-4 py-12 md:py-16">
          <div className="space-y-12 md:space-y-16">
            {/* Introduction */}
            <div>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('pages.whoWeAre.intro')}
              </p>
            </div>

            {/* Vision */}
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Eye className="w-7 h-7 text-blue-city-primary" />
                {t('pages.vision.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('pages.vision.statement')}
              </p>
            </div>

            {/* Mission */}
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <Target className="w-7 h-7 text-blue-city-primary" />
                {t('pages.mission.title')}
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                {t('pages.mission.statement')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
