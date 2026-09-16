import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronRight, Check } from 'lucide-react';

export default function SpeechBubble({ dialogue, badge = "Agency Manager", onNext, actionLabel = "Next Step", showArrow = true }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (!dialogue) return;

    setDisplayedText('');
    let index = 0;
    const fullText = dialogue;

    const timer = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(prev => prev + fullText.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 22);

    if ('speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(fullText);
      utterance.rate = 1.05;
      utterance.pitch = 0.95;
      utterance.lang = 'en-US';

      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(v => v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Male'));
      if (preferredVoice) utterance.voice = preferredVoice;

      window.speechSynthesis.speak(utterance);
    }

    return () => {
      clearInterval(timer);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    };
  }, [dialogue, isMuted]);

  if (!dialogue) return null;

  return (
    <div className="relative max-w-sm sm:max-w-md bg-white/90 backdrop-blur-2xl border border-white/95 p-4 sm:p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12),0_1px_1px_rgba(0,0,0,0.05)] text-[#1D1D1F] transition-all duration-300 pointer-events-auto">
      {/* Speech Bubble Arrow pointing to 3D character */}
      {showArrow && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]" />
      )}

      {/* Header Badge & Audio Toggle */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5 mb-3">
        <span className="flex items-center gap-1.5 text-[11px] sm:text-xs font-black text-[#0071E3] tracking-wider uppercase">
          <Sparkles className="w-3.5 h-3.5 text-[#0071E3] animate-pulse" />
          {badge}
        </span>

        <button
          onClick={() => {
            const nextState = !isMuted;
            setIsMuted(nextState);
            if (nextState && 'speechSynthesis' in window) {
              window.speechSynthesis.cancel();
            }
          }}
          className="flex items-center gap-1 px-2.5 py-1 bg-black/5 hover:bg-black/10 rounded-lg text-xs font-semibold text-[#6E6E73] border border-black/5 transition-colors"
          title={isMuted ? "Enable Manager Voice" : "Mute Voice"}
        >
          {isMuted ? (
            <>
              <VolumeX className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-[10px] text-rose-500 font-mono">Muted</span>
            </>
          ) : (
            <>
              <Volume2 className="w-3.5 h-3.5 text-[#0071E3] animate-pulse" />
              <span className="text-[10px] text-[#0071E3] font-mono font-bold">Voice Active</span>
            </>
          )}
        </button>
      </div>

      {/* Typewriter Dialogue Text */}
      <p className="text-sm sm:text-base font-semibold leading-relaxed text-[#1D1D1F] min-h-[48px]">
        {displayedText}
        <span className="inline-block w-1.5 h-3.5 ml-1 bg-[#0071E3] animate-ping" />
      </p>

      {/* Action Button */}
      {onNext && (
        <div className="mt-3 pt-2.5 border-t border-black/5 flex items-center justify-between text-xs text-[#6E6E73]">
          <span className="text-[11px] font-mono text-[#86868B]">Crafta Studio Host</span>
          <button
            onClick={onNext}
            className="flex items-center gap-1 bg-gradient-to-b from-[#0077ED] to-[#0062C4] text-white font-bold px-3.5 py-1.5 rounded-lg shadow-[0_4px_12px_rgba(0,113,227,0.3),0_1px_0_rgba(255,255,255,0.25)_inset] hover:shadow-[0_6px_16px_rgba(0,113,227,0.4)] hover:scale-[1.02] active:scale-[0.98] transition-all text-[11px] uppercase tracking-wider"
          >
            <span>{actionLabel}</span>
            <ChevronRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}