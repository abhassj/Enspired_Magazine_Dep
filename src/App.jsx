import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MissionVision from './components/MissionVision'
import Issues from './components/Issues'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import { ScrollProgress } from './components/ui/ScrollAnimations'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Preloader from './components/Preloader'
import { preloadSiteAssets } from './utils/preloadSiteAssets'
import RouteTransitionSkeleton from './components/RouteTransitionSkeleton'

const ContactPage = lazy(() => import('./pages/ContactPage'))

function RouteFallback() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark">
      <div className="md:hidden px-5 pt-[5.35rem]">
        <div className="h-9 w-[72%] rounded-md bg-brand-purple/10 dark:bg-white/10 animate-pulse" />
        <div className="mt-3 h-9 w-[86%] rounded-md bg-brand-magenta/10 dark:bg-white/10 animate-pulse" />
        <div className="mt-6 h-[220px] w-full rounded-2xl bg-brand-purple/8 dark:bg-white/8 animate-pulse" />
      </div>
    </div>
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
      <Hero />
      <MissionVision />
      <Issues />
      <Gallery />
      <Testimonials />
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

    setIsRouteTransitioning(true)
    const timerId = window.setTimeout(() => {
      setIsRouteTransitioning(false)
    }, 120)

    return () => window.clearTimeout(timerId)
  }, [location.pathname])

  useEffect(() => {
    let isMounted = true
    const minimumPreloaderMs = 500
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

  return (
    <>
      <Preloader isLoading={isLoading} progress={preloadProgress} />
      <div className={`${isDark ? 'dark' : ''} min-h-screen bg-white text-brand-lightText dark:bg-brand-dark dark:text-brand-light font-sans selection:bg-brand-magenta selection:text-white`}>
        <RouteTransitionSkeleton visible={isRouteTransitioning} />
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
