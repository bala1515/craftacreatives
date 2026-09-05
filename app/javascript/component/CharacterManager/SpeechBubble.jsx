import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronRight } from 'lucide-react';

export default function SpeechBubble({ waypoint, onNext }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!waypoint?.dialogue) return;
    
    setDisplayedText('');
    let index = 0;
    const fullText = waypoint.dialogue;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(prev => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 25);

    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 1.0;
      utterance.pitch = 0.95;
      utterance.lang = 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Male') || v.name.includes('Natural') || v.name.includes('Google'));
      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    }

    return () => {
      clearInterval(timer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [waypoint?.dialogue, isMuted]);

  if (!waypoint) return null;

  return (
    <div className="relative max-w-sm sm:max-w-md bg-white/95 backdrop-blur-2xl border-2 border-blue-600 p-4 sm:p-5 rounded-2xl shadow-[0_15px_35px_rgba(0,102,204,0.18)] text-gray-900 transition-all duration-300 pointer-events-auto">
      {/* Speech Bubble Arrow pointing to character */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-blue-600" />

      {/* Header Badge & Voice Mute Toggle */}
      <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-3">
        <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 tracking-wider uppercase">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-spin" />
          {waypoint.badge}
        </span>
        
        <button
          onClick={() => {
            const nextState = !isMuted;
            setIsMuted(nextState);
            if (nextState && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
          }}
          className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors"
          title={isMuted ? "Enable Manager Voice" : "Mute Manager Voice"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-4 h-4 text-red-500" />
              <span className="text-[11px] text-red-600">Voice Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-blue-600 animate-pulse" />
              <span className="text-[11px] text-blue-600 font-bold">Voice Active 🔊</span>
            </>
          )}
        </button>
      </div>

      {/* Typewriter Dialogue Text */}
      <p className="text-sm sm:text-base font-semibold leading-relaxed text-gray-800 min-h-[55px]">
        {displayedText}
        <span className="inline-block w-2 h-4 ml-1 bg-blue-600 animate-ping" />
      </p>

      {/* Navigation Helper */}
      <div className="mt-3 pt-2 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <span>Scroll to walk with Manager ↓</span>
        <button 
          onClick={onNext}
          className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold transition-colors"
        >
          Next Stop <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}