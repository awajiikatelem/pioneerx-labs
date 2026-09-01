import React, { useState } from 'react';
import { SERVICES_DATA } from '../data/services';
import { 
  Globe, Smartphone, Palette, Sparkles, BarChart3, ShieldCheck, Zap, 
  ArrowRight, CheckCircle2, ChevronRight, X 
} from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  onNavigateToContact: (selectedServices?: string[]) => void;
}

export const Services: React.FC<ServicesProps> = ({ onNavigateToContact }) => {
  const [selectedDetailService, setSelectedDetailService] = useState<Service | null>(null);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Globe': return <Globe className="w-6 h-6 text-sky-400" />;
      case 'Smartphone': return <Smartphone className="w-6 h-6 text-sky-400" />;
      case 'Palette': return <Palette className="w-6 h-6 text-sky-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-sky-400" />;
      case 'BarChart3': return <BarChart3 className="w-6 h-6 text-sky-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-sky-400" />;
      default: return <Zap className="w-6 h-6 text-sky-400" />;
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
            <Zap className="w-3.5 h-3.5" />
            <span>High-Value Offerings</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            End-to-End Technology <span className="gradient-text">Solutions</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            From custom Web & Mobile platforms to AI integrations and enterprise cloud architectures, 
            we build high-performance digital systems tailored for growth.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="glass-card p-6 sm:p-8 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-sky-500/20 transition-all">
                  {getIcon(service.icon)}
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                    {service.title}
                  </h3>
                </div>

                <p className="text-slate-400 text-sm mt-3 leading-relaxed">
                  {service.shortDesc}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mt-5">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Timeline</span>
                  <span className="text-sm font-bold text-sky-400">{service.estimatedDays}</span>
                </div>

                <button
                  onClick={() => setSelectedDetailService(service)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-300 group-hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <span>Learn Details</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {selectedDetailService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-800 relative shadow-2xl space-y-6">
            <button
              onClick={() => setSelectedDetailService(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center">
                {getIcon(selectedDetailService.icon)}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">{selectedDetailService.title}</h3>
                <span className="text-xs text-sky-400 font-mono">Est. Timeline: {selectedDetailService.estimatedDays}</span>
              </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed">
              {selectedDetailService.fullDesc}
            </p>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Key Deliverables</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedDetailService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-slate-400 block">Pricing Plan</span>
                <span className="text-sm font-semibold text-slate-300">Custom project quotation based on scope</span>
              </div>

              <button
                onClick={() => {
                  const sTitle = selectedDetailService.title;
                  setSelectedDetailService(null);
                  onNavigateToContact([sTitle]);
                }}
                className="px-6 py-2.5 text-sm font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20"
              >
                <span>Request Scope Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
