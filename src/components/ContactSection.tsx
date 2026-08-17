import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, Sparkles, Clock, Globe, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  preFilledBrief?: any;
}

export function ContactSection({ preFilledBrief }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    projectType: 'Skyscraper Facade',
    timeline: 'Within 6 Months',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Trigger celebratory neon confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#00F0FF', '#FF2E93', '#FFB020', '#A855F7']
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <section id="contact" className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      
      {/* Ambient background wash */}
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[400px] bg-cyan-900/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Studio Information (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-mono-code mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                <span>COMMISSION A PROJECT</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white mb-4">
                Let's Illuminate <span className="bg-gradient-to-r from-cyan-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Your Vision</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Whether you're developing an iconic city skyscraper, a secluded eco-resort, or an interactive light museum, our studio provides full lighting masterplanning and turnkey optical delivery.
              </p>
            </div>

            {/* Studio Offices */}
            <div className="space-y-4 font-mono-code text-xs">
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-cyan-300 font-bold">
                  <MapPin className="w-4 h-4 text-cyan-400" />
                  <span>Bangkok Design Studio (Headquarters)</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  88 Charoenkrung Creative District, Bang Rak, Bangkok 10500, Thailand
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 border-t border-white/5">
                  <span>Tel: +66 (0) 2 714 8900</span>
                  <span>UTC +7</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-pink-300 font-bold">
                  <MapPin className="w-4 h-4 text-pink-400" />
                  <span>Singapore Studio</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  1 Marina Boulevard, #28-02 Marina Bay Financial Centre, Singapore 018989
                </p>
                <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1 border-t border-white/5">
                  <span>Tel: +65 6829 7000</span>
                  <span>UTC +8</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Tokyo Innovation Hub</span>
                </div>
                <p className="text-slate-400 font-sans text-xs">
                  Roppongi Hills Mori Tower 34F, Minato-ku, Tokyo 106-6108, Japan
                </p>
              </div>
            </div>

            {/* Direct Studio Contacts */}
            <div className="pt-2 flex flex-col gap-2 text-xs font-mono-code text-slate-400">
              <a href="mailto:studio@landmark.work" className="hover:text-cyan-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                <span>studio@landmark.work / briefs@landmark.work</span>
              </a>
              <div className="flex items-center gap-2 text-emerald-400">
                <Clock className="w-4 h-4" />
                <span>Lighting Tender Desk: Responds within 24 hours</span>
              </div>
            </div>

          </div>

          {/* Right Inquiry Form (7 cols) */}
          <div className="lg:col-span-7 bg-zinc-900/90 rounded-3xl border border-white/15 p-6 sm:p-10 backdrop-blur-2xl shadow-2xl relative">
            
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-300 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold font-heading text-white">
                  Tender Brief Received!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto">
                  Thank you for contacting Landmark LightWork. Our Senior Optical Principal will review your architectural specifications and connect with a preliminary DIALux study plan.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 rounded-full bg-zinc-800 text-cyan-300 border border-cyan-500/30 text-xs font-mono-code hover:bg-zinc-700 transition-all"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div className="pb-2 border-b border-white/10 flex items-center justify-between">
                  <span className="font-heading font-bold text-white text-lg">
                    Project Brief & Tender Consultation
                  </span>
                  <span className="text-xs font-mono-code text-cyan-400">
                    landmark.work
                  </span>
                </div>

                {/* Pre-filled Brief Notice if user came from Calculator */}
                {preFilledBrief && (
                  <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 font-mono-code flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                    <div>
                      <strong className="text-cyan-300 block">Auto-Attached Calculator Configuration:</strong>
                      <span>Typology: {preFilledBrief.projectType} • Area: {preFilledBrief.area} • Target Flux: {preFilledBrief.estimatedLumens} lm</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
                      Practice / Client Developer *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. OMA Architecture / Sansiri"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="elena@studio.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+66 81 234 5678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
                      Project Typology
                    </label>
                    <select
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="Skyscraper Facade">Skyscraper / Tower Façade</option>
                      <option value="Luxury Hospitality & Resort">Luxury Hospitality & Resort</option>
                      <option value="Experiential Light Art Installation">Experiential Light Art Installation</option>
                      <option value="Interior Architecture & Wellness">Interior Architecture & Wellness Spa</option>
                      <option value="Civic & Transit Masterplan">Civic & Transit Masterplan</option>
                      <option value="Custom Luminaire Manufacturing">Custom Luminaire Manufacturing</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
                      Target Completion Timeline
                    </label>
                    <select
                      value={formData.timeline}
                      onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors"
                    >
                      <option value="Immediate (1-3 Months)">Immediate Concept (1-3 Months)</option>
                      <option value="Within 6 Months">Within 6 Months</option>
                      <option value="2026-2027 Masterplan">2026-2027 Long-term Masterplan</option>
                      <option value="Design Competition Stage">Design Competition Stage</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono-code text-slate-300 block mb-1.5">
                    Project Vision / Architectural Notes
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe building geometry, key night views, Dark Sky requirements, or custom fixture desires..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 focus:border-cyan-400 text-sm text-white focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 text-white font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 hover:scale-[1.01] shadow-xl shadow-cyan-500/25 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Tender Brief to Studio Principals</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
