import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Star,
  Upload,
  CheckCircle2,
  ArrowLeft,
  Info,
  MessageSquarePlus,
  X,
  Loader2,
  ShieldCheck,
} from 'lucide-react';
import { uploadToCloudinary, validateImageFile } from '../lib/cloudinary';
import { submitTestimonial } from '../lib/supabase';

interface TestimonialsSubmitPageProps {
  onNavigate: (pathOrSection: string) => void;
}

export const TestimonialsSubmitPage: React.FC<TestimonialsSubmitPageProps> = ({ onNavigate }) => {
  // Form state
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [company, setCompany] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [review, setReview] = useState('');
  const [permission, setPermission] = useState(false);

  // Photo state & preview
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Submission & UI feedback state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Handle Photo selection & client-side validation
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg('');
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validation = validateImageFile(file);

      if (!validation.valid) {
        setErrorMsg(validation.error || 'Invalid image file.');
        if (fileInputRef.current) fileInputRef.current.value = '';
        return;
      }

      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    setPhotoFile(null);
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Validate Email helper
  const isValidEmail = (val: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    // Validation checks
    if (!fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      return;
    }

    if (!email.trim() || !isValidEmail(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (rating < 1 || rating > 5) {
      setErrorMsg('Please select a rating.');
      return;
    }

    if (!review.trim()) {
      setErrorMsg('Please write your review.');
      return;
    }

    if (!permission) {
      setErrorMsg('Please give permission before submitting.');
      return;
    }

    setIsSubmitting(true);
    let uploadedPhotoUrl: string | null = null;

    // Step 1: Upload image to Cloudinary if selected
    if (photoFile) {
      const uploadRes = await uploadToCloudinary(photoFile, (percent) => {
        setUploadProgress(percent);
      });

      if (!uploadRes.success) {
        setErrorMsg(uploadRes.error || 'Failed to upload photo. Please try again.');
        setIsSubmitting(false);
        setUploadProgress(null);
        return;
      }

      uploadedPhotoUrl = uploadRes.url || null;
    }

    // Step 2: Save review to Supabase database (status = 'pending')
    const dbRes = await submitTestimonial({
      full_name: fullName,
      email: email,
      role: position,
      company: company,
      rating: rating,
      review: review,
      photo_url: uploadedPhotoUrl,
      permission_granted: permission,
    });

    if (!dbRes.success) {
      setIsSubmitting(false);
      setUploadProgress(null);
      setErrorMsg(dbRes.error || 'Failed to submit review. Please try again.');
      return;
    }

    // Step 3: Send automated Email alert to PioneerX Labs team (pioneerxlab@gmail.com) via EmailJS
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';

      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: fullName,
            from_email: email,
            role: position || 'Client',
            company: company || 'Not specified',
            rating: `${rating} / 5 Stars`,
            message: `NEW TESTIMONIAL SUBMISSION AWAITING APPROVAL:\n\nClient Name: ${fullName}\nEmail: ${email}\nRole: ${position || 'N/A'}\nCompany: ${company || 'N/A'}\nRating: ${rating} / 5 Stars\nReview Text: "${review}"\n\nApprove via Admin Console: /admin/testimonials`,
            to_email: 'pioneerxlab@gmail.com',
          },
          publicKey
        );
      }
    } catch (emailErr) {
      console.warn('Team email notification alert notice:', emailErr);
    }

    setIsSubmitting(false);
    setUploadProgress(null);

    // Success — update UI state
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-24 relative overflow-hidden min-h-screen">
      {/* Ambient background glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-5 w-[450px] h-[450px] bg-indigo-500/10 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Back Navigation Link */}
        <button
          onClick={() => onNavigate('/testimonials')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-sky-400 mb-8 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Testimonials</span>
        </button>

        {/* Page Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold border border-sky-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>PioneerX Client Feedback</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Share Your <span className="gradient-text">Experience</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Your feedback helps us grow and helps others understand what it's like to work with PioneerX Labs.
          </p>
        </div>

        {/* ── SUCCESS STATE ─────────────────────────────────────── */}
        {submitted ? (
          <div className="p-8 sm:p-12 glass-panel rounded-3xl border border-emerald-500/40 text-center space-y-6 shadow-2xl bg-slate-950/90 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-3 max-w-lg mx-auto">
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
                Thank You!
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Thank you for taking the time to share your experience with PioneerX Labs. Your testimonial has been received and will be reviewed by our team before publication.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('/testimonials')}
                className="px-8 py-3.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-xl shadow-sky-500/25 transition-all cursor-pointer"
              >
                Back to Testimonials →
              </button>
            </div>
          </div>
        ) : (
          /* ── REVIEW FORM ───────────────────────────────────────── */
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-10 glass-panel rounded-3xl border border-slate-800 shadow-2xl space-y-6 bg-slate-950/70"
          >
            {/* Error Message Box */}
            {errorMsg && (
              <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs sm:text-sm flex items-center gap-2 animate-in fade-in">
                <Info className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name (Required) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Email Address (Required - Never exposed publicly) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Email Address <span className="text-rose-400">*</span>
                  <span className="text-[10px] text-slate-500 font-normal lowercase ml-1">(private)</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Position / Role (Optional) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Position / Role <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. CTO & Co-Founder"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-600"
                />
              </div>

              {/* Company / Organization (Optional) */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                  Company / Organization <span className="text-slate-500 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. InnovateTech Solutions"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none transition-all placeholder:text-slate-600"
                />
              </div>
            </div>

            {/* Rating (1-5 stars - Required) */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Rating <span className="text-rose-400">*</span>
              </label>
              <div className="flex items-center gap-2 bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 w-fit">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    className="p-1 hover:scale-125 transition-transform cursor-pointer focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= (hoverRating ?? rating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-slate-800 text-slate-700'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-sm font-bold text-amber-400 ml-2 font-mono">
                  {hoverRating ?? rating} / 5 Stars
                </span>
              </div>
            </div>

            {/* Profile Photo (Optional) */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Profile Photo <span className="text-slate-500 font-normal">(Optional)</span>
              </label>

              {photoPreview ? (
                <div className="flex items-center gap-4 bg-slate-900 p-3.5 rounded-xl border border-slate-800 w-fit">
                  <img
                    src={photoPreview}
                    alt="Profile Preview"
                    className="w-14 h-14 rounded-xl object-cover border border-sky-500/40 shadow"
                  />
                  <div className="space-y-1">
                    <p className="text-xs text-slate-300 font-medium truncate max-w-[200px]">
                      {photoFile?.name}
                    </p>
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer font-semibold"
                    >
                      <X className="w-3.5 h-3.5" /> Remove photo
                    </button>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/jpg"
                    onChange={handlePhotoChange}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-900 border border-dashed border-slate-700 hover:border-sky-500/60 text-slate-300 text-xs font-semibold cursor-pointer transition-all w-full sm:w-auto inline-flex"
                  >
                    <Upload className="w-4 h-4 text-sky-400" />
                    <span>Select Photo from Device (JPG, PNG, WEBP — Max 5MB)</span>
                  </label>
                </div>
              )}
            </div>

            {/* Your Review (Required) */}
            <div className="space-y-2 pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300">
                Review <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={5}
                placeholder="Tell us about your experience working with PioneerX Labs..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none transition-all placeholder:text-slate-600 leading-relaxed"
              />
            </div>

            {/* Permission Checkbox (Required) */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  required
                  checked={permission}
                  onChange={(e) => setPermission(e.target.checked)}
                  className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-950 cursor-pointer flex-shrink-0"
                />
                <span className="text-xs sm:text-sm text-slate-300 group-hover:text-white transition-colors leading-relaxed">
                  I give PioneerX Labs permission to publish my name, profile photo, company information, and testimonial on its website and marketing materials.
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-slate-800">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white rounded-xl bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-xl shadow-sky-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 group transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    <span>Submitting... {uploadProgress !== null ? `(${uploadProgress}%)` : ''}</span>
                  </>
                ) : (
                  <>
                    <MessageSquarePlus className="w-5 h-5" />
                    <span>Submit My Testimonial</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
