import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

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

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'} ${isScrolled ? 'bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md pt-1 pb-1 shadow-lg' : 'bg-transparent pt-1 pb-1'}`}>
      <div className="max-w-7xl mx-auto px-4 md:px-12 flex justify-between items-center -translate-y-0.5">
        {/* Logo */}
        <Link
          to="/"
          className="brand-logo-wrap mt-1 -ml-2 md:-ml-4"
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
            <Link key={link.name} to={link.href} className="hover:text-brand-pink hover:drop-shadow-[0_0_8px_rgba(255,77,166,0.6)] dark:hover:drop-shadow-[0_0_10px_rgba(255,77,166,0.9)] transition-all duration-300 drop-shadow-sm uppercase">
              {link.name}
            </Link>
          ))}
          <button
            onClick={toggleTheme}
            aria-label="Toggle color mode"
            className="w-11 h-11 rounded-full border border-gray-200 dark:border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-brand-lightText dark:text-white hover:border-brand-magenta/60 transition-all"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'moon' : 'sun'}
                initial={{ opacity: 0, rotate: -180, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 180, scale: 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Moon size={18} /> : <Sun size={18} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color mode"
            className="w-9 h-9 rounded-full border border-gray-200 dark:border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-brand-lightText dark:text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'moon-mobile' : 'sun-mobile'}
                initial={{ opacity: 0, rotate: -180, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 180, scale: 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Moon size={15} /> : <Sun size={15} />}
              </motion.div>
            </AnimatePresence>
          </button>
          <button className="text-gray-800 dark:text-white drop-shadow-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-brand-dark/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 p-6 md:hidden flex flex-col space-y-5 text-center"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="brand-logo-wrap mx-auto"
              aria-label="GR Enspired Magazine home"
            >
              <BrandLogo
                className="h-12"
                imageClassName="h-full w-auto"
                loading="eager"
              />
            </Link>
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold tracking-[0.15em] text-gray-800 dark:text-white uppercase"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
