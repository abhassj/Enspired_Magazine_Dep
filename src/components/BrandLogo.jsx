import React from 'react';

const LOGO_SRCSET = '/GR_branding_final.webp 1x, /GR_branding_final@2x.webp 2x';
const LOGO_PNG_FALLBACK = '/GR_branding_final.png';

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
      <picture>
        {/* High-DPI (retina/mobile) gets the 2400w asset so edges stay crisp
            on light backgrounds — fixes the mobile light-mode blur. */}
        <source
          type="image/webp"
          srcSet={LOGO_SRCSET}
        />
        <img
          src={LOGO_PNG_FALLBACK}
          alt={alt}
          className={`brand-logo h-full w-full max-w-full object-contain select-none ${imageClassName}`}
          loading={loading}
          decoding={loading === 'eager' ? 'sync' : 'async'}
          fetchPriority={loading === 'eager' ? 'high' : 'auto'}
          draggable="false"
        />
      </picture>
    </span>
  );
};

export default BrandLogo;
