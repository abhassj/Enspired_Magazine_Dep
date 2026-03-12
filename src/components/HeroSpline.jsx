import Spline from '@splinetool/react-spline';
import { useCallback, useRef, useEffect, useState } from 'react';

export default function HeroSpline() {
  const containerRef = useRef(null);
  const MAX_TILT_DEG = 3.25;
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const syncReadyState = () => {
      const { width, height } = node.getBoundingClientRect();
      setIsReady(width > 0 && height > 0);
    };

    syncReadyState();

    if (typeof ResizeObserver === 'undefined') return;
    const resizeObserver = new ResizeObserver(syncReadyState);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

  // Preserve page scrolling when the cursor is over the 3D canvas.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onWheel = (event) => {
      event.preventDefault();
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
        const links = containerRef.current.querySelectorAll('a');
        links.forEach((link) => link.remove());
        const divs = containerRef.current.querySelectorAll('div > div');
        divs.forEach((div) => {
          if (div.querySelector('a') || div.textContent?.includes('Spline') || div.textContent?.includes('Built')) {
            div.remove();
          }
        });
      }
    }, 500);

    const timeout = setTimeout(() => clearInterval(interval), 10000);
    return () => { clearInterval(interval); clearTimeout(timeout); };
  }, []);

  const onLoad = useCallback(() => {
    if (containerRef.current) {
      const links = containerRef.current.querySelectorAll('a');
      links.forEach((link) => link.remove());
    }
  }, []);

  // Use CSS custom properties instead of React state to avoid re-renders on every pointer move
  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    const rotateY = (x - 0.5) * (MAX_TILT_DEG * 2);
    const rotateX = (0.5 - y) * (MAX_TILT_DEG * 2);

    const inner = event.currentTarget.querySelector('.hero-spline-inner');
    if (inner) {
      inner.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.012)`;
    }
  }, []);

  const handlePointerLeave = useCallback((event) => {
    const inner = event.currentTarget.querySelector('.hero-spline-inner');
    if (inner) {
      inner.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)';
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center relative [touch-action:pan-y]"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div
        className="hero-spline-inner w-full h-full"
        style={{
          transition: 'transform 0.2s ease-out',
          transform: 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale(1)',
          willChange: 'transform',
        }}
      >
        {isReady ? (
          <Spline
            scene="https://prod.spline.design/Tsz9wVB1naktNT-Q/scene.splinecode"
            onLoad={onLoad}
          />
        ) : (
          <div className="w-full h-full" aria-hidden="true" />
        )}
      </div>
    </div>
  );
}
