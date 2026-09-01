import React from 'react';
import { Project } from '../../types';
import { X, ExternalLink } from 'lucide-react';

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-800 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/70 text-slate-300 hover:text-white border border-slate-700 backdrop-blur-md cursor-pointer transition-transform hover:scale-105"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Cover Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
            <span className="inline-flex text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 w-fit backdrop-blur-md">
              {project.category}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">Client: <span className="text-white font-semibold">{project.client}</span></p>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Key Impact Metrics Grid */}
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-sky-400 block mb-3">
              Quantifiable Impact & Performance
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {project.impactMetrics.map((metric, idx) => (
                <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-center">
                  <div className="text-lg sm:text-2xl font-extrabold text-white gradient-text">
                    {metric.value}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Full Case Study Breakdown */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              Architectural Overview & Case Study
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              {project.fullDetails}
            </p>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 text-xs font-mono bg-slate-900 text-slate-200 rounded-lg border border-slate-800"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions Footer */}
          <div className="pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all flex items-center gap-2 shadow-lg shadow-sky-500/20"
                >
                  <span>Launch Live Demo</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
                >
                  <GithubIcon />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={onClose}
              className="text-xs text-slate-400 hover:text-white px-4 py-2"
            >
              Close Window
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
