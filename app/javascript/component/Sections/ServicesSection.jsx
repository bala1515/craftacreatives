import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { 
  Code2, Cpu, Palette, Camera, Film, Image as ImageIcon, 
  ArrowRight, CheckCircle2, Layers 
} from 'lucide-react';

const SERVICES = [
  {
    id: 'webdev',
    num: '01',
    shortName: 'Web Development',
    title: 'Web Development & Apps',
    category: 'Full-Stack Engineering',
    tagline: 'Ultra-fast React 19 + Rails 8 web applications engineered with zero-lag architecture and sleek motion design.',
    icon: Code2,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&auto=format&fit=crop&q=80',
    color: '#0066CC',
    accentGradient: 'from-blue-600 to-cyan-500',
    techStack: ['React 19', 'Ruby on Rails 8', 'Tailwind CSS', 'Three.js', 'PostgreSQL'],
    details: ['Core Web Vitals 100/100', 'Zero-Lag SPA Architecture', 'SEO & Analytics Optimized', 'Custom WebGL Animations']
  },
  {
    id: 'saas',
    num: '02',
    shortName: 'SaaS MVP',
    title: 'SaaS MVP Development',
    category: 'Cloud Products',
    tagline: 'Turn your product idea into a production-ready SaaS with automated Stripe billing, authentication & cloud scale.',
    icon: Cpu,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&auto=format&fit=crop&q=80',
    color: '#5E5CE6',
    accentGradient: 'from-indigo-600 to-purple-600',
    techStack: ['Rails API', 'Stripe Billing', 'Redis Queues', 'Devise Auth', 'Docker Container'],
    details: ['User Auth & Security', 'Subscription Billing', 'Webhook Infrastructure', 'Scalable Database Setup']
  },
  {
    id: 'logo',
    num: '03',
    shortName: 'Brand Identity',
    title: 'Logo & Brand Identity',
    category: 'Visual Design',
    tagline: 'Distinctive, memorable vector brand assets, typography systems, and identity guides that build instant market authority.',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1000&auto=format&fit=crop&q=80',
    color: '#10B981',
    accentGradient: 'from-emerald-500 to-teal-600',
    techStack: ['Vector SVG', 'Figma Design', 'Brand Guidelines', 'Typography Suite', '3D Logos'],
    details: ['Scalable SVG Vector Assets', 'Comprehensive Color Palette', 'Typography & Style Guide', 'Social & Print Templates']
  },
  {
    id: 'shoot',
    num: '04',
    shortName: 'Product Shoot',
    title: 'Commercial Product Shoot',
    category: 'Commercial Media',
    tagline: '4K commercial photography with studio lighting, multi-angle e-commerce capture, and ultra-crisp retouching.',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1000&auto=format&fit=crop&q=80',
    color: '#F59E0B',
    accentGradient: 'from-amber-500 to-orange-600',
    techStack: ['4K Studio Camera', 'Pro Lighting Kit', 'Lightroom HDR', 'Photoshop Retouching'],
    details: ['Studio Lighting & Angles', 'High-Res E-Commerce Imagery', 'Professional Color Correction', 'Digital Asset Catalog']
  },
  {
    id: 'video',
    num: '05',
    shortName: 'Video Editing',
    title: 'Video Editing & Promos',
    category: 'Post-Production',
    tagline: 'High-converting promo reels, motion graphic title sequences, social shorts, and cinematic 4K color grading.',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1000&auto=format&fit=crop&q=80',
    color: '#F43F5E',
    accentGradient: 'from-rose-500 to-pink-600',
    techStack: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Sound Design', 'Motion FX'],
    details: ['High-Energy Promo Editing', 'Kinetic Typography & Titles', 'Sound FX & Audio Mixing', '4K Cinematic Color Grading']
  },
  {
    id: 'banner',
    num: '06',
    shortName: 'Banner & Ads',
    title: 'Banner & Ad Design',
    category: 'Marketing Graphics',
    tagline: 'High-converting social media ad creatives, website headers, slider assets, and print banners crafted for maximal CTR.',
    icon: ImageIcon,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&auto=format&fit=crop&q=80',
    color: '#06B6D4',
    accentGradient: 'from-cyan-500 to-blue-600',
    techStack: ['Meta Ad Banners', 'Google Display Ads', 'Website Sliders', 'Print Vector Layouts'],
    details: ['Conversion-Focused Design', 'Multi-Platform Dimensions', 'A/B Testing Variants', 'Fast High-Res Delivery']
  }
];

export default function ServicesSection() {
  const containerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobileScreen(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scroll tracking across generous 480vh (desktop) or 340vh (mobile)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Zero-lag discrete step tracking
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const clamped = Math.min(0.999, Math.max(0, latest));
      const stepIndex = Math.floor(clamped * SERVICES.length);
      const safeIndex = Math.min(SERVICES.length - 1, Math.max(0, stepIndex));
      
      setActiveIdx((prev) => (prev !== safeIndex ? safeIndex : prev));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const activeService = SERVICES[activeIdx];

  // Tab click smooth scroll to exact midpoint of target slide
  const handleTabClick = (index) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const stepSize = 1 / SERVICES.length;
    const midPoint = (index + 0.5) * stepSize;
    const targetScroll = containerTop + midPoint * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  return (
    // Outer scroll container pinned across 480vh (desktop) or 340vh (mobile)
    <div ref={containerRef} id="services" className="relative h-[340vh] lg:h-[480vh] bg-[#FAFAFC] z-20">
      
      {/* Screen-Locked Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between pt-14 lg:pt-16 pb-3 lg:pb-6 px-3 sm:px-6 lg:px-8 overflow-hidden bg-[#FAFAFC] border-t border-gray-200/80 shadow-[0_-30px_60px_rgba(0,0,0,0.04)]">
        
        {/* Soft Dynamic Backdrop Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[700px] h-[300px] sm:h-[500px] rounded-full blur-[100px] sm:blur-[150px] pointer-events-none transition-colors duration-500 opacity-[0.08]"
          style={{ backgroundColor: activeService.color }}
        />

        <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col justify-between py-1 relative z-10">
          
          {/* Top Bar: Progress Badge & Instant-Sync Tabs */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 border-b border-gray-200/70 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1 rounded-md bg-blue-50 text-blue-600">
                <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </div>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-blue-600">
                Liquid Glass Deck ({activeService.num} / 06)
              </span>
            </div>

            {/* Instant-Sync Tab Bar (Horizontal Scrollable on Mobile) */}
            <div className="inline-flex p-1 rounded-xl bg-gray-200/60 backdrop-blur-md border border-gray-300/40 overflow-x-auto max-w-full no-scrollbar">
              {SERVICES.map((service, idx) => {
                const isActive = idx === activeIdx;
                const Icon = service.icon;

                return (
                  <button
                    key={service.id}
                    onClick={() => handleTabClick(idx)}
                    className={`relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-bold transition-all duration-150 whitespace-nowrap ${
                      isActive 
                        ? 'bg-white text-gray-900 shadow-sm border border-gray-200/80 font-extrabold scale-[1.02]' 
                        : 'text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span>{service.num}. {service.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MAIN STAGE: RESPONSIVE FLEX CONTAINER (Cards First on Mobile, Side-by-Side on Desktop) */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-center my-auto py-1">
            
            {/* CARD DECK SHOWCASE (Rendered FIRST on Mobile lg:order-2 for Perfect Viewport Fit) */}
            <div className="lg:col-span-6 order-1 lg:order-2 relative flex items-center justify-center h-44 sm:h-64 lg:h-[380px] w-full my-auto">
              
              <div className="relative w-full h-full max-w-md lg:max-w-lg aspect-[16/10] sm:aspect-[4/3]">
                {SERVICES.map((srv, idx) => {
                  const offset = idx - activeIdx;

                  // Synchronized Render State for Deck Stack
                  let zIndex = 0;
                  let opacity = 0;
                  let scale = 1;
                  let translateY = 0;
                  let rotate = 0;
                  let pointerEvents = 'none';

                  const mobileYPeel = isMobileScreen ? -60 : -140;

                  if (offset === 0) {
                    zIndex = 30;
                    opacity = 1;
                    scale = 1;
                    translateY = 0;
                    rotate = 0;
                    pointerEvents = 'auto';
                  } else if (offset === 1) {
                    zIndex = 20;
                    opacity = 0.7;
                    scale = 0.94;
                    translateY = isMobileScreen ? 10 : 20;
                    rotate = -2;
                  } else if (offset === 2) {
                    zIndex = 10;
                    opacity = 0.4;
                    scale = 0.88;
                    translateY = isMobileScreen ? 20 : 40;
                    rotate = 2;
                  } else if (offset < 0) {
                    zIndex = 40 + offset;
                    opacity = 0;
                    scale = 1.04;
                    translateY = mobileYPeel;
                    rotate = -5;
                  } else {
                    zIndex = 0;
                    opacity = 0;
                    scale = 0.82;
                    translateY = isMobileScreen ? 30 : 60;
                    rotate = 0;
                  }

                  return (
                    <motion.div
                      key={srv.id}
                      initial={false}
                      animate={{
                        zIndex,
                        opacity,
                        scale,
                        y: translateY,
                        rotate,
                      }}
                      transition={{
                        duration: 0.25,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      style={{ pointerEvents }}
                      className="absolute inset-0 rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg lg:shadow-2xl border border-white/60 bg-white/90 backdrop-blur-xl group"
                    >
                      <img 
                        src={srv.image} 
                        alt={srv.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      
                      {/* Glass Gradient & Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-gray-950/20 to-transparent" />

                      {/* Glass Card Spec Badge */}
                      <div className="absolute bottom-2.5 sm:bottom-4 left-3 sm:left-5 right-3 sm:right-5 flex items-center justify-between text-white text-[10px] sm:text-xs font-bold">
                        <div className="flex items-center gap-2 px-2.5 py-1 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl bg-black/50 backdrop-blur-md border border-white/20">
                          <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-tr ${srv.accentGradient}`} />
                          <span className="truncate max-w-[150px] sm:max-w-none">{srv.num}. {srv.title}</span>
                        </div>

                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-md bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 text-[9px] sm:text-xs">
                          Deck #{srv.num}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

            </div>

            {/* Synchronized Typography & Deliverables (Rendered SECOND on Mobile lg:order-1) */}
            <div className="lg:col-span-6 order-2 lg:order-1 space-y-2 sm:space-y-4 text-left">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2 sm:space-y-3"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl sm:text-4xl font-black text-gray-300 font-mono tracking-tighter">
                    {activeService.num}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white border border-gray-200 shadow-xs text-[10px] sm:text-xs font-bold text-gray-700">
                    {React.createElement(activeService.icon, { className: "w-3 h-3 text-blue-600", style: { color: activeService.color } })}
                    <span>{activeService.category}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-3xl lg:text-5xl font-extrabold text-[#1D1D1F] tracking-tight leading-tight">
                  {activeService.title}
                </h3>

                <p className="text-xs sm:text-base text-gray-600 font-normal leading-relaxed max-w-xl line-clamp-2">
                  {activeService.tagline}
                </p>

                {/* Core Deliverables Grid */}
                <div className="space-y-1 pt-0.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-gray-400">
                    Core Deliverables
                  </span>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {activeService.details.slice(0, 4).map((detail, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white border border-gray-200/80 shadow-xs text-[10px] sm:text-xs font-semibold text-gray-700">
                        <CheckCircle2 className="w-3 h-3 text-blue-600 flex-shrink-0" />
                        <span className="truncate">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-1">
                  <a
                    href="#quote"
                    className="inline-flex items-center gap-1.5 bg-[#1D1D1F] hover:bg-blue-600 text-white font-bold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-md transition-all duration-300 text-xs sm:text-sm group"
                  >
                    <span>Request {activeService.shortName} Quote</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

              </motion.div>
            </div>

          </div>

          {/* Bottom Progress Bar */}
          <div className="flex items-center justify-between border-t border-gray-200/70 pt-2 text-[10px] sm:text-xs text-gray-400 font-semibold">
            <div className="flex items-center gap-2">
              <span className="font-mono text-blue-600 font-bold">Deck Card {activeIdx + 1} of 6</span>
              <span className="hidden sm:inline">• Scroll to lift cards</span>
            </div>

            {/* Scroll Indicator Bar */}
            <div className="w-20 sm:w-36 h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-300 rounded-full"
                style={{ width: `${((activeIdx + 1) / SERVICES.length) * 100}%` }}
              />
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}