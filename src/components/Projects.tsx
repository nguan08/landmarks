import React, { useState } from 'react';
import { PROJECTS, Project } from '@/data/lightingData';
import { ArrowUpRight, Award, Eye, Sparkles, MapPin, Calendar, Sun, Moon, Layers, X, Sliders } from 'lucide-react';

export function Projects() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [sliderPos, setSliderPos] = useState<number>(50); // For Day vs Night comparison slider

  const categories = [
    { id: 'all', label: 'All Portfolios' },
    { id: 'facade', label: 'Façades & Towers' },
    { id: 'hospitality', label: 'Luxury Hospitality' },
    { id: 'art', label: 'Experiential Light Art' },
    { id: 'interior', label: 'Interior & Spa' },
    { id: 'masterplan', label: 'Civic Masterplans' },
  ];

  const filteredProjects = activeCategory === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-black relative">
      
      {/* Glow effect */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-cyan-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-cyan-400 text-xs font-mono-code mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CURATED ARCHITECTURAL ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
              Selected <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-pink-500 bg-clip-text text-transparent">Landmarks</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base mt-2">
              Explore our award-winning architectural illuminations, light sculptures, and circadian masterplans across the globe.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-6 md:mt-0 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-mono-code transition-all ${
                  activeCategory === cat.id
                    ? 'bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/25'
                    : 'bg-zinc-900/80 text-slate-400 hover:text-white border border-white/5 hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                setSelectedProject(project);
                setSliderPos(50);
              }}
              className="group cursor-pointer rounded-2xl bg-zinc-900/80 border border-white/10 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden flex flex-col shadow-xl hover:shadow-2xl hover:shadow-cyan-950/40 hover:-translate-y-1.5"
            >
              
              {/* Image Container with Hover Zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-950">
                <img
                  src={project.nightImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Gradient vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Top Badge: Category & Year */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono-code uppercase tracking-wider text-cyan-300">
                    {project.category}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-mono-code text-slate-300">
                    {project.year}
                  </span>
                </div>

                {/* Hover CTA overlay */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="px-4 py-2 rounded-full bg-cyan-500 text-black font-semibold text-xs font-mono-code flex items-center gap-1.5 shadow-lg">
                    <span>Inspect Case Study & Day/Night</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Award Badge if present */}
                {project.awards && project.awards.length > 0 && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-300 text-[11px] font-medium">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>{project.awards[0]}</span>
                  </div>
                )}

              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                
                <div>
                  <div className="flex items-center gap-1.5 text-xs font-mono-code text-slate-400 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white group-hover:text-cyan-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Photometric Specs Pill */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono-code text-slate-400">
                  <span className="text-cyan-300">{project.colorTemp}</span>
                  <span className="text-amber-400">{project.lumens}</span>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Case Study Modal with Day / Night Lighting Transformation Slider */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-in fade-in duration-200">
          
          <div className="bg-zinc-950 border border-white/20 rounded-3xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative">
            
            {/* Modal Header */}
            <div className="sticky top-0 z-20 px-6 py-4 bg-zinc-950/90 backdrop-blur-md border-b border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-mono-code text-cyan-400 uppercase tracking-wider block">
                  Case Study • {selectedProject.location}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-8">
              
              {/* Interactive Day vs. Night Visual Comparison Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
                  <span className="flex items-center gap-1.5 text-amber-300">
                    <Sun className="w-4 h-4" /> Natural Daytime Architecture
                  </span>
                  <span className="text-slate-500">Drag Slider to Compare</span>
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <Moon className="w-4 h-4" /> Landmark Night Illumination
                  </span>
                </div>

                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-white/15 select-none">
                  
                  {/* Night Image (Base) */}
                  <img
                    src={selectedProject.nightImage}
                    alt="Night Illumination"
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Day Image (Clipped Overlay) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPos}%` }}
                  >
                    <img
                      src={selectedProject.dayImage}
                      alt="Day Architecture"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: '100%', minWidth: '100%' }}
                    />
                  </div>

                  {/* Divider Line & Handle */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_#00F0FF] pointer-events-none"
                    style={{ left: `${sliderPos}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-cyan-400 text-black flex items-center justify-center shadow-lg font-bold text-xs">
                      ↔
                    </div>
                  </div>

                  {/* Invisible Range Input for dragging */}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPos}
                    onChange={(e) => setSliderPos(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
                  />

                </div>
              </div>

              {/* Project Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="md:col-span-2 space-y-4">
                  <h4 className="text-sm font-mono-code uppercase text-cyan-400 tracking-wider">
                    Design Challenge & Optical Strategy
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {selectedProject.description}
                  </p>

                  <div className="p-4 rounded-xl bg-zinc-900 border border-white/10 space-y-2 text-xs">
                    <div>
                      <strong className="text-amber-300">Challenge: </strong>
                      <span className="text-slate-300">{selectedProject.challenge}</span>
                    </div>
                    <div>
                      <strong className="text-cyan-300">Optical Solution: </strong>
                      <span className="text-slate-300">{selectedProject.solution}</span>
                    </div>
                  </div>
                </div>

                {/* Photometric Technical Specs */}
                <div className="p-5 rounded-2xl bg-zinc-900/90 border border-white/10 space-y-4 font-mono-code text-xs">
                  <h4 className="font-bold text-white uppercase text-xs flex items-center gap-1.5 pb-2 border-b border-white/10">
                    <Sliders className="w-4 h-4 text-cyan-400" />
                    <span>Technical Specs</span>
                  </h4>

                  <div className="space-y-2.5">
                    <div>
                      <span className="text-slate-500 block text-[10px]">CORRELATED COLOR TEMP</span>
                      <span className="text-cyan-300 font-semibold">{selectedProject.colorTemp}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">TOTAL LUMEN OUTPUT</span>
                      <span className="text-amber-300 font-semibold">{selectedProject.lumens}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">ENERGY PERFORMANCE</span>
                      <span className="text-emerald-400 font-semibold">{selectedProject.energyReduction}</span>
                    </div>

                    <div>
                      <span className="text-slate-500 block text-[10px]">KEY SPECIFIED HARDWARE</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedProject.fixtures.map((f) => (
                          <span key={f} className="px-2 py-0.5 rounded bg-zinc-800 text-slate-300 text-[10px] border border-white/5">
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-6 bg-zinc-900/60 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs font-mono-code text-slate-400">
                Client: <strong className="text-white">{selectedProject.client}</strong>
              </span>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs font-mono-code transition-all"
              >
                Close Case Study
              </button>
            </div>

          </div>

        </div>
      )}

    </section>
  );
}
