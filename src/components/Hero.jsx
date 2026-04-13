import React, { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { siteImageAssets } from '../config/cloudinaryAssets';

/* ─── Detect constrained network ─── */
const isConstrainedNetwork = () => {
  if (typeof navigator === 'undefined') return false;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return false;

  return connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType);
};

const getIsDesktopViewport = () => (
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(min-width: 768px)').matches
);

const getShouldRenderSpline = () => getIsDesktopViewport() && !isConstrainedNetwork();

/* ─── Lazy-load HeroSpline ONLY when called ─── */
let HeroSpline = null;
const getHeroSpline = () => {
  if (!HeroSpline) {
    HeroSpline = lazy(() => import('./HeroSpline'));
  }
  return HeroSpline;
};

const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

const Hero = () => {
  const { isDark } = useTheme();
  // Start with Spline OFF so the initial render stays cheap.
  // It only turns on after the page is interactive AND idle, which defers the
  // ~1.5MB Spline runtime chunk download past LCP on desktop.
  const [showSpline, setShowSpline] = useState(false);

  // Defer Spline mount until after first paint + idle time.
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (!getShouldRenderSpline()) return undefined;

    let cancelled = false;
    let idleHandle;
    let timeoutHandle;

    const mountWhenIdle = () => {
      if (cancelled) return;
      if (typeof window.requestIdleCallback === 'function') {
        idleHandle = window.requestIdleCallback(
          () => {
            if (!cancelled && getShouldRenderSpline()) setShowSpline(true);
          },
          { timeout: 1200 }
        );
      } else {
        timeoutHandle = window.setTimeout(() => {
          if (!cancelled && getShouldRenderSpline()) setShowSpline(true);
        }, 600);
      }
    };

    if (document.readyState === 'complete') {
      mountWhenIdle();
    } else {
      window.addEventListener('load', mountWhenIdle, { once: true });
    }

    return () => {
      cancelled = true;
      if (idleHandle && typeof window.cancelIdleCallback === 'function') {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle) window.clearTimeout(timeoutHandle);
      window.removeEventListener('load', mountWhenIdle);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const syncSplineVisibility = () => {
      // Only update when already-enabled — never downgrade from true to false mid-session
      // unless the device actively becomes ineligible.
      setShowSpline((prev) => (prev && !getShouldRenderSpline() ? false : prev));
    };

    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', syncSplineVisibility);
      if (connection && typeof connection.addEventListener === 'function') {
        connection.addEventListener('change', syncSplineVisibility);
      }

      return () => {
        mediaQuery.removeEventListener('change', syncSplineVisibility);
        if (connection && typeof connection.removeEventListener === 'function') {
          connection.removeEventListener('change', syncSplineVisibility);
        }
      };
    }

    mediaQuery.addListener(syncSplineVisibility);
    if (connection && typeof connection.addListener === 'function') {
      connection.addListener(syncSplineVisibility);
    }

    return () => {
      mediaQuery.removeListener(syncSplineVisibility);
      if (connection && typeof connection.removeListener === 'function') {
        connection.removeListener(syncSplineVisibility);
      }
    };
  }, []);

  // Get the lazy component only when needed (desktop only)
  const SplineComponent = showSpline ? getHeroSpline() : null;

  return (
    <section className="relative min-h-[100svh] md:min-h-screen w-full flex items-start md:items-center overflow-x-hidden md:overflow-hidden" style={{ background: isDark ? '#000000' : 'var(--bg-hero)' }}>
      
      {/* Pure background */}
      <div className="absolute inset-0 z-0" style={{ background: isDark ? '#000000' : 'var(--bg-hero)' }}></div>

      {/* Spline 3D: mount only on desktop to avoid zero-size WebGL framebuffers on mobile */}
      {showSpline && SplineComponent && (
        <div
          className="absolute inset-0 z-[1] pointer-events-auto"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 85px), calc(100% - 250px) calc(100% - 85px), calc(100% - 250px) 100%, 0 100%)',
            WebkitClipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 85px), calc(100% - 250px) calc(100% - 85px), calc(100% - 250px) 100%, 0 100%)'
          }}
        >
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-16 h-16 border-4 border-brand-purple border-t-brand-magenta rounded-full animate-spin"></div>
            </div>
          }>
            <div className="w-full h-full relative">
              <SplineComponent />
            </div>
          </Suspense>
        </div>
      )}

      {/* ═══ MOBILE ENHANCED BACKGROUND DECORATION ═══ */}
      {/* Static orbs on mobile — no CSS animation to save GPU */}
      <div className="absolute inset-0 z-[1] md:hidden pointer-events-none overflow-hidden">
        {/* Primary floating orb — static on mobile */}
        <div 
          className="absolute top-[15%] right-[-10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-brand-purple/12 via-brand-magenta/10 to-brand-pink/8 dark:from-brand-purple/20 dark:via-brand-magenta/15 dark:to-brand-pink/10 blur-[60px]"
          style={{ opacity: 0.5 }}
        />
        {/* Secondary orb — bottom left */}
        <div 
          className="absolute bottom-[20%] left-[-15%] w-[55vw] h-[55vw] rounded-full bg-gradient-to-tr from-brand-magenta/8 to-brand-blue/6 dark:from-brand-magenta/15 dark:to-brand-blue/10 blur-[50px]"
          style={{ opacity: 0.4 }}
        />
        {/* Small accent orb top-left */}
        <div 
          className="absolute top-[40%] left-[10%] w-[25vw] h-[25vw] rounded-full bg-brand-pink/6 dark:bg-brand-pink/12 blur-[40px]"
          style={{ opacity: 0.4 }}
        />
      </div>

      {/* Text content */}
      <div className="relative md:absolute inset-0 z-[2] pointer-events-none">
        {/* Soft gradient only on the left to keep text readable — desktop only */}
        <div className="absolute inset-0 hidden md:block" style={{ background: 'var(--hero-overlay-left)' }}></div>
        
        <div className="max-w-7xl mx-auto px-5 md:px-12 w-full min-h-[100svh] md:min-h-screen flex items-start md:items-center pt-[4.95rem] md:pt-0 pb-4 md:pb-0 relative">
          {isMobileDevice ? (
            /* ═══ MOBILE: Pure CSS animations — no Framer Motion overhead ═══ */
            <div 
              className="flex flex-col w-full max-w-xl pointer-events-auto pt-0 min-h-0"
              style={{ animation: 'mobile-fade-in 0.5s ease-out both' }}
            >
              <div className="space-y-3">
                {/* Mobile brand accent */}
                <div
                  className="flex items-center gap-3 md:hidden"
                  style={{ animation: 'mobile-fade-in-up 0.5s ease-out 0.15s both' }}
                >
                  <div className="h-[2px] w-8 bg-gradient-to-r from-brand-purple to-brand-magenta rounded-full" />
                  <span className="text-[9px] uppercase tracking-[0.3em] font-semibold text-magic-gradient">GR Enspired</span>
                </div>

                <div style={{ animation: 'mobile-fade-in-up 0.5s ease-out 0.2s both' }}>
                  <div className="relative mx-auto w-full max-w-[320px] sm:max-w-[350px] overflow-hidden rounded-[1.2rem] border border-white/12 bg-white/5 shadow-[0_16px_40px_-24px_rgba(214,51,132,0.65)]">
                    <img
                      src={siteImageAssets.heroImageMobile}
                      alt="Enspired Magazine issue highlights"
                      className="w-full h-auto max-h-[39svh] object-contain"
                      loading="eager"
                      decoding="async"
                      fetchPriority="high"
                      draggable="false"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/14 via-transparent to-transparent" />
                  </div>
                </div>

                <h1 
                  className="text-[2.1rem] sm:text-[2.5rem] font-condensed font-bold uppercase text-brand-lightText dark:text-white leading-[0.95] tracking-wide mb-1 mt-0"
                  style={{ animation: 'mobile-fade-in-up 0.5s ease-out 0.25s both' }}
                >
                  Empowering <span className="text-magic-gradient">Individuals</span> to <br className="hidden md:block"/> 
                  dream, lead, <br className="hidden lg:block"/> and inspire.
                </h1>
                
                <p 
                  className="text-[0.84rem] sm:text-[0.9rem] text-brand-lightMuted dark:text-white/80 max-w-[33ch] font-sans font-light leading-[1.42] mb-1 border-l-4 border-brand-magenta pl-4 text-left"
                  style={{ animation: 'mobile-fade-in-up 0.5s ease-out 0.3s both' }}
                >
                  A global magazine celebrating the voices, journeys, and achievements of Individuals in business and everyday life — sharing stories, knowledge, and opportunities that turn ambition into success.
                </p>
              </div>
              
              <div 
                className="pt-2 mt-4"
                style={{ 
                  paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))',
                  animation: 'mobile-fade-in-up 0.5s ease-out 0.35s both'
                }}
              >
                <a 
                  href="#issues"
                  className="inline-block bg-brand-dark text-white dark:bg-white dark:text-black px-7 py-3 font-bold uppercase tracking-[0.2em] text-[11px] hover:opacity-95 transition-all duration-300 cursor-pointer active:scale-95"
                >
                  Read Latest Issue
                </a>
              </div>
            </div>
          ) : (
            /* ═══ DESKTOP: Full Framer Motion experience (unchanged) ═══ */
            <motion.div 
              className="flex flex-col w-full max-w-xl pointer-events-auto pt-0 md:pt-10 lg:pt-12 min-h-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="space-y-3 md:space-y-6">
                <motion.h1 
                  className="text-[2.1rem] sm:text-[2.5rem] md:text-[4.2rem] lg:text-[5rem] font-condensed font-bold uppercase text-brand-lightText dark:text-white leading-[0.95] tracking-wide mb-1 md:mb-6 mt-0 md:mt-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                >
                  Empowering <span className="text-magic-gradient">Individuals</span> to <br className="hidden md:block"/> 
                  dream, lead, <br className="hidden lg:block"/> and inspire.
                </motion.h1>
                
                <motion.p 
                  className="text-[0.84rem] sm:text-[0.9rem] md:text-[1.1rem] text-brand-lightMuted dark:text-white/80 max-w-[33ch] md:max-w-xl font-sans font-light leading-[1.42] md:leading-relaxed mb-1 md:mb-4 border-l-4 border-brand-magenta pl-4 md:pl-6 text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  A global magazine celebrating the voices, journeys, and achievements of Individuals in business and everyday life — sharing stories, knowledge, and opportunities that turn ambition into success.
                </motion.p>
              </div>
              
              <motion.div 
                className="pt-2 md:pt-4 mt-4 md:mt-auto"
                style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <a 
                  href="#issues"
                  className="inline-block bg-brand-dark text-white dark:bg-white dark:text-black px-7 md:px-10 py-3 md:py-4 font-bold uppercase tracking-[0.2em] text-[11px] md:text-sm hover:shadow-[0_0_30px_rgba(214,51,132,0.35)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.8)] hover:opacity-95 transition-all duration-300 cursor-pointer md:cta-shimmer-off active:scale-95"
                >
                  Read Latest Issue
                </a>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>


    </section>
  );
};

export default Hero;
