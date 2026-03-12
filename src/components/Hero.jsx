import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const HeroSpline = lazy(() => import('./HeroSpline'));

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden" style={{ background: isDark ? '#000000' : 'var(--bg-hero)' }}>
      
      {/* Pure background */}
      <div className="absolute inset-0 z-0" style={{ background: isDark ? '#000000' : 'var(--bg-hero)' }}></div>

      {/* Spline 3D - Hidden on mobile, shown on md+ */}
      <div 
        className="absolute inset-0 z-[1] pointer-events-auto hidden md:block"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 85px), calc(100% - 250px) calc(100% - 85px), calc(100% - 250px) 100%, 0 100%)',
          WebkitClipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 85px), calc(100% - 250px) calc(100% - 85px), calc(100% - 250px) 100%, 0 100%)'
        }}
      >
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-purple border-t-brand-magenta rounded-full animate-spin"></div>
          </div>
        }>
          <div className="w-full h-full relative">
            <HeroSpline />
          </div>
        </Suspense>
      </div>

      {/* Mobile background decoration — subtle gradient to replace the 3D sphere */}
      <div className="absolute inset-0 z-[1] md:hidden pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-[-20%] w-[80vw] h-[80vw] rounded-full bg-brand-purple/8 dark:bg-brand-purple/15 blur-[100px]"></div>
        <div className="absolute bottom-1/4 left-[-15%] w-[60vw] h-[60vw] rounded-full bg-brand-magenta/6 dark:bg-brand-magenta/10 blur-[80px]"></div>
      </div>

      {/* Text content */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Soft gradient only on the left to keep text readable — desktop only */}
        <div className="absolute inset-0 hidden md:block" style={{ background: 'var(--hero-overlay-left)' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full min-h-screen flex items-center pt-24 md:pt-0 relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col space-y-6 max-w-xl pointer-events-auto pt-4 md:pt-10 lg:pt-12"
          >
            <h1 className="text-[2.5rem] md:text-[4rem] lg:text-[4.5rem] font-sans font-bold text-brand-lightText dark:text-white leading-[1.05] tracking-tight mb-4 md:mb-6 mt-4 md:mt-8">
              Empowering <span className="text-brand-magenta">women</span> to <br className="hidden md:block"/> 
              dream, lead, <br className="hidden lg:block"/> and inspire.
            </h1>
            
            <p className="text-sm md:text-[1.1rem] text-brand-lightMuted dark:text-white/80 max-w-xl font-sans font-light leading-relaxed mb-4 border-l-4 border-brand-magenta pl-4 md:pl-6 text-justify sm:text-left">
              A global magazine celebrating the voices, journeys, and achievements of women in business and everyday life — sharing stories, knowledge, and opportunities that turn ambition into success.
            </p>
            
            <div className="pt-2 md:pt-4">
              <a 
                href="#issues"
                className="inline-block bg-brand-dark text-white dark:bg-white dark:text-black px-8 md:px-10 py-3.5 md:py-4 font-bold uppercase tracking-widest text-xs md:text-sm hover:shadow-[0_0_30px_rgba(214,51,132,0.35)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:opacity-95 transition-all duration-300 cursor-pointer"
              >
                Read Latest Issue
              </a>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
