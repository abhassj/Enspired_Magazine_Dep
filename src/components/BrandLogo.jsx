import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const LIGHT_LOGO_SRC = '/logo.svg';
const DARK_LOGO_SRC = '/logo%20dark.svg';

// Shared spring-based transition — feels tactile and premium
const logoTransition = {
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
};

const BrandLogo = ({
  alt = 'GR Enspired Magazine',
  className = '',
  imageClassName = '',
  loading = 'eager',
}) => {
  const { isDark } = useTheme();

  return (
    <span className={`relative inline-block ${className}`} aria-label={alt} role="img">
      {/* Light logo — fades + shrinks out when going dark */}
      <motion.img
        src={LIGHT_LOGO_SRC}
        alt=""
        aria-hidden="true"
        animate={{
          opacity: isDark ? 0 : 1,
          scale: isDark ? 0.88 : 1,
        }}
        transition={logoTransition}
        className={`brand-logo ${imageClassName}`}
        loading={loading}
        decoding="async"
        style={{ willChange: 'opacity, transform' }}
      />
      {/* Dark logo — overlaid, grows + fades in when going dark */}
      <motion.img
        src={DARK_LOGO_SRC}
        alt=""
        aria-hidden="true"
        animate={{
          opacity: isDark ? 1 : 0,
          scale: isDark ? 1 : 0.88,
        }}
        transition={logoTransition}
        className={`brand-logo absolute inset-0 h-full w-full object-contain ${imageClassName}`}
        loading={loading}
        decoding="async"
        style={{ willChange: 'opacity, transform' }}
      />
    </span>
  );
};

export default BrandLogo;
