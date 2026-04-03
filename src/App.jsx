import React, { Suspense, lazy, useEffect, useState } from 'react'
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
import ceoImage from './assets/Ceo-final.png'

const ContactPage = lazy(() => import('./pages/ContactPage'))

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
      <Gallery />
      <Testimonials />
      <Footer />
    </>
  )
}

function AppContent() {
  const { isDark } = useTheme()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const preloadContactRoute = () => {
      void import('./pages/ContactPage')

      const heroImage = new Image()
      heroImage.decoding = 'async'
      heroImage.src = ceoImage
    }

    if (typeof window === 'undefined') return undefined

    if ('requestIdleCallback' in window) {
      const idleId = window.requestIdleCallback(preloadContactRoute, { timeout: 1500 })
      return () => window.cancelIdleCallback(idleId)
    }

    const timeoutId = window.setTimeout(preloadContactRoute, 500)
    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    // Check if document is already loaded
    if (document.readyState === 'complete') {
      setIsLoading(false)
    } else {
      const handleLoad = () => {
        // Add a slight delay for aesthetic smoothness
        setTimeout(() => setIsLoading(false), 1000)
      }
      window.addEventListener('load', handleLoad)
      return () => window.removeEventListener('load', handleLoad)
    }
  }, [])

  return (
    <>
      <Preloader isLoading={isLoading} />
      <div className={`${isDark ? 'dark' : ''} min-h-screen bg-white text-brand-lightText dark:bg-brand-dark dark:text-brand-light font-sans selection:bg-brand-magenta selection:text-white`}>
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
