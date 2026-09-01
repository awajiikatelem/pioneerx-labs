import React, { useState } from 'react';
import { Star, Quote, Calendar, Building2, ShieldCheck } from 'lucide-react';
import { Testimonial } from '../types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, index = 0 }) => {
  const [imgError, setImgError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const displayName = testimonial.full_name || testimonial.name || 'Client';
  const displayPhoto = testimonial.photo_url || testimonial.image || testimonial.avatar;
  const displayReview = testimonial.review || testimonial.quote || '';

  // Company logo domain extraction
  const rawCompany = (testimonial.company || '').trim();
  const companyDomain = rawCompany.includes('.')
    ? rawCompany.split(' ').find((w) => w.includes('.')) || rawCompany
    : rawCompany
    ? `${rawCompany.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`
    : '';

  const faviconUrl = companyDomain
    ? `https://www.google.com/s2/favicons?domain=${companyDomain}&sz=64`
    : null;

  // Get initials for elegant fallback
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'PX';

  return (
    <div
      className="glass-card rounded-2xl p-6 sm:p-7 border border-slate-800/80 hover:border-sky-500/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-sky-500/10 flex flex-col justify-between relative group overflow-hidden bg-slate-950/60"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Top Ambient Glow on Hover */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/15 transition-all duration-500 pointer-events-none" />

      <div>
        {/* Header: Photo, Name, Role & Company */}
        <div className="flex items-start gap-4 mb-5">
          <div className="relative flex-shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-slate-700/80 group-hover:border-sky-400/60 transition-colors shadow-md bg-slate-900 flex items-center justify-center">
              {displayPhoto && !imgError ? (
                <img
                  src={displayPhoto}
                  alt={displayName}
                  onError={() => setImgError(true)}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white font-bold text-base tracking-wider">
                  {initials}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-sky-500 text-slate-950 flex items-center justify-center border border-slate-900 shadow">
              <Quote className="w-2.5 h-2.5 fill-slate-950" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-white text-base sm:text-lg tracking-tight group-hover:text-sky-300 transition-colors truncate">
              {displayName}
            </h3>
            {testimonial.role && (
              <p className="text-xs font-semibold text-sky-400 truncate mt-0.5">
                {testimonial.role}
              </p>
            )}
            {testimonial.company && (
              <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5 truncate">
                {faviconUrl && !logoError ? (
                  <img
                    src={faviconUrl}
                    alt=""
                    onError={() => setLogoError(true)}
                    className="w-3.5 h-3.5 rounded-sm object-contain flex-shrink-0 bg-white/10 p-0.5"
                  />
                ) : (
                  <Building2 className="w-3 h-3 text-slate-500 flex-shrink-0" />
                )}
                <span className="truncate">{testimonial.company}</span>
              </p>
            )}
          </div>
        </div>

        {/* Rating Stars */}
        <div className="flex items-center gap-1 mb-4 text-amber-400">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= testimonial.rating
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-slate-800 text-slate-700'
              }`}
            />
          ))}
          <span className="text-xs font-semibold text-slate-400 ml-1.5 font-mono">
            {testimonial.rating}.0
          </span>
        </div>

        {/* Review Text */}
        <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic relative z-10 font-normal">
          "{displayReview}"
        </p>

        {/* Optional Key Result Highlight */}
        {testimonial.highlight && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-300 text-[11px] font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span>{testimonial.highlight}</span>
          </div>
        )}
      </div>

      {/* Footer: Date & Verified Partner Tag */}
      <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
        <div className="flex items-center gap-1 text-slate-400">
          <Calendar className="w-3.5 h-3.5 text-slate-500" />
          <span>{testimonial.date || 'Client Review'}</span>
        </div>
        <span className="text-sky-400/90 font-semibold bg-sky-500/10 px-2.5 py-0.5 rounded-full border border-sky-500/20 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-sky-400" />
          <span>Verified Partner</span>
        </span>
      </div>
    </div>
  );
};
