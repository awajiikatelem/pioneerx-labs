import React, { useState, useEffect } from 'react';
import { Search, X, Compass, FolderGit2, Cpu, BookOpen, Briefcase, Mail, ArrowRight } from 'lucide-react';

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
}

export const CommandMenu: React.FC<CommandMenuProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered by shortcut handled in App.tsx
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { name: 'Client Testimonials Page', category: 'Reviews', icon: Compass, id: '/testimonials' },
    { name: 'Submit Client Review Form', category: 'Reviews', icon: Compass, id: '/testimonials/submit' },
    { name: 'About PioneerX Labs', category: 'Navigation', icon: Compass, id: 'about' },
    { name: 'Services & Scope Estimator', category: 'Navigation', icon: Compass, id: 'services' },
    { name: 'Projects & Case Studies', category: 'Navigation', icon: FolderGit2, id: 'projects' },
    { name: 'Aura AI Engine Product', category: 'Products', icon: Cpu, id: 'products' },
    { name: 'DevSync Workspace Product', category: 'Products', icon: Cpu, id: 'products' },
    { name: 'Meet the Innovators Team', category: 'Team', icon: Compass, id: 'team' },
    { name: 'Culture Gallery & Lab Life', category: 'Culture', icon: Compass, id: 'gallery' },
    { name: 'Blog: Edge AI Pipelines', category: 'Insights', icon: BookOpen, id: 'blog' },
    { name: 'Initiate Contact & Booking', category: 'Contact', icon: Mail, id: 'contact' },
  ];

  const filtered = items.filter(
    (item) =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="glass-panel w-full max-w-xl rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
        
        {/* Search Header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-sky-400" />
          <input
            type="text"
            autoFocus
            placeholder="Type a section, project, or topic..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none placeholder:text-slate-500"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(item.id)}
                  className="w-full p-3 rounded-xl hover:bg-slate-900/80 text-left flex items-center justify-between text-xs text-slate-300 hover:text-white transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 group-hover:bg-sky-500/20 transition-colors">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="font-semibold text-sm block">{item.name}</span>
                      <span className="text-[10px] text-slate-500">{item.category}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-1 transition-all" />
                </button>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No matching pages found for "{query}"
            </div>
          )}
        </div>

        {/* Shortcut Footer */}
        <div className="px-4 py-2.5 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
          <span>Navigate with mouse or enter key</span>
          <kbd className="px-1.5 py-0.5 bg-slate-900 rounded border border-slate-800 text-slate-400">ESC to close</kbd>
        </div>

      </div>
    </div>
  );
};
