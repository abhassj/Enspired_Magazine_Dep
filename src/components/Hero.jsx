import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const HeroSpline = lazy(() => import('./HeroSpline'));

const getIsDesktopViewport = () => (
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(min-width: 768px)').matches
);

const Hero = () => {
  const { isDark } = useTheme();
  const [showSpline, setShowSpline] = useState(getIsDesktopViewport);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const syncSplineVisibility = (event) => {
      setShowSpline(event.matches);
    };

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncSplineVisibility);
      return () => mediaQuery.removeEventListener('change', syncSplineVisibility);
    }

    mediaQuery.addListener(syncSplineVisibility);
    return () => mediaQuery.removeListener(syncSplineVisibility);
  }, []);

  return (
    <section className="relative min-h-[92svh] md:min-h-screen w-full flex items-center overflow-hidden" style={{ background: isDark ? '#000000' : 'var(--bg-hero)' }}>
      
      {/* Pure background */}
      <div className="absolute inset-0 z-0" style={{ background: isDark ? '#000000' : 'var(--bg-hero)' }}></div>

      {/* Spline 3D: mount only on desktop to avoid zero-size WebGL framebuffers on mobile */}
      {showSpline && (
        <div
          className="absolute inset-0 z-[1] pointer-events-auto"
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
      )}

      {/* ═══ MOBILE ENHANCED BACKGROUND DECORATION ═══ */}
      <div className="absolute inset-0 z-[1] md:hidden pointer-events-none overflow-hidden">
        {/* Primary floating orb — larger, animated */}
        <div 
          className="absolute top-[15%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-brand-purple/12 via-brand-magenta/10 to-brand-pink/8 dark:from-brand-purple/20 dark:via-brand-magenta/15 dark:to-brand-pink/10 blur-[80px]"
          style={{ animation: 'float-glow 6s ease-in-out infinite' }}
        />
        {/* Secondary orb — bottom left */}
        <div 
          className="absolute bottom-[20%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-brand-magenta/8 to-brand-blue/6 dark:from-brand-magenta/15 dark:to-brand-blue/10 blur-[70px]"
          style={{ animation: 'float-glow 8s ease-in-out infinite 2s' }}
        />
        {/* Small accent orb top-left */}
        <div 
          className="absolute top-[40%] left-[10%] w-[25vw] h-[25vw] rounded-full bg-brand-pink/6 dark:bg-brand-pink/12 blur-[50px]"
          style={{ animation: 'float-glow 5s ease-in-out infinite 1s' }}
        />
      </div>

      {/* Text content */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Soft gradient only on the left to keep text readable — desktop only */}
        <div className="absolute inset-0 hidden md:block" style={{ background: 'var(--hero-overlay-left)' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full min-h-screen flex items-center pt-20 md:pt-0 relative">
          <motion.div 
            className="flex flex-col space-y-5 md:space-y-6 max-w-xl pointer-events-auto pt-2 md:pt-10 lg:pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Mobile brand accent */}
            <motion.div
              className="flex items-center gap-3 md:hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="h-[2px] w-8 bg-gradient-to-r from-brand-purple to-brand-magenta rounded-full" />
              <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-magic-gradient">GR Enspired</span>
            </motion.div>

            <motion.h1 
              className="text-[2.5rem] md:text-[4.2rem] lg:text-[5rem] font-condensed font-bold uppercase text-brand-lightText dark:text-white leading-[1.05] tracking-wide mb-2 md:mb-6 mt-2 md:mt-8"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Empowering <span className="text-magic-gradient">Individuals</span> to <br className="hidden md:block"/> 
              dream, lead, <br className="hidden lg:block"/> and inspire.
            </motion.h1>
            
            <motion.p 
              className="text-sm md:text-[1.1rem] text-brand-lightMuted dark:text-white/80 max-w-xl font-sans font-light leading-relaxed mb-3 md:mb-4 border-l-4 border-brand-magenta pl-4 md:pl-6 text-justify sm:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              A global magazine celebrating the voices, journeys, and achievements of Individuals in business and everyday life — sharing stories, knowledge, and opportunities that turn ambition into success.
            </motion.p>
            
            <motion.div 
              className="pt-1 md:pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <a 
                href="#issues"
                className="inline-block bg-brand-dark text-white dark:bg-white dark:text-black px-8 md:px-10 py-3.5 md:py-4 font-bold uppercase tracking-widest text-xs md:text-sm hover:shadow-[0_0_30px_rgba(214,51,132,0.35)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:opacity-95 transition-all duration-300 cursor-pointer md:cta-shimmer-off active:scale-95"
              >
                Read Latest Issue
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
