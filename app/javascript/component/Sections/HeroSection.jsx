import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const containerRef = useRef(null);
  
  // Responsive Mouse/Touch position tracking for liquid glass sphere
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const springX = useSpring(mousePos.x, { stiffness: 100, damping: 22 });
  const springY = useSpring(mousePos.y, { stiffness: 100, damping: 22 });

  useEffect(() => {
    // Center liquid glass sphere by default on load
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 640;
      const initialX = isMobile ? window.innerWidth / 2 - 140 : window.innerWidth / 2 - 200;
      const initialY = isMobile ? 120 : 160;
      setMousePos({ x: initialX, y: initialY });
      springX.set(initialX);
      springY.set(initialY);
    }
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - (window.innerWidth < 640 ? 140 : 200);
    const y = e.clientY - rect.top - (window.innerWidth < 640 ? 140 : 200);
    setMousePos({ x, y });
    springX.set(x);
    springY.set(y);
  };

  // Typewriter effect state that starts strictly after logo intro completes
  const [typedText, setTypedText] = useState('');
  const fullText = "CRAFTA CREATIVES";

  useEffect(() => {
    // Wait 1800ms for logo intro to finish
    const startDelay = setTimeout(() => {
      setTypedText('');
      let index = 0;
      const timer = setInterval(() => {
        if (index <= fullText.length) {
          setTypedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(timer);
        }
      }, 100);

      return () => clearInterval(timer);
    }, 1800);

    return () => clearTimeout(startDelay);
  }, []);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 });

  // Seamless Parallax Transformations
  const scaleTitle = useTransform(smoothProgress, [0, 1], [1, 1.2]);
  const yTitle = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacityTitle = useTransform(smoothProgress, [0, 0.7], [1, 0]);

  const xMarqueeRight = useTransform(smoothProgress, [0, 1], [0, 220]);
  const xMarqueeLeft = useTransform(smoothProgress, [0, 1], [0, -220]);

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="hero" 
      className="relative min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-12 sm:pb-16 px-2 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden select-none cursor-default z-10"
    >
      {/* REAL LIQUID CRYSTAL GLASS SPHERE (Mouse/Touch Follower) */}
      <motion.div
        style={{
          x: springX,
          y: springY,
        }}
        className="absolute top-0 left-0 w-64 h-64 sm:w-[420px] sm:h-[420px] rounded-full bg-gradient-to-tr from-blue-500/15 via-indigo-400/10 to-cyan-300/20 backdrop-blur-xl border-2 border-blue-400/30 shadow-[0_30px_70px_rgba(0,102,204,0.18),inset_0_0_40px_rgba(255,255,255,0.9),inset_0_0_15px_rgba(0,102,204,0.2)] pointer-events-none z-0 overflow-hidden"
      >
        <div className="absolute top-3 left-6 w-36 sm:w-48 h-18 sm:h-24 bg-gradient-to-b from-white/95 via-white/40 to-transparent rounded-full blur-[1px] transform -rotate-45" />
        <div className="absolute bottom-3 right-6 w-28 sm:w-36 h-14 sm:h-18 bg-gradient-to-t from-blue-600/30 via-indigo-500/20 to-transparent rounded-full blur-md" />
      </motion.div>

      {/* Top Tagline Marquee */}
      <div className="w-full overflow-hidden pointer-events-none opacity-40 py-2 relative z-10">
        <motion.div
          style={{ x: xMarqueeLeft }}
          className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-gray-500 whitespace-nowrap"
        >
          WEB DEVELOPMENT • SAAS MVPS • LOGO DESIGN • PRODUCT SHOOT • VIDEO EDITING • BANNERS •
        </motion.div>
      </div>

      {/* CENTER STAGE: CLEAN UNTRUNCATED TYPEWRITER HEADLINE FOR CRAFTA CREATIVES */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 my-auto w-full max-w-full text-center px-1 overflow-hidden">
        <motion.div
          style={{ 
            scale: scaleTitle,
            y: yTitle,
            opacity: opacityTitle,
          }}
          className="w-full text-center max-w-full overflow-hidden"
        >
          <h1 className="text-[5.5vw] sm:text-[7.2vw] md:text-[8.2vw] lg:text-[9vw] font-black leading-none tracking-tight whitespace-nowrap inline-flex items-center justify-center max-w-full">
            {/* Elegant Apple Blue Gradient Fill */}
            <motion.span 
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] min-w-[1ch] drop-shadow-sm"
            >
              {typedText}
            </motion.span>

            {/* Typewriter Blinking Cursor */}
            <motion.span 
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.6, repeat: Infinity }}
              className="inline-block w-[1.2vw] sm:w-[1.4vw] h-[4vw] sm:h-[6vw] bg-blue-600 ml-1.5 sm:ml-2 rounded-sm shadow-md align-middle"
            />
          </h1>
        </motion.div>
      </div>

      {/* Bottom Row: Marquee Taglines + Parallax Scroll Down Indicator */}
      <div className="w-full space-y-4 sm:space-y-6 relative z-10">
        <div className="w-full overflow-hidden pointer-events-none opacity-40 py-1 sm:py-2">
          <motion.div
            style={{ x: xMarqueeRight }}
            className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-blue-600 whitespace-nowrap"
          >
            • DIGITAL & VISUAL MEDIA STUDIO • FULL-STACK AGENCY • CHENNAI • TAMIL NADU •
          </motion.div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="flex flex-col items-center gap-1.5 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-widest">
          <span>Scroll to Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-blue-600" />
          </motion.div>
        </div>
      </div>

    </section>
  );
}