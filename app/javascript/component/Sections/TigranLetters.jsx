import React from 'react';

/**
 * Letter 'C' - Glossy 3D Candy Jelly Balloon
 * Modeled after the glossy red inflated 'm' in Tigran Azatyan's portfolio.
 * Features: Pillowy rounded caps, gradient depth, white contour border, and shiny specular light highlights.
 */
export function LetterC({ className = "w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-44 lg:h-48" }) {
  return (
    <svg 
      className={`inline-block select-none overflow-visible filter drop-shadow-[0_12px_24px_rgba(238,75,43,0.35)] ${className}`}
      viewBox="0 0 140 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Rich Jelly Red Gradient */}
        <radialGradient id="jellyRedGrad" cx="35%" cy="30%" r="70%" fx="30%" fy="25%">
          <stop offset="0%" stopColor="#FF7A66" />
          <stop offset="45%" stopColor="#EE4B2B" />
          <stop offset="90%" stopColor="#C42008" />
          <stop offset="100%" stopColor="#961200" />
        </radialGradient>

        {/* Specular White Shine Gradient */}
        <linearGradient id="shineGradC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="shineBubble" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Crisp White Outer Border (Signature Tigran style) */}
      <path 
        d="M 112 36 C 96 16, 60 12, 40 28 C 14 48, 12 96, 36 120 C 58 142, 100 138, 116 116 C 122 108, 108 96, 96 104 C 84 112, 60 114, 48 100 C 34 84, 34 58, 48 44 C 62 30, 86 32, 98 42 C 108 50, 120 44, 112 36 Z" 
        fill="none" 
        stroke="#FFFFFF" 
        strokeWidth="9" 
        strokeLinejoin="round" 
        strokeLinecap="round"
      />

      {/* Solid Black Under-Shadow Layer */}
      <path 
        d="M 112 36 C 96 16, 60 12, 40 28 C 14 48, 12 96, 36 120 C 58 142, 100 138, 116 116 C 122 108, 108 96, 96 104 C 84 112, 60 114, 48 100 C 34 84, 34 58, 48 44 C 62 30, 86 32, 98 42 C 108 50, 120 44, 112 36 Z" 
        fill="#1D1D1F" 
        transform="translate(4, 5)"
      />

      {/* Main Jelly/Candy Inflatable Body */}
      <path 
        d="M 112 36 C 96 16, 60 12, 40 28 C 14 48, 12 96, 36 120 C 58 142, 100 138, 116 116 C 122 108, 108 96, 96 104 C 84 112, 60 114, 48 100 C 34 84, 34 58, 48 44 C 62 30, 86 32, 98 42 C 108 50, 120 44, 112 36 Z" 
        fill="url(#jellyRedGrad)" 
        stroke="#961200" 
        strokeWidth="2"
      />

      {/* Glossy Top Curve Specular Highlight Reflection */}
      <path 
        d="M 44 32 C 60 20, 86 20, 102 34 C 94 36, 76 28, 54 36 C 44 42, 40 38, 44 32 Z" 
        fill="url(#shineGradC)" 
      />

      {/* Glossy Top Bulb Oval Reflection */}
      <ellipse cx="98" cy="38" rx="8" ry="4" transform="rotate(-25 98 38)" fill="#FFFFFF" opacity="0.85" />
      <circle cx="106" cy="38" r="2" fill="#FFFFFF" opacity="0.9" />

      {/* Glossy Left Bulge Long Specular Reflection */}
      <path 
        d="M 28 58 C 24 74, 26 94, 36 108 C 34 94, 32 74, 36 60 C 38 56, 30 54, 28 58 Z" 
        fill="url(#shineBubble)" 
      />

      {/* Glossy Bottom Bulb Oval Reflection */}
      <ellipse cx="102" cy="112" rx="7" ry="3.5" transform="rotate(30 102 112)" fill="#FFFFFF" opacity="0.85" />
      <circle cx="110" cy="110" r="1.8" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

/**
 * Letter 'R' - Isometric 3D Extruded Block
 * Modeled after the purple isometric block 'o' in Tigran Azatyan's portfolio.
 * Features: True 3D isometric perspective, faceted top/front/side faces, architectural window cutout, and bold dimension.
 */
export function LetterR({ className = "w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-44 lg:h-48" }) {
  return (
    <svg 
      className={`inline-block select-none overflow-visible filter drop-shadow-[0_12px_24px_rgba(109,40,217,0.35)] ${className}`}
      viewBox="0 0 140 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="isoTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#A78BFA" />
        </linearGradient>
        <linearGradient id="isoFrontGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="isoSideGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5B21B6" />
          <stop offset="100%" stopColor="#4C1D95" />
        </linearGradient>
      </defs>

      {/* Base Drop Shadow Box */}
      <path 
        d="M 28 28 L 88 16 L 118 42 L 118 80 L 102 82 L 122 136 L 94 136 L 76 86 L 56 86 L 56 136 L 28 136 Z" 
        fill="#1D1D1F" 
        transform="translate(4, 5)"
      />

      {/* 3D Isometric Top Plane (Light Violet #A78BFA) */}
      <polygon 
        points="28,26 84,14 116,40 60,52" 
        fill="url(#isoTopGrad)" 
        stroke="#1D1D1F" 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />

      {/* 3D Isometric Side Shadow Plane (Dark Plum #4C1D95) */}
      <polygon 
        points="116,40 116,78 98,90 98,54" 
        fill="url(#isoSideGrad)" 
        stroke="#1D1D1F" 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />

      {/* Front Face of 'R' (Vibrant Royal Purple #6D28D9) */}
      <path 
        d="M 28,26 L 60,52 L 60,86 L 78,86 L 98,136 L 72,136 L 56,96 L 46,96 L 46,136 L 24,136 Z" 
        fill="url(#isoFrontGrad)" 
        stroke="#1D1D1F" 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />

      {/* Top Bowl Front Face of 'R' */}
      <path 
        d="M 60,52 L 98,54 L 98,90 L 60,86 Z" 
        fill="#7C3AED" 
        stroke="#1D1D1F" 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />

      {/* Isometric Square Cutout Window (The Hole of 'R') */}
      <polygon 
        points="44,58 78,54 78,74 44,78" 
        fill="#1D1D1F" 
        stroke="#1D1D1F" 
        strokeWidth="2"
      />

      {/* 3D Leg Extrusion Right Facet */}
      <polygon 
        points="78,86 98,136 122,136 102,86" 
        fill="url(#isoSideGrad)" 
        stroke="#1D1D1F" 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />
      <polygon 
        points="78,86 102,86 122,136 98,136" 
        fill="#8B5CF6" 
        stroke="#1D1D1F" 
        strokeWidth="3.5" 
        strokeLinejoin="round"
      />

      {/* High-Tech Pop-Art Accent Grid Line */}
      <line x1="28" y1="26" x2="60" y2="52" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
      <line x1="60" y1="52" x2="116" y2="40" stroke="#FFFFFF" strokeWidth="2.5" opacity="0.6" />
    </svg>
  );
}

/**
 * Letter 'A' - Whimsical Goofy Cartoon Monster Character
 * Modeled after the giant smiling pink monster sphere 'o' in Tigran Azatyan's portfolio.
 * Features: Plump high-energy yellow/pink monster sphere, big expressive white googly eyes with pupils, 
 * wide open happy grin with cute teeth, pink tongue, and monster feet!
 */
export function LetterA_Monster({ className = "w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-44 lg:h-48" }) {
  return (
    <svg 
      className={`inline-block select-none overflow-visible filter drop-shadow-[0_12px_24px_rgba(255,196,0,0.4)] ${className}`}
      viewBox="0 0 140 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="monsterYellowGrad" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFF275" />
          <stop offset="50%" stopColor="#FFD700" />
          <stop offset="85%" stopColor="#FFAA00" />
          <stop offset="100%" stopColor="#E68A00" />
        </radialGradient>
      </defs>

      {/* Drop Shadow Base */}
      <path 
        d="M 70 12 C 104 12, 126 38, 126 76 C 126 114, 102 138, 70 138 C 38 138, 14 114, 14 76 C 14 38, 36 12, 70 12 Z" 
        fill="#1D1D1F" 
        transform="translate(4, 5)"
      />

      {/* Monster Feet at bottom */}
      <ellipse cx="44" cy="138" rx="14" ry="7" fill="#FFAA00" stroke="#1D1D1F" strokeWidth="3.5" />
      <ellipse cx="96" cy="138" rx="14" ry="7" fill="#FFAA00" stroke="#1D1D1F" strokeWidth="3.5" />

      {/* Cute Little Monster Antenna / Top 'A' Apex */}
      <path d="M 70 14 L 70 -2" stroke="#1D1D1F" strokeWidth="4.5" strokeLinecap="round" />
      <circle cx="70" cy="-4" r="7" fill="#FF46A2" stroke="#1D1D1F" strokeWidth="3.5" />

      {/* Main Plump Monster Body (Dome/Sphere) */}
      <path 
        d="M 70 12 C 104 12, 126 38, 126 76 C 126 114, 102 138, 70 138 C 38 138, 14 114, 14 76 C 14 38, 36 12, 70 12 Z" 
        fill="url(#monsterYellowGrad)" 
        stroke="#1D1D1F" 
        strokeWidth="4"
      />

      {/* Triangular Eye Bridge / Inner 'A' Cutout Detail */}
      <polygon points="70,30 52,60 88,60" fill="#E68A00" opacity="0.35" />

      {/* Googly Left Eye */}
      <circle cx="52" cy="52" r="14" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="3.5" />
      <circle cx="54" cy="52" r="6" fill="#1D1D1F" />
      <circle cx="56" cy="49" r="2.5" fill="#FFFFFF" />

      {/* Googly Right Eye */}
      <circle cx="88" cy="52" r="14" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="3.5" />
      <circle cx="86" cy="52" r="6" fill="#1D1D1F" />
      <circle cx="88" cy="49" r="2.5" fill="#FFFFFF" />

      {/* Rosy Monster Cheeks */}
      <ellipse cx="32" cy="74" rx="7" ry="4" fill="#FF46A2" opacity="0.75" />
      <ellipse cx="108" cy="74" rx="7" ry="4" fill="#FF46A2" opacity="0.75" />

      {/* Big Happy Wide Toothy Smile */}
      <path 
        d="M 38 82 C 38 82, 48 116, 70 116 C 92 116, 102 82, 102 82 C 102 82, 70 86, 38 82 Z" 
        fill="#9E0B3C" 
        stroke="#1D1D1F" 
        strokeWidth="3.5" 
      />

      {/* Pink Tongue inside mouth */}
      <path 
        d="M 54 104 C 58 96, 82 96, 86 104 C 80 116, 60 116, 54 104 Z" 
        fill="#FF6B9D" 
      />

      {/* Cute Row of White Monster Teeth */}
      <rect x="52" y="83" width="7" height="6" rx="2" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="1.5" />
      <rect x="61" y="84" width="8" height="6" rx="2" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="1.5" />
      <rect x="71" y="84" width="8" height="6" rx="2" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="1.5" />
      <rect x="81" y="83" width="7" height="6" rx="2" fill="#FFFFFF" stroke="#1D1D1F" strokeWidth="1.5" />
    </svg>
  );
}

/**
 * Letter 'F' - Modular Graphic Pop-Art Construction Blocks
 * Modeled after the yellow modular architectural block 't' in Tigran Azatyan's portfolio.
 * Features: Stacked crisp geometric grid tiles, interlocking puzzle joints, vibrant Pop Art color blocking (#FFFF00 & #00F0FF).
 */
export function LetterF_Modular({ className = "w-18 h-24 sm:w-26 sm:h-32 md:w-32 md:h-40 lg:w-40 lg:h-48" }) {
  return (
    <svg 
      className={`inline-block select-none overflow-visible filter drop-shadow-[0_12px_24px_rgba(0,240,255,0.35)] ${className}`}
      viewBox="0 0 130 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Drop Shadow Block */}
      <g transform="translate(4, 5)">
        <rect x="24" y="16" width="30" height="120" fill="#1D1D1F" />
        <rect x="54" y="16" width="60" height="30" fill="#1D1D1F" />
        <rect x="54" y="66" width="46" height="26" fill="#1D1D1F" />
        <rect x="14" y="106" width="20" height="30" fill="#1D1D1F" />
      </g>

      {/* Main Vertical Stem Block (Electric Cyan #00F0FF) */}
      <rect 
        x="24" 
        y="16" 
        width="30" 
        height="120" 
        fill="#00F0FF" 
        stroke="#1D1D1F" 
        strokeWidth="4" 
      />

      {/* Top Horizontal Bar (Sunny Pop Yellow #FFFF00) */}
      <rect 
        x="54" 
        y="16" 
        width="60" 
        height="30" 
        fill="#FFFF00" 
        stroke="#1D1D1F" 
        strokeWidth="4" 
      />

      {/* Interlocking Puzzle Tab on Top Bar (White with cross grid) */}
      <rect 
        x="84" 
        y="16" 
        width="20" 
        height="14" 
        fill="#FFFFFF" 
        stroke="#1D1D1F" 
        strokeWidth="2.5" 
      />

      {/* Middle Crossbar (Hot Pink #FF46A2) */}
      <rect 
        x="54" 
        y="66" 
        width="46" 
        height="26" 
        fill="#FF46A2" 
        stroke="#1D1D1F" 
        strokeWidth="4" 
      />

      {/* Offset Stepped Bottom Balance Block (Vibrant Pop Orange #FF7A00) */}
      <rect 
        x="10" 
        y="106" 
        width="20" 
        height="30" 
        fill="#FF7A00" 
        stroke="#1D1D1F" 
        strokeWidth="4" 
      />

      {/* Decorative Bauhaus Graphic Grid Dots on Stem */}
      <circle cx="39" cy="40" r="3" fill="#1D1D1F" />
      <circle cx="39" cy="65" r="3" fill="#1D1D1F" />
      <circle cx="39" cy="90" r="3" fill="#1D1D1F" />
      <circle cx="39" cy="115" r="3" fill="#1D1D1F" />
    </svg>
  );
}

/**
 * Letter 'T' - Whimsical Mascot Character Stem
 * Modeled after the quirky fish/creature character 'i' in Tigran Azatyan's portfolio.
 * Features: Tall slender creative character standing on cute legs with shoes, wide character crossbar arms,
 * cute winking face, and studio camera/creative crown!
 */
export function LetterT_Mascot({ className = "w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-44 lg:h-48" }) {
  return (
    <svg 
      className={`inline-block select-none overflow-visible filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)] ${className}`}
      viewBox="0 0 140 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Drop Shadow Silhouette */}
      <g transform="translate(4, 5)">
        <rect x="14" y="16" width="102" height="28" rx="6" fill="#1D1D1F" />
        <path d="M 52 44 L 78 44 L 74 122 L 56 122 Z" fill="#1D1D1F" />
        <path d="M 56 122 L 48 140 L 60 140 L 62 122" fill="#1D1D1F" />
        <path d="M 74 122 L 72 140 L 84 140 L 76 122" fill="#1D1D1F" />
      </g>

      {/* Cute Skinny Legs & Shoes at Bottom */}
      {/* Left Leg */}
      <line x1="56" y1="120" x2="52" y2="138" stroke="#1D1D1F" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="48" cy="140" rx="9" ry="4" fill="#EE4B2B" stroke="#1D1D1F" strokeWidth="3" />

      {/* Right Leg */}
      <line x1="74" y1="120" x2="78" y2="138" stroke="#1D1D1F" strokeWidth="4" strokeLinecap="round" />
      <ellipse cx="82" cy="140" rx="9" ry="4" fill="#EE4B2B" stroke="#1D1D1F" strokeWidth="3" />

      {/* Tall Slender Mascot Body (Character Stem) */}
      <path 
        d="M 52 42 L 78 42 L 75 122 L 55 122 Z" 
        fill="#FFFFFF" 
        stroke="#1D1D1F" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />

      {/* Stylish Diagonal Striped Mascot Pattern (Tigran fish aesthetic) */}
      <path d="M 53 60 L 77 52" stroke="#1D1D1F" strokeWidth="3" />
      <path d="M 54 80 L 76 72" stroke="#1D1D1F" strokeWidth="3" />
      <path d="M 54 100 L 76 92" stroke="#1D1D1F" strokeWidth="3" />

      {/* Cute Character Face in the stem */}
      <circle cx="61" cy="50" r="2.5" fill="#1D1D1F" />
      <circle cx="70" cy="50" r="2.5" fill="#1D1D1F" />
      <path d="M 63 56 Q 65.5 59 68 56" stroke="#1D1D1F" strokeWidth="2" strokeLinecap="round" />

      {/* Mascot Horizontal Crossbar Head / Arms (Electric Pop Blue #00F0FF) */}
      <rect 
        x="14" 
        y="14" 
        width="102" 
        height="28" 
        rx="8" 
        fill="#00F0FF" 
        stroke="#1D1D1F" 
        strokeWidth="4" 
      />

      {/* Left & Right Character Hands on Crossbar */}
      <circle cx="14" cy="28" r="7" fill="#FFDBAC" stroke="#1D1D1F" strokeWidth="3.5" />
      <circle cx="116" cy="28" r="7" fill="#FFDBAC" stroke="#1D1D1F" strokeWidth="3.5" />

      {/* Creative Mascot Cap / Studio Lens on top */}
      <polygon points="65,14 60,0 70,-4 75,14" fill="#FFFF00" stroke="#1D1D1F" strokeWidth="3" />
      <circle cx="67" cy="-2" r="3" fill="#EE4B2B" />
    </svg>
  );
}

/**
 * Letter 'A' - Stretchy Neon Lime Green Slime Tube
 * Modeled after the stretchy electric green curved letter 'n' in Tigran Azatyan's portfolio.
 * Features: High-gloss electric lime green (#BFFF00) fluid curved rubber/slime tube, 
 * bulbous rounded terminals, and glossy reflection tracks!
 */
export function LetterA_Slime({ className = "w-20 h-24 sm:w-28 sm:h-32 md:w-36 md:h-40 lg:w-44 lg:h-48" }) {
  return (
    <svg 
      className={`inline-block select-none overflow-visible filter drop-shadow-[0_12px_24px_rgba(191,255,0,0.35)] ${className}`}
      viewBox="0 0 140 150" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="limeSlimeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2FF66" />
          <stop offset="40%" stopColor="#BFFF00" />
          <stop offset="85%" stopColor="#84CC00" />
          <stop offset="100%" stopColor="#559900" />
        </linearGradient>

        <linearGradient id="slimeShine" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* Solid Black Under-Shadow Layer */}
      <path 
        d="M 68 18 C 92 18, 116 46, 118 84 C 119 108, 118 134, 98 136 C 84 137, 82 120, 82 108 C 76 118, 64 126, 48 126 C 26 126, 16 108, 16 86 C 16 54, 40 18, 68 18 Z M 64 54 C 50 54, 44 68, 44 86 C 44 98, 52 104, 62 104 C 74 104, 82 92, 82 78 C 82 64, 76 54, 64 54 Z" 
        fill="#1D1D1F" 
        transform="translate(4, 5)"
      />

      {/* Main Stretchy Neon Slime Tube Body */}
      <path 
        d="M 68 18 C 92 18, 116 46, 118 84 C 119 108, 118 134, 98 136 C 84 137, 82 120, 82 108 C 76 118, 64 126, 48 126 C 26 126, 16 108, 16 86 C 16 54, 40 18, 68 18 Z M 64 54 C 50 54, 44 68, 44 86 C 44 98, 52 104, 62 104 C 74 104, 82 92, 82 78 C 82 64, 76 54, 64 54 Z" 
        fill="url(#limeSlimeGrad)" 
        stroke="#1D1D1F" 
        strokeWidth="4" 
        strokeLinejoin="round"
      />

      {/* High-Gloss White Highlight Track along the top loop curve */}
      <path 
        d="M 52 26 C 68 22, 86 28, 98 44 C 92 36, 76 30, 58 32 C 54 32, 50 28, 52 26 Z" 
        fill="#FFFFFF" 
        opacity="0.85" 
      />

      {/* Glossy Reflection Oval on Outer Right Arch */}
      <ellipse cx="106" cy="74" rx="4" ry="16" transform="rotate(10 106 74)" fill="url(#slimeShine)" />

      {/* Bottom Terminal Glossy Highlight Dot */}
      <circle cx="98" cy="126" r="3.5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}
