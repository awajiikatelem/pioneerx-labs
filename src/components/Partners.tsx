import React from 'react';
import { ShieldCheck, CheckCircle, Globe } from 'lucide-react';

export const Partners: React.FC = () => {
  const partnersList = [
    { name: 'Bonny Digital Literacy Initiative', tag: 'Sponsor & Partner' },
    { name: 'Technoville Innovation', tag: 'Technology Sponsor' },
    { name: 'Port Harcourt Tech Expo', tag: 'Community Partner' },
  ];

  return (
    <section className="py-16 relative overflow-hidden bg-slate-950/90 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-sky-400">
              Trusted Ecosystem
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              Partners, Cloud Ecosystems & Technology Sponsors
            </h3>
          </div>
          <span className="text-xs text-slate-400 bg-slate-900 px-3 py-1.5 rounded-full border border-slate-800">
            Official Enterprise Integration Partners
          </span>
        </div>

        {/* Marquee Banner */}
        <div className="relative w-full overflow-hidden py-4">
          <div className="animate-marquee flex items-center gap-6">
            {[...partnersList, ...partnersList].map((p, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-sky-500/40 transition-colors whitespace-nowrap"
              >
                <div className="w-2 h-2 rounded-full bg-sky-400" />
                <span className="font-bold text-sm text-slate-200">{p.name}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800">
                  {p.tag}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
