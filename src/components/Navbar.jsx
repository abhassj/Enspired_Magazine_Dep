import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const isConstrainedNetwork = () => {
  if (typeof navigator === 'undefined') return false;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!connection) return false;

  return connection.saveData || ['slow-2g', '2g', '3g'].includes(connection.effectiveType);
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const contactRoutePrefetched = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open — use overflow hidden only (avoid position:fixed reflow)
  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.body.dataset.scrollY = scrollY;
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      const savedY = document.body.dataset.scrollY;
      if (savedY) {
        window.scrollTo(0, parseInt(savedY, 10));
        delete document.body.dataset.scrollY;
      }
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'CONTACT', href: '/contact' },
  ];

  const preloadRoute = useCallback((href) => {
    if (href !== '/contact' || contactRoutePrefetched.current || isConstrainedNetwork()) return;
    contactRoutePrefetched.current = true;
    void import('../pages/ContactPage');
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-white/92 dark:bg-brand-dark/90 backdrop-blur-md py-2 md:py-1 shadow-lg' : 'bg-transparent py-2 md:py-1'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center min-h-[72px] md:min-h-[84px]">
          
          {/* ═══ MOBILE LAYOUT: 3-column grid (theme | logo | hamburger) ═══ */}
          <div className="md:hidden grid grid-cols-[3rem_1fr_3rem] items-center w-full">
            {/* Left: Theme toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/20 bg-white/85 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-brand-lightText dark:text-white justify-self-start"
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Center: Brand Logo */}
            <Link
              to="/"
              className="brand-logo-wrap justify-self-center"
              aria-label="GR Enspired Magazine home"
            >
              <BrandLogo
                className="h-[52px] w-[116px]"
                imageClassName="h-full w-full"
                loading="eager"
              />
            </Link>

            {/* Right: Hamburger / Close — pure CSS icon swap, no AnimatePresence */}
            <button 
              className="w-11 h-11 flex items-center justify-center text-gray-800 dark:text-white drop-shadow-md justify-self-end" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* ═══ DESKTOP LAYOUT: Logo left, links right (unchanged) ═══ */}
          <Link
            to="/"
            className="brand-logo-wrap mt-1 -ml-2 md:-ml-4 hidden md:inline-flex"
            aria-label="GR Enspired Magazine home"
          >
            <BrandLogo
              className="h-14 md:h-[84px] lg:h-[100px]"
              imageClassName="h-full w-auto"
              loading="eager"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8 text-[10px] md:text-sm font-bold tracking-[0.1em] text-gray-800 dark:text-white transition-colors">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onMouseEnter={() => preloadRoute(link.href)}
                onFocus={() => preloadRoute(link.href)}
                className="hover:text-brand-pink hover:drop-shadow-[0_0_8px_rgba(255,77,166,0.6)] dark:hover:drop-shadow-[0_0_10px_rgba(255,77,166,0.9)] transition-all duration-300 drop-shadow-sm uppercase"
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={toggleTheme}
              aria-label="Toggle color mode"
              className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-brand-lightText dark:text-white hover:border-brand-magenta/60 transition-all"
            >
              {isDark ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ═══ MOBILE FULL-SCREEN OVERLAY MENU — Pure CSS transitions for 60fps ═══ */}
      {typeof document !== 'undefined' && createPortal(
        <div 
          className="fixed inset-0 md:hidden flex flex-col mobile-menu-overlay"
          style={{ 
            backgroundColor: isDark ? '#0a0510' : '#ffffff',
            zIndex: 9999,
            opacity: mobileMenuOpen ? 1 : 0,
            visibility: mobileMenuOpen ? 'visible' : 'hidden',
            pointerEvents: mobileMenuOpen ? 'auto' : 'none',
            transition: 'opacity 0.2s ease-out, visibility 0.2s ease-out',
            willChange: 'opacity',
          }}
          inert={!mobileMenuOpen ? '' : undefined}
        >
          {/* Top gradient accent */}
          <div className="h-[3px] w-full bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink shrink-0" />

          {/* Ambient glow — static, no animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div 
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full blur-[100px]"
              style={{ backgroundColor: isDark ? 'rgba(214,51,132,0.08)' : 'rgba(214,51,132,0.04)' }}
            />
            <div 
              className="absolute bottom-1/4 right-0 w-[200px] h-[200px] rounded-full blur-[80px]"
              style={{ backgroundColor: isDark ? 'rgba(92,45,145,0.08)' : 'rgba(92,45,145,0.04)' }}
            />
          </div>

          {/* Close button in top-right */}
          <button 
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center z-50 rounded-full border"
            style={{
              color: isDark ? '#ffffff' : '#1a0a2e',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            }}
            onClick={closeMobileMenu}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>

          {/* Navigation links centered in the screen */}
          <div className="flex-1 flex flex-col items-center justify-center gap-8 relative z-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={closeMobileMenu}
                className="relative text-3xl font-condensed font-bold uppercase tracking-[0.2em] block group"
                style={{ color: isDark ? '#ffffff' : '#1a0a2e' }}
              >
                {link.name}
                {/* Underline on hover/active */}
                <span className="block h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink transition-all duration-300 mt-1 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Brand logo at bottom */}
          <div className="pb-10 flex flex-col items-center gap-3 relative z-10">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="brand-logo-wrap"
              aria-label="GR Enspired Magazine home"
            >
              <BrandLogo
                className="h-16"
                imageClassName="h-full w-auto"
                loading="lazy"
              />
            </Link>
            <span 
              className="text-[9px] uppercase tracking-[0.3em] font-medium"
              style={{ color: isDark ? 'rgba(255,255,255,0.25)' : 'rgba(107,88,128,0.5)' }}
            >
              GR Enspired Magazine
            </span>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navbar;
