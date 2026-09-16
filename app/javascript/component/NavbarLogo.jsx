import React from 'react';
import { motion } from 'framer-motion';

export default function NavbarLogo({ isIntro = false }) {
  return (
    <motion.a
      href="#"
      layoutId="unified-company-logo"
      className="flex items-center gap-3 group select-none cursor-pointer"
      transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Pop Art Solid Color Logo Icon Box */}
      <motion.div 
        layoutId="logo-icon-box"
        className="w-10 h-10 rounded-xl bg-[#00F0FF] p-0.5 shadow-sm group-hover:scale-105 transition-all duration-300 flex-shrink-0"
      >
        <div className="w-full h-full bg-[#1D1D1F] rounded-[10px] flex items-center justify-center font-black text-sm tracking-wider text-[#00F0FF]">
          CC
        </div>
      </motion.div>

      {/* Logo Text */}
      <motion.span 
        layoutId="logo-text"
        className="text-lg sm:text-xl font-black tracking-tight text-[#1D1D1F] transition-colors whitespace-nowrap"
      >
        Crafta <span className="text-[#FF46A2] font-black">Creatives</span>
      </motion.span>
    </motion.a>
  );
}
