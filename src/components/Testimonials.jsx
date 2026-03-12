import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { FadeInOnScroll } from './ui/ScrollAnimations';

const testimonials = [
  {
    id: 1,
    quote:
      'Enspired does not just publish stories, it shifts mindsets. Every issue leaves me with practical ideas and fresh courage.',
    name: 'Nomsa M.',
    role: 'Reader, Johannesburg',
  },
  {
    id: 2,
    quote:
      'Being featured opened doors to collaborators across two continents. The editorial quality is world-class and deeply human.',
    name: 'Chloe Bennett',
    role: 'Founder, Atelier Bloom',
  },
  {
    id: 3,
    quote:
      'As a contributor, I felt seen and challenged in the best way. The team helped shape my voice without diluting it.',
    name: 'Lerato K.',
    role: 'Guest Contributor',
  },
  {
    id: 4,
    quote:
      'Our chapter members use Enspired issues as discussion starters. It sparks action, not just admiration.',
    name: 'Amelia S.',
    role: 'UK Chapter Member',
  },
  {
    id: 5,
    quote:
      'The platform feels premium yet accessible. It celebrates women in business with depth, elegance, and authenticity.',
    name: 'Nadia R.',
    role: 'Reader, Cape Town',
  },
  {
    id: 6,
    quote:
      'After our profile ran, we received mentor inquiries and investor calls in the same week. The impact was immediate.',
    name: 'Thando P.',
    role: 'SME Owner, Durban',
  },
];

const cardClasses =
  'w-[320px] md:w-[360px] shrink-0 rounded-2xl p-6 md:p-7 bg-white shadow-xl border border-gray-100 dark:bg-white/5 dark:border-white/10 dark:backdrop-blur-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_35px_rgba(214,51,132,0.18)]';

const TestimonialCard = ({ item }) => (
  <article className={cardClasses}>
    <div className="text-brand-magenta text-4xl leading-none mb-3">&ldquo;</div>
    <p className="text-brand-lightText dark:text-white/90 leading-relaxed text-sm md:text-base min-h-[112px]">{item.quote}</p>

    <div className="h-px w-full bg-brand-magenta/40 my-5"></div>

    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-brand-magenta/15 border border-brand-magenta/30"></div>
        <div>
          <p className="text-sm font-semibold text-brand-lightText dark:text-white">{item.name}</p>
          <p className="text-xs text-brand-lightMuted dark:text-white/60">{item.role}</p>
        </div>
      </div>
      <div className="flex items-center gap-1 text-brand-magenta">
        {Array.from({ length: 5 }).map((_, idx) => (
          <Star key={idx} size={12} fill="currentColor" strokeWidth={1.5} />
        ))}
      </div>
    </div>
  </article>
);

const Testimonials = () => {
  const firstRow = testimonials.slice(0, 3);
  const secondRow = testimonials.slice(3);

  return (
    <section className="py-24 relative overflow-hidden bg-white dark:bg-brand-dark">
      <div className="absolute top-[-20%] left-[-12%] w-[40vw] h-[40vw] bg-brand-purple/5 dark:bg-brand-purple/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[42vw] h-[42vw] bg-brand-magenta/5 dark:bg-brand-magenta/10 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <FadeInOnScroll direction="up" className="mb-14 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-lightText dark:text-white mb-4">
            Client Testimonials
          </h2>
          <p className="max-w-2xl mx-auto text-brand-pink dark:text-brand-pink text-lg">
            Stories from readers, contributors, and business leaders shaping the Enspired community.
          </p>
        </FadeInOnScroll>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-6 marquee-wrap"
        >
          <div className="overflow-hidden">
            <div className="marquee-track marquee-left gap-6">
              {[...firstRow, ...firstRow].map((item, idx) => (
                <TestimonialCard key={`${item.id}-top-${idx}`} item={item} />
              ))}
            </div>
          </div>

          <div className="overflow-hidden">
            <div className="marquee-track marquee-right gap-6">
              {[...secondRow, ...secondRow].map((item, idx) => (
                <TestimonialCard key={`${item.id}-bottom-${idx}`} item={item} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
