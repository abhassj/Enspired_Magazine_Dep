import React, { Suspense, lazy, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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

const contactPageImport = () => import('./pages/ContactPage')
const ContactPage = lazy(contactPageImport)

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
      <Hero />
      <MissionVision />
      <Issues />
      <Partner />
      <Gallery />
      <Awards />
      <Testimonials />
      <Collaborations />
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
    }, 60)

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

  // Eagerly prefetch the Contact page chunk after initial load completes
  useEffect(() => {
    if (isLoading) return
    // After main content is visible, pre-warm Contact page JS chunk
    const timer = window.setTimeout(() => {
      void contactPageImport()
    }, 2000)
    return () => window.clearTimeout(timer)
  }, [isLoading])

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
