import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const pulse = {
  initial: { opacity: 0.45 },
  animate: {
    opacity: [0.45, 0.75, 0.45],
    transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
  },
};

const RouteTransitionSkeleton = ({ visible = false }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[60] pointer-events-none md:hidden bg-white/92 dark:bg-brand-dark/92"
          aria-hidden="true"
        >
          <div className="pt-[5.35rem] px-5">
            <motion.div
              variants={pulse}
              initial="initial"
              animate="animate"
              className="h-9 w-[72%] rounded-md bg-brand-purple/10 dark:bg-white/10"
            />
            <motion.div
              variants={pulse}
              initial="initial"
              animate="animate"
              className="mt-3 h-9 w-[86%] rounded-md bg-brand-magenta/10 dark:bg-white/10"
            />
            <motion.div
              variants={pulse}
              initial="initial"
              animate="animate"
              className="mt-6 h-[220px] w-full rounded-2xl bg-brand-purple/8 dark:bg-white/8"
            />
            <motion.div
              variants={pulse}
              initial="initial"
              animate="animate"
              className="mt-6 h-4 w-[92%] rounded bg-brand-lightText/10 dark:bg-white/10"
            />
            <motion.div
              variants={pulse}
              initial="initial"
              animate="animate"
              className="mt-2 h-4 w-[84%] rounded bg-brand-lightText/10 dark:bg-white/10"
            />
            <motion.div
              variants={pulse}
              initial="initial"
              animate="animate"
              className="mt-8 h-11 w-[58%] rounded bg-brand-lightText/15 dark:bg-white/15"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RouteTransitionSkeleton;
