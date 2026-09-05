import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import NavbarLogo from './NavbarLogo';

let globalIntroPlayed = false;

export default function IntroAnimation({ onComplete }) {
  const [stage, setStage] = useState(() => globalIntroPlayed ? 'complete' : 'presenting'); // 'presenting' -> 'sliding' -> 'complete'
  const [targetPos, setTargetPos] = useState({ x: 0, y: 0, scale: 1 });
  const centerLogoRef = useRef(null);

  useEffect(() => {
    if (globalIntroPlayed) {
      if (onComplete) onComplete();
      return;
    }

    const calculateTarget = () => {
      const navContainer = document.getElementById('navbar-logo-container');
      if (navContainer && centerLogoRef.current) {
        const navRect = navContainer.getBoundingClientRect();
        const centerRect = centerLogoRef.current.getBoundingClientRect();

        const deltaX = navRect.left + navRect.width / 2 - (centerRect.left + centerRect.width / 2);
        const deltaY = navRect.top + navRect.height / 2 - (centerRect.top + centerRect.height / 2);
        const targetScale = navRect.height / centerRect.height;

        setTargetPos({ x: deltaX, y: deltaY, scale: targetScale || 1 });
      }
    };

    calculateTarget();
    window.addEventListener('resize', calculateTarget);

    // Subtle Timeline:
    // 0ms - 700ms: Soft Center Presentation
    const t1 = setTimeout(() => {
      calculateTarget();
      setStage('sliding');
    }, 700);

    // 700ms - 1500ms: Gentle Glide to Navbar Logo Position
    const t2 = setTimeout(() => {
      globalIntroPlayed = true;
      setStage('complete');
      if (onComplete) onComplete();
    }, 1500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', calculateTarget);
    };
  }, [onComplete]);

  if (stage === 'complete' || globalIntroPlayed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] bg-white flex items-center justify-center pointer-events-none"
      >
        {/* Subtle & Minimalist Center-to-Navbar Glide */}
        <motion.div
          ref={centerLogoRef}
          initial={{ opacity: 0, y: 12, scale: 1.15 }}
          animate={
            stage === 'presenting'
              ? { opacity: 1, y: 0, scale: 1.15, x: 0 }
              : { opacity: 1, y: targetPos.y, x: targetPos.x, scale: targetPos.scale } // Subtle gentle glide to Navbar
          }
          transition={
            stage === 'presenting'
              ? { duration: 0.5, ease: "easeOut" }
              : { duration: 0.75, ease: [0.25, 1, 0.5, 1] } // Apple-style fluid ease-out curve
          }
        >
          <NavbarLogo isIntro={true} />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
