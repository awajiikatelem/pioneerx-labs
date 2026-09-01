import React, { useState } from 'react';
import {
  Copy,
  Check,
  Link2,
  Share2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';


interface ShareReviewLinkProps {
  /** Called when the user clicks "Open Form" */
  onNavigateToForm?: () => void;
  /** If true, renders a compact inline version (for the /testimonials page) */
  compact?: boolean;
}

export const ShareReviewLink: React.FC<ShareReviewLinkProps> = ({
  onNavigateToForm,
  compact = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const reviewUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}/testimonials/submit`
      : '/testimonials/submit';

  const handleCopy = () => {
    navigator.clipboard.writeText(reviewUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  /* ──────────────────────────────────────────────────────────
     COMPACT mode — used on /testimonials page as a callout
  ────────────────────────────────────────────────────────── */
  if (compact) {
    return (
      <div className="relative rounded-2xl overflow-hidden glass-panel border border-sky-500/30 shadow-xl shadow-sky-500/5 p-5 sm:p-6">
        {/* Glow */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-5 justify-between">
          {/* Label side */}
          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="p-1.5 rounded-lg bg-sky-500/15 border border-sky-500/25">
                <Share2 className="w-3.5 h-3.5 text-sky-400" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400">
                Share Review Link
              </span>
            </div>
            <p className="text-sm font-semibold text-white">
              Send this link to your clients to collect their review.
            </p>
            {/* URL chip */}
            <div className="flex items-center gap-2 mt-2 min-w-0 max-w-full">
              <Link2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
              <code className="text-xs text-sky-300 font-mono truncate bg-slate-900 border border-slate-700 px-2 py-1 rounded-lg max-w-[260px] sm:max-w-xs">
                {reviewUrl}
              </code>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs transition-all duration-200 cursor-pointer shadow-md ${
                copied
                  ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/25'
                  : 'bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 hover:border-sky-400/60'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            {onNavigateToForm && (
              <button
                onClick={onNavigateToForm}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 shadow-md shadow-sky-500/20 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open Form</span>
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ──────────────────────────────────────────────────────────
     FULL mode — used on /testimonials/submit page (hero card)
  ────────────────────────────────────────────────────────── */
  return (
    <div className="relative rounded-3xl overflow-hidden border border-sky-500/30 shadow-2xl shadow-sky-500/10 bg-slate-950/80">
      {/* Gradient top bar */}
      <div className="h-1 w-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500" />

      {/* Glow orbs */}
      <div className="absolute -top-16 -right-16 w-56 h-56 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 p-6 sm:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-500/20 to-indigo-500/20 border border-sky-500/30 shadow-lg flex-shrink-0">
              <Share2 className="w-5 h-5 text-sky-400" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-sky-400/80 mb-0.5">
                Review Invitation Link
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                Share this link with your clients
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Anyone with this link can leave a review on PioneerX Labs.
              </p>
            </div>
          </div>

          {/* Expand/collapse on mobile */}
          <button
            onClick={() => setExpanded(!expanded)}
            className="sm:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 cursor-pointer"
          >
            {expanded ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* URL + copy row */}
        <div className={`${!expanded ? 'hidden sm:flex' : 'flex'} flex-col sm:flex-row items-stretch gap-3`}>
          {/* URL Display */}
          <div className="flex-1 flex items-center gap-3 px-4 py-3 rounded-2xl bg-slate-900/80 border border-slate-800 group hover:border-sky-500/40 transition-colors min-w-0">
            <Link2 className="w-4 h-4 text-slate-500 flex-shrink-0" />
            <code className="text-xs sm:text-sm text-sky-200 font-mono truncate flex-1 select-all">
              {reviewUrl}
            </code>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-2xl font-bold text-sm transition-all duration-300 cursor-pointer flex-shrink-0 shadow-lg ${
              copied
                ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/30 scale-[0.98]'
                : 'bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white shadow-sky-500/25 hover:shadow-sky-500/40 hover:scale-[1.02]'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Link</span>
              </>
            )}
          </button>
        </div>

        {/* Instruction tags */}
        <div className={`${!expanded ? 'hidden sm:flex' : 'flex'} flex-wrap items-center gap-2 mt-5 pt-5 border-t border-slate-800/80`}>
          <span className="text-[11px] text-slate-500 font-medium mr-1">Share via:</span>
          {[
            { label: 'Email', icon: '✉️' },
            { label: 'WhatsApp', icon: '💬' },
            { label: 'LinkedIn', icon: '🔗' },
            { label: 'Direct message', icon: '📨' },
          ].map((item) => (
            <span
              key={item.label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] text-slate-300 font-medium"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
