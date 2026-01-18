import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { Heart, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: 'community_gettogether_images/media/image1.jpeg',
    title: 'Haryali Teej Celebration',
    description: 'Celebration of Haryali Teej by Marwari Ladies at Ahmedabad',
    alt: 'Haryali Teej'
  },
  {
    src: 'community_gettogether_images/media/image2.jpeg',
    title: 'Gangaur Festival',
    description: 'Celebration of Gangaur',
    alt: 'Gangaur Celebration'
  },
  {
    src: 'community_gettogether_images/media/image3.jpeg',
    title: 'Independence Day Celebration',
    description: 'Fancy Dress Competition for Kids On Eve of Independence Day Celebration',
    alt: 'Independence Day'
  },
  {
    src: 'community_gettogether_images/media/image4.jpeg',
    title: 'Celebration with Dignitaries',
    description: 'Mayor Smt Pratibha Jain with Shri Zabbarmal Sa Sankhlecha, Shri Deepak Jain, Shri Dr. M M Singhi and Shri CA Rajendra Agarwal In celebration at Bluecity Positive Forum',
    alt: 'Community Leaders'
  },
  {
    src: 'community_gettogether_images/media/image5.jpeg',
    title: 'Pre-Deepawali Celebration',
    description: 'Pre-Deepawali Celebration Get together',
    alt: 'Deepawali Celebration'
  },
  {
    src: 'community_gettogether_images/media/image6.jpeg',
    title: 'Monsoon Picnic',
    description: 'Monsoon Picnic',
    alt: 'Monsoon Picnic'
  }
];

export const CommunityGallery: React.FC = () => {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + galleryImages.length) % galleryImages.length);
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'ArrowLeft') goToPrevious();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage]);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/20 to-slate-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-city-primary to-blue-city-accent text-white py-16 md:py-24 overflow-hidden">
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
                {t('pages.gallery.subtitle')}
              </motion.p>
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {t('pages.gallery.community.title')}
              </h1>
              <p className="text-blue-50 text-lg max-w-2xl mx-auto">
                {t('pages.gallery.community.description')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
          {/* Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-blue-city-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t('pages.gallery.community.heading')}
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{t('pages.gallery.community.content')}</p>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="group relative aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-pink-100 to-purple-100"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${image.src}`}
                  alt={image.alt}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className="text-white font-semibold text-sm">{image.title}</p>
                    {image.description && (
                      <p className="text-white/80 text-xs mt-1">{image.description}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Empty State */}
          {galleryImages.length === 0 && (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">{t('pages.gallery.noImages')}</p>
            </div>
          )}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-2 md:left-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/30 rounded-full p-2 hover:bg-black/50"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-2 md:right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/30 rounded-full p-2 hover:bg-black/50"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6 md:w-10 md:h-10" />
              </button>

              {/* Image */}
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                className="relative max-w-6xl max-h-[85vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${galleryImages[selectedImage]?.src}`}
                  alt={galleryImages[selectedImage]?.alt}
                  className="w-full h-auto max-h-[75vh] object-contain rounded-lg"
                />
                <div className="mt-4 text-center px-4">
                  <h3 className="text-white text-xl md:text-2xl font-semibold">
                    {galleryImages[selectedImage]?.title}
                  </h3>
                  {galleryImages[selectedImage]?.description && (
                    <p className="text-white/80 mt-2 text-sm md:text-base max-w-3xl mx-auto">
                      {galleryImages[selectedImage].description}
                    </p>
                  )}
                  <p className="text-white/60 text-sm mt-3">
                    {selectedImage + 1} / {galleryImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};
