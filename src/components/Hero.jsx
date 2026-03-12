import React, { Suspense, lazy } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const HeroSpline = lazy(() => import('./HeroSpline'));

const Hero = () => {
  const { isDark } = useTheme();

  return (
    <section className="relative min-h-screen w-full flex items-center overflow-hidden" style={{ background: isDark ? '#000000' : 'var(--bg-hero)' }}>
      
      {/* Pure black background */}
      <div className="absolute inset-0 z-0" style={{ background: isDark ? '#000000' : 'var(--bg-hero)' }}></div>

      {/* Spline 3D - Full-screen interactive background */}
      <div className="absolute inset-0 z-[1] pointer-events-auto">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-brand-purple border-t-brand-magenta rounded-full animate-spin"></div>
          </div>
        }>
          <div className="w-full h-full relative">
            <HeroSpline />
            {/* Absolute block to physically cover the Spline logo */}
            <div
              className="absolute bottom-0 right-0 w-44 h-16 z-[100] pointer-events-none border-t border-l"
              style={{
                background: isDark ? '#000000' : 'var(--hero-spline-cover)',
                borderColor: isDark ? '#000000' : '#ede0ff',
              }}
            ></div>
          </div>
        </Suspense>
      </div>

      {/* Text content - pointer-events-none on wrapper so Spline stays interactive */}
      <div className="absolute inset-0 z-[2] pointer-events-none">
        {/* Soft gradient only on the left to keep text readable */}
        <div className="absolute inset-0" style={{ background: 'var(--hero-overlay-left)' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full min-h-screen flex items-center pt-24 md:pt-0 relative">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="flex flex-col space-y-6 max-w-xl pointer-events-auto"
          >
            <h1 className="text-5xl md:text-[5.5rem] font-sans font-medium text-gray-900 dark:text-white leading-[1.05] tracking-tight">
              A new era of <br className="hidden md:block"/> 
              editorial excellence
            </h1>
            
            <p className="text-base md:text-lg text-[#eb4d9c] max-w-md font-sans font-medium leading-relaxed">
              The world's most advanced digital magazine platform empowering voices, showcasing visions, and inspiring the modern world.
            </p>
            
            <div className="pt-4">
              <button className="bg-brand-dark text-white dark:bg-white dark:text-black px-10 py-4 font-bold uppercase tracking-widest text-sm hover:shadow-[0_0_30px_rgba(214,51,132,0.35)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:opacity-95 transition-all duration-300 cursor-pointer">
                Read Latest Issue
              </button>
            </div>
          </motion.div>
        </div>
      </div>


    </section>
  );
};

export default Hero;
