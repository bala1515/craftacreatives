import React from 'react';
import { motion } from 'framer-motion';

export default function NavbarLogo({ isIntro = false }) {
  return (
    <motion.a
      href="#"
      layoutId="unified-company-logo"
      className="flex items-center gap-2.5 group select-none cursor-pointer"
      transition={{ duration: 0.85, ease: [0.65, 0, 0.35, 1] }}
    >
      {/* Logo Icon Box */}
      <motion.div 
        layoutId="logo-icon-box"
        className="w-10 h-10 rounded-xl bg-gray-900 p-0.5 shadow-md group-hover:scale-105 transition-transform duration-300 flex-shrink-0"
      >
        <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center font-black text-lg text-gray-900">
          CC
        </div>
      </motion.div>

      {/* Logo Text */}
      <motion.span 
        layoutId="logo-text"
        className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors whitespace-nowrap"
      >
        Crafta <span className="text-blue-600">Creatives</span>
      </motion.span>
    </motion.a>
  );
}
