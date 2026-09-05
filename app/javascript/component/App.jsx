import React, { useState } from 'react';
import Navbar from './Navbar';
import AnimatedManager from './CharacterManager/AnimatedManager';
import HeroSection from './Sections/HeroSection';
import ServicesSection from './Sections/ServicesSection';
import PortfolioGallery from './Sections/PortfolioGallery';
import QuoteCalculator from './Sections/QuoteCalculator';
import ContactSection from './Sections/ContactSection';
import IntroAnimation from './IntroAnimation';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [introFinished, setIntroFinished] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 relative selection:bg-blue-600 selection:text-white">
      
      {/* Cinematic Logo Entrance Reveal Animation */}
      <IntroAnimation onComplete={() => setIntroFinished(true)} />

      {/* Top Fixed Navigation Bar (Navbar logo becomes visible once intro finishes docking) */}
      <Navbar showLogo={introFinished} />

      {/* 3D Scroll-Triggered Animated Manager Presenter */}
      <AnimatedManager />

      {/* Main Agency Landing Page Sections */}
      <main className="relative z-10 space-y-0">
        <HeroSection />
        <ServicesSection />
        <PortfolioGallery />
        <QuoteCalculator />
        <ContactSection />
      </main>

      {/* Footer */}
      <footer className="py-8 bg-white border-t border-gray-200 text-center text-xs text-gray-500 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-gray-900">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>Crafta Creatives © {new Date().getFullYear()}</span>
          </div>
          <div>
            Built with React, Rails 8 & 3D Character Engine
          </div>
          <div className="text-gray-400">
            All Rights Reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}