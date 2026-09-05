import React, { useState } from 'react';
import { Calculator, CheckCircle2, Send } from 'lucide-react';

const ESTIMATE_SERVICES = [
  { id: 'webdev', name: 'Web Development', price: 499, time: '1-2 Weeks' },
  { id: 'saas', name: 'SaaS MVP Development', price: 1299, time: '3-4 Weeks' },
  { id: 'logo', name: 'Logo & Brand Identity', price: 199, time: '3 Days' },
  { id: 'shoot', name: 'Product Shoot (Commercial)', price: 349, time: '2 Days' },
  { id: 'video', name: 'Video Editing & Promos', price: 249, time: '3 Days' },
  { id: 'banner', name: 'Social Banners & Ad Design', price: 99, time: '1 Day' },
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
    <section id="quote" className="py-24 px-4 bg-white border-t border-gray-200 relative">
      <div className="max-w-5xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 border border-purple-200 rounded-full text-xs font-bold text-purple-600 uppercase">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Estimate Your Project Quote
          </h2>
          <p className="text-gray-600 text-sm">
            Select the services you need for your project to get an instant estimated quote & timeline.
          </p>
        </div>

        {/* Calculator Main Box */}
        <div className="bg-white border border-gray-200 rounded-3xl p-6 sm:p-10 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left 2 Cols: Service Pickers */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              1. Choose Required Services
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
                        ? 'bg-blue-50/60 border-blue-600 text-gray-900 shadow-sm'
                        : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-gray-900">{s.name}</div>
                      <div className="text-xs text-gray-500">Est: ~${s.price} | {s.time}</div>
                    </div>
                    <CheckCircle2 className={`w-5 h-5 ${isSelected ? 'text-blue-600' : 'text-gray-400'}`} />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Col: Price Summary Card */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between space-y-6 text-white shadow-lg">
            <div>
              <h4 className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Estimated Project Cost
              </h4>
              <div className="text-4xl font-black text-white mt-2">
                ${totalPrice} <span className="text-xs font-normal text-gray-400">/ estimated</span>
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {selected.length} service(s) selected. Final quote may vary based on exact custom features.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href="#contact"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg hover:scale-105 transition-all duration-300 text-sm"
              >
                Send Quote Request <Send className="w-4 h-4" />
              </a>
              <p className="text-[11px] text-center text-gray-400">
                ⚡ Crafta Creatives team responds within 2 hours
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}