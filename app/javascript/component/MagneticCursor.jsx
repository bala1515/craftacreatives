import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function MagneticCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Smooth Spring Physics for Mouse Follower Ring
  const cursorX = useSpring(-100, { stiffness: 400, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 400, damping: 28 });

  // Direct Coordinates for Central Sharp Dot
  const [dotPos, setDotPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    // Hide cursor on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      
      const { clientX, clientY } = e;
      setDotPos({ x: clientX, y: clientY });
      cursorX.set(clientX);
      cursorY.set(clientY);

      // Check if mouse is hovering over interactive elements
      const target = e.target;
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .magnetic');
      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Glowing Magnetic Halo Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isClicking ? 0.75 : isHovered ? 2.2 : 1,
          opacity: isHovered ? 0.95 : 0.6,
          borderColor: isHovered ? '#c8ff3d' : 'rgba(36, 87, 255, 0.5)',
          backgroundColor: isHovered ? 'rgba(200, 255, 61, 0.18)' : 'rgba(36, 87, 255, 0.08)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-[#2457ff]/40 backdrop-blur-[1px] shadow-[0_4px_16px_rgba(36,87,255,0.25)] transition-colors"
      />

      {/* Center Precise Studio Dot */}
      <motion.div
        style={{
          left: `${dotPos.x}px`,
          top: `${dotPos.y}px`,
        }}
        animate={{
          scale: isClicking ? 0.5 : isHovered ? 0.4 : 1,
          backgroundColor: isHovered ? '#2457ff' : '#0B0F19',
        }}
        transition={{ duration: 0.1 }}
        className="fixed -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#0B0F19] shadow-[0_1px_4px_rgba(0,0,0,0.25)]"
      />
    </div>
  );
}
