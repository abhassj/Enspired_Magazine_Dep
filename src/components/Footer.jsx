import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';
import BrandLogo from './BrandLogo';

const Footer = () => {
  return (
    <footer id="contact" className="pt-16 pb-10 relative z-20 overflow-hidden bg-white dark:bg-brand-dark">
      
      {/* Subtle top glow to transition nicely */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-brand-pink/50 blur-[2px]"></div>
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-magenta/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeInOnScroll direction="up">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-12 text-brand-lightText dark:text-white text-center md:text-left">
            
            <div className="max-w-sm flex flex-col items-center md:items-start">
              <a
                href="#"
                className="brand-logo-wrap mb-5"
                aria-label="GR Enspired Magazine home"
              >
                <BrandLogo
                  className="h-20 md:h-28"
                  imageClassName="h-full w-auto"
                  loading="lazy"
                />
              </a>
              <p className="text-brand-lightMuted dark:text-white/80 font-light mb-6 leading-relaxed text-sm md:text-base">
                Empowering voices, showcasing visions, and inspiring the modern world.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full bg-brand-lightText/10 dark:bg-white/10 border border-brand-lightText/20 dark:border-white/20 flex items-center justify-center text-brand-lightText dark:text-white hover:bg-brand-pink hover:text-white hover:border-brand-pink hover:shadow-[0_0_15px_rgba(255,77,166,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-lightText/10 dark:bg-white/10 border border-brand-lightText/20 dark:border-white/20 flex items-center justify-center text-brand-lightText dark:text-white hover:bg-brand-pink hover:text-white hover:border-brand-pink hover:shadow-[0_0_15px_rgba(255,77,166,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-brand-lightText/10 dark:bg-white/10 border border-brand-lightText/20 dark:border-white/20 flex items-center justify-center text-brand-lightText dark:text-white hover:bg-brand-pink hover:text-white hover:border-brand-pink hover:shadow-[0_0_15px_rgba(255,77,166,0.5)] transition-all duration-300 transform hover:-translate-y-1">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:gap-16 md:gap-24 w-full md:w-auto mt-4 md:mt-0">
              <div>
                <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-brand-lightText dark:text-white tracking-wide">Chapters</h4>
                <ul className="space-y-3 md:space-y-4 text-brand-lightMuted dark:text-white/70 font-light text-xs md:text-sm">
                  <li className="hover:text-brand-lightText dark:hover:text-white transition-colors cursor-pointer">South African Chapter</li>
                  <li className="hover:text-brand-lightText dark:hover:text-white transition-colors cursor-pointer">United Kingdom Chapter</li>
                </ul>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold mb-4 md:mb-6 text-brand-lightText dark:text-white tracking-wide">Contact</h4>
                <ul className="space-y-3 md:space-y-4 text-brand-lightMuted dark:text-white/70 font-light text-xs md:text-sm">
                  <li className="flex items-center justify-center md:justify-start space-x-3 hover:text-brand-lightText dark:hover:text-white transition-colors cursor-pointer">
                    <Mail size={16} className="text-brand-pink" />
                    <span>enspiredmag@gmail.com</span>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
        </FadeInOnScroll>
        
        <div className="border-t border-brand-lightText/10 dark:border-white/10 mt-16 md:mt-20 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-brand-lightMuted dark:text-white/40 font-medium tracking-widest uppercase text-center md:text-left gap-4 md:gap-0">
          <p>&copy; {new Date().getFullYear()} GR Enspired Magazine. All rights reserved.</p>
          <div className="flex space-x-6 md:space-x-8">
            <a href="#" className="hover:text-brand-lightText dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-lightText dark:hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Hide scrollbar class needed for native slider in Issues component */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />
    </footer>
  );
};

export default Footer;
