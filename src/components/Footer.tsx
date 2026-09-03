import React, { useState } from 'react';
import { Code2, ArrowUp, Send, CheckCircle2 } from 'lucide-react';

const TwitterXIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1px] shadow-lg shadow-sky-500/20">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-sky-400" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight text-white">
                Pioneer<span className="text-sky-400">X</span> LABS
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              PioneerX Labs is a youth-led technology company driven by innovation, curiosity, and technical excellence. 
              We build enterprise digital solutions, custom AI systems, and high-performance applications that deliver real value.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com/pioneerxlab"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-2 text-xs font-semibold"
                title="Follow PioneerX Labs on X"
              >
                <TwitterXIcon />
                <span>@pioneerxlab</span>
              </a>
              <a
                href="https://www.instagram.com/pioneerxlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-pink-400 border border-slate-800 transition-colors flex items-center gap-2 text-xs font-semibold"
                title="Follow PioneerX Labs on Instagram"
              >
                <InstagramIcon />
                <span>@pioneerxlabs</span>
              </a>
            </div>
          </div>

          {/* Nav Column 1 */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Company</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('about')} className="hover:text-sky-400 transition-colors cursor-pointer">About Us</button></li>
              <li><button onClick={() => onNavigate('team')} className="hover:text-sky-400 transition-colors cursor-pointer">Leadership Team</button></li>
              <li><button onClick={() => onNavigate('/testimonials')} className="hover:text-sky-400 transition-colors cursor-pointer">Client Testimonials</button></li>
              <li><button onClick={() => onNavigate('/testimonials/submit')} className="hover:text-sky-400 transition-colors cursor-pointer">Submit a Review</button></li>
              <li><button onClick={() => onNavigate('gallery')} className="hover:text-sky-400 transition-colors cursor-pointer">Culture Gallery</button></li>
            </ul>
          </div>



          {/* Nav Column 2 */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Services & Tech</h4>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => onNavigate('services')} className="hover:text-sky-400 transition-colors cursor-pointer">Custom Web Dev</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-sky-400 transition-colors cursor-pointer">Mobile App Dev</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-sky-400 transition-colors cursor-pointer">AI & LLM Solutions</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-sky-400 transition-colors cursor-pointer">Flagship Products</button></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Stay Innovating</h4>
            <p className="text-xs text-slate-400">
              Subscribe to the PioneerX quarterly engineering journal and tech releases.
            </p>

            {subscribed ? (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Subscribed! Welcome to PioneerX Insights.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 text-xs text-white border border-slate-800 focus:border-sky-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-sky-400 hover:bg-sky-300 text-slate-950 font-bold text-xs flex items-center gap-1 cursor-pointer transition-all"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} PioneerX Labs Inc. All rights reserved. Built with passion & youth innovation.
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-sky-400 border border-slate-800 transition-colors cursor-pointer flex items-center gap-1"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
