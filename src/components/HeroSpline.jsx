import Spline from '@splinetool/react-spline';
import { useCallback, useRef, useEffect } from 'react';

export default function HeroSpline() {
  const containerRef = useRef(null);

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

  return (
    <div ref={containerRef} className="w-full h-full flex items-center justify-center relative">
      <Spline 
        scene="https://prod.spline.design/Tsz9wVB1naktNT-Q/scene.splinecode" 
        onLoad={onLoad}
      />
    </div>
  );
}
