import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ isLoading, progress = 0 }) => {
  const normalizedProgress = Math.max(0, Math.min(1, progress));
  const percent = Math.round(normalizedProgress * 100);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-brand-dark overflow-hidden"
        >
          {/* Background Ambient Effect */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-magenta/5 rounded-full blur-[120px]" />
          </motion.div>

          <div className="relative flex flex-col items-center justify-center text-center">
            {/* Logo Container */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                transition: { duration: 1.2, ease: [0.4, 0, 0.2, 1] }
              }}
              className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center mb-12"
            >
              {/* Refined pulsing ring */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 border border-brand-magenta/20 rounded-full"
              />
              
              {/* Local Logo */}
              <img 
                src="/gr-favicon.svg" 
                alt="Enspired Logo" 
                className="w-full h-full object-contain relative z-10 p-4"
              />
            </motion.div>

            {/* Premium Loading Progress */}
            <div className="relative w-44 h-[2px] bg-gray-100 dark:bg-white/10 overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: normalizedProgress }}
                transition={{
                  duration: 0.25,
                  ease: "easeOut"
                }}
                className="absolute inset-y-0 left-0 origin-left bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink"
              />
            </div>

            <p className="mt-2 text-[10px] tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase">
              Loading {percent}%
            </p>

            {/* Enterprise Branding */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="mt-8 space-y-2"
            >
              <h2 className="text-xs font-semibold tracking-[0.4em] text-gray-900 dark:text-white uppercase opacity-80">
                Enspired Magazine
              </h2>
              <div className="h-[1px] w-4 mx-auto bg-brand-magenta/30" />
              <p className="text-[10px] font-medium tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
                Enterprise Excellence
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
