import React from 'react';
import { motion } from 'framer-motion';
import { FadeInOnScroll, StaggerChildren } from './ui/ScrollAnimations';
import { collaborationLogoAssets } from '../config/cloudinaryAssets';

const collaborations = [
  { id: 1, name: 'Mercedes-Benz', image: collaborationLogoAssets.mercedes },
  { id: 2, name: 'Mangwanani African Spa', image: collaborationLogoAssets.mangwanani },
  { id: 3, name: 'KZN Fashion Council', image: collaborationLogoAssets.kzn },
  { id: 4, name: 'FNB', image: collaborationLogoAssets.fnb },
  { id: 5, name: 'Nedbank', image: collaborationLogoAssets.nedbank },
  { id: 6, name: 'Capitec', image: collaborationLogoAssets.capitec },
  { id: 7, name: 'BMW', image: collaborationLogoAssets.bmw },
  { id: 8, name: 'Vodacom', image: collaborationLogoAssets.vodacom },
];

const Collaborations = () => {
  return (
    <section id="collaborations" className="py-16 md:py-24 bg-white dark:bg-brand-dark overflow-hidden relative border-t border-gray-100 dark:border-white/5">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-purple/5 opacity-50 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* Header Section */}
        <FadeInOnScroll direction="up" className="text-center mb-16 md:mb-20 flex flex-col items-center">
          <span className="text-magic-gradient font-condensed font-bold uppercase tracking-widest text-sm md:text-base mb-3 block">
            Our Network
          </span>
          <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,6vw,3.5rem)] text-brand-lightText dark:text-white drop-shadow-sm">
            Previous <span className="text-brand-lightMuted/40 dark:text-white/30">Collaborations</span>
          </h2>
          <div className="w-16 md:w-24 h-1 bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink mt-6 rounded-full mx-auto"></div>
        </FadeInOnScroll>

        {/* Logos Grid */}
        <StaggerChildren staggerDelay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 md:gap-x-12 md:gap-y-16">
            {collaborations.map((collab) => (
              <motion.div 
                key={collab.id}
                className="flex flex-col items-center justify-center group cursor-default"
                whileHover={{ y: -5 }}
              >
                {/* Logo Image */}
                <div className="w-full h-24 sm:h-28 flex items-center justify-center p-4 bg-transparent transition-all duration-300">
                  <img
                    src={collab.image}
                    alt={`${collab.name} logo`}
                    className="max-w-full max-h-full object-contain transition-transform duration-500 will-change-transform group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                </div>
                
                {/* Partner Name Label */}
                <span className="mt-4 text-center font-sans text-sm md:text-base text-gray-400 dark:text-white/40 group-hover:text-brand-lightText dark:group-hover:text-white/90 group-hover:font-medium transition-colors duration-300">
                  {collab.name}
                </span>
              </motion.div>
            ))}
          </div>
        </StaggerChildren>

      </div>
    </section>
  );
};

export default Collaborations;
