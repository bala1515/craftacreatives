import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CreativeAgencyBackground from '../CreativeAgencyBackground';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroSection() {
  const containerRef = useRef(null);
  const codeBoxRef = useRef(null);
  const codeLettersRef = useRef([]);
  const codeCursorRef = useRef(null);
  const craftaWordRef = useRef(null);
  const craftaLettersRef = useRef([]);
  const characterRef = useRef(null);
  const cameraFlashRef = useRef(null);
  const shutterOverlayRef = useRef(null);
  const selectBoxRef = useRef(null);
  const timelineIndicatorRef = useRef(null);
  const creativesWrapperRef = useRef(null);
  const creativesLettersRef = useRef([]);
  const timecodeRef = useRef(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [animationCycle, setAnimationCycle] = useState(0);

  // The code characters typed out: <crafta />
  const codeChars = [
    { char: '<', colorClass: 'text-[#2457ff]' },
    { char: 'c', colorClass: 'text-white' },
    { char: 'r', colorClass: 'text-white' },
    { char: 'a', colorClass: 'text-white' },
    { char: 'f', colorClass: 'text-white' },
    { char: 't', colorClass: 'text-white' },
    { char: 'a', colorClass: 'text-white' },
    { char: '\u00A0', colorClass: 'text-white' },
    { char: '/', colorClass: 'text-[#c8ff3d]' },
    { char: '>', colorClass: 'text-[#2457ff]' },
  ];

  const creativesWord = "CREATIVES".split("");
  const craftaLetters = "CRAFTA".split("");

  const audioCtxRef = useRef(null);

  useEffect(() => {
    // Unlock AudioContext cleanly only after user gestures on the page
    const unlockAudio = () => {
      try {
        if (!audioCtxRef.current && (window.AudioContext || window.webkitAudioContext)) {
          const AudioContextClass = window.AudioContext || window.webkitAudioContext;
          audioCtxRef.current = new AudioContextClass();
        }
        if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume().catch(() => {});
        }
      } catch (e) {}
    };

    window.addEventListener('pointerdown', unlockAudio, { passive: true, once: true });
    window.addEventListener('keydown', unlockAudio, { passive: true, once: true });

    return () => {
      window.removeEventListener('pointerdown', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
      if (audioCtxRef.current && typeof audioCtxRef.current.close === 'function') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Synthesized mechanical keyboard click sound
  const playKeyClack = () => {
    try {
      const audioCtx = audioCtxRef.current;
      if (!audioCtx || audioCtx.state !== 'running') return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.04);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch(e) {}
  };

  // Synthesized smooth whoosh/morph impact sound
  const playMorphWhoosh = () => {
    try {
      const audioCtx = audioCtxRef.current;
      if (!audioCtx || audioCtx.state !== 'running') return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(520, audioCtx.currentTime + 0.12);
      osc.frequency.exponentialRampToValueAtTime(160, audioCtx.currentTime + 0.28);
      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.28);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.29);
    } catch(e) {}
  };

  // Synthesized crisp DSLR camera click sound
  const playCameraClick = () => {
    try {
      const audioCtx = audioCtxRef.current;
      if (!audioCtx || audioCtx.state !== 'running') return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(800, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.28, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch(e) {}
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. High-end Parallax scroll transition to Section 2
      gsap.to(containerRef.current, {
        scale: 0.93,
        y: -110,
        opacity: 0.25,
        filter: 'blur(6px)',
        transformOrigin: 'center 25%',
        ease: 'power1.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.1,
        },
      });

      // Layered depth parallax for background floating elements
      gsap.to('.hero-bg-floating-1', {
        y: -220,
        rotate: -20,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        }
      });
      gsap.to('.hero-bg-floating-2', {
        y: -180,
        rotate: 25,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.4,
        }
      });
      gsap.to('.hero-bg-floating-3', {
        y: -260,
        rotate: -15,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.9,
        }
      });
      gsap.to('.hero-bg-floating-4', {
        y: -200,
        rotate: 18,
        opacity: 0,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.3,
        }
      });

      // Master Intro Timeline
      const masterTl = gsap.timeline({
        delay: 0.25,
        defaults: { ease: 'power3.out' }
      });

      // Reset initial styles
      if (codeBoxRef.current) {
        codeBoxRef.current.style.visibility = 'visible';
        codeBoxRef.current.style.borderColor = '#000000';
        codeBoxRef.current.style.boxShadow = '5px 5px 0px #1D1D1F';
        gsap.set(codeBoxRef.current, { opacity: 1, scale: 1 });
      }
      codeLettersRef.current.forEach(el => {
        if (el) {
          el.style.display = 'none';
          el.style.opacity = '0';
        }
      });
      gsap.set(craftaWordRef.current, { opacity: 1 });
      craftaLettersRef.current.forEach(el => {
        if (el) gsap.set(el, { opacity: 0, scale: 0.3, y: 20 });
      });
      gsap.set(characterRef.current, { opacity: 0, scale: 0, x: 20, y: 15 });
      gsap.set(cameraFlashRef.current, { opacity: 0, scale: 0.2 });
      gsap.set(shutterOverlayRef.current, { opacity: 0 });
      gsap.set(selectBoxRef.current, { width: 0, opacity: 0 });
      gsap.set(timelineIndicatorRef.current, { left: '0%', opacity: 0 });
      gsap.set(creativesLettersRef.current, {
        opacity: 0,
        scale: 0.85,
        color: '#c8ff3d'
      });

      /* =============================================================
         PHASE 1: CODE TYPING EFFECT (<crafta />) - AUTOMATED TYPEWRITER
      ============================================================= */
      // Type each character one by one with mechanical keyboard sound
      codeChars.forEach((item, i) => {
        masterTl.to({}, {
          duration: 0.08,
          onStart: () => {
            playKeyClack();
            if (codeLettersRef.current[i]) {
              codeLettersRef.current[i].style.display = 'inline-block';
              codeLettersRef.current[i].style.opacity = '1';
            }
          }
        });
      });

      // Brief pause after finishing code typing
      masterTl.to({}, { duration: 0.3 });

      /* =============================================================
         PHASE 2: SEAMLESS ORGANIC MORPH: CODE SNIPPET -> BOLD "CRAFTA"
      ============================================================= */
      // Step 2A: The code box outer frame smoothly expands with neon glow & morph audio
      masterTl.to(codeBoxRef.current, {
        scale: 1.06,
        borderColor: '#2457ff',
        boxShadow: '0 0 35px rgba(36, 87, 255, 0.55)',
        duration: 0.22,
        ease: 'power2.out',
        onStart: playMorphWhoosh
      });

      // Step 2B: Code tag symbols (<, /, >) and cursor quickly pull inwards and dissolve
      masterTl.to([codeLettersRef.current[0], codeLettersRef.current[6], codeLettersRef.current[7], codeLettersRef.current[8], codeCursorRef.current], {
        scale: 0,
        opacity: 0,
        duration: 0.14,
        ease: 'power2.in'
      }, '<0.04');

      // Step 2C: Code container seamlessly fades out while letters of CRAFTA simultaneously burst in
      masterTl.to(codeBoxRef.current, {
        scale: 1.15,
        opacity: 0,
        duration: 0.28,
        ease: 'power2.inOut',
        onComplete: () => {
          if (codeBoxRef.current) codeBoxRef.current.style.visibility = 'hidden';
        }
      }, '-=0.08');

      // Step 2D: CRAFTA letters pop dynamically into place from center outwards in exact position
      masterTl.to(craftaLettersRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.42,
        stagger: {
          amount: 0.2,
          from: 'center'
        },
        ease: 'back.out(2.4)'
      }, '<0.05');

      // Micro settling pulse for CRAFTA
      masterTl.to(craftaWordRef.current, {
        scale: 1,
        duration: 0.12,
        ease: 'power1.out'
      }, '-=0.1');

      /* =============================================================
         PHASE 3: CARTOON CAMERAMAN ARRIVES AT THE END OF "CRAFTA" & CLICKS
      ============================================================= */
      masterTl.to(characterRef.current, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.45,
        ease: 'back.out(2)'
      }, '+=0.05');

      // Camera lens aim bobbing motion
      masterTl.to(characterRef.current, {
        rotation: -7,
        y: -4,
        duration: 0.14,
        yoyo: true,
        repeat: 1
      });

      // CAMERA CLICK TRIGGER: Flash Burst & Crisp Shutter Sound
      masterTl.to(shutterOverlayRef.current, {
        opacity: 0.85,
        duration: 0.08,
        ease: 'power4.in',
        onStart: playCameraClick
      });

      masterTl.to(cameraFlashRef.current, {
        scale: 3.5,
        opacity: 1,
        duration: 0.1,
        ease: 'power4.out'
      }, '<');

      masterTl.to(cameraFlashRef.current, {
        scale: 5,
        opacity: 0,
        duration: 0.28,
        ease: 'power2.in'
      });

      masterTl.to(shutterOverlayRef.current, {
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out'
      }, '<');

      // "CRAFTA" reacts to the flash with a micro recoil
      masterTl.to(craftaWordRef.current, {
        scale: 1.04,
        duration: 0.1,
        yoyo: true,
        repeat: 1
      }, '<');

      // CHARACTER COMPLETELY HIDES RIGHT AFTER CLICKING
      masterTl.to(characterRef.current, {
        scale: 0.1,
        opacity: 0,
        y: -25,
        x: 20,
        duration: 0.3,
        ease: 'back.in(1.7)'
      }, '+=0.1');

      /* =============================================================
         PHASE 4: "CREATIVES" PHOTOSHOP & PREMIERE PRO SEQUENCE
      ============================================================= */
      // 1. Select Box & "CREATIVES" letters appear and reveal in perfect lockstep (Zero delay)
      masterTl.set(selectBoxRef.current, { opacity: 1, width: '0%' }, '+=0.2');

      // Selection box drags smoothly from left to right
      masterTl.to(selectBoxRef.current, {
        width: '100%',
        duration: 1.2,
        ease: 'power1.inOut'
      }, 'dragSelection');

      // "CREATIVES" word appears in exact sync AS the selectbox drags across (starts on frame 0, no delay)
      masterTl.to(creativesLettersRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.12,
        stagger: {
          each: 0.11,
          from: 'start',
          ease: 'power1.inOut'
        },
        ease: 'power1.out'
      }, 'dragSelection');

      // Subtle pulse to emphasize the completed selection box comfortably enclosing the entire word
      masterTl.to(selectBoxRef.current, {
        scale: 1.02,
        duration: 0.12,
        yoyo: true,
        repeat: 1,
        ease: 'power1.inOut'
      });

      // 2. THEN OVER THE WORD, PREMIERE PRO TIMELINE INDICATOR SWEEPS ACROSS!
      masterTl.set(timelineIndicatorRef.current, { opacity: 1, left: '0%' }, '+=0.35');

      // Premiere Pro CTI sweeps smoothly across the word
      masterTl.to(timelineIndicatorRef.current, {
        left: '100%',
        duration: 1.4,
        ease: 'power1.inOut',
        onUpdate: function() {
          if (timecodeRef.current) {
            const frame = Math.floor(this.progress() * 24);
            const frameStr = frame < 10 ? `0${frame}` : frame;
            timecodeRef.current.textContent = `00:01:${frameStr}:00`;
          }
        }
      }, 'timelineSweep');

      // Letters react with a subtle dynamic lift as the timeline playhead passes over them
      masterTl.to(creativesLettersRef.current, {
        y: -6,
        duration: 0.15,
        yoyo: true,
        repeat: 1,
        stagger: {
          each: 0.12,
          from: 'start'
        },
        ease: 'sine.inOut'
      }, 'timelineSweep+=0.04');

      /* =============================================================
         PHASE 5: FINAL RESTING STATE: PURE ELECTRIC STUDIO LIME (#c8ff3d)
      ============================================================= */
      masterTl.to(creativesLettersRef.current, {
        color: '#c8ff3d',
        duration: 0.3,
        stagger: 0.03,
        ease: 'power2.out'
      });

      // Fade out marquee drag box & Premiere playhead indicator smoothly once finished
      masterTl.to([selectBoxRef.current, timelineIndicatorRef.current], {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out'
      }, '-=0.2');

      // Continuous subtle ambient float animation for background creative symbols
      gsap.to('.hero-bg-floating-1', {
        y: '-=18',
        rotation: '+=6',
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      gsap.to('.hero-bg-floating-2', {
        y: '+=16',
        rotation: '-=8',
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.5
      });
      gsap.to('.hero-bg-floating-3', {
        y: '-=22',
        x: '+=10',
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1
      });
      gsap.to('.hero-bg-floating-4', {
        y: '+=20',
        rotation: '+=10',
        duration: 3.8,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.2
      });

    }, containerRef);

    return () => ctx.revert();
  }, [animationCycle]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 30;
    const y = (e.clientY - rect.top - rect.height / 2) / 30;
    setMousePos({ x, y });
  };

  const replayAnimation = () => {
    setAnimationCycle(c => c + 1);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#F8F8FA] text-[#1D1D1F] overflow-hidden selection:bg-[#c8ff3d] selection:text-[#0B0F19] z-10"
    >
      {/* Fullscreen Camera Shutter Flash Overlay */}
      <div 
        ref={shutterOverlayRef}
        className="fixed inset-0 bg-white pointer-events-none z-[100] opacity-0"
      />

      {/* UNIQUE INTERACTIVE CREATIVE AGENCY STUDIO BACKGROUND */}
      <CreativeAgencyBackground mousePos={mousePos} />



      {/* Top Controls: Replay Button */}
      <div className="absolute top-24 sm:top-28 right-4 sm:right-8 lg:right-12 z-20 flex items-center justify-end">
        {/* Replay Button */}
        <button
          onClick={replayAnimation}
          className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border-2 border-black/10 text-xs font-black uppercase tracking-wider text-[#1D1D1F] shadow-[3px_3px_0px_#1D1D1F] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_#1D1D1F] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
          title="Replay Entrance Animation"
        >
          <span className="w-2 h-2 rounded-full bg-[#2457ff] group-hover:bg-[#c8ff3d] transition-colors" />
          <span>Replay</span>
        </button>
      </div>

      {/* CENTER STAGE: ANIMATED COMPANY NAME HEADLINE */}
      <div className="relative z-10 text-center max-w-6xl mx-auto w-full py-6 sm:py-8 flex flex-col items-center justify-center">
        
        {/* ROW 1: CODE TYPING CONTAINER -> MORPHS INTO BOLD "CRAFTA" */}
        {/* Using CSS Grid single-cell stack (grid-area: 1/1) so codeBox and CRAFTA occupy the exact same spot with 0 layout shift */}
        <div className="grid grid-cols-1 grid-rows-1 place-items-center select-none py-1 min-h-[90px] sm:min-h-[140px] md:min-h-[180px] lg:min-h-[210px]">
          
          {/* 1A. THE CODE SNIPPET BOX (Types out <crafta />) */}
          <div 
            ref={codeBoxRef}
            className="col-start-1 row-start-1 inline-flex items-center gap-2 sm:gap-3 bg-[#1E1E24] text-white px-5 sm:px-8 py-3.5 sm:py-5 rounded-2xl border-2 border-black shadow-[5px_5px_0px_#1D1D1F] font-mono text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight z-20"
          >
            {/* Terminal prompt symbol */}
            <span className="text-[#2457ff] text-xl sm:text-3xl select-none font-black">&gt;</span>

            {/* The Code Letters */}
            <div className="flex items-center">
              {codeChars.map((item, idx) => (
                <span
                  key={idx}
                  ref={el => codeLettersRef.current[idx] = el}
                  className={`inline-block ${item.colorClass}`}
                  style={{ display: 'none', opacity: 0 }}
                >
                  {item.char}
                </span>
              ))}

              {/* Blinking Terminal Cursor */}
              <span 
                ref={codeCursorRef}
                className="inline-block w-2.5 sm:w-3.5 h-6 sm:h-9 bg-[#c8ff3d] ml-1.5 animate-pulse"
              />
            </div>
          </div>

          {/* 1B. THE BOLD "CRAFTA" HEADLINE (Gradient Colors, Snaps in on morph) */}
          <div 
            ref={craftaWordRef}
            className="col-start-1 row-start-1 flex items-center justify-center select-none pointer-events-none opacity-0"
          >
            <div className="relative inline-flex items-center">
              <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[10.5rem] font-black tracking-tight leading-[0.95] uppercase select-none flex gap-0.5 sm:gap-1.5">
                {craftaLetters.map((l, idx) => (
                  <span
                    key={idx}
                    ref={el => craftaLettersRef.current[idx] = el}
                    className="inline-block transform-gpu clay-text-cobalt"
                  >
                    {l}
                  </span>
                ))}
              </h1>

              {/* 1C. CARTOON CAMERAMAN CHARACTER AT THE END OF "CRAFTA" WORD */}
              <div 
                ref={characterRef}
                className="absolute -right-16 sm:-right-24 md:-right-32 lg:-right-36 -top-8 sm:-top-14 md:-top-18 z-40 pointer-events-none transform-gpu opacity-0 scale-0"
              >
                {/* Pop Art Flash Burst Ring */}
                <div 
                  ref={cameraFlashRef}
                  className="absolute -left-5 top-8 w-16 h-16 rounded-full bg-[#c8ff3d] blur-[2px] pointer-events-none opacity-0 z-40 border-4 border-white shadow-[0_0_35px_#c8ff3d]"
                />

                {/* Cartoon Photographer SVG Character */}
                <svg 
                  className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 drop-shadow-[0_8px_20px_rgba(0,0,0,0.25)]"
                  viewBox="0 0 140 140" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Cute Studio Cap */}
                  <ellipse cx="68" cy="36" rx="26" ry="12" fill="#FF4D36" stroke="#1D1D1F" strokeWidth="3" />
                  <path d="M42 36C42 22 52 14 68 14C84 14 94 22 94 36" fill="#FF4D36" stroke="#1D1D1F" strokeWidth="3" />
                  <path d="M78 36L102 38" stroke="#1D1D1F" strokeWidth="4" strokeLinecap="round" />

                  {/* Character Head */}
                  <circle cx="68" cy="46" r="20" fill="#FFDBAC" stroke="#1D1D1F" strokeWidth="3" />

                  {/* Winking / Aiming Eyes */}
                  <circle cx="60" cy="44" r="3.5" fill="#1D1D1F" />
                  <path d="M72 45Q77 41 82 45" stroke="#1D1D1F" strokeWidth="3" strokeLinecap="round" />
                  <ellipse cx="55" cy="51" rx="4" ry="2.5" fill="#FF4D36" opacity="0.35" />
                  <ellipse cx="80" cy="51" rx="4" ry="2.5" fill="#FF4D36" opacity="0.35" />

                  {/* Stylish Jacket / Torso */}
                  <path d="M48 70C48 64 56 62 68 62C80 62 88 64 88 70L94 104H42L48 70Z" fill="#2457ff" stroke="#1D1D1F" strokeWidth="3.5" />
                  <line x1="68" y1="62" x2="68" y2="104" stroke="#1D1D1F" strokeWidth="3" />
                  <circle cx="68" cy="74" r="2.5" fill="#c8ff3d" />
                  <circle cx="68" cy="84" r="2.5" fill="#c8ff3d" />

                  {/* DSLR Camera Body in Hands */}
                  <g transform="translate(18, 52)">
                    {/* Camera Strap */}
                    <path d="M22 6C14 -4 4 -4 -4 14" stroke="#FF4D36" strokeWidth="3.5" fill="none" strokeDasharray="4 2" />

                    {/* DSLR Main Chassis */}
                    <rect x="0" y="8" width="50" height="34" rx="7" fill="#1D1D1F" stroke="#FFFFFF" strokeWidth="2" />
                    <rect x="14" y="2" width="22" height="7" rx="3" fill="#333333" stroke="#FFFFFF" strokeWidth="1.5" />
                    
                    {/* Red Pro Ring Accent */}
                    <line x1="6" y1="12" x2="44" y2="12" stroke="#FF4D36" strokeWidth="2" />

                    {/* DSLR Big Zoom Lens */}
                    <circle cx="25" cy="25" r="14" fill="#222222" stroke="#2457ff" strokeWidth="3" />
                    <circle cx="25" cy="25" r="9" fill="#2457ff" stroke="#c8ff3d" strokeWidth="2.5" />
                    <circle cx="25" cy="25" r="5" fill="#1D1D1F" />
                    <circle cx="23" cy="23" r="2" fill="#FFFFFF" />

                    {/* Pop Art Flash Cube */}
                    <rect x="3" y="10" width="8" height="6" rx="2" fill="#c8ff3d" stroke="#1D1D1F" strokeWidth="1.5" />
                    
                    {/* Hands Gripping DSLR */}
                    <circle cx="-1" cy="24" r="5.5" fill="#FFDBAC" stroke="#1D1D1F" strokeWidth="2" />
                    <circle cx="51" cy="24" r="5.5" fill="#FFDBAC" stroke="#1D1D1F" strokeWidth="2" />

                    {/* Shutter Button & "CLICK!" Comic Pop Bubble */}
                    <circle cx="34" cy="4" r="2.5" fill="#FF4D36" />
                    <g className="animate-pulse">
                      <path d="M-6 -6L-14 -12L-6 -10L-10 -16L-3 -11L-2 -18L2 -10L6 -14L4 -7L12 -7L5 -3L10 2L2 0L-1 6L-3 0Z" fill="#c8ff3d" stroke="#1D1D1F" strokeWidth="1.5" />
                      <text x="-6" y="-6" fill="#1D1D1F" fontSize="8" fontWeight="900" fontFamily="sans-serif">CLICK</text>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 2: "CREATIVES" WITH AUTHENTIC PHOTOSHOP SELECTION MARQUEE & PREMIERE TIMELINE INDICATOR */}
        <div 
          ref={creativesWrapperRef}
          className="relative inline-block mt-2 sm:mt-3 px-6 sm:px-10 md:px-12 py-3 sm:py-4 select-none"
        >
          {/* AUTHENTIC PHOTOSHOP MARCHING ANTS SELECTION BOX (Black & White animated dashed stroke + 8 square handles) */}
          <div 
            ref={selectBoxRef}
            className="absolute top-0 bottom-0 left-0 z-30 pointer-events-none opacity-0 overflow-visible"
          >
            {/* Marching Ants SVG Border */}
            <svg className="w-full h-full absolute inset-0 overflow-visible">
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="rgba(0, 113, 227, 0.05)"
                stroke="#000000"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="ps-marching-ants-black"
              />
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeDasharray="6 6"
                className="ps-marching-ants-white"
              />
            </svg>

            {/* 8 Authentic Photoshop Transformation Anchor Handles */}
            {/* Top-Left */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-[#1D1D1F] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] z-40" />
            {/* Top-Center */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border border-[#1D1D1F] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] z-40" />
            {/* Top-Right */}
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-[#1D1D1F] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] z-40" />
            {/* Middle-Left */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-white border border-[#1D1D1F] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] z-40" />
            {/* Middle-Right */}
            <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-white border border-[#1D1D1F] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] z-40" />
            {/* Bottom-Left */}
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-[#1D1D1F] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] z-40" />
            {/* Bottom-Center */}
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border border-[#1D1D1F] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] z-40" />
            {/* Bottom-Right */}
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-[#1D1D1F] shadow-[1px_1px_0px_rgba(0,0,0,0.5)] z-40" />

            {/* Photoshop Genuine Info Floating Badge (W: px, H: px) */}
            <div className="absolute -bottom-7 right-0 bg-[#0B0F19] text-white px-2 py-0.5 rounded text-[9px] font-mono border border-[#2457ff]/30 shadow-lg flex items-center gap-1.5">
              <span className="text-[#c8ff3d] font-black">W:</span> 100% 
              <span className="text-[#c8ff3d] font-black ml-1">H:</span> 100%
            </div>
          </div>

          {/* AUTHENTIC ADOBE PREMIERE PRO CTI (CURRENT TIME INDICATOR PLAYHEAD) */}
          <div 
            ref={timelineIndicatorRef}
            className="absolute -top-7 sm:-top-9 -bottom-2 sm:-bottom-3 w-[2px] z-50 pointer-events-none opacity-0"
          >
            {/* Genuine Premiere Pro Cobalt Pentagonal Playhead Head */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center">
              {/* Premiere Pro Blue Head Shape */}
              <svg className="w-4 h-5 sm:w-5 sm:h-6 drop-shadow-[0_2px_6px_rgba(36,87,255,0.6)]" viewBox="0 0 20 24" fill="none">
                <path d="M0 0H20V14L10 24L0 14V0Z" fill="#2457ff" stroke="#1436b8" strokeWidth="1" />
                <circle cx="10" cy="7" r="2" fill="#FFFFFF" />
              </svg>

              {/* Timecode Box (00:00:01:24) */}
              <span 
                ref={timecodeRef}
                className="text-[8px] sm:text-[9px] font-mono font-bold text-[#c8ff3d] bg-[#0B0F19] border border-[#2457ff]/60 px-1 py-0.2 rounded shadow-md whitespace-nowrap mt-0.5"
              >
                00:01:24:00
              </span>
            </div>

            {/* Premiere Pro Cobalt Vertical CTI Laser Needle */}
            <div className="w-full h-full bg-[#2457ff] shadow-[0_0_10px_rgba(36,87,255,0.9)]" />
          </div>

          {/* THE "CREATIVES" LETTERS */}
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-black tracking-tight leading-[0.95] uppercase flex items-center justify-center gap-0.5 sm:gap-1 text-[#c8ff3d]">
            {creativesWord.map((letter, idx) => (
              <span
                key={idx}
                ref={el => creativesLettersRef.current[idx] = el}
                className="inline-block transform-gpu transition-colors duration-150 clay-text-lime"
              >
                {letter}
              </span>
            ))}
          </h2>

        </div>

      </div>

    </section>
  );
}