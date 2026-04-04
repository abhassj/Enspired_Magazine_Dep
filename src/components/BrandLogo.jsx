import React from 'react';

const LOGO_SRC = '/GR_branding_final.svg';

const BrandLogo = ({
  alt = 'GR Enspired Magazine',
  className = '',
  imageClassName = '',
  loading = 'eager',
}) => {
  return (
    <span
      className={`relative inline-block min-w-fit ${className}`}
    >
      <img
        src={LOGO_SRC}
        alt={alt}
        className={`brand-logo h-full w-full max-w-full object-contain select-none ${imageClassName}`}
        loading={loading}
        decoding={loading === 'eager' ? 'sync' : 'async'}
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
        draggable="false"
      />
    </span>
  );
};

export default BrandLogo;