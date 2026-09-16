import React, { useState } from 'react';
import { Calculator, CheckCircle2, Send, Sparkles } from 'lucide-react';

const ESTIMATE_SERVICES = [
  { id: 'webdev', name: 'Web Engineering & React 19', price: 499, time: '1-2 Weeks' },
  { id: 'saas', name: 'SaaS MVP Cloud Engine', price: 1299, time: '3-4 Weeks' },
  { id: 'logo', name: '3D & Vector Brand Identity', price: 199, time: '3 Days' },
  { id: 'shoot', name: 'Commercial Product Shoot (4K)', price: 349, time: '2 Days' },
  { id: 'video', name: 'Video Editing & Cinema Reels', price: 249, time: '3 Days' },
  { id: 'banner', name: 'High-CTR Social Banner Ads', price: 99, time: '1 Day' },
];

export default function QuoteCalculator() {
  const [selected, setSelected] = useState(['webdev', 'logo']);

  const toggleService = (id) => {
    setSelected(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const totalPrice = selected.reduce((acc, id) => {
    const s = ESTIMATE_SERVICES.find(item => item.id === id);
    return acc + (s ? s.price : 0);
  }, 0);

  return (
    <section id="quote" className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-[#F5F5F7] text-[#1D1D1F] border-t border-black/5 relative z-30 overflow-hidden">
      
      {/* Subtle Ambient Studio Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-blue-500/8 blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/80 border border-white/95 rounded-full text-xs font-bold text-[#0071E3] uppercase tracking-widest shadow-sm">
            <Calculator className="w-4 h-4" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-[#1D1D1F]">
            Estimate Project <span className="bg-gradient-to-r from-[#0071E3] via-blue-600 to-indigo-600 bg-clip-text text-transparent">Cost & Scope</span>
          </h2>
          <p className="text-base sm:text-xl text-[#6E6E73] font-normal">
            Select the services required for your build to calculate instant estimate quotes & delivery milestones.
          </p>
        </div>

        {/* Calculator Container (Tactile Frosted Glass Slab) */}
        <div className="bg-white/80 border border-white/95 rounded-3xl p-6 sm:p-10 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.07),inset_0_1px_1px_rgba(255,255,255,1)] backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Service Pickers */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-[#86868B] uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" />
              <span>1. Select Required Capabilities</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ESTIMATE_SERVICES.map(s => {
                const isSelected = selected.includes(s.id);
                return (
                  <div
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                      isSelected
                        ? 'bg-blue-50/90 border-[#0071E3] text-[#1D1D1F] shadow-[0_4px_16px_rgba(0,113,227,0.12),inset_0_1px_1px_rgba(255,255,255,1)]'
                        : 'bg-white/70 border-black/5 text-[#6E6E73] hover:border-black/15 hover:text-[#1D1D1F] shadow-sm'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-[#1D1D1F]">{s.name}</div>
                      <div className="text-xs font-mono text-[#86868B]">Est: ~${s.price} | {s.time}</div>
                    </div>
                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-[#0071E3] shadow-[0_0_8px_rgba(0,113,227,0.4)]' : 'text-slate-300'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: Price Summary Card (Skeuomorphic Beveled Card) */}
          <div className="bg-gradient-to-b from-white to-[#F8F8FA] border border-white/95 rounded-2xl p-6 flex flex-col justify-between space-y-6 text-[#1D1D1F] shadow-[0_8px_30px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

            <div>
              <h4 className="text-xs font-black text-[#0071E3] uppercase tracking-widest">
                Estimated Studio Investment
              </h4>
              <div className="text-4xl font-black text-[#1D1D1F] mt-3 font-mono">
                ${totalPrice} <span className="text-xs font-normal text-[#86868B] font-sans">/ estimated</span>
              </div>
              <p className="text-xs text-[#6E6E73] mt-2 leading-relaxed">
                {selected.length} capability(ies) selected. Includes full zero-lag architecture, high-res deliverables & deployment.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-black/5">
              <a
                href="#contact"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-b from-[#0077ED] to-[#0062C4] hover:from-[#0082FF] hover:to-[#006EDD] text-white font-bold py-3.5 px-4 rounded-xl shadow-[0_4px_16px_rgba(0,113,227,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:scale-105 transition-all duration-300 text-xs uppercase tracking-wider"
              >
                <span>Send Proposal Request</span>
                <Send className="w-4 h-4 text-white" />
              </a>
              <p className="text-[11px] text-center text-[#86868B] font-medium">
                ⚡ Crafta Creatives team responds within 2 hours
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}