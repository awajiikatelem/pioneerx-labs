import React, { useState, useEffect } from 'react';
import { getApprovedTestimonials } from '../lib/supabase';
import { Testimonial } from '../types';
import { MessageSquareQuote, Star, ChevronLeft, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';

interface TestimonialsProps {
  onNavigate?: (path: string) => void;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onNavigate }) => {
  const [approvedReviews, setApprovedReviews] = useState<Testimonial[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    async function loadTestimonials() {
      try {
        const data = await getApprovedTestimonials();
        setApprovedReviews(data);
      } catch (err) {
        console.error('Error fetching homepage testimonials:', err);
      }
    }
    loadTestimonials();
  }, []);

  // Hide homepage section completely when zero approved reviews exist
  if (approvedReviews.length === 0) return null;

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % approvedReviews.length);
    setImgError(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + approvedReviews.length) % approvedReviews.length);
    setImgError(false);
  };

  const current = approvedReviews[currentIndex];
  const displayName = current.full_name || current.name || 'Client';
  const displayPhoto = current.photo_url || current.image || current.avatar;
  const displayReview = current.review || current.quote || '';

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'PX';

  const handleViewAll = () => {
    if (onNavigate) {
      onNavigate('/testimonials');
    }
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
            <MessageSquareQuote className="w-3.5 h-3.5" />
            <span>Client Endorsements</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            What Leaders Say About <span className="gradient-text">PioneerX</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Hear directly from executives, founders, and engineers who have partnered with our team.
          </p>
        </div>

        {/* Carousel */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-800 relative shadow-2xl overflow-hidden bg-slate-950/80">
            <div className="absolute top-0 right-0 w-72 h-72 bg-sky-500/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">

              {/* Avatar & Info */}
              <div className="flex flex-col items-center text-center md:items-start md:text-left flex-shrink-0 space-y-3">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-sky-500/40 shadow-xl bg-slate-900 flex items-center justify-center">
                  {displayPhoto && !imgError ? (
                    <img
                      src={displayPhoto}
                      alt={displayName}
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xl">
                      {initials}
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">{displayName}</h3>
                  {current.role && <p className="text-xs text-sky-400 font-semibold">{current.role}</p>}
                  {current.company && <p className="text-xs text-slate-400">{current.company}</p>}
                </div>

                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(current.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote Body */}
              <div className="flex-1 space-y-4 text-center md:text-left border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-8">
                {current.highlight && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Key Result: {current.highlight}</span>
                  </div>
                )}

                <p className="text-slate-200 text-base sm:text-lg italic leading-relaxed">
                  "{displayReview}"
                </p>

                {/* Dot + Arrow Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                  <div className="flex items-center gap-2">
                    {approvedReviews.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setCurrentIndex(idx);
                          setImgError(false);
                        }}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentIndex ? 'w-8 bg-sky-400' : 'w-2 bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevTestimonial}
                      className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextTestimonial}
                      className="p-2.5 rounded-xl bg-slate-900 text-slate-300 hover:text-white border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* View All Link */}
          <div className="mt-8 text-center">
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-semibold text-sky-400 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 transition-all cursor-pointer group"
            >
              <span>Explore All Client Reviews & Testimonials</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
