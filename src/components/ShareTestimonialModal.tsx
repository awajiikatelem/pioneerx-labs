import React, { useState, useEffect, useRef } from 'react';
import { Testimonial } from '../types';
import {
  generateTestimonialCaption,
  generateWhatsAppCaption,
  generateLinkedInCaption,
  generateXCaption,
  generateInstagramCaption,
  getTestimonialUrl,
  getSocialShareUrls,
  shareNative,
  downloadTestimonialGraphic,
  renderTestimonialGraphic,
} from '../lib/socialSharing';
import {
  X,
  Copy,
  CheckCheck,
  Download,
  Share2,
  MessageCircle,
  Sparkles,
  Star,
  Quote,
  Smartphone,
  Globe,
} from 'lucide-react';

const TwitterXIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`${className} fill-current`} viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface ShareTestimonialModalProps {
  testimonial: Testimonial | null;
  isOpen: boolean;
  onClose: () => void;
}

type PlatformTab = 'general' | 'whatsapp' | 'linkedin' | 'x' | 'instagram';

export const ShareTestimonialModal: React.FC<ShareTestimonialModalProps> = ({
  testimonial,
  isOpen,
  onClose,
}) => {
  const [selectedPlatform, setSelectedPlatform] = useState<PlatformTab>('general');
  const [captionCopied, setCaptionCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [nativeShareAvailable, setNativeShareAvailable] = useState(false);
  const [nativeShareSuccess, setNativeShareSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && !!navigator.share) {
      setNativeShareAvailable(true);
    }
  }, []);

  // Re-render canvas preview when testimonial changes or modal opens
  useEffect(() => {
    if (isOpen && testimonial && canvasRef.current) {
      renderTestimonialGraphic(canvasRef.current, testimonial).catch((err) => {
        console.warn('Canvas render error in modal preview:', err);
      });
    }
  }, [isOpen, testimonial]);

  if (!isOpen || !testimonial) return null;

  const displayName = (testimonial.full_name || testimonial.name || 'Client').trim();
  const photo = testimonial.photo_url || testimonial.image || testimonial.avatar;
  const rating = testimonial.rating || 5;
  const quote = testimonial.review || testimonial.quote || '';
  const testimonialUrl = getTestimonialUrl(testimonial);
  const shareUrls = getSocialShareUrls(testimonial);

  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase() || 'PX';

  // Get active platform's dynamic caption
  let activeCaption = '';
  switch (selectedPlatform) {
    case 'whatsapp':
      activeCaption = generateWhatsAppCaption(testimonial);
      break;
    case 'linkedin':
      activeCaption = generateLinkedInCaption(testimonial);
      break;
    case 'x':
      activeCaption = generateXCaption(testimonial);
      break;
    case 'instagram':
      activeCaption = generateInstagramCaption(testimonial);
      break;
    case 'general':
    default:
      activeCaption = generateTestimonialCaption(testimonial);
      break;
  }

  // Copy Caption Handler
  const handleCopyCaption = (customText?: string) => {
    const textToCopy = customText || activeCaption;
    navigator.clipboard.writeText(textToCopy).catch(() => {});
    setCaptionCopied(true);
    setTimeout(() => setCaptionCopied(false), 2500);
  };

  // Copy Permalink Handler
  const handleCopyLink = () => {
    navigator.clipboard.writeText(testimonialUrl).catch(() => {});
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  // Download Graphic Handler
  const handleDownloadGraphic = async () => {
    setIsGeneratingImage(true);
    try {
      await downloadTestimonialGraphic(testimonial);
    } catch (err) {
      console.error('Failed to generate/download image:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Native Device Share Handler
  const handleNativeShare = async () => {
    const res = await shareNative(testimonial);
    if (res.success) {
      setNativeShareSuccess(true);
      setTimeout(() => setNativeShareSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="w-full max-w-4xl glass-panel rounded-3xl border border-slate-800/90 shadow-2xl bg-slate-950 relative overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Ambient Top Gradient Border */}
        <div className="h-1.5 w-full bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 flex-shrink-0" />

        {/* Modal Header */}
        <div className="px-6 py-5 sm:px-8 border-b border-slate-800/80 flex items-center justify-between flex-shrink-0 bg-slate-900/50">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20">
                <Share2 className="w-4 h-4" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Share This Testimonial
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Generate branded graphics, dynamic social captions, and share endorsements across platforms.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ── LEFT COLUMN: 1080x1080 BRANDED GRAPHIC PREVIEW ── */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>Branded Graphic Preview</span>
                </span>
                <span className="text-[11px] font-mono text-slate-400">1080 × 1080 Square</span>
              </div>

              {/* Realistic Visual Post Card */}
              <div className="relative rounded-2xl overflow-hidden border border-sky-500/30 bg-gradient-to-br from-[#07090E] via-[#0B0F19] to-[#07090E] p-5 shadow-2xl group flex flex-col justify-between aspect-square text-center">
                {/* Ambient glow in preview */}
                <div className="absolute -top-10 -left-10 w-36 h-36 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute -bottom-10 -right-10 w-36 h-36 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

                {/* Header: PioneerX Labs Brand Bar */}
                <div className="relative z-10 space-y-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400 text-[9px] font-bold tracking-widest uppercase">
                    Verified Client Review
                  </div>
                  <div className="text-base font-black text-white tracking-tight">
                    PIONEERX LABS
                  </div>
                </div>

                {/* Quote Icon & Text */}
                <div className="relative z-10 my-auto px-2 space-y-2">
                  <div className="flex justify-center text-sky-400/40">
                    <Quote className="w-6 h-6 fill-current" />
                  </div>
                  <p className="text-slate-200 text-xs sm:text-[13px] leading-relaxed italic line-clamp-4 font-normal">
                    "{quote}"
                  </p>

                  {/* Star Rating */}
                  <div className="flex items-center justify-center gap-1 text-amber-400 pt-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= rating ? 'fill-amber-400 text-amber-400' : 'fill-slate-800 text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Client Avatar & Info */}
                <div className="relative z-10 pt-2 border-t border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-center gap-2.5">
                    <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-sky-400/80 bg-slate-900 flex items-center justify-center flex-shrink-0 shadow">
                      {photo && !imgError ? (
                        <img
                          src={photo}
                          alt={displayName}
                          onError={() => setImgError(true)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-sky-600 to-indigo-700 flex items-center justify-center text-white font-bold text-xs">
                          {initials}
                        </div>
                      )}
                    </div>
                    <div className="text-left min-w-0">
                      <div className="text-xs font-bold text-white truncate max-w-[170px]">{displayName}</div>
                      {(testimonial.role || testimonial.company) && (
                        <div className="text-[10px] text-slate-400 truncate max-w-[170px]">
                          {testimonial.role} {testimonial.role && testimonial.company ? '•' : ''} {testimonial.company}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="text-[10px] text-sky-400/90 font-mono tracking-wide">
                    pioneerx-labs.vercel.app
                  </div>
                </div>
              </div>

              {/* Download Graphic Button */}
              <button
                type="button"
                onClick={handleDownloadGraphic}
                disabled={isGeneratingImage}
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-sky-400 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 transition-all duration-200 cursor-pointer shadow-lg shadow-sky-500/20 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-60"
              >
                <Download className="w-4 h-4" />
                <span>{isGeneratingImage ? 'Rendering Graphic...' : 'Download Social Image (1080×1080)'}</span>
              </button>

              {/* Hidden canvas for high-res generation */}
              <canvas ref={canvasRef} className="hidden" />
            </div>

            {/* ── RIGHT COLUMN: CAPTIONS & PLATFORM SHARING ── */}
            <div className="lg:col-span-7 space-y-6">

              {/* Platform Selector Tabs */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Select Platform Caption
                </span>
                <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('general')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedPlatform === 'general'
                        ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20 font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    General
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('whatsapp')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedPlatform === 'whatsapp'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold'
                        : 'text-slate-400 hover:text-emerald-400 hover:bg-slate-800/60'
                    }`}
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('linkedin')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedPlatform === 'linkedin'
                        ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20 font-bold'
                        : 'text-slate-400 hover:text-sky-400 hover:bg-slate-800/60'
                    }`}
                  >
                    <LinkedInIcon className="w-3.5 h-3.5" />
                    <span>LinkedIn</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('x')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedPlatform === 'x'
                        ? 'bg-slate-100 text-slate-950 shadow-md font-bold'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <TwitterXIcon className="w-3.5 h-3.5" />
                    <span>X</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedPlatform('instagram')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedPlatform === 'instagram'
                        ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md font-bold'
                        : 'text-slate-400 hover:text-pink-400 hover:bg-slate-800/60'
                    }`}
                  >
                    <InstagramIcon className="w-3.5 h-3.5" />
                    <span>Instagram</span>
                  </button>
                </div>
              </div>

              {/* Dynamic Caption Box */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Generated Caption
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyCaption()}
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-lg transition-all cursor-pointer ${
                      captionCopied
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 border border-sky-500/30'
                    }`}
                  >
                    {captionCopied ? (
                      <>
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Caption copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Caption</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="relative">
                  <textarea
                    rows={5}
                    readOnly
                    value={activeCaption}
                    className="w-full p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 font-sans leading-relaxed resize-none focus:outline-none focus:border-sky-500 select-all"
                  />
                </div>
              </div>

              {/* One-Click Direct Sharing Actions */}
              <div className="space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                  Quick Share Actions
                </span>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {/* WhatsApp */}
                  <a
                    href={shareUrls.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 hover:text-emerald-300 transition-all text-xs font-semibold gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </a>

                  {/* X / Twitter */}
                  <a
                    href={shareUrls.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white transition-all text-xs font-semibold gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <TwitterXIcon className="w-5 h-5" />
                    <span>Share on X</span>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={shareUrls.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-sky-600/10 hover:bg-sky-600/20 border border-sky-600/30 text-sky-400 hover:text-sky-300 transition-all text-xs font-semibold gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                    <span>LinkedIn</span>
                  </a>

                  {/* Facebook */}
                  <a
                    href={shareUrls.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 hover:text-indigo-300 transition-all text-xs font-semibold gap-1.5 cursor-pointer shadow-sm hover:scale-[1.02]"
                  >
                    <FacebookIcon className="w-5 h-5" />
                    <span>Facebook</span>
                  </a>
                </div>
              </div>

              {/* Instagram Specific Workflow Box */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-indigo-500/10 border border-pink-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <InstagramIcon className="w-4 h-4 text-pink-400" />
                    <span className="text-xs font-bold text-pink-300 uppercase tracking-wider">
                      Instagram Posting Guide
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400">Manual publish</span>
                </div>

                <ol className="text-xs text-slate-300 space-y-1.5 pl-4 list-decimal marker:text-pink-400">
                  <li>Click <strong>Download Social Image</strong> above (1080×1080 graphic).</li>
                  <li>Click <strong>Copy Caption for Instagram</strong> below.</li>
                  <li>Open Instagram app / web, upload image, and paste caption.</li>
                </ol>

                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleCopyCaption(generateInstagramCaption(testimonial))}
                    className="flex-1 py-2 px-3 rounded-xl bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-200 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Caption for Instagram</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleDownloadGraphic}
                    className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Image</span>
                  </button>
                </div>
              </div>

              {/* Direct Permalink & Native Share Toolbar */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <div className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-sky-300 truncate">
                    {testimonialUrl}
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 flex-shrink-0 ${
                      linkCopied
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
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

                {/* Native Device Share (when supported) */}
                {nativeShareAvailable && (
                  <button
                    type="button"
                    onClick={handleNativeShare}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/40 text-sky-300 flex items-center gap-1.5 cursor-pointer transition-all flex-shrink-0"
                    title="Share via device applications"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>{nativeShareSuccess ? 'Shared!' : 'Share via Device'}</span>
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 sm:px-8 border-t border-slate-800/80 bg-slate-900/40 flex items-center justify-between flex-shrink-0">
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-sky-400" />
            <span>PioneerX Labs Approved Review Sharing</span>
          </span>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 cursor-pointer transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
