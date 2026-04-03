import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';

// Linux-compatible precise imports from 'Event Gallery'
import img1 from '../assets/Event Gallery/img1_Beach Fashion show X KZN.jpg';
import img2 from '../assets/Event Gallery/img2_Business showcasing event.jpg';
import img3 from '../assets/Event Gallery/img3_Cover signings.jpg';
import img4 from '../assets/Event Gallery/img4_Enspire X WILL.jpeg';
import img5 from '../assets/Event Gallery/img5_Enspired High Tea Soirée.jpg';
import img6 from '../assets/Event Gallery/img6_Gala event.jpg';
import img7 from '../assets/Event Gallery/img7_Inspiring SME_s.jpg';
import img8 from '../assets/Event Gallery/img8_Networking Workshops.jpg';
import img9 from '../assets/Event Gallery/img9_Recognition events.jpg';
import img10 from '../assets/Event Gallery/img10_Speaker sessions.jpg';
import img11 from '../assets/Event Gallery/img11_TWA 2018 Finalist.jpeg';
import img12 from '../assets/Event Gallery/img12_VIP launch party.jpg';
import img13 from '../assets/Event Gallery/img13_Women leadership awards 2019.jpg';
import img14 from '../assets/Event Gallery/img14_Women_s Wine pairing eve.jpg';
import img15 from '../assets/Event Gallery/img15_Panel event.jpg';

const galleryData = [
  { id: 1, src: img1, alt: "Beach Fashion Show X KZN", title: "Beach Fashion Show X KZN", span: "sm:col-span-2" },
  { id: 2, src: img2, alt: "Business Showcasing Event", title: "Business Showcasing Event", span: "col-span-1" },
  { id: 3, src: img3, alt: "Cover Signings", title: "Cover Signings", span: "col-span-1" },
  { id: 4, src: img4, alt: "Enspire X WILL", title: "Enspire X WILL", span: "col-span-1" },
  { id: 5, src: img5, alt: "Enspired High Tea Soirée", title: "Enspired High Tea Soirée", span: "col-span-1" },
  { id: 6, src: img6, alt: "Gala Event", title: "Gala Event", span: "sm:col-span-2" },
  { id: 7, src: img7, alt: "Inspiring SMEs", title: "Inspiring SMEs", span: "col-span-1" },
  { id: 8, src: img8, alt: "Networking Workshops", title: "Networking Workshops", span: "col-span-1" },
  { id: 9, src: img9, alt: "Recognition Events", title: "Recognition Events", span: "sm:col-span-2" },
  { id: 10, src: img10, alt: "Speaker Sessions", title: "Speaker Sessions", span: "col-span-1" },
  { id: 11, src: img11, alt: "TWA 2018 Finalist", title: "TWA 2018 Finalist", span: "col-span-1" },
  { id: 12, src: img12, alt: "VIP Launch Party", title: "VIP Launch Party", span: "col-span-1" },
  { id: 13, src: img13, alt: "Women Leadership Awards 2019", title: "Women Leadership Awards 2019", span: "sm:col-span-2" },
  { id: 14, src: img14, alt: "Women's Wine Pairing Evening", title: "Women's Wine Pairing Evening", span: "col-span-1" },
  { id: 15, src: img15, alt: "Panel Event", title: "Panel Event", span: "col-span-1" },
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
    className="shrink-0 w-[75vw] sm:w-[45vw] md:w-[320px] lg:w-[400px] h-[220px] md:h-[280px] lg:h-[320px] rounded-2xl md:rounded-3xl overflow-hidden relative cursor-pointer group shadow-lg dark:shadow-none hover:shadow-[0_8px_30px_rgba(235,77,156,0.15)] transition-all duration-500 border border-transparent dark:border-white/5 hover:border-brand-magenta/40 mr-4 md:mr-8 active:scale-[0.97]"
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
    <section id="gallery" className="pb-10 pt-6 md:pb-24 md:pt-12 bg-white dark:bg-brand-dark relative z-10">
      
      {/* Background Decorators */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-pink/5 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-[1600px] mx-auto relative z-20">
        
        <FadeInOnScroll direction="up" className="text-center mb-8 md:mb-14 px-6">
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
