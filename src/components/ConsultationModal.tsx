import React, { useState } from 'react';
import { X, Sparkles, Send, CheckCircle, ShieldCheck, Mail, Calendar } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    firm: '',
    email: '',
    phone: '',
    projectScope: 'Facade Architecture',
    budgetTier: '$50k - $200k',
    notes: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#FF2E93', '#FFB020']
      });
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      <div className="bg-zinc-950 border border-cyan-500/30 rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl shadow-cyan-950/40 relative">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-zinc-900/80 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-lg">
                Book Studio Consultation
              </h3>
              <span className="text-[11px] font-mono-code text-cyan-400">
                Landmark LightWork • landmark.work
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-heading text-white">
                Consultation Reserved!
              </h4>
              <p className="text-slate-300 text-sm max-w-sm mx-auto">
                Our Principal Lighting Designer will contact you with a calendar invitation and initial photometrics assessment.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-full bg-cyan-500 text-black font-bold text-xs font-mono-code"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono-code text-slate-300 block mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Morgan"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono-code text-slate-300 block mb-1">Firm / Architectural Studio *</label>
                  <input
                    type="text"
                    required
                    placeholder="Studio Zaha / Foster"
                    value={formData.firm}
                    onChange={e => setFormData({ ...formData, firm: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono-code text-slate-300 block mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@architecture.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono-code text-slate-300 block mb-1">Phone / WhatsApp</label>
                  <input
                    type="tel"
                    placeholder="+66 81 000 0000"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono-code text-slate-300 block mb-1">Project Scope</label>
                  <select
                    value={formData.projectScope}
                    onChange={e => setFormData({ ...formData, projectScope: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Facade Architecture">Tower / Façade Masterplan</option>
                    <option value="Luxury Hospitality">Luxury Hospitality & Resort</option>
                    <option value="Experiential Art">Experiential Light Art Installation</option>
                    <option value="Circadian Wellness">Interior & Circadian Wellness</option>
                    <option value="Custom Fixture">Custom Luminaire Prototyping</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-mono-code text-slate-300 block mb-1">Budget Allocation</label>
                  <select
                    value={formData.budgetTier}
                    onChange={e => setFormData({ ...formData, budgetTier: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Under $50k">Concept / Photometric Study (Under $50k)</option>
                    <option value="$50k - $200k">$50k - $200k (Full Scheme)</option>
                    <option value="$200k - $1M+">$200k - $1M+ (Skyscraper / Mega Masterplan)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-mono-code text-slate-300 block mb-1">Project Notes / Target Dates</label>
                <textarea
                  rows={3}
                  placeholder="Share any special design requirements or schedule..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-cyan-500 via-indigo-600 to-pink-500 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:scale-[1.01] shadow-xl shadow-cyan-500/30 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Dedicated Consultation</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] font-mono-code text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Confidential Non-Disclosure Protected (NDA Available)</span>
              </div>

            </form>
          )}
        </div>

      </div>

    </div>
  );
}
