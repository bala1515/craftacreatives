import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    budget: '$500 - $1000',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', service: 'Web Development', budget: '$500 - $1000', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-24 px-4 bg-gray-50 border-t border-gray-200 relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <h2 className="text-xs sm:text-sm font-bold tracking-widest text-blue-600 uppercase">Get In Touch</h2>
          <h3 className="text-3xl sm:text-5xl font-black text-gray-900 tracking-tight">
            Let's Build Something Great Together
          </h3>
          <p className="text-gray-600 text-sm">
            Have a project in mind? Reach out to Crafta Creatives team for consultations & quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left 2 Cols: Contact Info */}
          <div className="lg:col-span-2 bg-white border border-gray-200 rounded-3xl p-8 space-y-8 flex flex-col justify-between shadow-sm">
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-gray-900">Contact Information</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Ready to transform your digital presence? Send us your project details or chat with us directly.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Email Us</div>
                    <div className="font-semibold text-gray-900">contact@craftacreatives.com</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">WhatsApp / Call</div>
                    <div className="font-semibold text-gray-900">+91 98765 43210</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-gray-700">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="font-semibold text-gray-900">Chennai, Tamil Nadu, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl transition-all duration-300 text-sm shadow-md"
              >
                <MessageSquare className="w-4 h-4" /> Direct WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Right 3 Cols: Form */}
          <div className="lg:col-span-3 bg-white border border-gray-200 rounded-3xl p-8 shadow-sm relative">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 animate-bounce" />
                <h4 className="text-2xl font-bold text-gray-900">Inquiry Received!</h4>
                <p className="text-sm text-gray-600 max-w-md">
                  Thank you for reaching out to Crafta Creatives. Our team will review your project details and get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Primary Service</label>
                    <select
                      value={formData.service}
                      onChange={e => setFormData({...formData, service: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    >
                      <option>Web Development</option>
                      <option>SaaS MVP</option>
                      <option>Logo & Branding</option>
                      <option>Product Shoot</option>
                      <option>Video Editing</option>
                      <option>Banner Design</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Approx Budget</label>
                    <select
                      value={formData.budget}
                      onChange={e => setFormData({...formData, budget: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                    >
                      <option>$200 - $500</option>
                      <option>$500 - $1000</option>
                      <option>$1000 - $2500</option>
                      <option>$2500+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Project Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project goals, timelines, and requirements..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg hover:scale-[1.01] transition-all duration-300 text-sm"
                >
                  Send Inquiry Message <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}