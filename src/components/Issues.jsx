import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';
import { motion } from 'framer-motion';
import { issueCoverAssets, issuePdfAssets } from '../config/cloudinaryAssets';

const issues = [
  {
    id: 9,
    title: 'Enspired Women Magazine - COVID19',
    category: 'INSPIRATIONAL',
    description: 'COVID-era stories honoring frontline heroes, resilience, and community support worldwide.',
    image: issueCoverAssets.issue09,
    pdf: issuePdfAssets.issue09,
  },
  {
    id: 3,
    title: 'Enspired Women Magazine – Issue 03',
    category: 'RESILIENCE',
    description: 'Features Thobile Mseleku, mental health resilience, and recession survival guides.',
    image: issueCoverAssets.issue03,
    pdf: issuePdfAssets.issue03,
  },
  {
    id: 8,
    title: 'Enspired Women Magazine – Issue 08',
    category: 'DEVELOPMENT',
    description: 'Features Fundi Zwane, artistic entrepreneurship, and global business coaching.',
    image: issueCoverAssets.issue08,
    pdf: issuePdfAssets.issue08,
  },
  {
    id: 1,
    title: 'Enspired Women Magazine – Issue 01',
    category: 'BUSINESS',
    description: 'Features Maseru Madlala, business tips, and overcoming personal adversity.',
    image: issueCoverAssets.issue01,
  },
  {
    id: 2,
    title: 'Enspired Women Magazine – Issue 02',
    category: 'MOTIVATION',
    description: 'Features Chloe Tryon, mindset for success, and risk management tips.',
    image: issueCoverAssets.issue02,
  },
  {
    id: 4,
    title: 'Enspired Women Magazine – Issue 04',
    category: 'FINANCE',
    description: 'Features Yegas Naidoo, financial management, and same-sex parenting rights.',
    image: issueCoverAssets.issue04,
  },
  {
    id: 5,
    title: 'Enspired Women Magazine – Issue 05',
    category: 'GROWTH',
    description: 'Features Estelle Symcox, real estate insights, and family business transitions.',
    image: issueCoverAssets.issue05,
  },
  {
    id: 6,
    title: 'Enspired Women Magazine – Issue 06',
    category: 'LEADERSHIP',
    description: 'Features Vodacom executives, corporate leadership, and 2020 financial planning.',
    image: issueCoverAssets.issue06,
  },
  {
    id: 7,
    title: 'Enspired Woman Magazine – Exclusive',
    category: 'AWARDS',
    description: 'Celebrates the 2019 Enspired Women Top Achievers across various industries.',
    image: issueCoverAssets.issue07,
  }
];

const Issues = () => {
  const [current, setCurrent] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [dragBounds, setDragBounds] = useState({ left: 0, right: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const firstCardRef = useRef(null);

  // Measure card width and compute drag bounds accurately on mount/resize
  useEffect(() => {
    const handleResize = () => {
      if (firstCardRef.current) {
        // GPU-friendly precision calculation instead of offsetWidth
        const width = firstCardRef.current.getBoundingClientRect().width;
        const computedStepWidth = width + 24; // 24px represents gap-6
        setCardWidth(computedStepWidth);

        // Precompute boundaries natively to avoid Framer Motion layout thrashing during drag
        const isDesktop = window.innerWidth >= 768;
        const maxIndex = Math.max(0, issues.length - (isDesktop ? 3 : 1));
        
        setDragBounds({
          right: 0,
          left: -(maxIndex * computedStepWidth)
        });
      }
    };
    
    // Slight delay ensures the DOM is fully painted with styles
    const timer = setTimeout(handleResize, 50);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
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
    }, 4000); // 4 seconds is more elegant for reading magazine info
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const xPosition = -(current * cardWidth);

  return (
    <section id="issues" className="pb-10 pt-6 md:pb-24 md:pt-12 bg-white dark:bg-brand-dark relative z-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/3"></div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        <FadeInOnScroll direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14">
          <div className="flex flex-col space-y-2">
            <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,3.5rem)]">
              <span className="block text-brand-lightText dark:text-white drop-shadow-sm">Recent</span>
              <span className="block text-brand-lightMuted/40 dark:text-white/30">Issues</span>
            </h2>
            <p className="text-magic-gradient inline-block text-lg md:text-xl font-light mt-4">Explore our latest magazine editions</p>
          </div>
        </FadeInOnScroll>

        {/* Framer Motion Butter Smooth Slider */}
        <div 
          className="relative group overflow-hidden pb-12 cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <motion.div 
            className="flex gap-6 w-max items-stretch"
            drag="x"
            dragConstraints={dragBounds}
            dragElastic={0.05}
            onDragStart={() => setIsDragging(true)}
            animate={{ x: xPosition }}
            transition={{ type: "tween", ease: [0.32, 0.72, 0, 1], duration: 0.6 }}
            style={{ willChange: "transform" }}
            onDragEnd={(e, { offset, velocity }) => {
              setTimeout(() => setIsDragging(false), 50); // delay to prevent click firing
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
                onClick={() => !isDragging && issue.pdf && window.open(issue.pdf, '_blank')}
                className={`shrink-0 w-[80vw] sm:w-[85vw] md:w-[400px] flex flex-col bg-white dark:bg-[#0d0714] border border-gray-100 dark:border-white/10 hover:border-brand-magenta/40 rounded-2xl overflow-hidden group/card transition-shadow duration-500 shadow-lg dark:shadow-none hover:shadow-[0_8px_30px_rgba(235,77,156,0.1)] relative ${issue.pdf ? 'cursor-pointer' : ''}`}
              >
                {/* Header Image Area */}
                <div className="relative w-full aspect-[1/1] overflow-hidden bg-brand-lightCard dark:bg-black">
                  
                  {/* The image is now explicitly rendered in 1:1 aspect ratio natively with the container, ensuring 100% precision from top without cropping */}
                  <img 
                    src={issue.image} 
                    alt={issue.title} 
                    className="absolute inset-0 w-full h-full object-cover object-top transform group-hover/card:scale-[1.03] transition-transform duration-700 opacity-95 pointer-events-none z-10" 
                    loading={index < 2 ? 'eager' : 'lazy'}
                    decoding="async"
                  />

                  {/* Elegant fade out gradient overlapping the bottom of the image into the card content */}
                  <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-white dark:from-[#0d0714] via-white/80 dark:via-[#0d0714]/80 to-transparent z-20 pointer-events-none"></div>

                  <div className="absolute top-5 right-5 z-30 pointer-events-none">
                    {issue.pdf ? (
                      <span className="bg-brand-pink/90 backdrop-blur-md text-white text-[11px] font-bold px-4 py-1.5 rounded-full border border-brand-pink/20 shadow-[0_0_15px_rgba(255,77,166,0.5)]">
                        VIEW
                      </span>
                    ) : (
                      <span className="bg-white/90 dark:bg-black/60 backdrop-blur-md text-brand-lightText dark:text-white/90 text-[11px] font-bold px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/10 shadow-sm">
                        EXCLUSIVE
                      </span>
                    )}
                  </div>
                </div>

                {/* Content Area - Pulled higher into the white gradient to reduce overall card height */}
                <div className="p-6 md:p-8 flex flex-col flex-grow relative z-20 -mt-20 md:-mt-24">
                  <span className="text-magic-gradient text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 inline-block drop-shadow-sm">
                    {issue.category}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-snug group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-[#2196F3] group-hover/card:via-[#9C27B0] group-hover/card:to-[#E91E63] transition-all duration-300 drop-shadow-md">
                    {issue.title}
                  </h3>
                  <p className="text-brand-lightMuted dark:text-white/80 text-[13px] md:text-sm leading-relaxed mb-6 line-clamp-2">
                    {issue.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-brand-lightMuted/80 dark:text-white/50 text-[12px] md:text-sm font-mono tracking-wider font-semibold">
                      ISSUE #{String(issue.id).padStart(2, '0')}
                    </span>
                    {issue.pdf && (
                      <button className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 dark:border-white/20 bg-white/90 dark:bg-transparent flex items-center justify-center text-brand-lightText/70 dark:text-white/70 group-hover/card:bg-brand-magenta group-hover/card:border-brand-magenta group-hover/card:text-white transition-all duration-300 pointer-events-auto shadow-sm">
                        <ArrowRight size={16} className="transform group-hover/card:-rotate-45 transition-transform duration-300" />
                      </button>
                    )}
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
