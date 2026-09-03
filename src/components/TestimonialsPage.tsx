import React, { useState, useEffect } from 'react';
import { getApprovedTestimonials, getTestimonialById } from '../lib/supabase';
import { Testimonial } from '../types';
import { TestimonialCard } from './TestimonialCard';
import { ShareTestimonialModal } from './ShareTestimonialModal';
import {
  MessageSquareQuote,
  Star,
  ArrowRight,
  Sparkles,
  Filter,
  ShieldCheck,
  Search,
  ArrowLeft,
  Share2,
  Calendar,
  Building2,
  Quote,
  CheckCheck,
  Copy,
} from 'lucide-react';

interface TestimonialsPageProps {
  onNavigate: (pathOrSection: string) => void;
  singleTestimonialId?: string | null;
}

export const TestimonialsPage: React.FC<TestimonialsPageProps> = ({
  onNavigate,
  singleTestimonialId,
}) => {
  const [approvedReviews, setApprovedReviews] = useState<Testimonial[]>([]);
  const [singleReview, setSingleReview] = useState<Testimonial | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterRating, setFilterRating] = useState<number | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sharingItem, setSharingItem] = useState<Testimonial | null>(null);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        if (singleTestimonialId) {
          const single = await getTestimonialById(singleTestimonialId);
          if (single) {
            setSingleReview(single);
          }
        }
        const data = await getApprovedTestimonials();
        setApprovedReviews(data);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [singleTestimonialId]);

  const filteredTestimonials = approvedReviews.filter((item) => {
    if (filterRating !== 'all' && item.rating !== filterRating) return false;

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = (item.full_name || item.name || '').toLowerCase().includes(q);
      const matchCompany = (item.company || '').toLowerCase().includes(q);
      const matchRole = (item.role || '').toLowerCase().includes(q);
      const matchReview = (item.review || item.quote || '').toLowerCase().includes(q);
      return matchName || matchCompany || matchRole || matchReview;
    }

    return true;
  });

  // Calculate Rating Statistics Breakdown
  const totalApproved = approvedReviews.length;
  const avgScore =
    totalApproved > 0
      ? (
          approvedReviews.reduce((sum, r) => sum + (r.rating || 5), 0) / totalApproved
        ).toFixed(1)
      : '5.0';

  const fiveStarCount = approvedReviews.filter((r) => r.rating === 5).length;
  const fiveStarPercent = totalApproved > 0 ? Math.round((fiveStarCount / totalApproved) * 100) : 100;

  // Single review spotlight view
  const activeSpotlight =
    singleReview ||
    (singleTestimonialId
      ? approvedReviews.find((r) => String(r.id) === String(singleTestimonialId))
      : null);

  const handleCopySpotlightLink = () => {
    if (!activeSpotlight) return;
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden min-h-screen">
      {/* Ambient background glows */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-40 left-0 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* ── CASE A: INDIVIDUAL SPOTLIGHT TESTIMONIAL VIEW ───────── */}
        {activeSpotlight ? (
          <div className="max-w-4xl mx-auto space-y-8 pt-4">
            {/* Back button */}
            <button
              onClick={() => onNavigate('/testimonials')}
              className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to all testimonials</span>
            </button>

            {/* Spotlight Card */}
            <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-sky-500/30 shadow-2xl relative overflow-hidden bg-slate-950/90 space-y-8">
              <div className="absolute top-0 right-0 w-80 h-80 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

              {/* Top Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6 relative z-10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/30 text-xs font-bold uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Verified Client Endorsement</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{activeSpotlight.date || 'Recent'}</span>
                  </span>

                  <button
                    onClick={handleCopySpotlightLink}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      linkCopied
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {linkCopied ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Link copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Client Profile Header */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 relative z-10 text-center sm:text-left">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-sky-400/80 bg-slate-900 flex items-center justify-center flex-shrink-0 shadow-lg">
                  {activeSpotlight.photo_url || activeSpotlight.image || activeSpotlight.avatar ? (
                    <img
                      src={activeSpotlight.photo_url || activeSpotlight.image || activeSpotlight.avatar || ''}
                      alt={activeSpotlight.full_name || activeSpotlight.name || 'Client'}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xl">
                      {(activeSpotlight.full_name || activeSpotlight.name || 'PX')
                        .split(' ')
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="space-y-1.5 flex-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {activeSpotlight.full_name || activeSpotlight.name}
                  </h1>

                  {(activeSpotlight.role || activeSpotlight.company) && (
                    <p className="text-sm text-sky-400 font-semibold flex items-center justify-center sm:justify-start gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span>
                        {activeSpotlight.role} {activeSpotlight.role && activeSpotlight.company ? 'at' : ''} {activeSpotlight.company}
                      </span>
                    </p>
                  )}

                  {/* Rating */}
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-amber-400 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-5 h-5 ${
                          s <= (activeSpotlight.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'fill-slate-800 text-slate-700'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-semibold text-slate-400 ml-2 font-mono">
                      {activeSpotlight.rating || 5}.0 / 5.0 Rating
                    </span>
                  </div>
                </div>
              </div>

              {/* Quote Content */}
              <div className="relative z-10 p-6 sm:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                <Quote className="w-8 h-8 text-sky-400/40 fill-current" />
                <p className="text-slate-100 text-lg sm:text-xl leading-relaxed italic font-normal">
                  "{activeSpotlight.review || activeSpotlight.quote}"
                </p>
              </div>

              {/* Bottom Actions Toolbar */}
              <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setSharingItem(activeSpotlight)}
                  className="px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-lg shadow-sky-500/20 transition-all cursor-pointer flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share This Testimonial</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/testimonials/submit')}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Share Your Own Experience →</span>
                </button>
              </div>
            </div>

            {/* Other Testimonials Grid */}
            {approvedReviews.filter((r) => String(r.id) !== String(activeSpotlight.id)).length > 0 && (
              <div className="pt-12 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <h2 className="text-xl font-bold text-white">More Client Endorsements</h2>
                  <button
                    onClick={() => onNavigate('/testimonials')}
                    className="text-xs text-sky-400 hover:text-sky-300 font-semibold cursor-pointer"
                  >
                    View All →
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {approvedReviews
                    .filter((r) => String(r.id) !== String(activeSpotlight.id))
                    .slice(0, 4)
                    .map((item, idx) => (
                      <TestimonialCard key={item.id} testimonial={item} index={idx} />
                    ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── CASE B: STANDARD TESTIMONIALS LISTING VIEW ───────── */
          <>
            {/* HERO SECTION */}
            <div className="text-center max-w-4xl mx-auto space-y-6 pt-6 pb-12">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-sky-500/30 text-xs sm:text-sm font-semibold text-sky-400 shadow-lg shadow-sky-500/5">
                <MessageSquareQuote className="w-4 h-4" />
                <span>Client Experiences</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
                What Our <span className="gradient-text">Clients Say</span>
              </h1>

              <p className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                Real experiences from people and organizations we've had the opportunity to work with.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('/testimonials/submit')}
                  className="px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 transition-all cursor-pointer inline-flex items-center gap-2 group transform active:scale-95"
                >
                  <span>Share Your Experience</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* BODY: SKELETON / ZERO-STATE / REVIEWS GRID */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4 animate-pulse bg-slate-900/50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-slate-800" />
                      <div className="space-y-2 flex-1">
                        <div className="h-4 bg-slate-800 rounded w-3/4" />
                        <div className="h-3 bg-slate-800 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-3 bg-slate-800 rounded w-1/3" />
                    <div className="space-y-2 pt-2">
                      <div className="h-3 bg-slate-800 rounded w-full" />
                      <div className="h-3 bg-slate-800 rounded w-5/6" />
                    </div>
                  </div>
                ))}
              </div>
            ) : approvedReviews.length === 0 ? (
              <div className="max-w-3xl mx-auto">
                <div className="glass-panel rounded-3xl border border-slate-800 p-10 sm:p-16 text-center shadow-2xl relative overflow-hidden bg-slate-950/80">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center justify-center">
                      <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-sky-500/20 via-indigo-500/20 to-purple-500/20 border border-sky-500/30 flex items-center justify-center shadow-xl">
                        <MessageSquareQuote className="w-10 h-10 text-sky-400" />
                      </div>
                    </div>

                    <div className="space-y-4 max-w-xl mx-auto">
                      <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                        Be One of Our First Voices
                      </h2>
                      <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                        We're building meaningful technology and lasting relationships. If you've worked with PioneerX Labs, we'd love to hear about your experience.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate('/testimonials/submit')}
                        className="px-8 py-4 text-base font-semibold text-white rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-xl shadow-sky-500/25 hover:shadow-sky-500/40 transition-all cursor-pointer inline-flex items-center gap-2 group transform active:scale-95"
                      >
                        <span>Share Your Experience</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Rating Summary Breakdown Card */}
                <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl mb-10 bg-slate-950/80 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className="text-center">
                      <div className="text-4xl sm:text-5xl font-extrabold text-white font-mono">{avgScore}</div>
                      <div className="flex items-center justify-center gap-1 text-amber-400 mt-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-4 h-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[11px] text-slate-400 font-medium mt-1 block">Average Rating</span>
                    </div>

                    <div className="h-12 w-[1px] bg-slate-800 hidden sm:block" />

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                        <ShieldCheck className="w-4 h-4 text-sky-400" />
                        <span>{fiveStarPercent}% Satisfaction & 5-Star Reviews</span>
                      </div>
                      <p className="text-xs text-slate-400">
                        Based on {totalApproved} verified client endorsement{totalApproved !== 1 ? 's' : ''}.
                      </p>
                    </div>
                  </div>

                  {/* Quick Search */}
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search reviews by name or company..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none placeholder:text-slate-600"
                    />
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 border-b border-slate-800/80 pb-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-sky-400" />
                    <span className="text-sm font-semibold text-slate-200">
                      Showing {filteredTestimonials.length} Verified Review{filteredTestimonials.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
                    <span className="text-xs text-slate-400 font-medium flex items-center gap-1 mr-2">
                      <Filter className="w-3.5 h-3.5" /> Filter:
                    </span>
                    <button
                      onClick={() => setFilterRating('all')}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        filterRating === 'all'
                          ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                          : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      All Reviews ({approvedReviews.length})
                    </button>
                    <button
                      onClick={() => setFilterRating(5)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1 ${
                        filterRating === 5
                          ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                          : 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                      }`}
                    >
                      <span>5 Stars</span>
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    </button>
                  </div>
                </div>

                {/* Testimonials Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredTestimonials.map((item, idx) => (
                    <TestimonialCard key={item.id} testimonial={item} index={idx} />
                  ))}
                </div>
              </>
            )}

            {/* BOTTOM TESTIMONIAL CTA */}
            <div className="mt-24 max-w-4xl mx-auto text-center">
              <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative overflow-hidden shadow-2xl bg-slate-950/80">
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-sky-500/15 via-indigo-500/10 to-purple-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 space-y-5">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold border border-sky-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Client Partnership</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
                    Worked With PioneerX Labs?
                  </h2>

                  <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed font-normal">
                    We'd love to hear about your experience.
                  </p>

                  <div className="pt-3">
                    <button
                      onClick={() => onNavigate('/testimonials/submit')}
                      className="px-8 py-3.5 text-sm sm:text-base font-semibold text-white rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/40 transition-all cursor-pointer inline-flex items-center gap-2 group"
                    >
                      <span>Leave a Review →</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

      </div>

      {/* Share Modal (spotlight support) */}
      <ShareTestimonialModal
        testimonial={sharingItem}
        isOpen={Boolean(sharingItem)}
        onClose={() => setSharingItem(null)}
      />
    </div>
  );
};
