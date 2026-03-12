import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MissionVision from './components/MissionVision'
import Issues from './components/Issues'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import ContactPage from './pages/ContactPage'
import { ScrollProgress } from './components/ui/ScrollAnimations'
import { ThemeProvider, useTheme } from './context/ThemeContext'

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

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-white text-brand-lightText dark:bg-brand-dark dark:text-brand-light font-sans selection:bg-brand-magenta selection:text-white`}>
      <ScrollProgress />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </div>
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
