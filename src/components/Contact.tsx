import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, MessageSquare, Send, CheckCircle2, Copy, Calendar, Clock, MapPin, Phone, Sparkles } from 'lucide-react';

interface ContactProps {
  initialSelectedServices?: string[];
  initialEstimatedBudget?: string;
}

export const Contact: React.FC<ContactProps> = ({
  initialSelectedServices = [],
  initialEstimatedBudget = ''
}) => {
  const contactEmail = 'pioneerxlab@gmail.com';
  const emailServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
  const emailTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
  const emailPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
  const [submitted, setSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    inquiryType: 'Client Project Inquiry',
    budget: initialEstimatedBudget || '$5,000 - $15,000',
    message: initialSelectedServices.length > 0
      ? `Interested in services: ${initialSelectedServices.join(', ')}.`
      : ''
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      company: form.company || 'Not provided',
      inquiry_type: form.inquiryType,
      budget: form.budget,
      message: form.message,
      to_email: contactEmail
    };

    const hasEmailConfig = Boolean(emailServiceId && emailTemplateId && emailPublicKey);

    try {
      if (hasEmailConfig) {
        await emailjs.send(emailServiceId, emailTemplateId, templateParams, emailPublicKey);
      } else {
        const subject = encodeURIComponent(`PioneerX Inquiry from ${form.name || 'New Client'}`);
        const body = encodeURIComponent(
          `Name: ${form.name}\n` +
          `Email: ${form.email}\n` +
          `Company: ${form.company || 'Not provided'}\n` +
          `Inquiry Type: ${form.inquiryType}\n` +
          `Project Scale: ${form.budget}\n\n` +
          `Project Overview:\n${form.message}`
        );

        window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      }

      setSubmitted(true);
    } catch (error) {
      console.error('Contact form submit failed:', error);
      const subject = encodeURIComponent(`PioneerX Inquiry from ${form.name || 'New Client'}`);
      const body = encodeURIComponent(
        `Name: ${form.name}\n` +
        `Email: ${form.email}\n` +
        `Company: ${form.company || 'Not provided'}\n` +
        `Inquiry Type: ${form.inquiryType}\n` +
        `Project Scale: ${form.budget}\n\n` +
        `Project Overview:\n${form.message}`
      );

      window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-208 h-112 bg-linear-to-r from-sky-500/10 via-indigo-500/10 to-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 text-sky-300 text-[10px] font-semibold uppercase tracking-[0.2em] border border-sky-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Start a conversation</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Let’s build your next <span className="gradient-text">strategic advantage</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Whether you’re launching a product, growing an operation, or exploring a new partnership,
            our team is ready to help shape a clear and confident next move.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel p-7 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Contact the team</h3>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-300 border border-sky-500/20">
                  <MessageSquare className="w-5 h-5" />
                </div>
              </div>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-500 block uppercase tracking-[0.18em]">Email</span>
                      <a href={`mailto:${contactEmail}`} className="font-semibold text-white hover:text-sky-300 transition-colors truncate block">
                        {contactEmail}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer border border-slate-700"
                    title="Copy Email"
                  >
                    {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase tracking-[0.18em]">Call</span>
                    <span className="font-semibold text-white">+(234) 9014279749</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-300">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase tracking-[0.18em]">Location</span>
                    <span className="font-semibold text-white">Bonny Island, Rivers State, Nigeria</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] text-slate-500 uppercase tracking-[0.18em]">Socials</span>
                  <div className="flex items-center gap-2">
                    <a
                      href="https://x.com/pioneerxlab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="PioneerX Labs on X"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <span>@pioneerxlab</span>
                    </a>
                    <a
                      href="https://www.instagram.com/pioneerxlabs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-pink-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      title="PioneerX Labs on Instagram"
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                      <span>@pioneerxlabs</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">What happens next</h3>
                <Clock className="w-5 h-5 text-sky-300" />
              </div>

              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500/10 text-sky-300 font-bold text-xs border border-sky-500/20">1</div>
                  <div>
                    <p className="font-medium text-white">Discovery review</p>
                    <p className="text-sm text-slate-400">We assess your goals, priorities, and timeline.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/10 text-violet-300 font-bold text-xs border border-violet-500/20">2</div>
                  <div>
                    <p className="font-medium text-white">Tailored recommendation</p>
                    <p className="text-sm text-slate-400">We propose the right solution, scope, and approach.</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-300 font-bold text-xs border border-emerald-500/20">3</div>
                  <div>
                    <p className="font-medium text-white">Project kickoff</p>
                    <p className="text-sm text-slate-400">Once aligned, we begin with a clear delivery roadmap.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 glass-panel p-7 sm:p-10 rounded-3xl border border-slate-800 shadow-2xl relative">
            {submitted ? (
              <div className="py-16 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Your inquiry has been received</h3>
                <p className="text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Thank you for reaching out, <span className="text-emerald-400 font-semibold">{form.name}</span>.
                  Our team has received your message and will respond to <span className="text-white font-medium">{form.email}</span> within 12 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 text-xs font-semibold text-slate-200 bg-slate-900 rounded-xl border border-slate-700 hover:text-white transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white">Tell us about your project</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Share a few details and we’ll follow up with a tailored response.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-sky-300" />
                    Response within 12 hours
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 block mb-1.5">Full name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Jane Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 block mb-1.5">Work email *</label>
                    <input
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 block mb-1.5">Company</label>
                    <input
                      type="text"
                      placeholder="Your company or organization"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 block mb-1.5">Inquiry type</label>
                    <select
                      value={form.inquiryType}
                      onChange={(e) => setForm({ ...form, inquiryType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                    >
                      <option>Client Project Inquiry</option>
                      <option>Investor / Partnership</option>
                      <option>Fellowship / Career Application</option>
                      <option>Media & Press Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 block mb-1.5">Project scale</label>
                  <select
                    value={form.budget}
                    onChange={(e) => setForm({ ...form, budget: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                  >
                    <option>Startup MVP Scope</option>
                    <option>Growth Business Platform</option>
                    <option>Enterprise Scale Architecture</option>
                    <option>Community / Initiative Development</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400 block mb-1.5">Project overview & goals *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your vision, timeline, challenges, and the outcomes you want to achieve..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-slate-900 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-sm text-slate-950 bg-linear-to-r from-sky-400 via-indigo-300 to-purple-300 hover:from-sky-300 hover:to-purple-200 transition-all shadow-xl shadow-sky-500/20 flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
