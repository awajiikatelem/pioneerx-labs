import React, { useState } from 'react';
import { EventItem } from '../../types';
import { X, Calendar, Clock, MapPin, User, CheckCircle2 } from 'lucide-react';

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-slate-800 relative shadow-2xl space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider px-2.5 py-1 rounded bg-sky-500/10 border border-sky-500/20">
            {event.type}
          </span>
          <h2 className="text-2xl font-extrabold text-white pt-1">{event.title}</h2>
          <p className="text-xs text-slate-300">{event.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-900/80 p-4 rounded-2xl border border-slate-800">
          <div className="flex items-center gap-2 text-slate-300">
            <Calendar className="w-4 h-4 text-sky-400" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-4 h-4 text-amber-400" />
            <span>{event.speakerOrHost}</span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {event.description}
        </p>

        {event.registrationOpen ? (
          submitted ? (
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Registration Confirmed!</h4>
              <p className="text-xs text-slate-300">
                We sent your calendar invite & access pass to <span className="text-emerald-400 font-semibold">{formData.email}</span>.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase text-slate-400">Register Free Pass</h4>
              <input
                type="text"
                required
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
              />
              <input
                type="email"
                required
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all shadow-lg shadow-sky-500/20 cursor-pointer"
              >
                Confirm Free Registration
              </button>
            </form>
          )
        ) : (
          <div className="p-3 bg-slate-900 rounded-xl text-center text-xs text-slate-400 border border-slate-800">
            Registration closed for past event. Stay tuned for upcoming webinars!
          </div>
        )}

      </div>
    </div>
  );
};
