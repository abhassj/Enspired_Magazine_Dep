import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, HeartHandshake } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';

const Partner = () => {
  return (
    <section className="relative py-16 md:py-24 bg-white dark:bg-brand-dark overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-brand-pink/10 dark:bg-brand-pink/5 rounded-full blur-[60px] md:blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-brand-blue/10 dark:bg-brand-blue/5 rounded-full blur-[60px] md:blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <FadeInOnScroll direction="up">
          <div className="relative group overflow-hidden rounded-[2.5rem] bg-[#f5eeff] dark:bg-white/5 border border-brand-purple/10 dark:border-white/10 shadow-2xl dark:shadow-none bg-opacity-50 dark:bg-opacity-100 backdrop-blur-xl transition-all duration-500 hover:border-brand-magenta/30">
            {/* Background Image / Pattern overlay with opacity */}
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-brand-lavender/40 dark:to-brand-purple/10 pointer-events-none"></div>
            
            <div className="relative z-10 p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16">
              
              {/* Text content */}
              <div className="flex-1 text-center lg:text-left space-y-6">
                <div className="inline-flex items-center justify-center lg:justify-start space-x-3 mb-2">
                  <span className="p-3 rounded-full bg-brand-magenta/10 dark:bg-brand-magenta/20 text-brand-magenta ring-1 ring-brand-magenta/20">
                    <HeartHandshake className="w-6 h-6 md:w-8 md:h-8" strokeWidth={1.5} />
                  </span>
                  <span className="text-magic-gradient font-condensed font-bold uppercase tracking-widest text-sm md:text-base">
                    Collaborate
                  </span>
                </div>
                
                <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.2rem,5.5vw,3.5rem)] text-brand-lightText dark:text-white drop-shadow-sm">
                  Join the <span className="text-brand-lightMuted/40 dark:text-white/30">Enspired</span> Community
                </h2>
                
                <p className="max-w-2xl mx-auto lg:mx-0 text-brand-lightMuted dark:text-white/80 text-[15px] md:text-lg leading-relaxed font-light">
                  Join our mission to empower and inspire individuals globally. Whether you want to feature your brand, share an incredible story, explore sponsorship opportunities, or become a member of the Enspired community, we would love to collaborate with you. Let’s create something extraordinary together.
                </p>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0 relative">
                {/* Glowing aura behind button */}
                <div className="absolute inset-0 bg-brand-magenta rounded-full blur-[30px] opacity-20 dark:opacity-40 group-hover:opacity-40 dark:group-hover:opacity-60 transition-opacity duration-500"></div>
                
                <motion.a
                  href="mailto:enspiredmag@outlook.com"
                  className="relative flex items-center justify-center gap-3 px-8 sm:px-10 py-5 sm:py-6 rounded-full bg-gradient-to-r from-brand-purple hover:from-brand-magenta hover:to-brand-pink to-brand-magenta text-white font-sans font-semibold text-lg sm:text-xl tracking-wide shadow-[0_10px_40px_-10px_rgba(214,51,132,0.6)] transform transition-transform duration-300 hover:scale-105 active:scale-95"
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0 }}
                >
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
                  Get in Touch
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.a>
              </div>

            </div>
          </div>
        </FadeInOnScroll>
      </div>
    </section>
  );
};

export default Partner;
