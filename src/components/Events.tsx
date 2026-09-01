import React, { useState } from 'react';
import { EVENTS_DATA } from '../data/events';
import { EventModal } from './Modals/EventModal';
import { EventItem } from '../types';
import { Calendar, Clock, MapPin, User, ArrowRight, Sparkles } from 'lucide-react';

export const Events: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);

  return (
    <section id="events" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
            <Calendar className="w-3.5 h-3.5" />
            <span>Community & Tech Events</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            Upcoming Hackathons & <span className="gradient-text">Masterclasses</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Join thousands of developers, researchers, and creators at PioneerX webinars, global hackathons, and youth coding masterclasses.
          </p>
        </div>

        {/* Events Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {EVENTS_DATA.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 hover:border-sky-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-sky-500/10 text-sky-400 border border-sky-500/20">
                    {item.type}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.status === 'Upcoming'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mt-4 group-hover:text-sky-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {item.subtitle}
                </p>

                <div className="mt-5 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-sky-400" />
                    <span>{item.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-purple-400" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-400" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800/80">
                <button
                  onClick={() => setSelectedEvent(item)}
                  className="w-full py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20"
                >
                  <span>{item.registrationOpen ? 'Register For Free' : 'View Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Registration Modal */}
      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
};
