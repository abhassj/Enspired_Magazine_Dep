import React from 'react';

const LOGO_SRC = 'GR_branding_final.svg';
const LOGO_WIDTH = 1181;
const LOGO_HEIGHT = 531;

const BrandLogo = ({
  alt = 'GR Enspired Magazine',
  className = '',
  imageClassName = '',
  loading = 'eager',
}) => {
  return (
    <span
      className={`relative inline-block min-w-fit ${className}`}
      style={{ aspectRatio: `${LOGO_WIDTH} / ${LOGO_HEIGHT}` }}
    >
      <img
        src={LOGO_SRC}
        alt={alt}
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        className={`brand-logo h-full w-full max-w-full object-contain select-none ${imageClassName}`}
        loading={loading}
        decoding={loading === 'eager' ? 'sync' : 'async'}
        fetchPriority={loading === 'eager' ? 'high' : 'auto'}
        style={{ imageRendering: '-webkit-optimize-contrast' }}
        draggable="false"
      />
    </span>
  );
};

export default BrandLogo;