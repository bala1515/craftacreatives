import React, { useEffect, useRef } from 'react';

/**
 * CreativeAgencyBackground
 * 
 * Clean, subtle, high-end agency studio background:
 * - NO clutter, NO blocky cards or heavy boxes
 * - Interactive ambient particle & creative filament wave that breathes smoothly with the mouse
 * - Fine-lined architectural studio blueprint grid & precision registration marks (+ / ✛)
 * - Ultra-subtle floating creative agency watermarks/monograms (01 CRAFT, 02 MOTION, 03 CODE, 04 VISION)
 * - Elegant cinematic studio aura in 70% Cobalt (#2457ff), 20% Lime (#c8ff3d), and 10% Coral (#FF4D36)
 */
export default function CreativeAgencyBackground({ mousePos = { x: 0, y: 0 } }) {
  const canvasRef = useRef(null);
  const animFrameIdRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement.offsetHeight || window.innerHeight;
      initElements();
    };
    window.addEventListener('resize', handleResize);

    // Dynamic particles & subtle filaments
    let particles = [];
    const particleCount = 45;

    const initElements = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1,
          color: i % 4 === 0 ? '#2457ff' : i % 5 === 0 ? '#c8ff3d' : '#1D1D1F',
          alpha: Math.random() * 0.25 + 0.1,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    initElements();

    let mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };
    window.addEventListener('pointermove', onPointerMove);

    let time = 0;

    const render = () => {
      time += 0.015;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw subtle interactive agency sine waves (Creative Flow)
      ctx.lineWidth = 1;
      const waveCount = 2;
      for (let w = 0; w < waveCount; w++) {
        ctx.beginPath();
        const baseOffset = height * (0.35 + w * 0.3);
        const mouseShiftY = (mouse.y - height / 2) * 0.08 * (w === 0 ? 1 : -1);
        const mouseShiftX = (mouse.x - width / 2) * 0.04;

        ctx.strokeStyle = w === 0 
          ? 'rgba(36, 87, 255, 0.07)' 
          : 'rgba(200, 255, 61, 0.09)';

        for (let x = 0; x <= width; x += 15) {
          const waveFreq = 0.0035;
          const y = baseOffset + mouseShiftY + 
            Math.sin(x * waveFreq + time + w + mouseShiftX * 0.01) * 35 + 
            Math.cos(x * 0.0015 - time * 0.6) * 18;
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // 2. Update and draw subtle floating particles & subtle proximity links
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around bounds softly
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Mouse gentle repulsion
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (1 - dist / 130) * 0.8;
          p.x -= (dx / dist) * force;
          p.y -= (dy / dist) * force;
        }

        // Draw particle with gentle breathing opacity
        const currentAlpha = p.alpha + Math.sin(time * 2 + p.phase) * 0.08;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        if (p.color === '#2457ff') {
          ctx.fillStyle = `rgba(36, 87, 255, ${Math.max(0.04, currentAlpha)})`;
        } else if (p.color === '#c8ff3d') {
          ctx.fillStyle = `rgba(200, 255, 61, ${Math.max(0.04, currentAlpha * 1.2)})`;
        } else {
          ctx.fillStyle = `rgba(11, 15, 25, ${Math.max(0.02, currentAlpha * 0.6)})`;
        }
        ctx.fill();

        // Connect nearby particles with whisper-thin lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dX = p.x - p2.x;
          const dY = p.y - p2.y;
          const d = Math.sqrt(dX * dX + dY * dY);
          if (d < 90) {
            const lineAlpha = (1 - d / 90) * 0.05;
            ctx.strokeStyle = `rgba(36, 87, 255, ${lineAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', onPointerMove);
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Subtle Fine-Lined Architectural Studio Grid (Very faint & elegant) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none"
      />

      {/* 2. Soft Dynamic Studio Lighting Auras (Cobalt 70%, Lime 20%, Coral 10%) */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-[#2457ff]/12 rounded-full blur-[170px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 1.5}px), calc(-50% + ${mousePos.y * 1.5}px))`,
        }}
      />
      <div 
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-[#c8ff3d]/10 rounded-full blur-[150px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(calc(-50% - ${mousePos.x * 1.2}px), calc(-50% - ${mousePos.y * 1.2}px))`,
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-[#FF4D36]/8 rounded-full blur-[150px] pointer-events-none transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePos.x * 1.1}px, ${mousePos.y * 1.1}px)`,
        }}
      />

      {/* 3. Interactive Kinetic Wave & Subtle Particle Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* 4. Subtle Studio Registration Marks (Precision crosshairs & coordinates without dirty boxes) */}
      {/* Top Left Registration Mark */}
      <div 
        className="absolute top-8 left-8 sm:left-12 flex items-center gap-3 font-mono text-[10px] tracking-widest text-[#0B0F19]/35"
        style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)` }}
      >
        <div className="relative w-4 h-4 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-[#2457ff]/40" />
          <div className="absolute h-full w-[1px] bg-[#2457ff]/40" />
          <div className="w-1.5 h-1.5 rounded-full border border-[#2457ff]/60" />
        </div>
        <span className="hidden sm:inline font-semibold">13.0827° N, 80.2707° E</span>
        <span className="hidden md:inline text-[#2457ff]/50">// STUDIO</span>
      </div>

      {/* Top Right Registration Mark */}
      <div 
        className="absolute top-8 right-24 sm:right-32 flex items-center gap-2.5 font-mono text-[10px] tracking-widest text-[#0B0F19]/35"
        style={{ transform: `translate(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px)` }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff3d] border border-black/20" />
        <span className="hidden sm:inline">ALL SYSTEMS GO</span>
        <div className="relative w-4 h-4 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-[#c8ff3d]/60" />
          <div className="absolute h-full w-[1px] bg-[#c8ff3d]/60" />
        </div>
      </div>

      {/* Subtle Bottom Left Precision Indicator */}
      <div 
        className="absolute bottom-8 left-8 sm:left-12 hidden sm:flex items-center gap-3 font-mono text-[9px] tracking-widest text-[#0B0F19]/30"
        style={{ transform: `translate(${mousePos.x * -0.2}px, ${mousePos.y * 0.2}px)` }}
      >
        <span className="text-[#2457ff] font-bold">GRID // 72px</span>
        <span>•</span>
        <span>DPI // 300</span>
        <span>•</span>
        <span>COLOR // CMYK + RGB</span>
      </div>

      {/* Subtle Bottom Right Precision Indicator */}
      <div 
        className="absolute bottom-8 right-8 sm:right-12 hidden sm:flex items-center gap-3 font-mono text-[9px] tracking-widest text-[#0B0F19]/30"
        style={{ transform: `translate(${mousePos.x * 0.2}px, ${mousePos.y * -0.2}px)` }}
      >
        <span>AUDIO // 48kHz</span>
        <span>•</span>
        <span className="text-[#c8ff3d] font-bold">FPS // 60.00</span>
        <span>•</span>
        <span>STATUS // CREATIVE</span>
      </div>

      {/* 5. Clean, Minimalist Studio Discipline Badges (Lightweight, No chunky card borders) */}
      {/* 01: Visual Identity (Top Left quadrant, very airy & elegant) */}
      <div 
        className="absolute top-1/4 left-6 sm:left-16 lg:left-24 hidden md:flex items-center gap-2.5 font-mono text-[10px] text-[#0B0F19]/45 hover:text-[#2457ff] transition-colors"
        style={{ transform: `translate(${mousePos.x * -0.5}px, ${mousePos.y * -0.4}px)` }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#2457ff]/60" />
        <span className="font-semibold tracking-wider">01</span>
        <span className="text-[#0B0F19]/25">/</span>
        <span className="tracking-widest uppercase text-[9px] font-bold">Brand & Art Direction</span>
      </div>

      {/* 02: Cinema & Production (Top Right quadrant) */}
      <div 
        className="absolute top-1/4 right-6 sm:right-16 lg:right-24 hidden md:flex items-center gap-2.5 font-mono text-[10px] text-[#0B0F19]/45 hover:text-[#c8ff3d] transition-colors"
        style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * -0.4}px)` }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D36]/70" />
        <span className="font-semibold tracking-wider">02</span>
        <span className="text-[#0B0F19]/25">/</span>
        <span className="tracking-widest uppercase text-[9px] font-bold">Cinema & 3D Motion</span>
      </div>

      {/* 03: Web Engineering (Bottom Left quadrant) */}
      <div 
        className="absolute bottom-1/3 left-6 sm:left-16 lg:left-24 hidden md:flex items-center gap-2.5 font-mono text-[10px] text-[#0B0F19]/45 hover:text-[#2457ff] transition-colors"
        style={{ transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * 0.4}px)` }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#2457ff]/60" />
        <span className="font-semibold tracking-wider">03</span>
        <span className="text-[#0B0F19]/25">/</span>
        <span className="tracking-widest uppercase text-[9px] font-bold">Creative Web Systems</span>
      </div>

      {/* 04: Sound & Interactive (Bottom Right quadrant) */}
      <div 
        className="absolute bottom-1/3 right-6 sm:right-16 lg:right-24 hidden md:flex items-center gap-2.5 font-mono text-[10px] text-[#0B0F19]/45 hover:text-[#c8ff3d] transition-colors"
        style={{ transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px)` }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#c8ff3d]/90" />
        <span className="font-semibold tracking-wider">04</span>
        <span className="text-[#0B0F19]/25">/</span>
        <span className="tracking-widest uppercase text-[9px] font-bold">Sonic & Spatial Design</span>
      </div>

      {/* 6. Subtle Continuous Agency Capabilities Ribbon at Bottom */}
      <div className="absolute bottom-2.5 left-0 right-0 overflow-hidden opacity-20 pointer-events-none">
        <div className="flex whitespace-nowrap font-mono text-[8.5px] uppercase tracking-[0.3em] text-[#0B0F19] font-bold gap-10 animate-[marquee_30s_linear_infinite]">
          <span>CRAFTA CREATIVES</span>
          <span className="text-[#2457ff]">✦</span>
          <span>BRAND IDENTITY</span>
          <span className="text-[#c8ff3d]">✦</span>
          <span>INTERACTIVE WEB EXPERIENCES</span>
          <span className="text-[#2457ff]">✦</span>
          <span>3D & CINEMATIC MOTION</span>
          <span className="text-[#c8ff3d]">✦</span>
          <span>CREATIVE TECHNOLOGY</span>
          <span className="text-[#2457ff]">✦</span>
          <span>CRAFTA CREATIVES</span>
          <span className="text-[#2457ff]">✦</span>
          <span>BRAND IDENTITY</span>
          <span className="text-[#c8ff3d]">✦</span>
          <span>INTERACTIVE WEB EXPERIENCES</span>
          <span className="text-[#2457ff]">✦</span>
          <span>3D & CINEMATIC MOTION</span>
        </div>
      </div>
    </div>
  );
}
