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
  const logoSrc = isDark ? DARK_LOGO_SRC : LIGHT_LOGO_SRC;

  return (
    <span className={`relative inline-block ${className}`}>
      <motion.img
        key={logoSrc}
        src={logoSrc}
        alt={alt}
        initial={false}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={logoTransition}
        className={`brand-logo h-full w-full object-contain ${imageClassName}`}
        loading={loading}
        decoding={loading === 'eager' ? 'sync' : 'async'}
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
        draggable="false"
        style={{ willChange: 'opacity, transform' }}
      />
    </span>
  );
};

export default BrandLogo;
