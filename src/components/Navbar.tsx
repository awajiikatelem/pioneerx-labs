import React, { useState, useEffect } from 'react';
import { Menu, X, Command, ArrowRight, Code2 } from 'lucide-react';


interface NavbarProps {
  onOpenCommand: () => void;
  onNavigate: (href: string) => void;
  currentPath?: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommand, onNavigate, currentPath = '/' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About Us', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Projects', href: 'projects' },
    { name: 'Products', href: 'products' },
    { name: 'Team', href: 'team' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Blog', href: 'blog' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    onNavigate(href);
  };

  const isLinkActive = (href: string) => {
    if (href.startsWith('/')) {
      return currentPath === href || (href !== '/' && currentPath.startsWith(href));
    }
    return false;
  };


  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('/');
            }}
            className="flex items-center gap-3 group cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[1px] shadow-lg shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                <Code2 className="w-5 h-5 text-sky-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-bold text-xl tracking-tight text-white group-hover:text-sky-400 transition-colors">
                  Pioneer<span className="text-sky-400">X</span>
                </span>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                  LABS
                </span>
              </div>
              <span className="text-[10px] text-slate-400 tracking-wider font-medium uppercase hidden sm:inline-block">
                Youth-Led Innovation
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all cursor-pointer ${
                    active
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Actions & Command Menu Trigger */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenCommand}
              className="flex items-center gap-2 px-3 py-1.5 text-xs text-slate-400 bg-slate-900/80 border border-slate-800 rounded-lg hover:border-slate-700 hover:text-slate-200 transition-all cursor-pointer"
              title="Search website (Ctrl + K)"
            >
              <Command className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="px-1.5 py-0.5 text-[10px] bg-slate-800 rounded text-slate-400 border border-slate-700 font-mono">
                ⌘K
              </kbd>
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="relative inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white rounded-full bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 hover:from-sky-400 hover:to-purple-500 shadow-md shadow-sky-500/20 hover:shadow-sky-500/40 transition-all cursor-pointer active:scale-95"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenCommand}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
            >
              <Command className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 mx-4 p-5 glass-panel rounded-2xl border border-slate-800 shadow-2xl flex flex-col gap-3 animate-in fade-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <span className="text-xs font-semibold uppercase text-sky-400 tracking-wider">
              Navigation Menu
            </span>
            <span className="text-xs text-slate-500">PioneerX Labs</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={`text-left px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                    active
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'text-slate-300 hover:text-sky-400 hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>
          <div className="pt-3 border-t border-slate-800 flex flex-col gap-2">
            <button
              onClick={() => handleLinkClick('contact')}
              className="w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-to-r from-sky-500 to-indigo-600 rounded-xl shadow-lg cursor-pointer"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
