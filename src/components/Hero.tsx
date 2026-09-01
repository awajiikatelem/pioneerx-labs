import React from 'react';
import { ArrowRight, Sparkles, Terminal, Code2, ShieldCheck, Zap, Play } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
      {/* Background Ambient Glows & Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(56,189,248,0.15),rgba(255,255,255,0))]" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-150 h-75 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 right-10 w-100 h-62.5 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-sky-500/30 text-xs sm:text-sm font-medium text-slate-200 animate-float shadow-lg shadow-sky-500/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>Youth-Led Tech Excellence</span>
            <span className="text-slate-600">•</span>
            <span className="text-sky-400 font-semibold flex items-center gap-1">
              Q3 Client Intake Open <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
            Pioneering Tomorrow's{' '}
            <span className="gradient-text">Digital Frontier</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            We are a team of hyper-focused young innovators, developers, and AI researchers building 
            world-class digital products, custom SaaS platforms, and enterprise solutions that solve real-world problems.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('services')}
              className="px-8 py-4 text-base font-semibold text-white rounded-full bg-linear-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-lg shadow-sky-500/25 hover:shadow-sky-500/40 transition-all cursor-pointer flex items-center gap-2 group"
            >
              <span>Explore Solutions</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('projects')}
              className="px-8 py-4 text-base font-semibold text-slate-200 rounded-full glass-panel hover:bg-slate-800/80 hover:text-white border border-slate-700 hover:border-slate-600 transition-all cursor-pointer flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-sky-400 fill-sky-400/20" />
              <span>View Case Studies</span>
            </button>
          </div>

          {/* Key Metric Cards */}
          <div className="w-full pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="glass-card p-5 rounded-2xl text-center border border-slate-800/80 hover:border-sky-500/30">
              <div className="text-2xl sm:text-3xl font-extrabold text-white gradient-text">
                2026
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Founded This Year
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center border border-slate-800/80 hover:border-sky-500/30">
              <div className="text-2xl sm:text-3xl font-extrabold text-white gradient-text">
                5
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Core Squad Members
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center border border-slate-800/80 hover:border-sky-500/30">
              <div className="text-2xl sm:text-3xl font-extrabold text-white gradient-text">
                1
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Flagship Project Shipped
              </div>
            </div>

            <div className="glass-card p-5 rounded-2xl text-center border border-slate-800/80 hover:border-sky-500/30">
              <div className="text-2xl sm:text-3xl font-extrabold text-white gradient-text">
                4+
              </div>
              <div className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
                Individual Team Awards
              </div>
            </div>
          </div>

          {/* Interactive Code Preview Window */}
          <div className="w-full pt-8 max-w-3xl">
            <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800 shadow-2xl text-left">
              {/* Window Bar */}
              <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-slate-400">pioneerx-core.ts</span>
                </div>
                <span className="text-[10px] text-sky-400 font-mono bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                  v2.4.0 Live
                </span>
              </div>
              
              {/* Code Snippet */}
              <div className="p-5 font-mono text-xs sm:text-sm text-slate-300 space-y-2 overflow-x-auto bg-slate-950/80">
                <p><span className="text-purple-400">import</span> &#123; <span className="text-sky-300">PioneerXEngine</span> &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@pioneerx/core'</span>;</p>
                <p><span className="text-purple-400">const</span> <span className="text-amber-300">lab</span> = <span className="text-purple-400">new</span> <span className="text-sky-300">PioneerXEngine</span>(&#123; <span className="text-slate-400">passion</span>: <span className="text-sky-400">true</span>, <span className="text-slate-400">excellence</span>: <span className="text-emerald-400">'uncompromising'</span> &#125;);</p>
                <p><span className="text-purple-400">await</span> <span className="text-amber-300">lab</span>.<span className="text-sky-300">buildFuture</span>(&#123;</p>
                <p className="pl-4"><span className="text-slate-400">mission</span>: <span className="text-emerald-300">'Solve real-world problems through cutting-edge technology'</span>,</p>
                <p className="pl-4"><span className="text-slate-400">deliverables</span>: [<span className="text-emerald-300">'Custom AI'</span>, <span className="text-emerald-300">'Sub-Second SaaS'</span>, <span className="text-emerald-300">'120fps Mobile Apps'</span>],</p>
                <p className="pl-4"><span className="text-slate-400">team</span>: <span className="text-sky-400">'Young Innovators'</span></p>
                <p>&#125;);</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
