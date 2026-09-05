import React, { useState, useEffect } from 'react';
import NavbarLogo from './NavbarLogo';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({ showLogo = true }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 py-3 shadow-sm' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Exact Navbar Logo Container */}
        <div id="navbar-logo-container" className="h-10 flex items-center">
          {showLogo && <NavbarLogo />}
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
          <a href="#hero" className="hover:text-gray-900 transition-colors">Home</a>
          <a href="#services" className="hover:text-gray-900 transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-gray-900 transition-colors">Portfolio</a>
          <a href="#quote" className="hover:text-gray-900 transition-colors">Estimate Quote</a>
          <a href="#contact" className="hover:text-gray-900 transition-colors">Contact Us</a>
        </div>

        {/* Call To Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#quote"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300"
          >
            Get a Quote <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 hover:text-gray-900 p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pt-4 pb-6 space-y-3 shadow-lg">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 py-2 font-semibold">Home</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 py-2 font-semibold">Services</a>
          <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 py-2 font-semibold">Portfolio</a>
          <a href="#quote" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 py-2 font-semibold">Estimate Quote</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block text-gray-700 hover:text-blue-600 py-2 font-semibold">Contact Us</a>
        </div>
      )}
    </nav>
  );
}