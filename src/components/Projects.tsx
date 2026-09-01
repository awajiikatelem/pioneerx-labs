import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projects';
import { ProjectModal } from './Modals/ProjectModal';
import { Project } from '../types';
import ecosafeImage from '../assets/team/ecosafe.png';
import dashboardImage from '../assets/team/dashboard.png';
import {
  FolderGit2,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Code,
} from 'lucide-react';

export const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] =
    useState<Project | null>(null);

  // EcoSafe is the flagship PioneerX Labs project
  const project =
    PROJECTS_DATA.find(
      (item) =>
        item.title.toLowerCase().includes('ecosafe') ||
        item.title.toLowerCase().includes('bonnysafe')
    ) || PROJECTS_DATA[0];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>Flagship Project</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Meet <span className="gradient-text">EcoSafe</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg">
            A smart community platform built by the 5-member PioneerX Labs
            team to help communities identify, report, and respond to
            environmental challenges.
          </p>
        </div>

        {/* EcoSafe Showcase Card */}
        <div className="mt-16 glass-panel rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl relative">

          {/* Background Glow */}
          <div className="absolute right-0 top-0 w-80 h-80 bg-sky-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12">

            {/* Project Image */}
            <div className="lg:col-span-6 p-3 sm:p-4 lg:p-5">
              <div className="relative h-120 sm:h-140 lg:h-190 overflow-hidden rounded-[1.75rem] border border-slate-800/80 bg-slate-900/60 shadow-[0_20px_80px_rgba(14,165,233,0.12)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_45%)]" />

                <div className="flex h-full flex-col gap-3 p-3 sm:p-4">
                  <div className="relative flex-1 overflow-hidden rounded-[1.35rem] border border-slate-700/80 bg-slate-950/80">
                    <img
                      src={project.image}
                      alt="EcoSafe environmental monitoring platform"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = ecosafeImage;
                      }}
                      className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                    />

                    <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(2,6,23,0.82),rgba(2,6,23,0.18),rgba(2,6,23,0.02))]" />

                    <div className="absolute left-4 top-4 flex flex-wrap gap-2 z-10">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-950/90 text-sky-400 border border-slate-800 backdrop-blur-md">
                        Environmental Tech
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                        PioneerX Labs
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 z-10 rounded-xl border border-slate-700/80 bg-slate-950/80 px-3 py-2 backdrop-blur-md">
                      <div className="mb-2 flex items-center gap-2 text-sky-300 text-[11px] font-semibold">
                        <Sparkles className="w-4 h-4" />
                        <span>Smart Community Innovation</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                        EcoSafe
                      </h3>
                    </div>
                  </div>

                  <div className="relative h-50 sm:h-55 lg:h-65 overflow-hidden rounded-[1.35rem] border border-slate-700/80 bg-slate-950/80">
                    <img
                      src={dashboardImage}
                      alt="EcoSafe dashboard"
                      className="h-full w-full object-cover object-top transition-transform duration-700 hover:scale-[1.02]"
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/10 to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4 z-10 rounded-xl border border-slate-700/80 bg-slate-950/80 px-3 py-2 backdrop-blur-md">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-sky-300">
                        Dashboard
                      </div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        Hazard oversight
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Details */}
            <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8 z-10">

              <div className="space-y-5">

                {/* Project Type */}
                <span className="text-xs font-mono font-semibold text-slate-500 uppercase tracking-wider block">
                  Project: EcoSafe
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  Smart Environmental Community Platform
                </h3>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  EcoSafe is a smart community platform designed to empower
                  residents to report environmental hazards, monitor water
                  quality, and stay informed about environmental issues in
                  their community.
                </p>

                <p className="text-slate-400 text-sm leading-relaxed">
                  Built by the PioneerX Labs team, EcoSafe combines technology,
                  community participation, and environmental awareness to
                  create a faster and more transparent way of identifying and
                  addressing environmental challenges.
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-3 pt-2">

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="text-lg font-extrabold text-white gradient-text">
                      Hazard
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Environmental Reporting
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="text-lg font-extrabold text-white gradient-text">
                      Water
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Quality Monitoring
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="text-lg font-extrabold text-white gradient-text">
                      Community
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Awareness & Engagement
                    </div>
                  </div>

                  <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                    <div className="text-lg font-extrabold text-white gradient-text">
                      Dashboard
                    </div>
                    <div className="text-[11px] text-slate-400 mt-1">
                      Real-Time Administration
                    </div>
                  </div>

                </div>

                {/* Technology Stack */}
                <div className="space-y-2 pt-2">

                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-sky-400" />

                    <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Technology Stack
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5">

                    {[
                      'React',
                      'Tailwind CSS',
                      'Node.js',
                      'Express.js',
                      'MongoDB',
                      'JavaScript',
                      'REST API',
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800"
                      >
                        {tech}
                      </span>
                    ))}

                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-slate-800/80">

                <button
                  onClick={() => setActiveModalProject(project)}
                  className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all flex items-center gap-1.5 shadow-lg shadow-sky-500/20 cursor-pointer"
                >
                  <span>Explore EcoSafe</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all flex items-center gap-2"
                  >
                    <span>View Repository</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* Project Mission */}
        <div className="mt-10 text-center max-w-3xl mx-auto">
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            <span className="text-white font-semibold">EcoSafe</span> is more
            than a software project — it is our approach to using technology
            to create safer, more informed, and environmentally responsible
            communities.
          </p>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};
