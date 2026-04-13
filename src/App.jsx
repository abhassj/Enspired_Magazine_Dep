import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { siteImageAssets } from './config/cloudinaryAssets'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MissionVision from './components/MissionVision'
import Issues from './components/Issues'
import Partner from './components/Partner'
import Gallery from './components/Gallery'
import Awards from './components/Awards'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import Collaborations from './components/Collaborations'
import { ScrollProgress } from './components/ui/ScrollAnimations'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Preloader from './components/Preloader'
import { preloadSiteAssets } from './utils/preloadSiteAssets'
import RouteTransitionSkeleton from './components/RouteTransitionSkeleton'

const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768

const contactPageImport = () => import('./pages/ContactPage.jsx')
const ContactPage = lazy(contactPageImport)

const legalInfoImport = () => import('./pages/LegalInfo.jsx')
const LegalInfo = lazy(legalInfoImport)

function RouteFallback() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark" />
  )
}

/* Scroll to top on route change */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function HomePage() {
  return (
    <>
      <Navbar />
      {/* Visually-hidden semantic header — provides crawlable text so Google
          surfaces the magazine's tagline, audience, and keywords even though
          the visible hero is image-heavy. Not a keyword stuff; matches the
          public Facebook/AI-overview description of the brand. */}
      <header className="sr-only" aria-hidden="false">
        <h1>GR Enspired Magazine — Dream. Lead. Inspire.</h1>
        <p>
          GR Enspired Magazine is a global media platform empowering women, men,
          and youth in business, startups, and SMEs. We highlight stories,
          bold ideas, and entrepreneurial journeys that inspire leadership and
          economic development worldwide, in both print and digital formats.
        </p>
      </header>
      <main>
        <Hero />
        <MissionVision />
        <Issues />
        <Partner />
        <Gallery />
        <Awards />
        <Testimonials />
        <Collaborations />
      </main>
      <Footer />
    </>
  )
}

function AppContent() {
  const { isDark } = useTheme()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [preloadProgress, setPreloadProgress] = useState(0)
  const [isRouteTransitioning, setIsRouteTransitioning] = useState(false)
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return undefined
    }

    // Mobile: Premium Route Transition UX
    // Displays the global Preloader until the destination page completes downloading and layout.
    if (isMobileDevice) {
      setIsLoading(true);
      setPreloadProgress(0.2);
      
      // Simulate fake network progress to keep the user engaged
      const prog1 = window.setTimeout(() => setPreloadProgress(0.5), 150);
      const prog2 = window.setTimeout(() => setPreloadProgress(0.85), 450);

      const targetPath = location.pathname;
      const isContact = targetPath === '/contact';
      const isPrivacy = targetPath === '/privacy-policy';
      
      // We block the preloader dismissal until a minimum visual duration (600ms) passes,
      // the JS chunk resolves, AND critically heavy UI assets (like CEO image) resolve.
      let componentPromise = Promise.resolve();
      if (isContact) componentPromise = contactPageImport();
      else if (isPrivacy) componentPromise = legalInfoImport();
      
      const ceoImagePromise = isContact ? new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve; // Safely resolve on error so we don't permablock
        img.src = siteImageAssets.ceoImage;
      }) : Promise.resolve();
      
      Promise.all([
        componentPromise,
        ceoImagePromise,
        new Promise(resolve => window.setTimeout(resolve, 800)) // Base buffer
      ]).then(() => {
        setPreloadProgress(1);
        window.setTimeout(() => setIsLoading(false), 150);
      });

      return () => {
        window.clearTimeout(prog1);
        window.clearTimeout(prog2);
      };
    }

    // Desktop: subtle 60ms skeleton transition (unchanged)
    setIsRouteTransitioning(true)
    const timerId = window.setTimeout(() => {
      setIsRouteTransitioning(false)
    }, 60)

    return () => window.clearTimeout(timerId)
  }, [location.pathname])

  useEffect(() => {
    let isMounted = true
    // Mobile keeps a brief minimum for a polished feel; desktop has no artificial floor
    // so content paints as soon as assets + fonts are ready.
    const minimumPreloaderMs = isMobileDevice ? 300 : 0
    const startedAt = Date.now()

    const waitForWindowLoad = document.readyState === 'complete'
      ? Promise.resolve()
      : new Promise((resolve) => {
          window.addEventListener('load', resolve, { once: true })
        })

    const runPreload = async () => {
      try {
        await Promise.all([
          waitForWindowLoad,
          preloadSiteAssets({
            onProgress: (value) => {
              if (isMounted) {
                setPreloadProgress(value)
              }
            },
          }),
        ])
      } finally {
        const elapsedMs = Date.now() - startedAt
        const remainingMs = Math.max(0, minimumPreloaderMs - elapsedMs)

        window.setTimeout(() => {
          if (isMounted) {
            setPreloadProgress(1)
            setIsLoading(false)
          }
        }, remainingMs)
      }
    }

    void runPreload()

    return () => {
      isMounted = false
    }
  }, [])

  // Eagerly prefetch the chunks after initial load completes
  // Mobile: prefetch sooner (500ms) for instant navigation
  useEffect(() => {
    if (isLoading) return
    const delay = isMobileDevice ? 500 : 2000
    const timer = window.setTimeout(() => {
      void contactPageImport()
      void legalInfoImport()
    }, delay)
    return () => window.clearTimeout(timer)
  }, [isLoading])

  return (
    <>
      <Preloader isLoading={isLoading} progress={preloadProgress} />
      <div className={`${isDark ? 'dark' : ''} min-h-screen max-w-[100vw] overflow-x-hidden bg-white text-brand-lightText dark:bg-brand-dark dark:text-brand-light font-sans selection:bg-brand-magenta selection:text-white`}>
        {/* Route transition skeleton — desktop only */}
        {!isMobileDevice && <RouteTransitionSkeleton visible={isRouteTransitioning} />}
        <ScrollProgress />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/contact"
            element={(
              <Suspense fallback={<RouteFallback />}>
                <ContactPage />
              </Suspense>
            )}
          />
          <Route
            path="/privacy-policy"
            element={(
              <Suspense fallback={<RouteFallback />}>
                <LegalInfo />
              </Suspense>
            )}
          />
        </Routes>
      </div>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App
