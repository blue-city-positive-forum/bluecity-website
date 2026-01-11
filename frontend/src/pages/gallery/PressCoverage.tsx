import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Layout } from '../../components/layout/Layout';
import { Newspaper, X, ChevronLeft, ChevronRight } from 'lucide-react';

const galleryImages = [
  {
    src: '/media_footprint_images/media/image1.jpeg',
    title: 'Press Coverage 1',
    description: '',
    alt: 'Media Coverage 1'
  },
  {
    src: '/media_footprint_images/media/image2.jpeg',
    title: 'Press Coverage 2',
    description: '',
    alt: 'Media Coverage 2'
  },
  {
    src: '/media_footprint_images/media/image3.jpeg',
    title: 'Press Coverage 3',
    description: '',
    alt: 'Media Coverage 3'
  },
  {
    src: '/media_footprint_images/media/image4.jpeg',
    title: 'Press Coverage 4',
    description: '',
    alt: 'Media Coverage 4'
  },
  {
    src: '/media_footprint_images/media/image5.jpeg',
    title: 'Press Coverage 5',
    description: '',
    alt: 'Media Coverage 5'
  },
  {
    src: '/media_footprint_images/media/image6.jpeg',
    title: 'Press Coverage 6',
    description: '',
    alt: 'Media Coverage 6'
  },
  {
    src: '/media_footprint_images/media/image7.jpeg',
    title: 'Press Coverage 7',
    description: '',
    alt: 'Media Coverage 7'
  },
  {
    src: '/media_footprint_images/media/image8.jpeg',
    title: 'Press Coverage 8',
    description: '',
    alt: 'Media Coverage 8'
  },
  {
    src: '/media_footprint_images/media/image9.jpg',
    title: 'Press Coverage 9',
    description: '',
    alt: 'Media Coverage 9'
  },
  {
    src: '/media_footprint_images/media/image10.jpeg',
    title: 'Press Coverage 10',
    description: '',
    alt: 'Media Coverage 10'
  }
];

export const PressCoverage: React.FC = () => {
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
                {t('pages.gallery.press.title')}
              </h1>
              <p className="text-blue-50 text-lg max-w-2xl mx-auto">
                {t('pages.gallery.press.description')}
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
              <Newspaper className="w-8 h-8 text-blue-city-primary" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                {t('pages.gallery.press.heading')}
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>{t('pages.gallery.press.content')}</p>
            </div>
          </motion.div>

          {/* Gallery Grid - Masonry Style for Press */}
          <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-3 sm:gap-4 md:gap-6 space-y-3 sm:space-y-4 md:space-y-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="group relative break-inside-avoid rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-amber-100 to-orange-100"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${image.src}`}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
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
              <Newspaper className="w-16 h-16 mx-auto text-gray-300 mb-4" />
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
                className="relative max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${galleryImages[selectedImage]?.src}`}
                  alt={galleryImages[selectedImage]?.alt}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                />
                <div className="mt-4 text-center px-4">
                  <p className="text-white/60 text-sm">
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
