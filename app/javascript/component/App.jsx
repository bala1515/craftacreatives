import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
// import AnimatedManager from './CharacterManager/AnimatedManager';
import HeroSection from './Sections/HeroSection';
import ServicesSection from './Sections/ServicesSection';
// import PortfolioGallery from './Sections/PortfolioGallery';
// import QuoteCalculator from './Sections/QuoteCalculator';
import ContactSection from './Sections/ContactSection';
import IntroAnimation from './IntroAnimation';
import MagneticCursor from './MagneticCursor';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F8FA] text-[#1D1D1F] relative selection:bg-[#FF46A2] selection:text-white font-sans antialiased overflow-x-hidden">
      
      {/* Custom Physics Magnetic Glow Cursor */}
      <MagneticCursor />

      {/* Cinematic Logo Entrance Reveal Animation */}
      <IntroAnimation onComplete={() => setIntroFinished(true)} />

      {/* Top Fixed Navigation Bar */}
      <Navbar showLogo={introFinished} />

      {/* 3D Scroll-Triggered Animated Manager Presenter (Temporarily disabled) */}
      {/* <AnimatedManager /> */}

      {/* Main Senior Creative Agency Landing Sections */}
      <main className="relative z-10 space-y-0">
        <HeroSection />
        <ServicesSection />
        {/* <PortfolioGallery /> */}
        {/* <QuoteCalculator /> */}
        <ContactSection />
      </main>

      {/* Ultra-Clean Pop Art Skeuomorphic Glass Footer */}
      <footer className="py-12 bg-white/80 backdrop-blur-xl border-t border-black/5 text-center text-xs text-[#6E6E73] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5 font-bold text-[#1D1D1F] tracking-wide text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF46A2] shadow-[0_0_10px_#FF46A2]" />
            <span className="uppercase font-mono text-[11px] tracking-widest text-[#1D1D1F]">Crafta Creatives Studio © {new Date().getFullYear()}</span>
          </div>
          <div className="text-[#6E6E73] font-mono text-[11px] tracking-wider">
            Multi-Disciplinary Design, 3D & Media Production
          </div>
          <div className="text-[#86868B] text-[11px]">
            Chennai • Global Delivery
          </div>
        </div>
      </footer>

    </div>
  );
}