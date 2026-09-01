import React from 'react';
import { TEAM_DATA } from '../data/team';
import { Users, Quote, Mail } from 'lucide-react';
import { TeamMember } from '../types';

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
);

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
);

const TwitterIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
);

export const Team: React.FC = () => {
  
  const renderMemberCard = (member: TeamMember) => (
    <div
      key={member.id}
      className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group w-full max-w-sm mx-auto"
    >
      <div>
        {/* Avatar Header Image */}
        <div className="relative h-72 w-full overflow-hidden bg-slate-900">
          <img
            src={member.image || '/assets/team/member-placeholder.svg'}
            alt={member.name}
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/team/member-placeholder.svg';
            }}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
          
          {/* Social & Contact Buttons */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {member.github && (
              <a
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-white border border-slate-800 backdrop-blur-md transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon />
              </a>
            )}
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-sky-400 border border-slate-800 backdrop-blur-md transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon />
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-sky-400 border border-slate-800 backdrop-blur-md transition-colors"
                title="Twitter/X Profile"
              >
                <TwitterIcon />
              </a>
            )}
            {member.email && (
              <a
                href={member.email.startsWith('mailto:') ? member.email : `mailto:${member.email}`}
                className="p-2 rounded-xl bg-slate-950/80 text-slate-300 hover:text-sky-400 border border-slate-800 backdrop-blur-md transition-colors"
                title="Send Email"
              >
                <Mail className="w-4 h-4 text-sky-400" />
              </a>
            )}
          </div>


          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="text-2xl font-bold text-white group-hover:text-sky-300 transition-colors">
              {member.name}
            </h3>
            <span className="text-xs font-medium text-sky-400 block mt-0.5">
              {member.role}
            </span>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {member.bio}
          </p>

          {/* Expertise Badges */}
          <div className="flex flex-wrap gap-1.5">
            {member.expertise.flatMap(s => s.split(' · ')).map((skill) => (
              <span
                key={skill}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Quote Box */}
          {member.quote && (
            <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 flex items-start gap-2.5">
              <Quote className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 italic">
                "{member.quote}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <section id="team" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
            <Users className="w-3.5 h-3.5" />
            <span>Meet The Innovators</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Driven by Passion, Engineered by <span className="gradient-text">Youth</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Our 5 team members bring award-winning individual achievements and modern software capabilities into PioneerX Labs.
          </p>
        </div>

        {/* Custom Staggered Grid (2 up, 3 down) */}
        <div className="mt-16 space-y-8">
          
          {/* Top Row: 2 Members Centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {TEAM_DATA.slice(0, 2).map((member) => renderMemberCard(member))}
          </div>

          {/* Bottom Row: 3 Members Centered */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {TEAM_DATA.slice(2, 5).map((member) => renderMemberCard(member))}
          </div>

        </div>

      </div>
    </section>
  );
};
