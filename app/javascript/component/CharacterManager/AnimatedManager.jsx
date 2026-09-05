import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CHARACTER_WAYPOINTS } from './CharacterScript';
import SpeechBubble from './SpeechBubble';
import ThreeManagerCharacter from './ThreeManagerCharacter';
import { ShieldCheck } from 'lucide-react';

export default function AnimatedManager() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeWaypoint, setActiveWaypoint] = useState(CHARACTER_WAYPOINTS[0]);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      
      const currentScroll = Math.min(100, Math.max(0, Math.round((window.scrollY / totalHeight) * 100)));
      setScrollPercent(currentScroll);

      if (Math.abs(window.scrollY - lastScrollY) > 5) {
        setIsWalking(true);
        clearTimeout(window.walkTimeout);
        window.walkTimeout = setTimeout(() => setIsWalking(false), 400);
      }
      lastScrollY = window.scrollY;

      const currentWaypoint = CHARACTER_WAYPOINTS.find(
        wp => currentScroll >= wp.scrollMin && currentScroll <= wp.scrollMax
      ) || CHARACTER_WAYPOINTS[0];

      setActiveWaypoint(currentWaypoint);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNextSection = () => {
    const currentIndex = CHARACTER_WAYPOINTS.findIndex(wp => wp.id === activeWaypoint.id);
    const nextIndex = (currentIndex + 1) % CHARACTER_WAYPOINTS.length;
    const targetWaypoint = CHARACTER_WAYPOINTS[nextIndex];
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScrollY = (targetWaypoint.scrollMin / 100) * totalHeight;

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  // Safe Responsive Coordinates
  const targetX = isMobile ? "88%" : activeWaypoint.position.x;
  const targetY = isMobile ? "82%" : activeWaypoint.position.y;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            key={activeWaypoint.id}
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ 
              opacity: 1, 
              scale: isMobile ? 0.8 : 1, 
              y: isWalking ? [0, -8, 0, -8, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{ type: "spring", stiffness: 180, damping: 20 }}
            className="absolute pointer-events-auto flex flex-col items-center transition-all duration-700 ease-out"
            style={{
              left: targetX,
              top: targetY,
              transform: `translate(-50%, -50%)`,
            }}
          >
            {/* Speech Bubble Above 3D WebGL Character */}
            <SpeechBubble waypoint={activeWaypoint} onNext={handleNextSection} />

            {/* Real 3D Skeletal Canvas Scene */}
            <div className="relative group cursor-pointer flex flex-col items-center" onClick={() => setIsMinimized(true)}>
              
              {/* Floating Manager Badge */}
              <div className="mb-1 px-3 py-0.5 sm:px-3.5 sm:py-1 bg-white/90 backdrop-blur-md border border-gray-200 rounded-full text-[10px] sm:text-xs font-bold text-gray-900 flex items-center gap-1.5 shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                <span>3D Manager ({scrollPercent}%)</span>
              </div>

              {/* Real 3D WebGL Canvas Component */}
              <ThreeManagerCharacter 
                modelUrl="/models/manager.glb"
                activePose={activeWaypoint.pose} 
                isWalking={isWalking} 
              />

              {/* 3D Studio Floor Shadow */}
              <div className="w-28 sm:w-36 h-2.5 sm:h-3 bg-gray-400/30 rounded-full blur-md -mt-2 animate-pulse" />

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Bottom-Right Mini Floating Button */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-auto bg-white border-2 border-blue-600 text-gray-900 p-2.5 sm:p-3.5 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group z-50"
        >
          <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-600 animate-ping" />
          <span className="text-xs sm:text-sm font-bold text-blue-600">👔 Show 3D Manager</span>
        </button>
      )}
    </div>
  );
}