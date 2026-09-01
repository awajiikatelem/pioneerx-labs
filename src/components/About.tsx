import React from 'react';
import { Compass, Lightbulb, Users, Target, Rocket, Award, Code, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const pillars = [
    {
      icon: Lightbulb,
      title: 'Unstoppable Curiosity',
      description: 'We never accept "good enough". We continuously explore edge tech stack tools, WebGPU, local AI models, and modern frameworks.'
    },
    {
      icon: Target,
      title: 'Uncompromising Quality',
      description: 'Every line of code is clean, type-safe, and benchmarked for sub-second load times and 99+ Lighthouse performance scores.'
    },
    {
      icon: Users,
      title: 'Radical Collaboration',
      description: 'We partner closely with clients, investors, and fellow young developers, maintaining 100% transparency at every stage.'
    },
    {
      icon: Rocket,
      title: 'Real-World Impact',
      description: 'We measure success not by vanity metrics, but by tangible value created—revenue generated, user conversion, and time saved.'
    }
  ];

  const milestones = [
    {
      year: '2026',
      title: 'Company Founded',
      desc: 'Founded this year by 5 hyper-focused young developers, AI researchers, and UI engineers.'
    },
    {
      year: '2026',
      title: 'First Flagship Project',
      desc: 'Engineered and launched our inaugural autonomous AI workflow engine with sub-second performance.'
    },
    {
      year: 'Future',
      title: 'Global Expansion & Product Ecosystem',
      desc: 'Scaling our engineering squad, client partnerships, and open-source developer tools.'
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
            <Compass className="w-3.5 h-3.5" />
            <span>About PioneerX Labs</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Young Innovators Building{' '}
            <span className="gradient-text">Exceptional Digital Products</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            PioneerX Labs was born out of a shared conviction: age is never a barrier to technical brilliance. 
            We are a youth-led technology powerhouse engineered for companies that demand modern aesthetic precision, 
            blazing performance, and scalable software architecture.
          </p>
        </div>

        {/* Core Pillars Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <div
                key={idx}
                className="glass-card p-6 rounded-2xl relative group border border-slate-800 hover:border-sky-500/40 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-5 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Story & Vision Feature Box */}
        <div className="mt-16 glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold uppercase text-purple-400 tracking-wider">
                Our Founding Philosophy
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold text-white">
                "We don't just write code—we craft digital legacies that inspire trust."
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                Traditional enterprise software is often bloated, slow, and overly bureaucratic. At PioneerX Labs, 
                our lean youth engineering team moves fast, uses modern toolchains, and communicates transparently. 
                We combine creative ambition with rigorous software engineering discipline to craft solutions that give our partners a distinct competitive edge.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>Sub-second load times</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>Type-safe architecture</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>100% IP ownership</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-sky-400" />
                  <span>24/7 dedicated squad</span>
                </div>
              </div>
            </div>

            {/* Timeline Column */}
            <div className="lg:col-span-5 space-y-6 border-l border-slate-800 pl-6 sm:pl-8">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Company Roadmap & Milestones
              </h4>
              {milestones.map((m, idx) => (
                <div key={idx} className="relative pl-6 pb-4 last:pb-0 border-l border-sky-500/30">
                  <div className="absolute -left-[25px] top-0 w-3 h-3 rounded-full bg-sky-400 border-4 border-slate-900" />
                  <span className="text-xs font-mono text-sky-400 font-bold bg-sky-500/10 px-2 py-0.5 rounded border border-sky-500/20">
                    {m.year}
                  </span>
                  <h5 className="text-base font-bold text-white mt-1">{m.title}</h5>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
