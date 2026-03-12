import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const MissionVision = () => {
  return (
    <section id="mission" className="py-16 md:py-32 bg-white dark:bg-[#000000] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-0 w-[40vw] h-[40vw] bg-brand-purple/5 dark:bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-brand-magenta/5 dark:bg-brand-magenta/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Container for Side-by-Side Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 relative">
          
          {/* Vertical Divider Line for Large Screens */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gray-200 dark:via-white/10 to-transparent -translate-x-1/2"></div>

          {/* Left Column: Our Mission */}
          <div className="w-full relative z-10 pt-8 lg:pt-16 lg:pr-12">
            {/* Uses custom amount: 0.2 to trigger soon after scrolling into view */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,4rem)]">
                  <span className="block text-brand-lightText dark:text-white drop-shadow-sm">Our</span>
                  <span className="block text-brand-lightMuted/40 dark:text-white/30">Mission</span>
                </h2>
              </div>

              <div className="h-1.5 w-20 bg-gradient-to-r from-brand-purple to-brand-magenta mb-8 rounded-full shadow-[0_0_15px_rgba(214,51,132,0.4)]"></div>

              <p className="text-lg md:text-xl lg:text-[1.4rem] text-brand-magenta dark:text-brand-pink font-medium leading-relaxed mb-8">
                A magazine designed to educate, promote and enspire women in business and daily living through:
              </p>
              
              <ul className="space-y-6 text-base md:text-lg text-brand-lightText/80 dark:text-white/70 font-light leading-[1.8]">
                <li className="flex items-start group">
                  <span className="block w-2.5 h-2.5 mt-2 mr-5 bg-brand-magenta shrink-0 transform group-hover:rotate-45 transition-transform duration-300 shadow-[0_0_10px_rgba(214,51,132,0.3)]"></span>
                  <span>Business tips to crack the entrepreneurial journey, mentorship programmes unravelling access to finance - meet Financiers, through print media, fashion - meet Divas, Health and Beauty and more.</span>
                </li>
                <li className="flex items-start group">
                  <span className="block w-2.5 h-2.5 mt-2 mr-5 bg-brand-magenta shrink-0 transform group-hover:rotate-45 transition-transform duration-300 shadow-[0_0_10px_rgba(214,51,132,0.3)]"></span>
                  <span>Sharing success stories of youth and SME's (Small Micro Medium Enterprises).</span>
                </li>
                <li className="flex items-start group">
                  <span className="block w-2.5 h-2.5 mt-2 mr-5 bg-brand-magenta shrink-0 transform group-hover:rotate-45 transition-transform duration-300 shadow-[0_0_10px_rgba(214,51,132,0.3)]"></span>
                  <span>Mapping a gateway to success whilst creating new platforms.</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Right Column: Our Vision */}
          <div className="w-full relative z-10 pt-16 lg:pt-40 lg:pl-12">
             {/* Uses custom amount and margins to trigger distinctly after scrolling further down */}
             <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex flex-col mb-6">
                <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,4rem)]">
                  <span className="block text-brand-lightText dark:text-white drop-shadow-sm">Our</span>
                  <span className="block text-brand-lightMuted/40 dark:text-white/30">Vision</span>
                </h2>
              </div>
              
              <div className="h-1.5 w-20 bg-gradient-to-r from-brand-magenta to-brand-pink mb-8 rounded-full shadow-[0_0_15px_rgba(255,77,166,0.4)]"></div>

              <div className="relative">
                <p className="text-base md:text-lg lg:text-[1.2rem] text-brand-lightText/80 dark:text-white/70 font-light leading-[1.8] relative z-10">
                  <span className="text-brand-magenta font-semibold block mb-3 text-lg md:text-xl lg:text-[1.4rem]">To encourage women to be Brave &amp; Bold,</span> 
                  to never give up and never stop dreaming, turning their dreams into reality and achieving end goals.
                </p>
              </div>
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default MissionVision;
