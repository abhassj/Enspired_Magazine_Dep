import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MissionVision from './components/MissionVision'
import Issues from './components/Issues'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import Testimonials from './components/Testimonials'
import { ScrollProgress } from './components/ui/ScrollAnimations'
import { ThemeProvider, useTheme } from './context/ThemeContext'

function AppContent() {
  const { isDark } = useTheme()

  return (
    <div className={`${isDark ? 'dark' : ''} min-h-screen bg-white text-brand-lightText dark:bg-brand-dark dark:text-brand-light font-sans selection:bg-brand-magenta selection:text-white`}>
      {/* Scroll progress bar at the very top */}
      <ScrollProgress />
      <Navbar />
      <Hero />
      <MissionVision />
      <Issues />
      <Gallery />
      <Testimonials />
      <Footer />
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App
