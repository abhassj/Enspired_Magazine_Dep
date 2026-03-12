import React, { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Phone, Mail, Instagram, Linkedin, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ceoImage from '../assets/ceo-placeholder.png';

/* ─── mock data ─── */
const CONTACT_CHANNELS = [
  {
    icon: Phone,
    title: 'Phone',
    lines: ['+27 11 234 5678', '+44 20 7946 0958'],
    href: 'tel:+27112345678',
    cta: 'Call Us',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: ['enspiredmag@gmail.com', 'hello@enspiredmagazine.com'],
    href: 'mailto:enspiredmag@gmail.com',
    cta: 'Send Mail',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Instagram,
    title: 'Instagram',
    lines: ['@enspired_magazine', '@enspired_uk'],
    href: 'https://instagram.com/enspired_magazine',
    cta: 'Follow Us',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    icon: Linkedin,
    title: 'LinkedIn',
    lines: ['GR Enspired Magazine', 'Enspired Media Group'],
    href: 'https://linkedin.com/company/enspired-magazine',
    cta: 'Connect',
    gradient: 'from-cyan-500 to-blue-600',
  },
];

/* ─── animated letter ─── */
const AnimatedLetter = ({ char, index }) => (
  <motion.span
    initial={{ opacity: 0, y: 120, rotateX: -90 }}
    animate={{ opacity: 1, y: 0, rotateX: 0 }}
    transition={{
      duration: 0.8,
      delay: 0.15 + index * 0.05,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="inline-block"
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);

/* ─── contact card ─── */
const ContactCard = ({ icon: Icon, title, lines, href, cta, gradient, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -10 }}
      className="group relative block rounded-3xl overflow-hidden cursor-pointer"
    >
      {/* Card background with glass effect */}
      <div className="relative p-8 md:p-10 h-full
                      bg-white/70 dark:bg-white/[0.03]
                      backdrop-blur-2xl
                      border border-gray-200/60 dark:border-white/[0.06]
                      rounded-3xl
                      hover:border-brand-magenta/30 dark:hover:border-brand-magenta/30
                      transition-all duration-500">

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        bg-gradient-to-br from-brand-magenta/[0.03] via-transparent to-brand-purple/[0.03]
                        dark:from-brand-magenta/[0.06] dark:via-transparent dark:to-brand-purple/[0.06]" />

        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-all duration-700">
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${gradient} opacity-10 rounded-bl-[60px]`} />
        </div>

        <div className="relative z-10">
          {/* Icon circle */}
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-8
                          shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-500`}>
            <Icon size={24} className="text-white" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-brand-lightText dark:text-white mb-4 tracking-wide uppercase font-condensed">
            {title}
          </h3>

          {/* Lines */}
          <div className="space-y-2 mb-8">
            {lines.map((line, idx) => (
              <p key={idx} className="text-sm text-brand-lightMuted dark:text-white/50 font-light tracking-wide">
                {line}
              </p>
            ))}
          </div>

          {/* CTA */}
          <span className="inline-flex items-center gap-2 text-xs font-bold text-brand-magenta uppercase tracking-[0.15em]
                          group-hover:gap-3 transition-all duration-300">
            {cta}
            <ArrowUpRight
              size={14}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </span>
        </div>
      </div>
    </motion.a>
  );
};

/* ═══════════════════════════════════════════
   MAIN CONTACT PAGE
   ═══════════════════════════════════════════ */
const ContactPage = () => {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true, margin: '-30px' });
  const channelsHeaderRef = useRef(null);
  const channelsHeaderInView = useInView(channelsHeaderRef, { once: true, margin: '-80px' });

  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 600], [0, -80]);
  const imageParallax = useTransform(scrollY, [0, 600], [0, -40]);

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════════════
          HERO: Giant title + CEO image + Bio
          — everything in one seamless section
          ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen overflow-hidden">
        {/* ── Ambient background glows ── */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full
                          bg-brand-magenta/[0.07] dark:bg-brand-magenta/[0.04] blur-[150px]" />
          <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full
                          bg-brand-purple/[0.06] dark:bg-brand-purple/[0.03] blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] rounded-full
                          bg-brand-pink/[0.05] dark:bg-brand-pink/[0.03] blur-[100px]" />
        </div>

        {/* ── Subtle grid pattern overlay ── */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
             style={{
               backgroundImage: `linear-gradient(rgba(92,45,145,0.3) 1px, transparent 1px),
                                 linear-gradient(90deg, rgba(92,45,145,0.3) 1px, transparent 1px)`,
               backgroundSize: '60px 60px',
             }} />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">

          {/* ── ROW: Title text + CEO image side by side ── */}
          <div className="pt-28 md:pt-32 lg:pt-36 flex flex-col lg:flex-row items-start lg:items-end gap-8 lg:gap-0">

            {/* LEFT: Giant title + tagline */}
            <motion.div style={{ y: heroParallax }} className="flex-1 lg:pr-8 relative z-20">
              {/* Small decorative label */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={heroInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="flex items-center gap-2 mb-6"
              >
                <Sparkles size={14} className="text-brand-magenta" />
                <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-brand-magenta">
                  Let's Talk
                </span>
              </motion.div>

              {/* GIANT title with enhanced effects */}
              <h1 className="font-condensed font-extrabold uppercase leading-[0.9] tracking-wide
                             text-[clamp(10rem,10vw,10rem)]
                             relative py-2">
                {/* Subtle background glow behind the text */}
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-brand-purple/[0.08] via-brand-magenta/[0.12] to-brand-pink/[0.08] dark:from-brand-purple/[0.06] dark:via-brand-magenta/[0.1] dark:to-brand-pink/[0.06] blur-2xl -z-10 opacity-80" />
                
                <span className="block relative z-10 text-brand-lightText dark:text-white drop-shadow-[0_2px_8px_rgba(26,10,46,0.15)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  {heroInView && (
                    <>
                      <span className="block mb-2">
                        {'CONTACT'.split('').map((c, i) => (
                          <AnimatedLetter key={`c-${i}`} char={c} index={i} />
                        ))}
                      </span>
                      <span className="block bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(214,51,132,0.2)] pb-4">
                        {'US'.split('').map((c, i) => (
                          <AnimatedLetter key={`u-${i}`} char={c} index={i + 7} />
                        ))}
                      </span>
                    </>
                  )}
                </span>
              </h1>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="mt-8 max-w-md text-brand-lightMuted dark:text-white/50 text-sm md:text-base font-light leading-[1.8] tracking-wide"
              >
                For inquiries, collaborations, or just to say hello — we'd love to hear from you.
                Let's connect and create something extraordinary together.
              </motion.p>

              {/* Decorative animated line */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={heroInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, delay: 1 }}
                className="mt-10 h-[2px] w-32 bg-gradient-to-r from-brand-magenta to-transparent origin-left"
              />
            </motion.div>

            {/* RIGHT: CEO photo with bio underneath */}
            <motion.div
              style={{ y: imageParallax }}
              className="relative lg:w-[420px] xl:w-[460px] shrink-0 z-10"
            >
              {/* CEO Image */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={heroInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Magenta glow behind image */}
                <div className="absolute -inset-6 bg-gradient-to-b from-brand-magenta/10 via-brand-purple/5 to-transparent rounded-[2rem] blur-3xl opacity-70" />

                {/* Image container */}
                <div className="relative overflow-hidden rounded-t-[2rem] rounded-b-xl">
                  <img
                    src={ceoImage}
                    alt="Grace Ramaboa — Founder & CEO"
                    className="w-full h-auto object-cover grayscale-[15%] contrast-[1.08]"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                    }}
                  />

                  {/* Overlay gradient at bottom for blend */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-brand-dark to-transparent" />
                </div>
              </motion.div>

              {/* CEO Bio — directly under the image, part of the same visual flow */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="relative -mt-16 px-2"
              >
                <h3 className="text-2xl md:text-3xl font-condensed font-bold uppercase text-brand-lightText dark:text-white tracking-wide">
                  Grace Ramaboa
                </h3>
                <p className="mt-1 text-sm font-semibold text-brand-magenta tracking-wider uppercase">
                  Founder & CEO
                </p>
                <p className="mt-3 text-sm text-brand-lightMuted dark:text-white/45 font-light leading-[1.8]">
                  A visionary leader with a passion for amplifying African voices on the global stage.
                  Grace founded GR Enspired Magazine to bridge cultures, celebrate creativity, and inspire
                  the next generation of storytellers and change-makers.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ── Seamless section divider (no hard line — just a gradient fade) ── */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-brand-lightBg/80 dark:from-brand-dark to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════
          CONTACT CHANNELS — flows seamlessly
          from the hero above
          ══════════════════════════════════════ */}
      <section className="relative pt-8 pb-24 md:pb-32 bg-brand-lightBg/50 dark:bg-transparent">
        {/* Continuing ambient glows for seamless feel */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[500px] h-[400px] rounded-full
                          bg-brand-purple/[0.04] dark:bg-brand-purple/[0.02] blur-[120px]" />
          <div className="absolute bottom-20 right-0 w-[350px] h-[350px] rounded-full
                          bg-brand-magenta/[0.05] dark:bg-brand-magenta/[0.02] blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          {/* Section header */}
          <motion.div
            ref={channelsHeaderRef}
            initial={{ opacity: 0, y: 40 }}
            animate={channelsHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-16 md:mb-20"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-brand-magenta rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-brand-magenta">
                Get In Touch
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-condensed font-bold uppercase text-brand-lightText dark:text-white tracking-wide leading-[0.9]">
              Reach Out
              <span className="block text-brand-lightMuted/30 dark:text-white/15 text-3xl md:text-4xl lg:text-5xl mt-1">
                Anywhere, Anytime
              </span>
            </h2>
          </motion.div>

          {/* Cards grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {CONTACT_CHANNELS.map((channel, idx) => (
              <ContactCard key={channel.title} {...channel} index={idx} />
            ))}
          </div>

          {/* Location accent */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-3
                       text-brand-lightMuted/60 dark:text-white/25 text-xs tracking-widest uppercase"
          >
            <MapPin size={14} className="text-brand-magenta/60" />
            <span className="font-light">
              South Africa · United Kingdom — Serving readers across the globe
            </span>
          </motion.div>
        </div>

        {/* Seamless blend into footer */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-brand-dark to-transparent pointer-events-none" />
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
