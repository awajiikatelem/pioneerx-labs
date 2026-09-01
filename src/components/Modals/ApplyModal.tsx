import React, { useState } from 'react';
import { CareerRole } from '../../types';
import { X, Upload, CheckCircle2, Briefcase, FileText } from 'lucide-react';

interface ApplyModalProps {
  role: CareerRole | null;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ role, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', github: '', portfolio: '', notes: '' });

  if (!role) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto">
      <div className="glass-panel w-full max-w-2xl rounded-3xl p-6 sm:p-8 border border-slate-800 relative shadow-2xl space-y-6 my-8">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20">
            {role.department} • {role.type}
          </span>
          <h2 className="text-2xl font-extrabold text-white pt-2">{role.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{role.location}</p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-bold text-white">Application Received!</h3>
            <p className="text-sm text-slate-300">
              Thank you for applying to PioneerX Labs, <span className="text-emerald-400 font-semibold">{formData.name}</span>. 
              Our talent team will review your submission and contact you via <span className="text-white font-medium">{formData.email}</span> within 48 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Rivera"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@domain.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">GitHub / Code Profile</label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={formData.github}
                  onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Portfolio / Live URL</label>
                <input
                  type="url"
                  placeholder="https://yourportfolio.dev"
                  value={formData.portfolio}
                  onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Resume Upload Simulation */}
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Upload Resume (PDF / DOCX)</label>
              <label className="flex items-center justify-center gap-2 p-4 rounded-xl bg-slate-900 border border-dashed border-slate-700 hover:border-sky-500 cursor-pointer transition-colors text-xs text-slate-300">
                <Upload className="w-4 h-4 text-sky-400" />
                <span>{fileName ? `File Selected: ${fileName}` : 'Drag & Drop or Click to Select File'}</span>
                <input type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" className="hidden" />
              </label>
            </div>

            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Why PioneerX Labs?</label>
              <textarea
                rows={3}
                placeholder="Tell us about a project you built or why you want to join our squad..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs text-slate-950 bg-gradient-to-r from-sky-400 to-indigo-300 hover:from-sky-300 hover:to-indigo-200 transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
            >
              Submit Application to PioneerX
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
