import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';

// Use exactly the working images and span classes requested by the user
import img1 from '../assets/image gallery/image_01.jpg';
import img2 from '../assets/image gallery/image_02.jpg';
import img3 from '../assets/image gallery/image_03.jpg';
import img4 from '../assets/image gallery/image_04.jpg';
import img5 from '../assets/image gallery/image_05.jpg';
import img6 from '../assets/image gallery/image_06.jpg';
import img7 from '../assets/image gallery/image_07.jpg';
import img8 from '../assets/image gallery/image_08.jpg';
import img9 from '../assets/image gallery/image_09.jpg';
import img10 from '../assets/image gallery/image_10.jpg';
import img11 from '../assets/image gallery/image_11.jpg';
import img12 from '../assets/image gallery/image_12.jpg';
import img13 from '../assets/image gallery/image_13.jpg';
import img14 from '../assets/image gallery/image_14.jpg';
import img15 from '../assets/image gallery/image_15.jpg';

const galleryData = [
  { id: 1, src: img1, alt: "Enspired London Event", title: "Enspired London Event", span: "sm:col-span-2" },
  { id: 2, src: img2, alt: "Fashion Week Spotlight", title: "Fashion Week Spotlight", span: "col-span-1" },
  { id: 3, src: img3, alt: "Creative Minds Panel", title: "Creative Minds Panel", span: "col-span-1" },
  { id: 4, src: img4, alt: "Modern Design Gala", title: "Modern Design Gala", span: "col-span-1" },
  { id: 5, src: img5, alt: "VIP Access Experience", title: "VIP Access Experience", span: "col-span-1" },
  { id: 6, src: img6, alt: "Cover Shoot Setup", title: "Cover Shoot Setup", span: "sm:col-span-2" },
  { id: 7, src: img7, alt: "Annual Excellence Gala", title: "Annual Excellence Gala", span: "col-span-1" },
  { id: 8, src: img8, alt: "Urban Street Style", title: "Urban Street Style", span: "col-span-1" },
  { id: 9, src: img9, alt: "Tech Innovation Keynote", title: "Tech Innovation Keynote", span: "sm:col-span-2" },
  { id: 10, src: img10, alt: "Leadership Summit", title: "Leadership Summit", span: "col-span-1" },
  { id: 11, src: img11, alt: "Contemporary Art Expo", title: "Contemporary Art Expo", span: "col-span-1" },
  { id: 12, src: img12, alt: "Live Music Session", title: "Live Music Session", span: "col-span-1" },
  { id: 13, src: img13, alt: "Global Community Meetup", title: "Global Community Meetup", span: "sm:col-span-2" },
  { id: 14, src: img14, alt: "Visionary Awards", title: "Visionary Awards", span: "col-span-1" },
  { id: 15, src: img15, alt: "Enspired Afterparty", title: "Enspired Afterparty", span: "col-span-1" },
];

const ImageModal = ({ src, onClose }) => {
  if (!src) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/92 backdrop-blur-md flex justify-center items-center z-[200] p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 18 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-6xl flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          src={src}
          alt="Enlarged view"
          className="max-w-[92vw] max-h-[88vh] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] object-contain"
        />
        <button
          className="absolute top-4 right-4 md:top-6 md:right-6 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/20 transition-colors"
          onClick={onClose}
        >
          <X size={24} />
        </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    , document.body
  );
};

/* ─── Premium Marquee Slider Card ─── */
const GallerySliderCard = ({ img, onClick }) => (
  <div
    className="shrink-0 w-[75vw] sm:w-[45vw] md:w-[320px] lg:w-[400px] h-[220px] md:h-[280px] lg:h-[320px] rounded-2xl md:rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg dark:shadow-none hover:shadow-[0_8px_30px_rgba(235,77,156,0.15)] transition-all duration-500 border border-transparent dark:border-white/5 hover:border-brand-magenta/40 mr-4 md:mr-8"
    onClick={onClick}
  >
    <img
      src={img.src}
      alt={img.alt}
      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
      loading="lazy"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex items-end p-5 md:p-8 opacity-90 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
      <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
        <p className="text-white text-base md:text-xl font-bold tracking-wide">
          {img.title}
        </p>
        <div className="w-8 h-1 bg-brand-magenta mt-2 md:mt-3 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform origin-left scale-x-0 group-hover:scale-x-100" />
      </div>
    </div>
  </div>
);

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

  useEffect(() => {
    if (!modalImage) return undefined;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = previousOverflow;
    };
  }, [modalImage]);

  // Split gallery into two tracks for the double marquee
  const row1 = galleryData.slice(0, 8);
  const row2 = galleryData.slice(8, 15);
  
  // Duplicate arrays to achieve seamless CSS marquee-left/right infinite loop
  const row1Sliding = [...row1, ...row1];
  const row2Sliding = [...row2, ...row2];

  return (
    <section id="gallery" className="py-20 md:py-32 bg-white dark:bg-brand-dark relative z-10">
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-pink/5 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-[1600px] mx-auto relative z-20">
        
        <FadeInOnScroll direction="up" className="text-center mb-12 md:mb-20 px-6">
          <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,4.5rem)] mb-4">
            <span className="block text-brand-lightText dark:text-white drop-shadow-sm">Event</span>
            <span className="block text-brand-lightMuted/40 dark:text-white/30">Gallery</span>
          </h2>
          <p className="text-magic-gradient max-w-2xl mx-auto text-base md:text-xl font-medium tracking-wide mt-4 md:mt-6">
            A glimpse into the world of Enspired — events, launches, and unforgettable moments.
          </p>
        </FadeInOnScroll>

        {/* ═══ Premium Double Marquee Sliders ═══ */}
        {/* We use group/sliders to pause both tracks when hovering inside the container */}
        <div className="w-full px-4 md:px-8 lg:px-12 group/sliders">
          
          <div className="w-full overflow-hidden flex flex-col gap-6 md:gap-8 pointer-events-auto rounded-[32px] md:rounded-[48px] bg-brand-lightCard/30 dark:bg-white/5 backdrop-blur-sm border border-brand-purple/5 dark:border-white/10">
            
            {/* Top Track - Scrolls Left */}
            <div className="relative w-[100vw] sm:w-[150vw] md:w-[200vw] lg:w-[250vw] overflow-visible flex pt-6 md:pt-10">
              <div className="marquee-track marquee-left group-hover/sliders:[animation-play-state:paused] hover:[animation-play-state:paused] transition-all duration-300">
                {row1Sliding.map((img, idx) => (
                  <GallerySliderCard
                    key={`r1-${img.id}-${idx}`}
                    img={img}
                    onClick={() => openModal(img.src)}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Track - Scrolls Right */}
            <div className="relative w-[100vw] sm:w-[150vw] md:w-[200vw] lg:w-[250vw] overflow-visible flex pb-6 md:pb-10">
              <div className="marquee-track marquee-right group-hover/sliders:[animation-play-state:paused] hover:[animation-play-state:paused] transition-all duration-300">
                {row2Sliding.map((img, idx) => (
                  <GallerySliderCard
                    key={`r2-${img.id}-${idx}`}
                    img={img}
                    onClick={() => openModal(img.src)}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      <ImageModal src={modalImage} onClose={closeModal} />
    </section>
  );
}

export default Gallery;
