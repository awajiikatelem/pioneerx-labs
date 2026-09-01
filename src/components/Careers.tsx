import React, { useState } from 'react';
import { CAREERS_DATA } from '../data/careers';
import { ApplyModal } from './Modals/ApplyModal';
import { CareerRole } from '../types';
import { Briefcase, MapPin, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const Careers: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<CareerRole | null>(null);
  const [activeDepartment, setActiveDepartment] = useState<string>('All');

  const departments = ['All', 'Engineering', 'AI / Data', 'Product & Design'];

  const filteredRoles = activeDepartment === 'All'
    ? CAREERS_DATA
    : CAREERS_DATA.filter((r) => r.department === activeDepartment);

  const perks = [
    'Global Remote Freedom & Flexible Hours',
    'M3/M4 Apple Silicon Hardware Stipend ($2,500)',
    'Direct Mentorship from Tech Founders',
    'Unlimited Tech Books & Conference Budget',
    'Zero Corporate Bureaucracy'
  ];

  return (
    <section id="careers" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join The Pioneer Movement</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Build the Future <span className="gradient-text">With Us</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Whether you are an experienced software engineer or an ambitious young coder looking for a fellowship, 
            we provide an environment where high talent thrives.
          </p>
        </div>

        {/* Culture & Perks Banner */}
        <div className="mt-12 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-sky-400 mb-4">
            Why Top Engineers Choose PioneerX Labs
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                <CheckCircle2 className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Filter */}
        <div className="mt-12 flex flex-wrap gap-2">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setActiveDepartment(dept)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeDepartment === dept
                  ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* Roles List */}
        <div className="mt-6 space-y-4">
          {filteredRoles.map((role) => (
            <div
              key={role.id}
              className="glass-card p-6 rounded-2xl border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-2 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {role.department}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    {role.type}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors">
                  {role.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {role.description}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-400" />
                    {role.location}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedRole(role)}
                className="px-6 py-3 rounded-xl text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20 whitespace-nowrap"
              >
                <span>Apply For Role</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Application Modal */}
      <ApplyModal
        role={selectedRole}
        onClose={() => setSelectedRole(null)}
      />
    </section>
  );
};
