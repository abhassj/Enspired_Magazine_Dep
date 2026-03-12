import Spline from '@splinetool/react-spline';
import { useCallback, useRef, useEffect, useState } from 'react';

export default function HeroSpline() {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const MAX_TILT_DEG = 3.25;
  const HOVER_SCALE = 1.012;
  const GLOW_SIZE_PX = 16;
  const GLOW_ALPHA = 0.24;

  // Preserve page scrolling when the cursor is over the 3D canvas.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onWheel = (event) => {
      event.preventDefault();

      // Match native scroll speed by converting wheel delta units to pixels.
      let deltaY = event.deltaY;
      if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
        deltaY *= 16;
      } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
        deltaY *= window.innerHeight;
      }

      window.scrollBy({ top: deltaY, left: 0, behavior: 'auto' });
    };

    node.addEventListener('wheel', onWheel, { passive: false, capture: true });
    return () => node.removeEventListener('wheel', onWheel, true);
  }, []);

  // Repeatedly check and hide the watermark since Spline injects it asynchronously
  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        // Find all anchor tags within the Spline container
        const links = containerRef.current.querySelectorAll('a');
        links.forEach((link) => {
          link.remove();
        });
        // Also find any divs that aren't the canvas wrapper
        const divs = containerRef.current.querySelectorAll('div > div');
        divs.forEach((div) => {
          if (div.querySelector('a') || div.textContent?.includes('Spline') || div.textContent?.includes('Built')) {
            div.remove();
          }
        });
      }
    }, 500);

    // Stop checking after 10 seconds
    const timeout = setTimeout(() => clearInterval(interval), 10000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  const onLoad = useCallback((splineApp) => {
    // Additional removal attempt after the scene fully loads
    if (containerRef.current) {
      const links = containerRef.current.querySelectorAll('a');
      links.forEach((link) => link.remove());
    }
  }, []);

  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * (MAX_TILT_DEG * 2);
    const rotateX = (0.5 - y) * (MAX_TILT_DEG * 2);
    setTilt({ x: rotateX, y: rotateY });
  }, [MAX_TILT_DEG]);

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative [touch-action:pan-y]"
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={() => {
        setIsHovered(false);
        resetTilt();
      }}
      onPointerMove={handlePointerMove}
    >
      <div
        className="w-full h-full transition-transform duration-200 ease-out"
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? HOVER_SCALE : 1})`,
          filter: isHovered ? `drop-shadow(0 0 ${GLOW_SIZE_PX}px rgba(29, 206, 228, ${GLOW_ALPHA}))` : 'none',
        }}
      >
        <Spline
          scene="https://prod.spline.design/Tsz9wVB1naktNT-Q/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
    </div>
  );
}
