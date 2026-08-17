import React, { useState, useEffect } from 'react';
import { Sparkles, Sun, Moon, Menu, X, ArrowUpRight, Lightbulb, Compass, Zap } from 'lucide-react';

interface NavbarProps {
  currentMood: string;
  onMoodChange: (mood: string) => void;
  onOpenConsultationModal: () => void;
}

export function Navbar({ currentMood, onMoodChange, onOpenConsultationModal }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Services", href: "#services" },
    { name: "Interactive Light Lab", href: "#light-lab", badge: "Live Demo" },
    { name: "Cost Estimator", href: "#calculator" },
    { name: "Philosophy", href: "#philosophy" },
    { name: "Contact", href: "#contact" },
  ];

  const moods = [
    { id: 'cyber', name: '6500K Cyber', color: '#00F0FF', dotClass: 'bg-cyan-400 shadow-[0_0_8px_#00F0FF]' },
    { id: 'warm', name: '2700K Warm Lux', color: '#FFB020', dotClass: 'bg-amber-400 shadow-[0_0_8px_#FFB020]' },
    { id: 'violet', name: 'Aurora 520nm', color: '#A855F7', dotClass: 'bg-purple-400 shadow-[0_0_8px_#A855F7]' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-black/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/80' 
        : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-pink-500 p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/20 blur-sm animate-pulse-glow" />
                <Zap className="w-5 h-5 text-cyan-300 relative z-10" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold tracking-wider text-base sm:text-lg text-white">
                  LANDMARK
                </span>
                <span className="font-mono-code font-light text-cyan-400 text-xs px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/30">
                  LIGHTWORK
                </span>
              </div>
              <span className="text-[10px] tracking-widest uppercase text-slate-400 font-mono-code -mt-0.5">
                Architectural & Experiential
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-slate-300 hover:text-white transition-colors group"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-mono-code uppercase bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 rounded-full animate-pulse">
                    {link.badge}
                  </span>
                )}
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-cyan-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
              </a>
            ))}
          </nav>

          {/* Right Controls: CCT Mood Toggles & Consultation CTA */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Mood selector */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-full p-1 gap-1">
              {moods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onMoodChange(m.id)}
                  title={`Switch to ${m.name}`}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono-code transition-all ${
                    currentMood === m.id
                      ? 'bg-white/15 text-white border border-white/20 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${m.dotClass}`} />
                  <span className="hidden md:inline text-[11px]">{m.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>

            {/* Inquire CTA Button */}
            <button
              onClick={onOpenConsultationModal}
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-full font-medium text-xs tracking-wider uppercase group"
            >
              <span className="w-full h-full bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 group-hover:from-cyan-300 group-hover:to-pink-400 absolute"></span>
              <span className="relative px-4 py-2 transition-all ease-out bg-black rounded-full group-hover:bg-opacity-0 duration-300 text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300 group-hover:text-white" />
                <span>Consult Studio</span>
              </span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black/95 border-b border-white/10 px-4 pt-4 pb-6 space-y-3 backdrop-blur-2xl animate-accordion-down">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono-code text-slate-400">STUDIO LIGHT SPECTRUM:</span>
            <div className="flex gap-2">
              {moods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => onMoodChange(m.id)}
                  className={`px-2 py-1 rounded-full text-xs font-mono-code flex items-center gap-1 border ${
                    currentMood === m.id ? 'border-cyan-400 text-cyan-300 bg-cyan-950/40' : 'border-white/10 text-slate-400'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${m.dotClass}`} />
                  {m.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-2 text-base font-medium text-slate-200 hover:text-cyan-400 border-b border-white/5"
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-mono-code bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 rounded-full">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultationModal();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25"
            >
              <Sparkles className="w-4 h-4" />
              <span>Book Lighting Consultation</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
