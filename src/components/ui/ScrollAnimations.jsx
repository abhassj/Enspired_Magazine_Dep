import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

/* ─── Detect mobile once at module load ─── */
const getIsMobile = () =>
  typeof window !== 'undefined' && window.innerWidth < 768;

// Fade-in on scroll with configurable direction
// Mobile: uses a lightweight CSS animation instead of Framer Motion JS
export const FadeInOnScroll = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const [isMobile] = useState(getIsMobile);

  // ─── MOBILE: Pure CSS animation, zero JS scroll overhead ───
  if (isMobile) {
    return (
      <div
        className={className}
        style={{
          animation: `mobile-fade-in-up 0.5s ease-out ${delay}s both`,
        }}
      >
        {children}
      </div>
    );
  }

  // ─── DESKTOP: Full Framer Motion experience (unchanged) ───
  return <FadeInDesktop direction={direction} delay={delay} className={className}>{children}</FadeInDesktop>;
};

const FadeInDesktop = ({ children, direction, delay, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  const variants = {
    up: { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } },
    down: { hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -30 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 30 }, visible: { opacity: 1, x: 0 } },
    scale: { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[direction]}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax section — content moves at a different rate than scroll
// Mobile: disabled (static rendering) for performance
export const ParallaxSection = ({ children, speed = 0.3, className = '' }) => {
  const [isMobile] = useState(getIsMobile);

  if (isMobile) {
    return <div className={`relative ${className}`}>{children}</div>;
  }

  return <ParallaxDesktop speed={speed} className={className}>{children}</ParallaxDesktop>;
};

const ParallaxDesktop = ({ children, speed, className }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 100, speed * -100]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
};

// Text reveal — characters or words animate in sequentially
export const TextReveal = ({ text, className = '', as: Tag = 'h2' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const words = text.split(' ');

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
          animate={isInView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
          transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
};

// Stagger children — each child animates in with a delay
// Mobile: renders children directly without stagger for performance
export const StaggerChildren = ({ children, staggerDelay = 0.1, className = '' }) => {
  const [isMobile] = useState(getIsMobile);

  if (isMobile) {
    return (
      <div className={className} style={{ animation: 'mobile-fade-in-up 0.5s ease-out both' }}>
        {children}
      </div>
    );
  }

  return <StaggerDesktop staggerDelay={staggerDelay} className={className}>{children}</StaggerDesktop>;
};

const StaggerDesktop = ({ children, staggerDelay, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
      className={className}
    >
      {React.Children.map(children, (child) => (
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Horizontal scroll-triggered progress bar
// Mobile: completely disabled (saves per-frame scaleX recalculations)
export const ScrollProgress = ({ className = '' }) => {
  const [isMobile] = useState(getIsMobile);

  if (isMobile) return null;

  return <ScrollProgressDesktop className={className} />;
};

const ScrollProgressDesktop = ({ className }) => {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      style={{ scaleX: scrollYProgress, transformOrigin: 'left' }}
      className={`fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink z-[100] ${className}`}
    />
  );
};
