import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const SERVICES = [
  {
    id: 'webdev',
    num: '01',
    title: 'Web Development',
    tagline: 'High-speed websites and custom digital platforms engineered to scale your business.',
    image: '/images/telemetry.svg',
    accentColor: '#00F0FF',
    shadowColor: '#00F0FF',
  },
  {
    id: 'logo',
    num: '02',
    title: 'Logo Design',
    tagline: 'Memorable, iconic brand identities that set you apart and command authority.',
    image: '/images/branding.svg',
    accentColor: '#FF46A2',
    shadowColor: '#FF46A2',
  },
  {
    id: 'shoot',
    num: '03',
    title: 'Product Shoot',
    tagline: 'Studio commercial photography that elevates your product to a luxury standard.',
    image: '/images/product-shoot.svg',
    accentColor: '#FBBF24',
    shadowColor: '#FBBF24',
  },
  {
    id: 'printing',
    num: '04',
    title: 'Printing & Packaging',
    tagline: 'Luxury foil-stamped business cards, bespoke boxes, and tactile brand merchandise.',
    image: '/images/printing.svg',
    accentColor: '#EE4B2B',
    shadowColor: '#EE4B2B',
  },
];

export default function ServicesSection() {
  const containerRef = useRef(null);

  // Smooth Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const sectionY = useTransform(scrollYProgress, [0, 0.35], [50, 0]);
  const marqueeX = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative z-20 -mt-16 sm:-mt-24 rounded-t-[44px] sm:rounded-t-[64px] bg-[#F8F8FA] border-t-2 border-white shadow-[0_-25px_60px_rgba(0,0,0,0.08)] overflow-hidden pt-16 sm:pt-24 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 text-[#1D1D1F]"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1.2px,transparent_1.2px)] [background-size:24px_24px] pointer-events-none" />

      {/* MINIMAL KINETIC MARQUEE STRIP */}
      <div className="w-full overflow-hidden py-3 mb-10 sm:mb-14 border-y border-black/5 bg-white/70 backdrop-blur-md">
        <motion.div
          style={{ x: marqueeX }}
          className="flex whitespace-nowrap gap-10 text-xs sm:text-sm font-mono font-black uppercase tracking-widest text-[#1D1D1F]/70"
        >
          <span>✦ WEB DEVELOPMENT</span>
          <span>✦ LOGO DESIGN</span>
          <span>✦ PRODUCT SHOOT</span>
          <span>✦ PRINTING &amp; PACKAGING</span>
          <span>✦ WEB DEVELOPMENT</span>
          <span>✦ LOGO DESIGN</span>
          <span>✦ PRODUCT SHOOT</span>
          <span>✦ PRINTING &amp; PACKAGING</span>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-12 sm:space-y-16">
        
        {/* MINIMAL HEADER */}
        <motion.div 
          style={{ y: sectionY }} 
          className="text-center max-w-2xl mx-auto space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-black/10 text-xs font-black uppercase tracking-widest text-[#1D1D1F] shadow-[3px_3px_0px_#1D1D1F]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF46A2]" />
            <span>Core Capabilities</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#1D1D1F] leading-none">
            What We Do.
          </h2>

          <p className="text-sm sm:text-base text-[#6E6E73] font-normal">
            Four specialized disciplines. Focused on visual excellence and real results.
          </p>
        </motion.div>

        {/* 4 VISUAL-FIRST CARDS (BENTO 2x2 GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="group relative bg-white rounded-3xl sm:rounded-[32px] border-2 border-black overflow-hidden shadow-[5px_5px_0px_#1D1D1F] hover:shadow-[10px_10px_0px_#1D1D1F] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0F172A]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
                />

                {/* Subtle Gradient Over Image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Number Badge (Top Left) */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-black/10 font-mono text-xs font-black text-[#1D1D1F] shadow-sm">
                  {item.num}
                </div>

                {/* Hover Glow Accent Dot (Top Right) */}
                <div 
                  className="absolute top-4 right-4 w-3.5 h-3.5 rounded-full shadow-md transition-transform duration-300 group-hover:scale-125"
                  style={{ backgroundColor: item.accentColor }}
                />
              </div>

              {/* Card Content (Ultra-Minimal) */}
              <div className="p-6 sm:p-8 flex items-center justify-between gap-4">
                <div className="space-y-1.5 text-left">
                  <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#6E6E73] font-normal leading-relaxed max-w-md">
                    {item.tagline}
                  </p>
                </div>

                {/* Action Link Button */}
                <a
                  href="#contact"
                  className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#1D1D1F] group-hover:bg-[#0071E3] text-white flex items-center justify-center shadow-sm group-hover:scale-110 transition-all duration-300 cursor-pointer"
                  title={`Inquire about ${item.title}`}
                >
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>

              {/* Bottom Subtle Accent Stripe */}
              <div 
                className="h-1.5 w-full transition-all duration-300 opacity-80 group-hover:opacity-100"
                style={{ backgroundColor: item.accentColor }}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}