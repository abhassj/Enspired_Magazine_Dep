import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const MissionVision = () => {
  return (
    <section id="mission" className="py-24 md:py-32 bg-[#000000] relative overflow-hidden">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-brand-purple/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-magenta/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Block 1: Our Vision (Image Left, Text Right) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-32 md:mb-48">
          
          {/* Left Side: Parallax Image */}
          <div className="w-full lg:w-1/2 relative group">
            <RevealBox direction="right">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-square bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(143,26,74,0.15)]">
                <ParallaxImage 
                  src="/enspired_vision.png" 
                  alt="Enspired Vision - Futuristic City"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </RevealBox>
          </div>

          {/* Right Side: Vision Text */}
          <div className="w-full lg:w-1/2">
            <RevealBox delay={0.2} direction="up">
              <div className="flex items-center space-x-4 mb-6">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Our Vision</h2>
              </div>
              
              <div className="h-1 w-20 bg-gradient-to-r from-brand-magenta to-brand-pink mb-8 rounded-full"></div>

              <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light leading-[1.6] tracking-wide">
                <span className="text-brand-pink font-semibold">To encourage women to be Brave &amp; Bold</span>, to never give up and never stop dreaming, turning their dreams into reality and achieving end goals.
              </p>
            </RevealBox>
          </div>
        </div>


        {/* Block 2: Our Mission (Text Left, Image Right) */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Side: Mission Text */}
          <div className="w-full lg:w-1/2 mt-12 lg:mt-0">
            <RevealBox direction="up">
              <div className="flex items-center space-x-4 mb-6">
                <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Our Mission</h2>
              </div>

              <div className="h-1 w-20 bg-gradient-to-r from-brand-purple to-brand-magenta mb-8 rounded-full"></div>

              <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed mb-8">
                A magazine designed to educate, promote and enspire women in business and daily living through:
              </p>
              
              <ul className="space-y-6 text-lg md:text-xl text-white/70 font-light leading-[1.7]">
                <li className="flex items-start group">
                  <span className="block w-2.5 h-2.5 mt-2.5 mr-5 bg-brand-magenta shrink-0 transform group-hover:rotate-45 transition-transform duration-300"></span>
                  <span>Business tips to crack the entrepreneurial journey, mentorship programmes unravelling access to finance - meet Financiers, through print media, fashion - meet Divas, Health and Beauty and more.</span>
                </li>
                <li className="flex items-start group">
                  <span className="block w-2.5 h-2.5 mt-2.5 mr-5 bg-brand-magenta shrink-0 transform group-hover:rotate-45 transition-transform duration-300"></span>
                  <span>Sharing success stories of youth and SME's (Small Micro Medium Enterprises).</span>
                </li>
                <li className="flex items-start group">
                  <span className="block w-2.5 h-2.5 mt-2.5 mr-5 bg-brand-magenta shrink-0 transform group-hover:rotate-45 transition-transform duration-300"></span>
                  <span>Mapping a gateway to success whilst creating new platforms.</span>
                </li>
              </ul>
            </RevealBox>
          </div>

          {/* Right Side: Parallax Image */}
          <div className="w-full lg:w-1/2 relative group">
            <RevealBox delay={0.2} direction="left">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] md:aspect-square bg-white/5 border border-white/10 shadow-[0_0_50px_rgba(92,45,145,0.2)]">
                <ParallaxImage 
                  src="/enspired_mission.png" 
                  alt="Enspired Mission - Blueprint Table"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </RevealBox>
          </div>

        </div>

      </div>
    </section>
  );
};

// Reusable animated container for sliding/fading elements into view
const RevealBox = ({ children, direction = "up", delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: { 
      opacity: 0, 
      y: direction === "up" ? 60 : 0, 
      x: direction === "left" ? 60 : direction === "right" ? -60 : 0,
      filter: "blur(10px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      x: 0, 
      filter: "blur(0px)",
      transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

// Subtle internal image parallax effect
const ParallaxImage = ({ src, alt }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className="w-full h-full overflow-hidden">
      <motion.img 
        style={{ y, scale: 1.15 }}
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MissionVision;
