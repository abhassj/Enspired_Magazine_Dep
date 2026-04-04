import React from 'react';
import { Instagram, Facebook, Mail } from 'lucide-react';

const WhatsAppIcon = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    style={{ strokeWidth: 0 }}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);
import { FadeInOnScroll } from './ui/ScrollAnimations';
import BrandLogo from './BrandLogo';
import { issuePdfAssets } from '../config/cloudinaryAssets';

const Footer = () => {
  return (
    <footer id="contact" className="pt-10 md:pt-16 pb-8 md:pb-10 relative z-20 overflow-hidden bg-white dark:bg-brand-dark">
      
      {/* Subtle top glow to transition nicely */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-full md:max-w-3xl h-[1px] bg-brand-pink/50 blur-[2px]"></div>
      <div className="absolute top-0 right-0 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-brand-magenta/10 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <FadeInOnScroll direction="up">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 md:gap-12 text-brand-lightText dark:text-white text-center md:text-left">
            
            <div className="max-w-sm flex flex-col items-center md:items-start">
              <a
                href="#"
                className="brand-logo-wrap mb-4 md:mb-5"
                aria-label="GR Enspired Magazine home"
              >
                <BrandLogo
                  className="h-20 md:h-36"
                  imageClassName="h-full w-auto"
                  loading="lazy"
                />
              </a>
              <p className="text-brand-lightMuted dark:text-white/80 font-light mb-5 md:mb-6 leading-relaxed text-xs md:text-base">
                Empowering voices, showcasing visions, and inspiring the modern world.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.instagram.com/enspiredmagazine1" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-lightText/10 dark:bg-white/10 border border-brand-lightText/20 dark:border-white/20 flex items-center justify-center text-brand-lightText dark:text-white hover:bg-brand-pink hover:text-white hover:border-brand-pink hover:shadow-[0_0_15px_rgba(255,77,166,0.5)] active:scale-90 active:bg-brand-pink transition-all duration-300 transform hover:-translate-y-1">
                  <Instagram size={18} />
                </a>
                <a href="https://www.facebook.com/enspiredwomen/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-brand-lightText/10 dark:bg-white/10 border border-brand-lightText/20 dark:border-white/20 flex items-center justify-center text-brand-lightText dark:text-white hover:bg-brand-pink hover:text-white hover:border-brand-pink hover:shadow-[0_0_15px_rgba(255,77,166,0.5)] active:scale-90 active:bg-brand-pink transition-all duration-300 transform hover:-translate-y-1">
                  <Facebook size={18} />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-16 md:gap-24 w-full md:w-auto mt-2 md:mt-0">
              <div>
                <h4 className="text-base md:text-lg font-bold mb-3 md:mb-6 text-brand-lightText dark:text-white tracking-wide">Digital Issues</h4>
                <ul className="space-y-3 md:space-y-4 text-brand-lightMuted dark:text-white/70 font-light text-xs md:text-sm">
                  <li className="hover:text-brand-lightText dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-2 md:gap-3 active:text-brand-pink" onClick={() => window.open(issuePdfAssets.issue03, '_blank')}>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple/70 shrink-0 shadow-[0_0_8px_rgba(92,45,145,0.6)]"></span>
                    <span className="truncate group-hover:text-brand-pink transition-colors">Issue 03</span>
                  </li>
                  <li className="hover:text-brand-lightText dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-2 md:gap-3 active:text-brand-pink" onClick={() => window.open(issuePdfAssets.issue08, '_blank')}>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-magenta/70 shrink-0 shadow-[0_0_8px_rgba(214,51,132,0.6)]"></span>
                    <span className="truncate group-hover:text-brand-pink transition-colors">Issue 08</span>
                  </li>
                  <li className="hover:text-brand-lightText dark:hover:text-white transition-colors cursor-pointer flex items-center justify-center sm:justify-start gap-2 md:gap-3 active:text-brand-pink" onClick={() => window.open(issuePdfAssets.issue09, '_blank')}>
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-pink/70 shrink-0 shadow-[0_0_8px_rgba(255,77,166,0.6)]"></span>
                    <span className="truncate group-hover:text-brand-pink transition-colors">Issue 09</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-base md:text-lg font-bold mb-3 md:mb-6 text-brand-lightText dark:text-white tracking-wide">Contact</h4>
                <ul className="space-y-3 md:space-y-4 text-brand-lightMuted dark:text-white/70 font-light text-xs md:text-sm">
                  <li className="flex items-center justify-center sm:justify-start space-x-3 hover:text-brand-lightText dark:hover:text-white transition-colors">
                    <Mail size={16} className="text-brand-pink shrink-0" />
                    <a href="mailto:enspiredmag@outlook.com">enspiredmag@outlook.com</a>
                  </li>
                  <li className="flex items-start justify-center sm:justify-start space-x-3 hover:text-brand-lightText dark:hover:text-white transition-colors">
                    <WhatsAppIcon size={16} className="text-[#25D366] shrink-0 mt-0.5" />
                    <div className="flex flex-col space-y-1 text-left">
                      <a href="https://wa.me/447825282654" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">UK: +44 78252 82654</a>
                      <a href="https://wa.me/27744613719" target="_blank" rel="noopener noreferrer" className="hover:text-[#25D366] transition-colors">SA: +27 74 461 3719</a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            
          </div>
        </FadeInOnScroll>
        
        <div className="border-t border-brand-lightText/10 dark:border-white/10 mt-10 md:mt-20 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] md:text-xs text-brand-lightMuted dark:text-white/40 font-medium tracking-widest uppercase text-center gap-3 md:gap-0">
          <p>&copy; {new Date().getFullYear()} GR Enspired Magazine. All rights reserved.</p>
          <div className="flex space-x-6 md:space-x-8">
            <span className="transition-colors">MADE WITH OBSESSION</span>
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
