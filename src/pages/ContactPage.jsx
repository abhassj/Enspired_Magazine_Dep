import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { Mail, Instagram, Facebook, ArrowUpRight, MapPin, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { siteImageAssets } from '../config/cloudinaryAssets';

const isMobileDevice = typeof window !== 'undefined' && window.innerWidth < 768;

/* ─── Custom Icons ─── */
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

/* ─── contact data ─── */
const CONTACT_CHANNELS = [
  {
    icon: WhatsAppIcon,
    title: 'WhatsApp',
    lines: [
      { text: 'UK: +44 78252 82654', href: 'https://wa.me/447825282654' },
      { text: 'SA: +27 74 461 3719', href: 'https://wa.me/27744613719' }
    ],
    cta: 'WhatsApp Us',
    gradient: 'from-[#25D366] to-[#128C7E]',
    iconFrame: 'from-[#25D366] via-[#128C7E] to-[#075E54]',
    iconGlow: 'shadow-[0_14px_32px_-16px_rgba(37,211,102,0.75)]',
  },
  {
    icon: Mail,
    title: 'Email',
    lines: [{ text: 'enspiredmag@outlook.com' }],
    href: 'mailto:enspiredmag@outlook.com',
    cta: 'Send Mail',
    gradient: 'from-brand-purple to-brand-magenta',
    iconFrame: 'from-brand-purple via-brand-magenta to-brand-pink',
    iconGlow: 'shadow-[0_14px_32px_-16px_rgba(92,45,145,0.7)]',
  },
  {
    icon: Instagram,
    title: 'Instagram',
    lines: [{ text: '@enspiredmagazine1' }],
    href: 'https://www.instagram.com/enspiredmagazine1',
    cta: 'Follow Us',
    gradient: 'from-brand-magenta to-brand-pink',
    iconFrame: 'from-brand-magenta via-brand-pink to-brand-purple',
    iconGlow: 'shadow-[0_14px_32px_-16px_rgba(214,51,132,0.75)]',
  },
  {
    icon: Facebook,
    title: 'Facebook',
    lines: [{ text: 'Enspired Women' }],
    href: 'https://www.facebook.com/enspiredwomen/',
    cta: 'Connect',
    gradient: 'from-brand-blue via-brand-purple to-brand-pink',
    iconFrame: 'from-brand-blue via-brand-magenta to-brand-pink',
    iconGlow: 'shadow-[0_14px_32px_-16px_rgba(0,163,255,0.7)]',
  },
];

/* ─── contact card — lightweight, no backdrop-blur on mobile ─── */
const ContactCard = ({ icon: Icon, title, lines, href, cta, gradient, iconFrame, iconGlow, index }) => {
  return (
    <div
      className="group relative block rounded-2xl md:rounded-3xl overflow-hidden h-full touch-feedback"
      style={getAnimStyle(true, `card-fade-in 0.4s ease-out ${0.05 + index * 0.08}s both`)}
    >
      {/* Primary Card Link */}
      {href && <a href={href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10 cursor-pointer" aria-label={title}></a>}

      {/* Card background */}
      <div className={`relative p-5 md:p-8 lg:p-10 h-full
                      bg-white/70 dark:bg-white/[0.03]
                      ${isMobileDevice ? '' : 'backdrop-blur-xl'}
                      border border-gray-200/60 dark:border-white/[0.06]
                      rounded-2xl md:rounded-3xl
                      hover:border-brand-magenta/30 dark:hover:border-brand-magenta/30
                      transition-all duration-300`}>

        {/* Hover glow — desktop only */}
        <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
                        bg-gradient-to-br from-brand-magenta/[0.03] via-transparent to-brand-purple/[0.03]
                        dark:from-brand-magenta/[0.06] dark:via-transparent dark:to-brand-purple/[0.06] hidden md:block" />

        {/* Corner accent — desktop only */}
        <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-all duration-700 hidden md:block">
          <div className={`absolute top-0 right-0 w-full h-full bg-gradient-to-bl ${gradient} opacity-10 rounded-bl-[60px]`} />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Icon badge */}
          <div className="relative mb-4 md:mb-8">
            <div
              className={`absolute -inset-3 rounded-[22px] bg-gradient-to-br ${gradient} opacity-20 blur-xl
                          group-hover:opacity-35 transition-opacity duration-500`}
            />
            <div
              className={`relative w-12 h-12 md:w-[66px] md:h-[66px] rounded-2xl md:rounded-[20px] p-[1.5px]
                          bg-gradient-to-br ${iconFrame} ${iconGlow}
                          group-hover:scale-105 group-hover:-translate-y-0.5 transition-all duration-500`}
            >
              <div className="relative h-full w-full rounded-[14px] md:rounded-[18px] bg-white dark:bg-[#140d1f] flex items-center justify-center border border-white/70 dark:border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.55),transparent_45%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
                <Icon size={isMobileDevice ? 22 : 27} className="relative z-10 text-brand-lightText dark:text-white" strokeWidth={2.3} />
              </div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base md:text-xl font-bold text-brand-lightText dark:text-white mb-2 md:mb-4 tracking-wide uppercase font-condensed">
            {title}
          </h3>

          {/* Lines */}
          <div className="space-y-1 md:space-y-2 mb-4 md:mb-8 flex-grow relative z-20 pointer-events-none w-full">
            {lines.map((line, idx) => (
              <div key={idx} className="pointer-events-auto w-full">
                {line.href ? (
                  <a href={line.href} target="_blank" rel="noopener noreferrer" className="text-[10px] sm:text-xs md:text-sm text-brand-lightMuted dark:text-white/50 font-light tracking-wide hover:text-[#25D366] transition-colors block break-all">
                    {line.text}
                  </a>
                ) : (
                  <p className="text-[10px] sm:text-xs md:text-sm text-brand-lightMuted dark:text-white/50 font-light tracking-wide break-all">
                    {line.text || line}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-bold text-magic-gradient uppercase tracking-[0.15em]
                          group-hover:gap-3 transition-all duration-300">
            {cta}
            <ArrowUpRight
              size={13}
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
            />
          </span>
        </div>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════
   MAIN CONTACT PAGE
   ═══════════════════════════════════════════ */
const getAnimStyle = (inView, animStr, extraStyles = {}) => {
  if (isMobileDevice) return extraStyles; // Instant render on mobile!
  return { 
    ...extraStyles,
    animation: inView ? animStr : 'none', 
    opacity: inView ? undefined : 0 
  };
};

const ContactPage = () => {
  const heroRef = useRef(null);
  const heroInViewDesktop = useInView(heroRef, { once: true, margin: '0px' });
  const heroInView = isMobileDevice ? true : heroInViewDesktop;

  const channelsHeaderRef = useRef(null);
  const channelsHeaderInViewDesktop = useInView(channelsHeaderRef, { once: true, margin: '0px' });
  const channelsHeaderInView = isMobileDevice ? true : channelsHeaderInViewDesktop;

  return (
    <>
      <Navbar />

      {/* ══════════════════════════════════════
          HERO: Title + CEO image + Bio
          ══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[auto] md:min-h-screen overflow-hidden bg-white dark:bg-brand-dark">
        {/* Ambient background glows */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[300px] md:w-[700px] h-[300px] md:h-[700px] rounded-full
                          bg-brand-magenta/[0.07] dark:bg-brand-magenta/[0.04] blur-[60px] md:blur-[150px]" />
          <div className="absolute top-1/3 -left-20 md:-left-40 w-[250px] md:w-[500px] h-[250px] md:h-[500px] rounded-full
                          bg-brand-purple/[0.06] dark:bg-brand-purple/[0.03] blur-[50px] md:blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-12">

          {/* ROW: Title + CEO */}
          <div className="pt-16 md:pt-24 lg:pt-28 pb-8 md:pb-36 lg:pb-48 flex flex-col lg:flex-row items-center lg:items-center gap-6 md:gap-12 lg:gap-8">

            {/* LEFT: Title + tagline */}
            <div className="flex-1 lg:pr-8 relative z-20 text-center lg:text-left">
              {/* Decorative label */}
              <div
                className="flex items-center justify-center lg:justify-start gap-2 mb-3 md:mb-6"
                style={getAnimStyle(heroInView, 'card-fade-in 0.5s ease-out 0.1s both')}
              >
                <Sparkles size={14} className="text-brand-magenta" />
                <span className="text-[10px] md:text-[11px] uppercase tracking-[0.35em] font-semibold text-magic-gradient inline-block">
                  Let's Talk
                </span>
              </div>

              {/* Title — tighter on mobile */}
              <h1 className="font-condensed font-extrabold uppercase leading-[0.9] tracking-wide
                             text-[clamp(2.8rem,12vw,9rem)]
                             relative py-1 md:py-2">
                {/* Background glow */}
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-r from-brand-purple/[0.08] via-brand-magenta/[0.12] to-brand-pink/[0.08] dark:from-brand-purple/[0.06] dark:via-brand-magenta/[0.1] dark:to-brand-pink/[0.06] blur-2xl -z-10 opacity-80" />
                
                <span className="block relative z-10 text-brand-lightText dark:text-white drop-shadow-[0_2px_8px_rgba(26,10,46,0.1)] dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                  <span
                    className="block mb-0 md:mb-2"
                    style={getAnimStyle(heroInView, 'title-slide-up 0.6s ease-out 0.15s both')}
                  >
                    CONTACT
                  </span>
                  <span
                    className="block bg-gradient-to-r from-brand-purple via-brand-magenta to-brand-pink bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(214,51,132,0.25)] pb-1 md:pb-4"
                    style={getAnimStyle(heroInView, 'title-slide-up 0.6s ease-out 0.3s both')}
                  >
                    US
                  </span>
                </span>
              </h1>

              {/* Tagline — tighter margins on mobile */}
              <p
                className="mt-4 md:mt-8 mx-auto lg:mx-0 max-w-[320px] md:max-w-md text-brand-lightMuted dark:text-white/50 text-[13px] md:text-sm lg:text-base font-light leading-relaxed md:leading-[1.8] tracking-wide"
                style={getAnimStyle(heroInView, 'card-fade-in 0.6s ease-out 0.4s both')}
              >
                For inquiries, collaborations, or just to say hello — we'd love to hear from you.
                Let's connect and create something extraordinary together.
              </p>

              {/* Decorative line */}
              <div
                className="mt-5 md:mt-10 h-[2px] w-16 md:w-32 bg-gradient-to-r from-brand-blue to-transparent mx-auto lg:mx-0"
                style={getAnimStyle(heroInView, 'line-scale-x 0.8s ease-out 0.6s both', { transformOrigin: 'left' })}
              />
            </div>

            {/* RIGHT: CEO photo + bio */}
            <div className="relative w-full max-w-[300px] md:max-w-none md:w-[400px] lg:w-[420px] xl:w-[460px] shrink-0 z-10 overflow-hidden mx-auto">
              {/* CEO Image */}
              <div
                className="relative"
                style={getAnimStyle(heroInView, 'card-fade-in 0.7s ease-out 0.25s both')}
              >
                {/* Glow behind image */}
                <div className="absolute -inset-4 md:-inset-6 bg-gradient-to-b from-brand-magenta/10 via-brand-purple/5 to-transparent rounded-[2rem] blur-lg md:blur-3xl opacity-70" />

                {/* Image container */}
                <div className="relative overflow-hidden rounded-t-2xl md:rounded-t-[2rem] rounded-b-lg md:rounded-b-xl">
                  <img
                    src={siteImageAssets.ceoImage}
                    alt="VIKY & RESHMA — Founder & CEO"
                    className="w-full h-auto object-cover grayscale-[10%] contrast-[1.05]"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    style={{
                      maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                    }}
                  />

                  {/* Overlay gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-20 md:h-24 bg-gradient-to-t from-white dark:from-brand-dark to-transparent" />
                </div>
              </div>

              {/* CEO Bio — tighter spacing on mobile */}
              <div
                className="relative -mt-6 md:-mt-16 px-2 md:px-2 text-center lg:text-left"
                style={getAnimStyle(heroInView, 'card-fade-in 0.6s ease-out 0.5s both')}
              >
                <h3 className="text-lg md:text-2xl lg:text-3xl font-condensed font-bold uppercase text-brand-lightText dark:text-white tracking-wide">
                  VIKY & RESHMA
                </h3>
                <p className="mt-0.5 text-[10px] md:text-sm font-semibold text-magic-gradient tracking-wider uppercase">
                  Founder & CEO
                </p>
                <p className="mt-2 md:mt-3 text-[11px] md:text-sm text-brand-lightMuted dark:text-white/45 font-light leading-relaxed md:leading-[1.8]">
                  Viky and Reshma are visionary leaders behind GR Enspired, now expanded to London.
                  Empowering women, men, and youth across Africa and beyond.
                  Through magazine, they amplify voices, share inspiring stories, and support entrepreneurs building connection and financial stability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section divider */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-40 bg-gradient-to-t from-brand-lightBg/80 dark:from-brand-dark to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════
          CONTACT CHANNELS
          ══════════════════════════════════════ */}
      <section className="relative pt-2 md:pt-8 pb-10 md:pb-32 bg-brand-lightBg/50 dark:bg-transparent">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/3 w-[350px] md:w-[500px] h-[300px] md:h-[400px] rounded-full
                          bg-brand-purple/[0.04] dark:bg-brand-purple/[0.02] blur-[60px] md:blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 md:px-12">
          {/* Section header — tighter mobile spacing */}
          <div
            ref={channelsHeaderRef}
            className="mb-6 md:mb-20 text-center sm:text-left"
            style={getAnimStyle(channelsHeaderInView, 'card-fade-in 0.5s ease-out both')}
          >
            <div className="flex items-center justify-center sm:justify-start gap-3 mb-2 md:mb-4">
              <div className="h-[2px] w-8 bg-brand-blue rounded-full" />
              <span className="text-[10px] uppercase tracking-[0.35em] font-semibold text-magic-gradient inline-block">
                Get In Touch
              </span>
            </div>
            <h2 className="text-2xl md:text-5xl lg:text-6xl font-condensed font-bold uppercase text-brand-lightText dark:text-white tracking-wide leading-[0.9]">
              Reach Out
              <span className="block text-brand-lightMuted/30 dark:text-white/15 text-xl md:text-4xl lg:text-5xl mt-1 md:mt-1">
                Anywhere, Anytime
              </span>
            </h2>
          </div>

          {/* Cards grid — 2 cols on mobile for compact layout */}
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {CONTACT_CHANNELS.map((channel, idx) => (
              <ContactCard key={channel.title} {...channel} index={idx} />
            ))}
          </div>

          {/* Location accent */}
          <div
            className="mt-8 md:mt-20 flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-3
                       text-brand-lightMuted/60 dark:text-white/25 text-[9px] md:text-xs tracking-widest uppercase text-center"
            style={getAnimStyle(true, 'card-fade-in 0.6s ease-out 0.8s both')}
          >
            <MapPin size={12} className="text-brand-magenta/60" />
            <span className="font-light">
              South Africa · United Kingdom — Serving readers across the globe
            </span>
          </div>
        </div>

        {/* Blend into footer */}
        <div className="absolute bottom-0 left-0 right-0 h-20 md:h-32 bg-gradient-to-t from-white dark:from-brand-dark to-transparent pointer-events-none" />
      </section>

      <Footer />
    </>
  );
};

export default ContactPage;
