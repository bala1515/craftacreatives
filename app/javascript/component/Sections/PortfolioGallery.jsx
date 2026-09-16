import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ExternalLink, Play, Image as ImageIcon, X, Sparkles, ArrowRight, Layers } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'SaaS Cloud Telemetry Platform',
    category: 'webdev',
    categoryLabel: 'Web Engineering',
    type: 'React 19 & Rails 8 App',
    image: '/images/telemetry.svg',
    description: 'Real-time telemetry and cloud analytics engine engineered for enterprise SaaS platforms.',
    accentColor: '#3B82F6',
    tags: ['React 19', 'Rails 8', 'Tailwind', 'Recharts']
  },
  {
    id: 2,
    title: 'Minimalist Vector Branding',
    category: 'logo',
    categoryLabel: 'Brand Identity',
    type: 'Logo & Identity Suite',
    image: '/images/branding.svg',
    description: 'Modern vector logo design, custom typography suite, and complete corporate identity guide.',
    accentColor: '#34D399',
    tags: ['Vector SVG', 'Brand Guide', 'Figma', 'Typography']
  },
  {
    id: 3,
    title: '4K Commercial Product Shoot',
    category: 'shoot',
    categoryLabel: 'Commercial Media',
    type: 'Studio Photography',
    image: '/images/product-shoot.svg',
    description: 'Studio lighting commercial photography with multi-angle e-commerce capture & 4K HDR retouching.',
    accentColor: '#FBBF24',
    tags: ['4K Camera', 'Studio Lighting', 'HDR Retouching']
  },
  {
    id: 4,
    title: 'Brand Promo Cinema Video Edit',
    category: 'video',
    categoryLabel: 'Post-Production',
    type: 'Video Reel & FX',
    image: '/images/cinema-video.svg',
    description: 'High-energy promo reel, kinetic typography, cinematic sound design, and 4K color grading.',
    accentColor: '#F43F5E',
    tags: ['Premiere Pro', 'After Effects', 'Kinetic FX']
  },
  {
    id: 5,
    title: 'High-CTR Ad Campaign Banners',
    category: 'banner',
    categoryLabel: 'Marketing Graphics',
    type: 'Banner & Ad Design',
    image: '/images/ad-banners.svg',
    description: 'Conversion-focused digital ad banners and web sliders designed for high CTR campaigns.',
    accentColor: '#22D3EE',
    tags: ['Meta Ads', 'Google Banners', 'High CTR']
  },
  {
    id: 6,
    title: 'E-Commerce Mobile Web App',
    category: 'webdev',
    categoryLabel: 'Web Engineering',
    type: 'E-Commerce Platform',
    image: '/images/ecommerce.svg',
    description: 'Ultra-fast headless e-commerce store with animated product cards, cart & instant checkout.',
    accentColor: '#818CF8',
    tags: ['React 19', 'Stripe API', 'PostgreSQL', 'Tailwind']
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Works' },
  { id: 'webdev', label: 'Web Engineering' },
  { id: 'logo', label: 'Brand Identity' },
  { id: 'shoot', label: 'Product Shoot' },
  { id: 'video', label: 'Video Editing' },
  { id: 'banner', label: 'Banner & Ads' }
];

function Interactive3DTiltCard({ item, index, isDesktop, onClick }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e) => {
    if (!cardRef.current || !isDesktop) return;
    const rect = cardRef.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, margin: "-30px" }}
      transition={{ duration: 0.45, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      className="perspective-1000"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX: isDesktop ? rotateX : 0,
          rotateY: isDesktop ? rotateY : 0,
          transformStyle: 'preserve-3d'
        }}
        className="group relative bg-white/90 border border-white/95 hover:border-blue-500/40 rounded-3xl overflow-hidden shadow-[0_12px_36px_-8px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] cursor-pointer transition-all duration-300 transform-gpu"
      >
        <div className="relative h-60 sm:h-64 overflow-hidden bg-slate-100">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Type Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-1 bg-white/90 backdrop-blur-md rounded-full text-[#1D1D1F] border border-white text-xs font-semibold shadow-md">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accentColor }} />
            <span>{item.type}</span>
          </div>

          {/* Hover Play / View Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-[2px]">
            <div 
              className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform bg-[#0071E3]"
            >
              {item.category === 'video' ? <Play className="w-5 h-5 fill-current ml-0.5 text-white" /> : <ImageIcon className="w-5 h-5 text-white" />}
            </div>
          </div>
        </div>

        <div className="p-6 space-y-3 text-left">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider text-[#0071E3]">
              {item.categoryLabel}
            </span>
            <Sparkles className="w-4 h-4 text-[#0071E3] opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <h4 className="text-xl font-black text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors tracking-tight leading-snug uppercase">
            {item.title}
          </h4>

          <p className="text-xs text-[#6E6E73] leading-relaxed font-normal line-clamp-2">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-black/5">
            {item.tags.map((t) => (
              <span key={t} className="text-[10px] font-semibold px-2.5 py-1 bg-black/5 rounded-lg text-[#48484A] border border-black/5">
                #{t}
              </span>
            ))}
          </div>
        </div>

      </motion.div>
    </motion.div>
  );
}

export default function PortfolioGallery() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isDesktop, setIsDesktop] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section 
      ref={sectionRef} 
      id="portfolio" 
      className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-[#F5F5F7] text-[#1D1D1F] border-t border-black/5 relative z-30 overflow-hidden"
    >
      {/* Subtle Ceramic Radial Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#00000008_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16 relative z-10">
        
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-white/95 text-[#0071E3] text-xs font-bold uppercase tracking-widest shadow-sm">
            <Layers className="w-3.5 h-3.5" />
            <span>Studio Selected Works</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-[#1D1D1F] tracking-tight leading-tight uppercase">
            Crafted for <span className="bg-gradient-to-r from-[#0071E3] via-blue-600 to-indigo-600 bg-clip-text text-transparent">Market Authority</span>
          </h2>

          <p className="text-base sm:text-xl text-[#6E6E73] font-normal leading-relaxed">
            Explore our curated portfolio of zero-lag web apps, SaaS engines, 3D brand assets, and 4K cinema media.
          </p>

          {/* Filter Bar (Tactile Skeuomorphic Pills) */}
          <div className="pt-4 flex justify-center">
            <div className="inline-flex p-1.5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/95 shadow-[0_4px_16px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,1)] overflow-x-auto max-w-full no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 whitespace-nowrap ${
                      isActive 
                        ? 'bg-[#0071E3] text-white font-bold shadow-[0_2px_12px_rgba(0,113,227,0.35)] scale-105' 
                        : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'
                    }`}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3D CARDS GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <Interactive3DTiltCard
                key={item.id}
                item={item}
                index={index}
                isDesktop={isDesktop}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LIGHTBOX MODAL (Apple VisionOS Frosted Modal) */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl flex items-center justify-center p-4"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-white/95 border border-white/95 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 relative shadow-[0_25px_70px_rgba(0,0,0,0.18)] overflow-hidden text-[#1D1D1F]"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-5 right-5 text-[#86868B] hover:text-[#1D1D1F] p-2 rounded-full hover:bg-black/5 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-black/5 shadow-inner">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs font-bold">
                    <span className="px-3.5 py-1.5 rounded-lg bg-white/90 backdrop-blur-md border border-white text-[#1D1D1F] shadow-sm">
                      {selectedItem.type}
                    </span>
                    <span className="flex items-center gap-1.5 text-blue-300 font-mono">
                      <Sparkles className="w-3.5 h-3.5" /> 4K Ultra-Res
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-left">
                  <span className="text-xs font-black uppercase tracking-wider text-[#0071E3]">
                    {selectedItem.categoryLabel}
                  </span>
                  <h3 className="text-2xl sm:text-4xl font-black tracking-tight uppercase text-[#1D1D1F]">
                    {selectedItem.title}
                  </h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed font-normal">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-black/5">
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((t) => (
                      <span key={t} className="text-xs font-semibold px-3 py-1 bg-black/5 rounded-lg text-[#48484A] border border-black/5">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#quote"
                    onClick={() => setSelectedItem(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold px-6 py-3.5 rounded-xl bg-[#0071E3] hover:bg-blue-600 text-white uppercase tracking-wider shadow-[0_4px_16px_rgba(0,113,227,0.35)] transition-all"
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-4 h-4 text-white" />
                  </a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}