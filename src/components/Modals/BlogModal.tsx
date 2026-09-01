import React from 'react';
import { BlogPost } from '../../types';
import { X, Clock, Calendar, Tag, Share2, ArrowLeft } from 'lucide-react';

interface BlogModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="glass-panel w-full max-w-3xl rounded-3xl overflow-hidden border border-slate-800 relative shadow-2xl my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-slate-300 hover:text-white border border-slate-700 cursor-pointer backdrop-blur-md"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Image */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent" />

          <div className="absolute bottom-6 left-6 right-6 space-y-2">
            <span className="inline-flex text-xs font-mono font-semibold px-3 py-1 rounded-full bg-sky-500/20 text-sky-300 border border-sky-500/30 backdrop-blur-md">
              {post.category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Meta Bar */}
        <div className="px-6 py-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-8 h-8 rounded-full border border-sky-500/40 object-cover"
            />
            <div>
              <span className="font-bold text-white block">{post.author.name}</span>
              <span className="text-[11px] text-slate-400">{post.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sky-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-10 space-y-6 text-slate-200 leading-relaxed text-sm sm:text-base">
          <div className="prose prose-invert max-w-none space-y-4">
            {post.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('# ')) {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-white pt-4">
                    {paragraph.replace('# ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h3 key={idx} className="text-xl font-semibold text-sky-300 pt-3">
                    {paragraph.replace('## ', '')}
                  </h3>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h4 key={idx} className="text-lg font-semibold text-purple-300 pt-2">
                    {paragraph.replace('### ', '')}
                  </h4>
                );
              }
              if (paragraph.startsWith('```')) {
                return (
                  <pre key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-x-auto text-sky-300">
                    {paragraph.replace(/```[a-z]*/g, '')}
                  </pre>
                );
              }
              return <p key={idx} className="text-slate-300">{paragraph}</p>;
            })}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-800 flex items-center gap-2">
            <Tag className="w-4 h-4 text-slate-500" />
            <div className="flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-900 text-slate-400 rounded-lg border border-slate-800"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Insights
          </button>

          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-sky-500/30 bg-sky-500/10 px-3 py-2 text-xs font-semibold text-sky-300 transition-colors hover:bg-sky-500/20"
          >
            Open project
            <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
          </a>
        </div>

      </div>
    </div>
  );
};
