import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';
import { motion } from 'framer-motion';

const issues = [
  {
    id: 1,
    title: 'The Power Edition',
    year: '2025',
    category: 'CULTURE & LEADERSHIP',
    description: 'Exploring the influential voices shaping our generation — leaders, creators, and visionaries redefining what power means today.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Voices of Tomorrow',
    year: '2024',
    category: 'INNOVATION',
    description: 'A deep dive into the next generation of changemakers — young innovators, activists, and artists building a brighter future.',
    image: 'https://images.unsplash.com/photo-1542156822-6924d1a71ace?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Creative Minds',
    year: '2024',
    category: 'ART & DESIGN',
    description: 'Celebrating the intersection of art, design, and technology — where creative brilliance meets modern innovation.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Tech Horizons',
    year: '2024',
    category: 'TECHNOLOGY',
    description: 'A dedicated look into the emerging technologies transforming our future — from AI breakthroughs to green energy solutions.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'Sustainable Futures',
    year: '2023',
    category: 'ENVIRONMENT',
    description: 'Examining the brands, businesses, and leaders pioneering sustainable practices and fighting for a greener tomorrow.',
    image: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=800&auto=format&fit=crop',
  }
];

const Issues = () => {
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);
  const firstCardRef = useRef(null);

  // Measure card width on mount and resize
  useEffect(() => {
    const measureCard = () => {
      if (firstCardRef.current) {
        // card width + gap (24px for gap-6)
        setCardWidth(firstCardRef.current.offsetWidth + 24);
      }
    };
    
    measureCard();
    window.addEventListener('resize', measureCard);
    return () => window.removeEventListener('resize', measureCard);
  }, []);

  const next = () => {
    setCurrent(prev => {
      const step = window.innerWidth >= 768 ? 3 : 1;
      return Math.min(prev + step, issues.length - (window.innerWidth >= 768 ? 3 : 1));
    });
  };

  const prev = () => {
    setCurrent(p => {
      const step = window.innerWidth >= 768 ? 3 : 1;
      return Math.max(p - step, 0);
    });
  };

  // Auto-scroll logic via Framer Motion translation
  useEffect(() => {
    if (isHovered) return; // Pause on hover

    const timer = setInterval(() => {
      setCurrent(prev => {
        const isDesktop = window.innerWidth >= 768;
        const step = isDesktop ? 3 : 1;
        // max visible items the container can hold vs the total
        const maxIndex = Math.max(0, issues.length - (isDesktop ? 3 : 1));
        
        // Loop back to 0 if at the end
        if (prev >= maxIndex) {
          return 0;
        }
        return Math.min(prev + step, maxIndex);
      });
    }, 3000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const xPosition = -(current * cardWidth);

  return (
    <section id="issues" className="py-24 bg-white dark:bg-brand-dark relative z-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <FadeInOnScroll direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
          <div className="flex flex-col space-y-2">
            <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,3.5rem)]">
              <span className="block text-brand-lightText dark:text-white drop-shadow-sm">Recent</span>
              <span className="block text-brand-lightMuted/40 dark:text-white/30">Issues</span>
            </h2>
            <p className="text-brand-pink text-lg md:text-xl font-light mt-4">Explore our latest magazine editions</p>
          </div>
          <button className="hidden md:flex items-center space-x-2 text-brand-magenta hover:text-brand-lightText dark:hover:text-white transition-colors group mt-6 md:mt-0">
            <span className="text-sm font-semibold uppercase tracking-wider">View All Archive</span>
            <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </button>
        </FadeInOnScroll>

        {/* Framer Motion Butter Smooth Slider */}
        <div 
          className="relative group overflow-hidden pb-12"
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div 
            className="flex gap-6 w-max cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={containerRef}
            dragElastic={0.1}
            animate={{ x: xPosition }}
            transition={{ type: "spring", stiffness: 70, damping: 20, mass: 1 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              const swipeThreshold = 5000;
              const isDesktop = window.innerWidth >= 768;
              const step = isDesktop ? 3 : 1;
              const maxIndex = Math.max(0, issues.length - (isDesktop ? 3 : 1));

              if (swipe < -swipeThreshold) {
                // Swipe left -> Next
                setCurrent(p => Math.min(p + step, maxIndex));
              } else if (swipe > swipeThreshold) {
                // Swipe right -> Prev
                setCurrent(p => Math.max(p - step, 0));
              }
            }}
          >
            {issues.map((issue, index) => (
              <div 
                key={issue.id} 
                ref={index === 0 ? firstCardRef : null}
                className="shrink-0 w-[85vw] md:w-[400px] flex flex-col bg-white dark:bg-[#0d0714] border border-gray-100 dark:border-white/10 hover:border-brand-magenta/40 rounded-2xl overflow-hidden group/card transition-shadow duration-500 shadow-lg dark:shadow-none hover:shadow-[0_8px_30px_rgba(235,77,156,0.1)] relative"
              >
                {/* Header Image Area */}
                <div className="relative h-64 overflow-hidden bg-black dark:bg-black">
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-lightCard dark:from-[#0d0714] to-transparent z-10 opacity-90 h-full w-full bottom-0 pointer-events-none"></div>
                  <img 
                    src={issue.image} 
                    alt={issue.title} 
                    className="w-full h-full object-cover transform group-hover/card:scale-105 transition-transform duration-700 opacity-80 pointer-events-none" 
                  />
                  <div className="absolute top-5 right-5 z-20 pointer-events-none">
                    <span className="bg-white/80 dark:bg-white/10 backdrop-blur-md text-brand-lightText dark:text-white/90 text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest border border-gray-200 dark:border-white/20">
                      {issue.year}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-8 flex flex-col flex-grow relative z-20 -mt-10">
                  <span className="text-brand-magenta text-xs font-bold uppercase tracking-[0.2em] mb-3 inline-block">
                    {issue.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-snug group-hover/card:text-brand-magenta transition-colors duration-300">
                    {issue.title}
                  </h3>
                  <p className="text-brand-lightMuted dark:text-white/60 text-sm leading-relaxed mb-8 line-clamp-3">
                    {issue.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <span className="text-brand-lightMuted/70 dark:text-white/40 text-sm font-mono tracking-wider">
                      ISSUE #{String(issue.id).padStart(2, '0')}
                    </span>
                    <button className="w-10 h-10 rounded-full border border-gray-200 dark:border-white/20 bg-white/80 dark:bg-transparent flex items-center justify-center text-brand-lightText/70 dark:text-white/70 group-hover/card:bg-brand-magenta group-hover/card:border-brand-magenta group-hover/card:text-white transition-all duration-300 pointer-events-auto">
                      <ArrowRight size={18} className="transform group-hover/card:-rotate-45 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-8 relative z-30 pointer-events-auto">
            <div className="flex items-center space-x-2">
              <button 
                onClick={prev} 
                disabled={current === 0}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${current === 0 ? 'border-gray-100 dark:border-white/5 text-brand-lightMuted/40 dark:text-white/20 cursor-not-allowed bg-transparent' : 'border-gray-200 dark:border-white/15 text-brand-lightText/80 dark:text-white/80 hover:text-brand-lightText dark:hover:text-white hover:border-gray-300 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer'}`}
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={next} 
                disabled={current >= issues.length - (window.innerWidth >= 768 ? 3 : 1)}
                className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${current >= issues.length - (window.innerWidth >= 768 ? 3 : 1) ? 'border-gray-100 dark:border-white/5 text-brand-lightMuted/40 dark:text-white/20 cursor-not-allowed bg-transparent' : 'border-gray-200 dark:border-white/15 text-brand-lightText/80 dark:text-white/80 hover:text-brand-lightText dark:hover:text-white hover:border-gray-300 dark:hover:border-white/40 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer'}`}
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-2 hidden md:flex">
              {issues.map((_, index) => {
                // Determine visible bullets based on steps (only 0 and 3 are valid starting indices if step is 3 and length is 5)
                const isDesktop = window.innerWidth >= 768;
                const step = isDesktop ? 3 : 1;
                if (index % step !== 0 && index !== issues.length - (isDesktop ? 3 : 1)) {
                  // If we don't land exactly on this index during stepping, we can still show a bullet or hide it.
                  // For a clean look with 3-item steps, it's often better to just have a fixed number of 'pages'
                  // Actually, let's just make it simple and keep all of them clickable, OR just highlight the closest.
                }

                // Simplified indicator logic: highlight if the current index passes this index
                const isActive = index === current;
                
                return (
                  <button
                    key={index}
                    onClick={() => setCurrent(Math.min(index, issues.length - (isDesktop ? 3 : 1)))}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      isActive ? 'w-8 bg-brand-magenta' : 'w-2 bg-gray-300 dark:bg-white/20 hover:bg-gray-500/60 dark:hover:bg-white/40'
                    }`}
                  />
                 );
              })}
            </div>
            
            <div className="md:hidden flex space-x-2">
               {issues.map((_, index) => (
                <div
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === current ? 'w-6 bg-brand-magenta' : 'w-1.5 bg-gray-300 dark:bg-white/20'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Issues;
