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

            {/* Featured Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[21/9] group"
            >
              <img
                src={`${import.meta.env.BASE_URL}marwar_history/mehrangarh-fort.jpg`}
                alt="Mehrangarh Fort - The magnificent fort of Jodhpur"
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-2xl font-bold">{t('pages.ourHistory.images.mehrangarhFort')}</p>
                  <p className="text-sm text-gray-200">{t('pages.ourHistory.images.prideOfMarwar')}</p>
                </div>
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

                {/* Side Historical Image */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="rounded-xl overflow-hidden shadow-lg aspect-[3/4]">
                      <img
                        src={`${import.meta.env.BASE_URL}marwar_history/rao_jodha.jpg`}
                        alt="Rao Jodha - Founder of Jodhpur"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-3 font-medium">{t('pages.ourHistory.images.raoJodha')}</p>
                    <p className="text-center text-xs text-gray-500">{t('pages.ourHistory.images.founderOfJodhpur')}</p>
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
                  { 
                    image: 'jaswant_thada.jpeg', 
                    labelKey: 'jaswantThada', 
                    descriptionKey: 'royalCenotaph'
                  },
                  { 
                    image: 'umeb_palace.jpeg', 
                    labelKey: 'umaidPalace', 
                    descriptionKey: 'lastGreatPalace'
                  },
                  { 
                    image: 'jodhpur_ghantaghar.jpeg', 
                    labelKey: 'ghantaGhar', 
                    descriptionKey: 'clockTower'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="rounded-xl overflow-hidden shadow-md aspect-[4/3] group relative"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}marwar_history/${item.image}`}
                      alt={t(`pages.ourHistory.images.${item.labelKey}`)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <p className="font-semibold">{t(`pages.ourHistory.images.${item.labelKey}`)}</p>
                        <p className="text-xs text-gray-200">{t(`pages.ourHistory.images.${item.descriptionKey}`)}</p>
                      </div>
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
                {/* Traditional Art Image - Left Side */}
                <div className="lg:col-span-2 order-2 lg:order-1">
                  <div className="rounded-xl overflow-hidden shadow-lg aspect-[3/4]">
                    <img
                      src={`${import.meta.env.BASE_URL}marwar_history/jodhpur_shop_art.jpeg`}
                      alt="Traditional Marwari crafts and art"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-600 mt-3 font-medium">{t('pages.ourHistory.images.traditionalCrafts')}</p>
                  <p className="text-center text-xs text-gray-500">{t('pages.ourHistory.images.bandhejJewelryArt')}</p>
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
                  { image: 'bandhej.jpeg', labelKey: 'bandhejTextiles' },
                  { image: 'ghoomar.jpg', labelKey: 'ghoomarDance' },
                  { image: 'puppets.jpeg', labelKey: 'puppetryArt' },
                  { image: 'jodhpur_shop_art.jpeg', labelKey: 'traditionalCrafts' }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="rounded-lg overflow-hidden shadow-md aspect-square group relative"
                  >
                    <img
                      src={`${import.meta.env.BASE_URL}marwar_history/${item.image}`}
                      alt={t(`pages.ourHistory.images.${item.labelKey}`)}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                      <p className="text-xs text-white font-medium">{t(`pages.ourHistory.images.${item.labelKey}`)}</p>
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
                    { image: 'teej_celebration.jpeg', labelKey: 'teejFestival', descriptionKey: 'teejDescription' },
                    { image: 'gangaur_festival.jpg', labelKey: 'gangaurFestival', descriptionKey: 'gangaurDescription' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="rounded-xl overflow-hidden shadow-lg aspect-[16/9] group relative"
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}marwar_history/${item.image}`}
                        alt={t(`pages.ourHistory.images.${item.labelKey}`)}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end p-6">
                        <div className="text-white">
                          <p className="font-semibold text-lg">{t(`pages.ourHistory.images.${item.labelKey}`)}</p>
                          <p className="text-sm text-gray-200">{t(`pages.ourHistory.images.${item.descriptionKey}`)}</p>
                        </div>
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
