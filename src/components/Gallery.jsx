import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';

// Use exactly the working images and span classes requested by the user
const galleryData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=1470&auto=format&fit=crop",
    alt: "Cityscape at dusk",
    title: "Enspired London",
    span: "col-span-1"
  },
  {
    id: 2,
    src: "https://ix-marketing.imgix.net/focalpoint.png?q=80&w=1470&auto=format&fit=crop",
    alt: "Portrait",
    title: "Editorial Showcase",
    span: "sm:col-span-2"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?q=80&w=1470&auto=format&fit=crop",
    alt: "Sunlight through a forest",
    title: "Nature & Design Panel",
    span: "col-span-1"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1364&auto=format&fit=crop",
    alt: "Portrait of a person",
    title: "Creative Minds",
    span: "col-span-1"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?q=80&w=1470&auto=format&fit=crop",
    alt: "Wildlife photography",
    title: "Global Visionaries Gala",
    span: "sm:col-span-2"
  },
  {
    id: 6,
    src: "https://ix-marketing.imgix.net/bg-remove_after.png?q=80&w=1470&auto=format&fit=crop",
    alt: "Modern architecture",
    title: "Innovation Keynote",
    span: "col-span-1"
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1488866022504-f2584929ca5f?q=80&w=1470&auto=format&fit=crop",
    alt: "Starry night sky",
    title: "Night of Excellence",
    span: "col-span-1"
  },
  {
    id: 8,
    src: "https://ix-marketing.imgix.net/autocompress.png?q=80&w=1287&auto=format&fit=crop",
    alt: "Street art",
    title: "Community Meetup",
    span: "col-span-1"
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=1470&auto=format&fit=crop",
    alt: "Mountain Range",
    title: "Future Landscapes",
    span: "sm:col-span-2"
  },
];

const ImageModal = ({ src, onClose }) => {
  if (!src) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md flex justify-center items-center z-[100]"
        onClick={onClose}
      >
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          src={src}
          alt="Enlarged view"
          className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        <button
          className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export function Gallery() {
  const [modalImage, setModalImage] = useState(null);

  const openModal = (src) => setModalImage(src);
  const closeModal = () => setModalImage(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="gallery" className="py-24 bg-white dark:bg-brand-dark relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        <FadeInOnScroll direction="up" className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-lightText dark:text-white mb-4">Gallery</h2>
          <p className="text-brand-lightMuted dark:text-white/50 max-w-2xl mx-auto text-lg">
            A glimpse into the world of Enspired — events, launches, and unforgettable moments.
          </p>
        </FadeInOnScroll>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[250px]">
          {galleryData.map((img) => (
            <div
              key={img.id}
              className={`group cursor-pointer relative overflow-hidden rounded-2xl ${img.span} bg-brand-lightCard dark:bg-white/5`}
              onClick={() => openModal(img.src)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <p className="text-white text-lg font-bold tracking-wide transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
                  {img.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ImageModal src={modalImage} onClose={closeModal} />
    </section>
  );
}

export default Gallery;
