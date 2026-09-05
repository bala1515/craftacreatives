import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring, useVelocity } from 'framer-motion';
import { ExternalLink, Play, Image as ImageIcon, X, Sparkles, ArrowRight } from 'lucide-react';

const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: 'SaaS Cloud Dashboard',
    category: 'webdev',
    categoryLabel: 'Web Engineering',
    type: 'Web Application',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
    description: 'Real-time telemetry and cloud analytics engine engineered for enterprise SaaS platforms.',
    accentColor: '#0066CC',
    tags: ['React 19', 'Rails 8', 'Tailwind', 'Recharts']
  },
  {
    id: 2,
    title: 'Minimalist Vector Branding',
    category: 'logo',
    categoryLabel: 'Brand Identity',
    type: 'Logo & Identity Suite',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&auto=format&fit=crop&q=80',
    description: 'Modern vector logo design, custom typography suite, and complete corporate identity guide.',
    accentColor: '#10B981',
    tags: ['Vector SVG', 'Brand Guide', 'Figma', 'Typography']
  },
  {
    id: 3,
    title: '4K Commercial Product Shoot',
    category: 'shoot',
    categoryLabel: 'Commercial Media',
    type: 'Product Photography',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80',
    description: 'Studio lighting commercial photography with multi-angle e-commerce capture & 4K HDR retouching.',
    accentColor: '#F59E0B',
    tags: ['4K Camera', 'Studio Lighting', 'HDR Retouching']
  },
  {
    id: 4,
    title: 'Brand Promo Video Edit',
    category: 'video',
    categoryLabel: 'Post-Production',
    type: 'Video Reel & FX',
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&auto=format&fit=crop&q=80',
    description: 'High-energy promo reel, kinetic typography, cinematic sound design, and 4K color grading.',
    accentColor: '#F43F5E',
    tags: ['Premiere Pro', 'After Effects', 'Kinetic FX']
  },
  {
    id: 5,
    title: 'Social Media Ad Campaign Banners',
    category: 'banner',
    categoryLabel: 'Marketing Graphics',
    type: 'Banner Design',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    description: 'Conversion-focused digital ad banners and web sliders designed for high CTR campaigns.',
    accentColor: '#06B6D4',
    tags: ['Meta Ads', 'Google Banners', 'High CTR']
  },
  {
    id: 6,
    title: 'E-Commerce Mobile Web App',
    category: 'webdev',
    categoryLabel: 'Web Engineering',
    type: 'E-Commerce Platform',
    image: 'https://images.unsplash.com/photo-1556742049-0a67daf40955?w=1000&auto=format&fit=crop&q=80',
    description: 'Ultra-fast headless e-commerce store with animated product cards, cart & instant checkout.',
    accentColor: '#5E5CE6',
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

// Interactive 3D Tilt & Velocity Skew Card
function KineticVelocityCard({ item, index, scrollVelocitySkew, isDesktop, onClick }) {
  const cardRef = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 22 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 22 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-10, 10]);

  const spotlightX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

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
      style={{ skewY: isDesktop ? scrollVelocitySkew : 0 }}
      initial={{ opacity: 0, y: 50, rotateX: isDesktop ? 18 : 0, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
      viewport={{ once: false, margin: "-30px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
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
        className="group relative bg-white border border-gray-200/90 rounded-3xl overflow-hidden shadow-md hover:shadow-2xl cursor-pointer transition-all duration-300 transform-gpu"
      >
        {/* Media Showcase Container */}
        <div className="relative h-56 sm:h-64 lg:h-72 overflow-hidden bg-gray-950">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />

          {/* Liquid Lens Spotlight Glare */}
          {isDesktop && (
            <motion.div
              style={{
                background: `radial-gradient(400px circle at ${spotlightX.get()} ${spotlightY.get()}, rgba(255,255,255,0.25), transparent 80%)`
              }}
              className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          )}

          {/* Category Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-gray-900 border border-white/40 shadow-sm text-xs font-bold">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accentColor }} />
            <span>{item.type}</span>
          </div>

          {/* Hover Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gray-950/30 backdrop-blur-[2px]">
            <div 
              className="w-12 h-12 rounded-2xl text-white flex items-center justify-center shadow-xl transform group-hover:scale-110 transition-transform"
              style={{ backgroundColor: item.accentColor }}
            >
              {item.category === 'video' ? <Play className="w-5 h-5 fill-current ml-0.5" /> : <ImageIcon className="w-5 h-5" />}
            </div>
          </div>
        </div>

        {/* Card Content */}
        <div className="p-5 sm:p-6 space-y-2.5 sm:space-y-3 bg-white text-left">
          <div className="flex items-center justify-between">
            <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-gray-400">
              {item.categoryLabel}
            </span>
            <Sparkles className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.accentColor }} />
          </div>

          <h4 className="text-lg sm:text-xl font-extrabold text-[#1D1D1F] group-hover:text-blue-600 transition-colors tracking-tight leading-snug">
            {item.title}
          </h4>

          <p className="text-xs text-gray-600 leading-relaxed font-normal line-clamp-2">
            {item.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-gray-100">
            {item.tags.map((t) => (
              <span key={t} className="text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 bg-gray-100 rounded-md text-gray-600 border border-gray-200/60">
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

  // Scroll Tracking & Velocity Skew
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const scrollVelocity = useVelocity(scrollYProgress);
  const scrollVelocitySkew = useTransform(scrollVelocity, [-1, 1], [-3, 3]);

  const TITLE_WORDS = ["Crafted", "with", "precision", "&", "purpose."];

  const filteredItems = activeCategory === 'all'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section 
      ref={sectionRef} 
      id="portfolio" 
      className="py-20 sm:py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-[#FAFAFC] border-t border-gray-200/80 relative z-30 overflow-hidden"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16 relative z-10">
        
        {/* KINETIC SCROLL REVEAL HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-3 sm:space-y-4">
          
          {/* Badge */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50/80 border border-emerald-200/60 text-emerald-600 text-xs font-bold uppercase tracking-wider"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Featured Client Work</span>
          </motion.div>

          {/* Kinetic Word-by-Word Title Reveal */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#1D1D1F] tracking-tight leading-tight flex flex-wrap justify-center gap-x-2.5 sm:gap-x-3 gap-y-1 overflow-hidden py-1">
            {TITLE_WORDS.map((word, idx) => (
              <motion.span
                key={idx}
                initial={{ y: "120%", opacity: 0, rotate: 5, filter: 'blur(8px)' }}
                whileInView={{ y: "0%", opacity: 1, rotate: 0, filter: 'blur(0px)' }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="text-sm sm:text-lg text-gray-500 font-normal leading-relaxed"
          >
            Explore our curated portfolio of full-stack web applications, brand identities, commercial photography, and promo reels.
          </motion.p>

          {/* Category Filter Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-40px" }}
            transition={{ duration: 0.45, delay: 0.4 }}
            className="pt-2 sm:pt-4 flex justify-center"
          >
            <div className="inline-flex p-1 sm:p-1.5 rounded-2xl bg-gray-200/60 backdrop-blur-md border border-gray-300/40 overflow-x-auto max-w-full no-scrollbar">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`relative px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-colors duration-200 whitespace-nowrap z-10 ${
                      isActive ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="portfolioCategoryPill"
                        className="absolute inset-0 bg-white rounded-xl shadow-sm border border-gray-200/80 -z-10"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* VELOCITY-SKEWED 3D CARDS GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <KineticVelocityCard
                key={item.id}
                item={item}
                index={index}
                scrollVelocitySkew={scrollVelocitySkew}
                isDesktop={isDesktop}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* LIGHTBOX MODAL */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-gray-950/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.92, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.92, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white border border-gray-200 rounded-3xl max-w-3xl w-full p-5 sm:p-8 space-y-5 sm:space-y-6 relative shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Accent Top Bar */}
                <div 
                  className="absolute top-0 left-0 right-0 h-1.5" 
                  style={{ backgroundColor: selectedItem.accentColor }}
                />

                <button
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="relative h-56 sm:h-80 rounded-2xl overflow-hidden shadow-md border border-gray-200">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-white text-xs font-bold">
                    <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20">
                      {selectedItem.type}
                    </span>
                    <span className="flex items-center gap-1 text-blue-300">
                      <Sparkles className="w-3.5 h-3.5" /> High Resolution
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 text-left">
                  <span className="text-xs font-extrabold uppercase tracking-wider" style={{ color: selectedItem.accentColor }}>
                    {selectedItem.categoryLabel}
                  </span>
                  <h3 className="text-xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs sm:text-base text-gray-600 leading-relaxed font-normal">
                    {selectedItem.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 sm:pt-4 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.tags.map((t) => (
                      <span key={t} className="text-[11px] sm:text-xs font-bold px-2.5 py-1 bg-gray-100 rounded-lg text-gray-700 border border-gray-200/60">
                        #{t}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#quote"
                    onClick={() => setSelectedItem(null)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-xs font-bold px-6 py-3 rounded-xl bg-[#1D1D1F] text-white hover:bg-blue-600 transition-colors shadow-md"
                  >
                    <span>Request Similar Project</span>
                    <ArrowRight className="w-4 h-4" />
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