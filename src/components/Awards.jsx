import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Award, Trophy, Medal, Star } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';

// structured list based on the user's awards
const awardsList = [
  { year: '2017', title: 'National Gazelle Finalist', icon: Trophy },
  { year: '2016', title: 'Top 3 Entrepreneur for Regional Business Achiever Awards KZN', subtitle: '(Business Women’s Association South Africa)', icon: Medal },
  { year: '2016/2017', title: 'Best Performing Entrepreneur', subtitle: 'in Small Enterprise Development Ugu District', icon: Award },
  { year: '2018', title: 'Standard Bank Women Finalist', subtitle: 'for Gender Empowerment Nationally', icon: Star },
  { year: '2018', title: 'Standard Bank Top Women Finalist', subtitle: 'for fast growth SME Nationally', icon: Trophy },
  { year: '2018', title: 'Winner Regional Emerging Category', subtitle: 'Productivity SA', icon: Medal },
  { year: '2018', title: 'Top 10 Finalist National Emerging Category', subtitle: 'Productivity SA', icon: Award },
  { year: '2018', title: 'Winner Best Newcomer', subtitle: 'SmartXchange MICTe', icon: Star },
  { year: '2018', title: 'Runner Up Best Performing MICTe Women', subtitle: 'SmartXchange', icon: Medal },
  { year: '2019', title: '6th World Women Super Achiever Award', icon: Trophy },
  { year: '2019', title: 'Role Player Recognition', subtitle: 'by the World Women Congress', icon: Star },
  { year: '2019', title: 'Africa’s Leading Woman Award', icon: Award },
  { year: '2019', title: 'Mayoral Best Women Organisation', subtitle: 'Winner Award', icon: Trophy },
  { year: '2019', title: 'MICTE Smartxchange Women of the Year', subtitle: 'Winner', icon: Medal },
  { year: '2019', title: 'MICTE Smartxchange SMME of the Year', subtitle: 'Runner Up', icon: Star },
  { year: '2022', title: 'KZN Top Business Women Award', subtitle: 'for women empowerment', icon: Trophy },
];

const AwardBadge = ({ award }) => {
  const Icon = award.icon;
  return (
    <div className="relative group/card flex-shrink-0 w-[280px] sm:w-[300px] md:w-[360px] h-[170px] md:h-[180px] mx-3 sm:mx-4 cursor-default">
      {/* Glow layer behind */}
      <div className="absolute inset-0 bg-gradient-to-r from-brand-purple to-brand-magenta rounded-3xl blur-[20px] opacity-0 group-hover/card:opacity-30 dark:group-hover/card:opacity-20 transition-opacity duration-500 pointer-events-none"></div>
      
      {/* Content wrapper */}
      <div className="relative h-full w-full bg-white/70 dark:bg-[#0a0510]/80 backdrop-blur-xl border border-brand-purple/10 dark:border-white/10 rounded-3xl p-5 md:p-6 hover:border-brand-magenta/40 dark:hover:border-brand-magenta/30 transition-all duration-500 flex items-start gap-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none hover:-translate-y-1">
        
        {/* Animated Icon Box */}
        <div className="flex-shrink-0 relative">
          <div className="absolute inset-0 bg-brand-pink/20 rounded-full blur-[10px] scale-150 group-hover/card:scale-110 transition-transform duration-500"></div>
          <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center shadow-lg group-hover/card:shadow-[0_0_20px_rgba(214,51,132,0.4)] transition-all duration-500">
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-white" strokeWidth={1.5} />
          </div>
        </div>

        {/* Text Details */}
        <div className="flex flex-col h-full overflow-hidden">
          <div className="inline-block px-3 py-1 rounded-full border border-brand-purple/20 bg-brand-purple/5 text-[10px] md:text-xs font-bold text-brand-purple dark:text-brand-lavender uppercase tracking-widest w-max mb-2 backdrop-blur-md">
            {award.year}
          </div>
          <h3 className="font-condensed text-base md:text-lg font-bold text-brand-lightText dark:text-white leading-tight mb-1 group-hover/card:text-transparent group-hover/card:bg-clip-text group-hover/card:bg-gradient-to-r group-hover/card:from-brand-purple group-hover/card:to-brand-magenta transition-all duration-300 line-clamp-3">
            {award.title}
          </h3>
          {award.subtitle && (
            <p className="text-[11px] md:text-sm text-brand-lightMuted dark:text-gray-400 font-medium leading-snug line-clamp-2">
              {award.subtitle}
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

// Split array into two rows for the marquee effect
const row1 = awardsList.slice(0, 8);
const row2 = awardsList.slice(8, 16);

const Awards = () => {
  const containerRef = useRef(null);
  
  // Parallax subtle scroll effect for the background blobs
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-150, 150]);

  return (
    <section ref={containerRef} id="awards" className="relative py-12 md:py-20 bg-white dark:bg-brand-dark overflow-hidden">
      
      {/* Artistic animated floating orbs */}
      <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] bg-brand-purple/10 dark:bg-brand-purple/5 rounded-full blur-[150px] pointer-events-none"></motion.div>
      <motion.div style={{ y: y2 }} className="absolute bottom-[0%] right-[-10%] w-[600px] h-[600px] bg-brand-pink/10 dark:bg-brand-magenta/5 rounded-full blur-[150px] pointer-events-none"></motion.div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10">
        <FadeInOnScroll direction="up" className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-14">
          <div className="flex flex-col space-y-2">
             <span className="text-magic-gradient font-condensed font-bold uppercase tracking-widest text-sm md:text-base mb-1 inline-block">
              Excellence Recognized
            </span>
            <h2 className="font-condensed font-extrabold uppercase tracking-tight leading-[1.05] text-[clamp(2.5rem,8vw,4rem)] relative">
              <span className="block text-brand-lightText dark:text-white drop-shadow-sm">Our</span>
              <span className="block text-brand-lightMuted/30 dark:text-white/20">Awards</span>
            </h2>
            <p className="text-brand-lightMuted dark:text-gray-400 max-w-xl text-sm md:text-base pt-2">
              A timeline of our achievements and milestones, celebrating a legacy of leadership, business growth, and empowering individuals.
            </p>
          </div>
        </FadeInOnScroll>
      </div>

      {/* Infinite Seamless Marquees */}
      <div className="relative w-full overflow-hidden flex flex-col gap-6 md:gap-8 pb-4">
        
        {/* Top Marquee - Moves Left */}
        <div className="relative flex w-full overflow-hidden group">
          <div className="marquee-track marquee-left group-hover:[animation-play-state:paused]">
            {/* Double the content to create a seamless loop */}
            {[...row1, ...row1, ...row1].map((award, index) => (
              <AwardBadge key={`r1-${index}`} award={award} />
            ))}
          </div>
        </div>

        {/* Bottom Marquee - Moves Right */}
        <div className="relative flex w-full overflow-hidden group">
          <div className="marquee-track marquee-right group-hover:[animation-play-state:paused] ml-[-20%]">
             {/* Double the content to create a seamless loop */}
             {[...row2, ...row2, ...row2].map((award, index) => (
              <AwardBadge key={`r2-${index}`} award={award} />
            ))}
          </div>
        </div>
        
        {/* Soft edge gradients to hide marquee cutoffs seamlessly */}
        <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-white dark:from-brand-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-[10%] bg-gradient-to-l from-white dark:from-brand-dark to-transparent z-10 pointer-events-none"></div>

      </div>
    </section>
  );
};

export default Awards;
