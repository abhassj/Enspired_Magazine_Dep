import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import MissionVision from './components/MissionVision'
import Issues from './components/Issues'
import Gallery from './components/Gallery'
import Footer from './components/Footer'
import { ScrollProgress } from './components/ui/ScrollAnimations'

function App() {
  return (
    <div className="min-h-screen bg-brand-dark font-sans text-brand-light selection:bg-brand-magenta selection:text-white">
      {/* Scroll progress bar at the very top */}
      <ScrollProgress />
      <Navbar />
      <Hero />
      <MissionVision />
      <Issues />
      <Gallery />
      <Footer />
    </div>
  )
}

export default App
