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

  // Lock body scroll when mobile menu is open
  // FIXED: Removed touchAction: 'none' which was swallowing first-tap touch events
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="brand-logo-wrap justify-self-center"
              aria-label="GR Enspired Magazine home"
            >
              <BrandLogo
                className="h-[52px] w-[116px]"
                imageClassName="h-full w-full"
                loading="eager"
              />
            </Link>

            {/* Right: Hamburger / Close — large touch target for reliable taps */}
            <button 
              className="w-12 h-12 min-h-[48px] flex items-center justify-center text-gray-800 dark:text-white drop-shadow-md justify-self-end" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>

          {/* ═══ DESKTOP LAYOUT: Logo left, links right (unchanged) ═══ */}
          <Link
            to="/"
            onClick={(e) => {
              if (window.location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
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

      {/* ═══ MOBILE FULL-SCREEN OVERLAY MENU ═══
           FIXED: Always mounted on mobile to prevent DOM thrashing cost.
           Toggles visibility via CSS composite layers for 60fps performance. */}
      {typeof document !== 'undefined' && createPortal(
        <div 
          className={`fixed inset-0 md:hidden flex flex-col transition-opacity duration-300 ${
            mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          style={{ 
            backgroundColor: isDark ? '#0a0510' : '#ffffff',
            zIndex: 9999,
          }}
        >
          {/* Top gradient accent */}
          <div className="h-[3px] w-full bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink shrink-0" />

{/* Ambient glow removed for maximum mobile menu performance */}

          {/* Close button in top-right */}
          <button 
            className="absolute top-4 right-4 w-12 h-12 min-h-[48px] flex items-center justify-center z-50 rounded-full border active:scale-90 active:bg-gray-100/10 transition-transform duration-100"
            style={{
              color: isDark ? '#ffffff' : '#1a0a2e',
              borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
              backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              WebkitTapHighlightColor: 'transparent',
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
                onClick={() => {
                  // Use setTimeout to ensure the background transitions start before heavy CPU routing
                  window.setTimeout(() => closeMobileMenu(), 50);
                }}
                className="relative text-3xl font-condensed font-bold uppercase tracking-[0.2em] block group active:scale-95 active:opacity-75 transition-all duration-150"
                style={{ 
                  color: isDark ? '#ffffff' : '#1a0a2e',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >
                {link.name}
                {/* Underline on hover/active */}
                <span className="block h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink transition-all duration-300 mt-1 rounded-full" />
              </Link>
            ))}
          </div>

          {/* Brand logo at bottom */}
          <div className="pb-10 flex flex-col items-center gap-3 relative z-10">
            <button
              onClick={() => {
                closeMobileMenu();
                window.location.href = '/';
              }}
              className="brand-logo-wrap active:scale-95 active:opacity-75 transition-all duration-150"
              aria-label="GR Enspired Magazine home"
            >
              <BrandLogo
                className="h-16"
                imageClassName="h-full w-auto"
                loading="lazy"
              />
            </button>
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
