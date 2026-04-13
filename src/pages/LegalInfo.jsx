import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Shield } from 'lucide-react';
import { usePageMeta } from '../utils/usePageMeta';

const LegalInfo = () => {
  usePageMeta({
    title: 'Privacy Policy | GR Enspired Magazine',
    description:
      'GR Enspired Magazine privacy policy — how we collect, use, and protect your data, including our use of Google Analytics and GDPR compliance.',
    canonical: 'https://www.grenspired.com/privacy-policy',
    ogTitle: 'Privacy Policy | GR Enspired Magazine',
    ogDescription:
      'Our privacy policy covering data collection, cookies, Google Analytics, and your rights under GDPR.',
    ogUrl: 'https://www.grenspired.com/privacy-policy',
    robots: 'noindex, follow',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="relative min-h-screen bg-white dark:bg-brand-dark overflow-hidden pt-24 md:pt-32 pb-16 md:pb-24">
        
        {/* Ambient Glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-1/4 w-[300px] h-[300px] rounded-full bg-brand-purple/[0.04] dark:bg-brand-purple/[0.02] blur-[80px]" />
          <div className="absolute bottom-40 right-1/4 w-[400px] h-[400px] rounded-full bg-brand-magenta/[0.04] dark:bg-brand-magenta/[0.02] blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 md:px-12 z-10">
          
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield size={18} className="text-brand-magenta" />
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-magic-gradient inline-block">
                Legal Information
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-condensed font-extrabold uppercase text-brand-lightText dark:text-white tracking-wide mb-4">
              Privacy Policy
            </h1>
            <div className="h-[2px] w-16 bg-gradient-to-r from-brand-purple to-brand-pink mx-auto" />
          </div>

          {/* Content Wrapper */}
          <div className="bg-white/70 dark:bg-white/[0.02] backdrop-blur-md border border-gray-200/60 dark:border-white/[0.05] rounded-3xl p-6 md:p-10 lg:p-12 shadow-sm">
            
            <div className="space-y-10 text-brand-lightMuted dark:text-white/70 font-light leading-relaxed text-sm md:text-base">
              
              <section>
                <h2 className="text-lg md:text-xl font-bold font-condensed text-brand-lightText dark:text-white tracking-wider uppercase mb-3">1. Introduction</h2>
                <p>
                  We respect your privacy and are committed to protecting any information collected through this website. This Privacy Policy explains our practices.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-condensed text-brand-lightText dark:text-white tracking-wider uppercase mb-3">2. What Data Is Collected</h2>
                <p>
                  We may collect non-personal information such as browser type, pages visited, time spent, and general location data. This data is collected passively as you interact with our platform.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-condensed text-brand-lightText dark:text-white tracking-wider uppercase mb-3">3. Google Analytics Usage</h2>
                <p>
                  We use Google Analytics to understand how visitors interact with our website. Google Analytics may collect information such as your IP address, device information, and browsing behavior. 
                  <br /><br />
                  This data is used only for improving website performance and user experience.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-condensed text-brand-lightText dark:text-white tracking-wider uppercase mb-3">4. No Active Data Collection</h2>
                <p>
                  We do not collect personal information directly unless you choose to contact us via the provided contact details.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-condensed text-brand-lightText dark:text-white tracking-wider uppercase mb-3">5. Third-Party Services</h2>
                <p>
                  We rely on third-party services such as Google Analytics which may process data in accordance with their own privacy policies.
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-condensed text-brand-lightText dark:text-white tracking-wider uppercase mb-3">6. Contact Info</h2>
                <p>
                  If you have any questions, contact us at:{' '}
                  <a href="mailto:enspiredmag@outlook.com" className="text-brand-magenta hover:text-brand-pink transition-colors break-all">
                    enspiredmag@outlook.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-lg md:text-xl font-bold font-condensed text-brand-lightText dark:text-white tracking-wider uppercase mb-3">7. Updates Clause</h2>
                <p>
                  We may update this policy from time to time to adhere to new regulations or to reflect modifications to our practices.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LegalInfo;
