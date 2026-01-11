import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { BookOpen, Sparkles, Heart, Image as ImageIcon } from 'lucide-react';

export const OurHistory: React.FC = () => {
  const { t } = useTranslation();

  const historyParagraphs = t('pages.ourHistory.historyContent', { returnObjects: true }) as string[];
  const traditionsParagraphs = t('pages.ourHistory.traditionsContent', { returnObjects: true }) as string[];
  const cultureParagraphs = t('pages.ourHistory.cultureContent', { returnObjects: true }) as string[];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-blue-100 text-sm uppercase tracking-widest mb-4 font-semibold"
              >
                {t('pages.ourHistory.subtitle')}
              </motion.p>
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {t('pages.ourHistory.title')}
              </h1>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="w-24 h-1 bg-white mx-auto rounded-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-12 md:space-y-16"
          >
            {/* Opening Poem */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-8 md:p-12 border border-blue-200 shadow-lg">
                <div className="text-gray-800 leading-relaxed space-y-3 text-center">
                  <p className="text-xl md:text-2xl font-medium italic">{t('pages.ourHistory.poem.line1')}</p>
                  <p className="text-xl md:text-2xl font-medium italic">{t('pages.ourHistory.poem.line2')}</p>
                  <div className="pt-2"></div>
                  <p className="text-xl md:text-2xl font-medium italic">{t('pages.ourHistory.poem.line3')}</p>
                  <p className="text-xl md:text-2xl font-medium italic">{t('pages.ourHistory.poem.line4')}</p>
                </div>
              </div>
            </div>

            {/* Featured Hero Image Placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-slate-100 aspect-[21/9] flex items-center justify-center group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-city-primary/10 to-blue-city-accent/10"></div>
              <div className="relative z-10 text-center space-y-4">
                <ImageIcon className="w-16 h-16 mx-auto text-blue-city-primary/40" />
                <p className="text-gray-600 font-medium">Mehrangarh Fort / Jodhpur Cityscape</p>
                <p className="text-sm text-gray-500 max-w-md mx-auto px-4">
                  {t('pages.ourHistory.imagePlaceholder')}
                </p>
              </div>
            </motion.div>

            {/* History of Marwar */}
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-city-primary" />
                {t('pages.ourHistory.historyTitle')}
              </h2>

              {/* History Content with Image Grid */}
              <div className="grid lg:grid-cols-3 gap-8 mb-10">
                {/* Main Content - 2 columns */}
                <div className="lg:col-span-2 space-y-5 text-gray-700 leading-relaxed text-lg">
                  {historyParagraphs.slice(0, 4).map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Side Image Placeholder */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 aspect-[3/4] flex items-center justify-center">
                      <div className="text-center space-y-3 p-6">
                        <ImageIcon className="w-12 h-12 mx-auto text-amber-600/40" />
                        <p className="text-sm text-gray-600 font-medium">Historical Image</p>
                        <p className="text-xs text-gray-500">Rao Jodha / Mehrangarh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Remaining History Content */}
              <div className="space-y-5 text-gray-700 leading-relaxed text-lg mb-10">
                {historyParagraphs.slice(4).map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Historical Images Grid */}
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                {[
                  { label: 'Mehrangarh Fort', color: 'from-red-50 to-orange-50', iconColor: 'text-red-600/40' },
                  { label: 'Royal Palace', color: 'from-amber-50 to-yellow-50', iconColor: 'text-amber-600/40' },
                  { label: 'Blue City View', color: 'from-blue-50 to-cyan-50', iconColor: 'text-blue-600/40' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className={`rounded-xl overflow-hidden shadow-md bg-gradient-to-br ${item.color} aspect-[4/3] flex items-center justify-center`}
                  >
                    <div className="text-center space-y-2 p-4">
                      <ImageIcon className={`w-10 h-10 mx-auto ${item.iconColor}`} />
                      <p className="text-sm text-gray-600 font-medium">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Traditions */}
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Sparkles className="w-8 h-8 text-blue-city-primary" />
                {t('pages.ourHistory.traditionsTitle')}
              </h2>

              {/* Traditions Content with Side Image */}
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Image Placeholder - Left Side */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-purple-50 to-pink-50 aspect-[3/4] flex items-center justify-center">
                    <div className="text-center space-y-3 p-6">
                      <ImageIcon className="w-12 h-12 mx-auto text-purple-600/40" />
                      <p className="text-sm text-gray-600 font-medium">Traditional Art</p>
                      <p className="text-xs text-gray-500">Bandhej / Jewelry / Crafts</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-3 space-y-5 text-gray-700 leading-relaxed text-lg order-1 lg:order-2">
                  {traditionsParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Traditions Image Gallery */}
              <div className="grid md:grid-cols-4 gap-4 mt-10">
                {[
                  { label: 'Bandhej Textiles', color: 'from-pink-50 to-rose-50', iconColor: 'text-pink-600/40' },
                  { label: 'Meenakari Jewelry', color: 'from-yellow-50 to-amber-50', iconColor: 'text-yellow-600/40' },
                  { label: 'Folk Dance', color: 'from-green-50 to-emerald-50', iconColor: 'text-green-600/40' },
                  { label: 'Puppetry Art', color: 'from-violet-50 to-purple-50', iconColor: 'text-violet-600/40' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className={`rounded-lg overflow-hidden shadow-md bg-gradient-to-br ${item.color} aspect-square flex items-center justify-center`}
                  >
                    <div className="text-center space-y-2 p-3">
                      <ImageIcon className={`w-8 h-8 mx-auto ${item.iconColor}`} />
                      <p className="text-xs text-gray-600 font-medium">{item.label}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Culture */}
            <div className="border-t border-gray-200 pt-12 pb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <Heart className="w-8 h-8 text-blue-city-primary" />
                {t('pages.ourHistory.cultureTitle')}
              </h2>

              {/* Culture Content with Featured Image */}
              <div className="space-y-8">
                <div className="text-gray-700 leading-relaxed text-lg space-y-5">
                  {cultureParagraphs.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Culture Images */}
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { label: 'Teej & Gangaur Festival', color: 'from-rose-50 to-pink-50', iconColor: 'text-rose-600/40' },
                    { label: 'Traditional Wedding', color: 'from-orange-50 to-red-50', iconColor: 'text-orange-600/40' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className={`rounded-xl overflow-hidden shadow-lg bg-gradient-to-br ${item.color} aspect-[16/9] flex items-center justify-center`}
                    >
                      <div className="text-center space-y-3 p-6">
                        <ImageIcon className={`w-12 h-12 mx-auto ${item.iconColor}`} />
                        <p className="text-sm text-gray-600 font-medium">{item.label}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};
