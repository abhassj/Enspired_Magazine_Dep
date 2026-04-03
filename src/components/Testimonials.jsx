import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';

const testimonials = [
  {
    id: 1,
    quote: "You never gave up on me. You pushed me to feel at home and understand how to keep doors open in business. Today I'm being called a Graduate because of you — by July 2023, I'm graduating. 🙏",
    name: 'Bona (BA Intern)',
    role: 'Former Trainee',
  },
  {
    id: 2,
    quote: "Thank you Reshma Piralall Maharaj for affording me the opportunity to be part of Enspired Magazine and helping us women move forward and uplift each other. Lots of love and blessings!",
    name: 'Anusha Ramkhelwan',
    role: 'Community Member',
  },
  {
    id: 3,
    quote: "A memorable night as one of the finalists in the Women in Business awards. Thanks to my mentors Vani Moodley and Reshma Piralall Maharaj — you guys rock! 🤩",
    name: 'Faiza Shaik',
    role: 'Women in Business Finalist',
  },
  {
    id: 4,
    quote: "The person we need to celebrate is Reshma Piralall Maharaj — founder of this empowerment platform, never missing a beat to uplift women in South Africa and now in the UK too.",
    name: 'Yegas Naidoo',
    role: 'Feature Guest',
  },
  {
    id: 5,
    quote: "Reshma Maharaj started Enspired Women Magazine KZN with under R100 in 2007. She now owns 2 companies with branches in Port Shepstone, Durban, Eastern Cape and the Free State. 🙌 A true local gem and entrepreneur by heart!",
    name: 'Local First – South Coast, KZN ✅',
    role: 'Community Page',
  },
  {
    id: 6,
    quote: "This was such an awesome event! Thank you Reshma Piralall Maharaj for hosting an amazing event — this was much needed here on the South Coast. ❤️",
    name: 'Shereez Moodley',
    role: 'Event Attendee',
  },
  {
    id: 7,
    quote: "The launch of the 5th issue of Enspired Women was an exceptionally well-attended event. It served as great inspiration for women in business from all walks of life! We were honoured to attend. #EnspiredWomen",
    name: 'Gambu-W Security & Cleaning Services',
    role: 'Event Sponsor / Attendee',
  },
  {
    id: 8,
    quote: "Just back from a fabulous luncheon marketing talk by Reshma Maharaj. Congratulations on your outstanding achievements to empower small businesses. I feel honoured to have met you today.",
    name: 'Mala Naidoo',
    role: 'Luncheon Attendee & Author',
  },
  {
    id: 9,
    quote: "Had an enspiring networking breakfast hosted by Enspired Women — now inspired to be an entrepreneur!!!",
    name: 'Pretty Sorensen',
    role: 'Networking Breakfast Attendee',
  },
  {
    id: 10,
    quote: "It was a true honour to host the phenomenal Enspired Women HIGH TEA 'Tricks to Trade' Financial Independence event! Truly empowering and inspirational to the many incredible businesswomen who attended.",
    name: 'Umdlalo Luxury Lodge and Venue',
    role: 'Event Venue Partner',
  },
  {
    id: 11,
    quote: "Being featured opened doors to collaborators across two continents. The editorial quality is world-class and deeply human. ⭐⭐⭐⭐⭐",
    name: 'Chloe Bennett',
    role: 'Founder, Atelier Bloom',
  },
  {
    id: 12,
    quote: "As a contributor, I felt seen and challenged in the best way. The team helped shape my voice without diluting it. ⭐⭐⭐⭐⭐",
    name: 'Lerato K.',
    role: 'Guest Contributor',
  },
  {
    id: 13,
    quote: "Our chapter members use Enspired issues as discussion starters. It sparks action, not just admiration. ⭐⭐⭐⭐⭐",
    name: 'Amelia S.',
    role: 'UK Chapter Member',
  },
  {
    id: 14,
    quote: "The platform feels premium yet accessible. It celebrates women in business with depth, elegance, and authenticity. ⭐⭐⭐⭐⭐",
    name: 'Nadia R.',
    role: 'Reader, Cape Town',
  },
  {
    id: 15,
    quote: "After our profile ran, we received mentor inquiries and investor calls in the same week. The impact was immediate. ⭐⭐⭐⭐",
    name: 'Thando P.',
    role: 'SME Owner, Durban',
  },
];

/* -- Testimonials array already defined here -- */

const TestimonialCard = ({ item, computedWidth }) => (
  // We use inline width to exact-match the container and prevent any bleed
  <article 
    style={{ width: computedWidth ? `${computedWidth}px` : '340px' }}
    className="h-auto flex flex-col justify-between shrink-0 rounded-[32px] p-8 md:p-10 bg-brand-lightCard/20 dark:bg-white/5 border border-brand-purple/10 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(214,51,132,0.15)] group"
  >
    <div className="flex-1 pb-6">
      <div className="text-magic-gradient inline-block text-[60px] leading-none mb-2 font-serif opacity-70 group-hover:scale-110 transition-transform origin-left">&ldquo;</div>
      <p className="text-brand-lightText/90 dark:text-white/90 leading-relaxed text-[15px] md:text-[16px] font-medium tracking-wide">{item.quote}</p>
    </div>

    <div className="mt-auto pt-6 border-t border-brand-lightMuted/10 dark:border-white/10 group-hover:border-brand-magenta/30 transition-colors duration-500">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 shrink-0 rounded-full bg-brand-gradient flex items-center justify-center text-white shadow-lg font-bold text-xl pointer-events-none">
          {item.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="text-[14px] md:text-[15px] font-bold text-brand-lightText dark:text-white group-hover:text-brand-magenta transition-colors truncate">{item.name}</p>
          <p className="text-[11px] text-brand-lightMuted dark:text-white/50 uppercase tracking-widest mt-1 font-semibold truncate">{item.role}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-1.5 mt-5">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} size={15} fill="url(#star-grad)" stroke="none" />
        ))}
      </div>
    </div>
  </article>
);

const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [cardStyleWidth, setCardStyleWidth] = useState(0);
  const [stepWidth, setStepWidth] = useState(0);
  const [visibleCols, setVisibleCols] = useState(3);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        // Calculate strictly against the inner bounding box
        const boundingWidth = containerRef.current.getBoundingClientRect().width;
        let cols = 1;
        if (window.innerWidth >= 1024) cols = 3;
        else if (window.innerWidth >= 768) cols = 2;
        
        setVisibleCols(cols);
        
        // Exact fit calculation: subtract gaps (gap-6 is 24px)
        const totalGapWidth = (cols - 1) * 24;
        const exactCardWidth = Math.floor((boundingWidth - totalGapWidth) / cols);
        
        setCardStyleWidth(exactCardWidth);
        setStepWidth(exactCardWidth + 24); // step = card + gap
      }
    };
    
    // Evaluate layout
    const timer = setTimeout(handleResize, 50);
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const next = () => {
    setCurrent(prev => Math.min(prev + visibleCols, testimonials.length - visibleCols));
  };

  const prev = () => {
    setCurrent(p => Math.max(p - visibleCols, 0));
  };

  const xPosition = -(current * stepWidth);

  // Computes mobile dot pages
  const totalPages = Math.ceil(testimonials.length / visibleCols);

  return (
    <section className="pb-10 pt-6 md:pb-24 md:pt-12 relative overflow-hidden bg-white dark:bg-brand-dark">
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="star-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5C2D91" />
            <stop offset="50%" stopColor="#D63384" />
            <stop offset="100%" stopColor="#FF4DA6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute top-[-20%] left-[-12%] w-[40vw] h-[40vw] bg-brand-purple/5 dark:bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[42vw] h-[42vw] bg-brand-magenta/5 dark:bg-brand-magenta/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 relative z-10">
        
        <FadeInOnScroll direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14">
          <div className="flex flex-col space-y-2">
            <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,4rem)]">
              <span className="block text-brand-lightText dark:text-white drop-shadow-sm">Client</span>
              <span className="block text-brand-lightMuted/40 dark:text-white/30">Testimonials</span>
            </h2>
            <p className="max-w-2xl text-magic-gradient inline-block text-lg md:text-xl font-light mt-4">
              Stories from readers, contributors, and business leaders shaping the Enspired community.
            </p>
          </div>

          {/* Navigation Controls at Header Level (Desktop Only) */}
          <div className="hidden md:flex items-center space-x-3 mt-6 md:mt-0">
            <button 
              onClick={prev} 
              disabled={current === 0}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${current === 0 ? 'border-gray-100 dark:border-white/5 text-brand-lightMuted/40 dark:text-white/20 cursor-not-allowed bg-transparent' : 'border-gray-200 dark:border-white/15 text-brand-lightText/80 dark:text-white/80 hover:text-white dark:hover:text-white hover:border-brand-magenta hover:bg-brand-magenta dark:hover:bg-brand-magenta cursor-pointer shadow-sm hover:shadow-lg'}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={next} 
              disabled={current >= testimonials.length - visibleCols}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all duration-300 ${current >= testimonials.length - visibleCols ? 'border-gray-100 dark:border-white/5 text-brand-lightMuted/40 dark:text-white/20 cursor-not-allowed bg-transparent' : 'border-gray-200 dark:border-white/15 text-brand-lightText/80 dark:text-white/80 hover:text-white dark:hover:text-white hover:border-brand-magenta hover:bg-brand-magenta dark:hover:bg-brand-magenta cursor-pointer shadow-sm hover:shadow-lg'}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </FadeInOnScroll>

        {/* Framer Motion Interactive Real-time Slider */}
        <div 
          className="relative group py-4 -my-4 overflow-hidden rounded-[20px]"
          ref={containerRef}
        >
          <motion.div 
            className="flex gap-6 w-max cursor-grab active:cursor-grabbing items-stretch"
            drag="x"
            dragConstraints={{ right: 0, left: -((testimonials.length - visibleCols) * stepWidth) }}
            dragElastic={0.1}
            animate={{ x: xPosition }}
            transition={{ type: "spring", stiffness: 80, damping: 25, mass: 1 }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x;
              const swipeThreshold = 5000;
              const maxIndex = Math.max(0, testimonials.length - visibleCols);

              if (swipe < -swipeThreshold) {
                // Fling left -> next
                setCurrent(p => Math.min(p + visibleCols, maxIndex));
              } else if (swipe > swipeThreshold) {
                // Fling right -> prev
                setCurrent(p => Math.max(p - visibleCols, 0));
              }
            }}
          >
            {testimonials.map((item, index) => (
              <TestimonialCard 
                key={item.id} 
                item={item} 
                computedWidth={cardStyleWidth}
              />
            ))}
          </motion.div>
        </div>

        {/* Mobile Navigation Dots */}
        <div className="md:hidden flex justify-center items-center space-x-2 mt-10">
            {Array.from({ length: totalPages }).map((_, pageIdx) => {
               const isActive = Math.floor(current / visibleCols) === pageIdx || (pageIdx === totalPages - 1 && current >= testimonials.length - visibleCols);
               return (
                <button
                  key={pageIdx}
                  onClick={() => setCurrent(Math.min(pageIdx * visibleCols, testimonials.length - visibleCols))}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive ? 'w-8 bg-brand-magenta' : 'w-2 bg-gray-300 dark:bg-white/20'
                  }`}
                />
               );
            })}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
