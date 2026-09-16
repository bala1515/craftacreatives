import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development & Apps',
    budget: '$500 - $1000',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', service: 'Web Development & Apps', budget: '$500 - $1000', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 lg:py-36 px-4 sm:px-6 lg:px-8 bg-[#F8F8FA] text-[#1D1D1F] border-t border-black/5 relative z-30 overflow-hidden selection:bg-[#FF46A2] selection:text-white">
      
      {/* Background Matrix Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#0000000a_1.2px,transparent_1.2px)] [background-size:22px_22px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFF00] border border-black/15 text-black text-xs font-black uppercase tracking-widest shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-black" />
            <span>Initiate Collaboration</span>
          </div>

          <h2 className="text-4xl sm:text-6xl font-black tracking-tight uppercase text-[#1D1D1F]">
            Let's Build Something <span className="text-[#FF46A2]">Extraordinary</span>
          </h2>

          <p className="text-base sm:text-xl text-[#6E6E73] font-normal">
            Ready to scale your product or brand? Connect with Crafta Creatives studio for direct technical consultation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left 2 Cols: Contact Info Glass Card */}
          <div className="lg:col-span-2 bg-white/85 border border-white/95 rounded-3xl p-8 space-y-8 flex flex-col justify-between shadow-[0_16px_40px_-8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-2xl">
            <div className="space-y-6">
              <h4 className="text-2xl font-black text-[#1D1D1F] uppercase tracking-tight">Studio Direct Contacts</h4>
              <p className="text-sm text-[#6E6E73] leading-relaxed font-normal">
                Reach out to our core team in Chennai for fast project turnarounds, architecture reviews, and media production.
              </p>

              <div className="space-y-5">
                <div className="flex items-center gap-4 text-sm text-[#1D1D1F]">
                  <div className="w-11 h-11 rounded-2xl bg-[#00F0FF] flex items-center justify-center text-black font-black shadow-sm">
                    <Mail className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#86868B]">Direct Email</div>
                    <div className="font-bold text-[#1D1D1F]">contact@craftacreatives.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-[#1D1D1F]">
                  <div className="w-11 h-11 rounded-2xl bg-[#FF46A2] flex items-center justify-center text-white font-black shadow-sm">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#86868B]">Call / Hotline</div>
                    <div className="font-bold text-[#1D1D1F]">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-[#1D1D1F]">
                  <div className="w-11 h-11 rounded-2xl bg-[#FFFF00] flex items-center justify-center text-black font-black shadow-sm">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[#86868B]">Headquarters</div>
                    <div className="font-bold text-[#1D1D1F]">Chennai, Tamil Nadu, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-black/5">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#00F0FF] hover:bg-[#00d6e6] text-black font-black py-3.5 px-4 rounded-xl shadow-sm transition-all duration-300 text-xs uppercase tracking-wider"
              >
                <MessageSquare className="w-4 h-4 text-black" /> Direct WhatsApp Inquiry
              </a>
            </div>
          </div>

          {/* Right 3 Cols: Light Skeuomorphic Luxury Form */}
          <div className="lg:col-span-3 bg-white/85 border border-white/95 rounded-3xl p-8 shadow-[0_16px_40px_-8px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] backdrop-blur-2xl relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <CheckCircle2 className="w-20 h-20 text-[#FF46A2] animate-bounce" />
                <h4 className="text-3xl font-black text-[#1D1D1F] uppercase tracking-tight">Inquiry Received!</h4>
                <p className="text-sm text-[#6E6E73] max-w-md">
                  Thank you for reaching out to Crafta Creatives. Our lead engineer will review your inquiry and connect with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6E73] mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] placeholder:text-[#86868B] shadow-inner focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/30 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6E73] mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] placeholder:text-[#86868B] shadow-inner focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6E73] mb-2">Primary Capability</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/30 transition-all"
                    >
                      <option>Web Development</option>
                      <option>Logo Design</option>
                      <option>Product Shoot</option>
                      <option>Printing &amp; Packaging</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6E73] mb-2">Target Budget</label>
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                      className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/30 transition-all"
                    >
                      <option>$200 - $500</option>
                      <option>$500 - $1000</option>
                      <option>$1000 - $2500</option>
                      <option>$2500+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6E6E73] mb-2">Project Brief & Vision</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe your project vision, key deliverables, and target launch timeline..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white border border-black/10 rounded-xl px-4 py-3 text-sm text-[#1D1D1F] placeholder:text-[#86868B] shadow-inner focus:outline-none focus:border-[#00F0FF] focus:ring-2 focus:ring-[#00F0FF]/30 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#EE4B2B] hover:bg-[#d43d1f] text-white font-black py-4 rounded-xl shadow-[0_4px_16px_rgba(238,75,43,0.35)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 text-xs uppercase tracking-wider"
                >
                  <span>Submit Project Inquiry</span>
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}