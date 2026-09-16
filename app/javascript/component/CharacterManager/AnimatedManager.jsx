import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThreeManagerCharacter from './ThreeManagerCharacter';
import SpeechBubble from './SpeechBubble';
import { ShieldCheck, RefreshCw } from 'lucide-react';
import { CHARACTER_WAYPOINTS } from './CharacterScript';

export default function AnimatedManager() {
  // Model loading state
  const [isModelReady, setIsModelReady] = useState(false);

  // Intro Stages:
  // 'walking_to_center' -> 'center_welcome' -> 'walking_to_right' -> 'right_intro' -> 'docked'
  const [stage, setStage] = useState('walking_to_center');

  // Start slightly offscreen to the left so he genuinely walks INTO the screen
  const [posX, setPosX] = useState("-8%");

  const [isMinimized, setIsMinimized] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollWaypoint, setScrollWaypoint] = useState(CHARACTER_WAYPOINTS[0]);
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 1. TRIGGER WALK ONLY AFTER 3D MODEL IS VISIBLY LOADED
  const handleModelLoaded = () => {
    if (!isModelReady) {
      setIsModelReady(true);
      setPosX("50%");
    }
  };

  // 2. STAGE TRANSITION TIMELINE (Speech bubble reading timers)
  useEffect(() => {
    if (!isModelReady) return;

    let timer;

    if (stage === 'center_welcome') {
      // Stand at center and deliver welcome speech for 4.8s
      timer = setTimeout(() => {
        startWalkingToRight();
      }, 4800);
    } else if (stage === 'right_intro') {
      // Deliver manager intro on right for 6s then dock
      timer = setTimeout(() => {
        setStage('docked');
      }, 6000);
    }

    return () => clearTimeout(timer);
  }, [stage, isModelReady]);

  // Section 2 Interactive Walk & Top-Angle Camera State
  const [section2State, setSection2State] = useState('idle_section1'); // 'idle_section1' | 'walking_section2' | 'stationed_section2' | 'other_sections'
  const [isTopAngle, setIsTopAngle] = useState(false);

  // Helper to trigger center-to-right walk
  const startWalkingToRight = () => {
    setStage('walking_to_right');
    setPosX(isMobile ? "80%" : "86%");
  };

  // Replay Sequence Helper
  const replaySequence = () => {
    setIsMinimized(false);
    setIsTopAngle(false);
    setSection2State('idle_section1');
    setStage('walking_to_center');
    setPosX("-8%");
    setTimeout(() => {
      setPosX("50%");
    }, 50);
  };

  // Scroll tracking for Section Transitions & Section 2 Text Walk
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight - vh;
      if (totalHeight <= 0) return;

      const currentScroll = Math.min(100, Math.max(0, Math.round((scrollY / totalHeight) * 100)));
      setScrollPercent(currentScroll);

      // Section Boundaries:
      // Section 1 (Hero): scrollY < vh * 0.45
      // Section 2 (Services): scrollY >= vh * 0.45 && scrollY < vh * 3.6
      // Section 3+ (Portfolio, Quote, Contact): scrollY >= vh * 3.6
      const inHero = scrollY < vh * 0.45;
      const inServices = scrollY >= vh * 0.45 && scrollY < vh * 3.6;

      if (inServices) {
        setIsTopAngle(true);
        if (stage !== 'docked') setStage('docked');

        if (section2State === 'idle_section1') {
          // Trigger the walk across Section 2's text to the designated pedestal space!
          setSection2State('walking_section2');
          setPosX(isMobile ? "15%" : "18%");
          setTimeout(() => {
            setPosX(isMobile ? "80%" : "87.5%");
          }, 40);
        } else if (section2State === 'other_sections') {
          setSection2State('stationed_section2');
          setPosX(isMobile ? "80%" : "87.5%");
        }

        const currentWaypoint = CHARACTER_WAYPOINTS.find(wp => wp.id === "services") || CHARACTER_WAYPOINTS[1];
        setScrollWaypoint(currentWaypoint);
      } else if (inHero) {
        setIsTopAngle(false);
        if (section2State !== 'idle_section1') {
          setSection2State('idle_section1');
          setPosX(isMobile ? "80%" : "86%");
        }
        const currentWaypoint = CHARACTER_WAYPOINTS[0];
        setScrollWaypoint(currentWaypoint);
      } else {
        // Section 3+ (Portfolio, Quote, Contact)
        setIsTopAngle(false);
        setSection2State('other_sections');
        const currentWaypoint = CHARACTER_WAYPOINTS.find(
          wp => currentScroll >= wp.scrollMin && currentScroll <= wp.scrollMax
        ) || CHARACTER_WAYPOINTS[2];
        setScrollWaypoint(currentWaypoint);

        if (currentWaypoint.id === 'portfolio') {
          setPosX(isMobile ? "20%" : "16%");
        } else if (currentWaypoint.id === 'quote') {
          setPosX(isMobile ? "78%" : "82%");
        } else if (currentWaypoint.id === 'contact') {
          setPosX("50%");
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [stage, section2State, isMobile]);

  // Determine Animation and Dialogue States
  const isWalking = 
    stage === 'walking_to_center' || 
    stage === 'walking_to_right' || 
    section2State === 'walking_section2';

  const useStandingFbx = 
    stage === 'center_welcome' || 
    stage === 'right_intro' || 
    (stage === 'docked' && section2State !== 'walking_section2');

  let rotationY = 0;
  let activeDialogue = "";
  let activeBadge = "Agency Host";
  let onNextAction = null;
  let actionBtnLabel = "Next";

  // Background Blur is active during Left-to-Center walk and Center Welcome
  const isBlurred = stage === 'walking_to_center' || stage === 'center_welcome';

  if (stage === 'walking_to_center') {
    rotationY = Math.PI * 0.42; // Facing forward-right while walking
  } else if (stage === 'center_welcome') {
    rotationY = 0; // Turn directly facing user
    activeDialogue = "Welcome to Crafta Creatives! 👋";
    activeBadge = "Grand Welcome";
    onNextAction = startWalkingToRight;
    actionBtnLabel = "Continue →";
  } else if (stage === 'walking_to_right') {
    rotationY = Math.PI * 0.42; // Facing right towards dock position
  } else if (stage === 'right_intro') {
    rotationY = -0.18; // Facing user slightly inwards
    activeDialogue = "Naan thaan Crafta Creatives-oda Virtual Manager! 👔 Scroll panni enga agency works & services-a paarunga!";
    activeBadge = "Virtual Manager";
    onNextAction = () => setStage('docked');
    actionBtnLabel = "Explore Site ↓";
  } else if (section2State === 'walking_section2') {
    rotationY = Math.PI * 0.42; // Walking across text towards right space
    activeDialogue = "Services Deck-ku walk pannuren... Enga capabilities-a paarpom! 🚶‍♂️";
    activeBadge = "Moving to Section 2";
  } else if (section2State === 'stationed_section2') {
    rotationY = -0.18; // Standing and facing user in designated space
    activeDialogue = scrollWaypoint?.dialogue || "Look here! 👈 Enga Crafta Creatives-la Web Development, SaaS MVPs, 3D Brand Design ellam top class-ah pannuvom!";
    activeBadge = scrollWaypoint?.badge || "Services Guide";
  } else if (stage === 'docked') {
    rotationY = -0.18;
    activeDialogue = scrollWaypoint?.dialogue || "Enkooda scroll panni Crafta Creatives-a explore pannunga!";
    activeBadge = scrollWaypoint?.badge || "Virtual Manager";
  }

  // Dynamic Walk Duration
  let walkDuration = 0.5;
  if (stage === 'walking_to_center') walkDuration = 2.0;
  else if (stage === 'walking_to_right') walkDuration = 1.4;
  else if (section2State === 'walking_section2') walkDuration = 2.4;

  const handleAnimationComplete = () => {
    if (stage === 'walking_to_center' && posX === "50%") {
      setStage('center_welcome');
    } else if (stage === 'walking_to_right' && (posX === "86%" || posX === "80%")) {
      setStage('right_intro');
    } else if (section2State === 'walking_section2' && (posX === "87.5%" || posX === "84%" || posX === "80%")) {
      setSection2State('stationed_section2');
    }
  };

  return (
    <>
      {/* 1. CINEMATIC LIGHT FROSTED VEIL OVERLAY */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ 
          opacity: isBlurred ? 1 : 0,
        }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className={`fixed inset-0 z-30 bg-[#F5F5F7]/75 backdrop-blur-xl transition-all ${
          isBlurred ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      />

      {/* 2. 3D MANAGER PRESENTATION LAYER */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{
                left: posX,
                x: "-50%",
              }}
              animate={{
                left: posX,
                x: "-50%",
              }}
              transition={{
                duration: walkDuration,
                ease: "linear",
              }}
              onAnimationComplete={handleAnimationComplete}
              style={{
                bottom: isMobile ? "12px" : "24px",
              }}
              className="absolute pointer-events-auto flex flex-col items-center"
            >
              {/* Speech Bubble (Floating cleanly above character with zero overlap) */}
              <AnimatePresence mode="wait">
                {activeDialogue && (
                  <motion.div
                    key={activeDialogue}
                    initial={{ opacity: 0, y: 15, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.92 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="mb-3 z-20"
                  >
                    <SpeechBubble
                      dialogue={activeDialogue}
                      badge={activeBadge}
                      onNext={onNextAction}
                      actionLabel={actionBtnLabel}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 3D Human Character Container */}
              <div 
                className="relative group cursor-pointer flex flex-col items-center"
                onClick={() => {
                  if (stage === 'docked') setIsMinimized(true);
                }}
              >
                {/* Manager Status Badge */}
                <div className="mb-1 px-3 py-0.5 sm:px-3.5 sm:py-1 bg-white/85 backdrop-blur-md border border-white/95 rounded-full text-[10px] sm:text-xs font-bold text-[#1D1D1F] flex items-center gap-1.5 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0071E3]" />
                  <span>3D Host {isTopAngle ? '• Top Angle View' : stage === 'docked' ? `(${scrollPercent}%)` : '• Presenting'}</span>
                </div>

                {/* Full Head-to-Toe 3D Character Canvas with Dynamic Top Angle */}
                <ThreeManagerCharacter
                  isWalking={isWalking}
                  rotationY={rotationY}
                  useStandingFbx={useStandingFbx}
                  onLoaded={handleModelLoaded}
                  isTopAngle={isTopAngle}
                />

                {/* Ground Shadow under walking shoes */}
                <div className={`w-36 sm:w-44 h-3 bg-black/10 rounded-full blur-md -mt-4 transition-all duration-500 ${
                  isTopAngle ? 'scale-x-125 scale-y-150 opacity-60' : 'opacity-40'
                }`} />
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* 3. COLLAPSED FLOATING MANAGER BUTTON */}
        {isMinimized && (
          <button
            onClick={() => setIsMinimized(false)}
            className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 pointer-events-auto bg-white/90 border border-white/95 text-[#1D1D1F] p-3 sm:p-4 rounded-full shadow-[0_12px_32px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.05)] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-2 group z-50 backdrop-blur-xl"
          >
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#0071E3] animate-ping" />
            <span className="text-xs sm:text-sm font-bold text-[#0071E3]">👔 Show 3D Host</span>
          </button>
        )}

        {/* 4. REPLAY INTRO BUTTON */}
        {stage === 'docked' && !isMinimized && (
          <button
            onClick={replaySequence}
            title="Replay Welcome Sequence"
            className="fixed bottom-4 left-4 pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 bg-white/80 hover:bg-white backdrop-blur-md border border-black/5 hover:border-[#0071E3]/30 text-[#6E6E73] hover:text-[#1D1D1F] rounded-full text-xs font-medium shadow-sm transition-all z-40"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#0071E3]" />
            <span>Replay Intro</span>
          </button>
        )}
      </div>
    </>
  );
}