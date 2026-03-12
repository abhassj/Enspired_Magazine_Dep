import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-brand-dark/90 backdrop-blur-md pt-1 pb-1.5 shadow-lg' : 'bg-transparent pt-1.5 pb-2'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center -translate-y-0.5">
        {/* Logo */}
        <Link
          to="/"
          className="brand-logo-wrap"
          aria-label="GR Enspired Magazine home"
        >
          <BrandLogo
            className="h-20 md:h-24 lg:h-28"
            imageClassName="h-full w-auto"
            loading="eager"
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-[10px] md:text-xs font-bold tracking-[0.15em] text-gray-800 dark:text-white transition-colors">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.href} className="hover:text-black/70 dark:hover:text-brand-light/70 transition-colors drop-shadow-md uppercase">
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
          <button className="bg-brand-magenta/80 backdrop-blur-sm text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-brand-magenta transition-all shadow-[0_4px_14px_0_rgba(214,51,132,0.39)]">
            Subscribe
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle color mode"
            className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-white/80 dark:bg-white/10 backdrop-blur-sm flex items-center justify-center text-brand-lightText dark:text-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? 'moon-mobile' : 'sun-mobile'}
                initial={{ opacity: 0, rotate: -180, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 180, scale: 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {isDark ? <Moon size={17} /> : <Sun size={17} />}
              </motion.div>
            </AnimatePresence>
          </button>
          <button className="text-gray-800 dark:text-white drop-shadow-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
            className="absolute top-full left-0 w-full bg-white dark:bg-brand-dark/95 backdrop-blur-xl border-t border-gray-200 dark:border-white/10 p-6 md:hidden flex flex-col space-y-6 text-center"
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="brand-logo-wrap mx-auto"
              aria-label="GR Enspired Magazine home"
            >
              <BrandLogo
                className="h-20"
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
            <button className="bg-brand-magenta text-white px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm mt-4 max-w-xs mx-auto w-full shadow-lg">
              Subscribe
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
