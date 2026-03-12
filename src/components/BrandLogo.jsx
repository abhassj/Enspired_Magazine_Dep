import React from 'react';
import { useTheme } from '../context/ThemeContext';

const LIGHT_LOGO_SRC = '/logo.svg';
const DARK_LOGO_SRC = '/logo%20dark.svg';

const BrandLogo = ({
  alt = 'GR Enspired Magazine',
  className = '',
  imageClassName = '',
  loading = 'eager',
}) => {
  const { isDark } = useTheme();

  return (
    <span className={`relative inline-block ${className}`} aria-label={alt} role="img">
      <img
        src={LIGHT_LOGO_SRC}
        alt=""
        aria-hidden="true"
        className={`brand-logo transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'} ${imageClassName}`}
        loading={loading}
        decoding="async"
      />
      <img
        src={DARK_LOGO_SRC}
        alt=""
        aria-hidden="true"
        className={`brand-logo absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
        loading={loading}
        decoding="async"
      />
    </span>
  );
};

export default BrandLogo;
