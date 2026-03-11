import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/90 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="text-xl md:text-2xl font-sans tracking-tight text-white drop-shadow-md">
          enspired.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8 text-[10px] md:text-xs font-bold tracking-[0.15em] text-white">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-brand-light/70 transition-colors drop-shadow-md uppercase">
              {link.name}
            </a>
          ))}
          <button className="bg-brand-magenta/80 backdrop-blur-sm text-white px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-brand-magenta transition-all shadow-[0_4px_14px_0_rgba(214,51,132,0.39)]">
            Subscribe
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white drop-shadow-md" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-brand-dark/95 backdrop-blur-xl border-t border-white/10 p-6 md:hidden flex flex-col space-y-6 text-center"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold tracking-[0.15em] text-white uppercase"
               >
                {link.name}
              </a>
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
