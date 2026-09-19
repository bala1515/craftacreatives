import React, { useState, useEffect } from 'react';
import NavbarLogo from './NavbarLogo';
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react';

export default function Navbar({ showLogo = true }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      // Simple active section detection
      const sections = ['hero', 'services', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'py-3.5 bg-white/80 backdrop-blur-2xl border-b border-black/5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' 
        : 'py-6 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Navbar Logo Container */}
        <div id="navbar-logo-container" className="h-10 flex items-center gap-4">
          {showLogo && <NavbarLogo />}
          
          {/* Studio Availability Badge (Electric Lime with Coral Dot) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#c8ff3d] border border-black/15 text-[10px] font-black text-black shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#FF4D36] animate-pulse" />
            <span className="tracking-wide">Studio Booking Open Q3/Q4</span>
          </div>
        </div>

        {/* Desktop Floating Pill Navigation Links */}
        <div className="hidden md:flex items-center p-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-white/95 shadow-[0_4px_20px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`relative px-4 py-1.5 rounded-full text-xs font-black tracking-wide transition-all duration-300 ${
                  isActive 
                    ? 'text-white bg-[#2457ff] font-black shadow-[0_2px_12px_rgba(36,87,255,0.35)] scale-105' 
                    : 'text-[#6E6E73] hover:text-[#2457ff] hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Call To Action Button (Solid Cobalt with Lime border hover) */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 bg-[#2457ff] hover:bg-[#1a44d6] text-white text-xs font-black tracking-wider uppercase px-5 py-2.5 rounded-full shadow-[0_4px_16px_rgba(36,87,255,0.35)] hover:shadow-[0_4px_20px_rgba(200,255,61,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <span>Start Project</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#c8ff3d] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#1D1D1F] hover:text-[#2457ff] p-2 rounded-xl bg-white/80 border border-black/5 shadow-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-black/5 px-6 pt-4 pb-6 space-y-3 shadow-2xl">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2.5 px-3 rounded-xl text-sm font-bold text-[#1D1D1F] hover:text-[#2457ff] hover:bg-black/5 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-center mt-4 bg-[#2457ff] hover:bg-[#1a44d6] text-white text-xs font-black uppercase py-3.5 rounded-xl shadow-[0_4px_16px_rgba(36,87,255,0.35)]"
          >
            Start Project →
          </a>
        </div>
      )}
    </nav>
  );
}