import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Products } from './components/Products';
import { Awards } from './components/Awards';
import { Gallery } from './components/Gallery';
import { Team } from './components/Team';
import { Partners } from './components/Partners';
import { Testimonials } from './components/Testimonials';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandMenu } from './components/CommandMenu';
import { TestimonialsPage } from './components/TestimonialsPage';
import { TestimonialsSubmitPage } from './components/TestimonialsSubmitPage';
import { AdminTestimonialsPage } from './components/AdminTestimonialsPage';

export const App: React.FC = () => {
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [selectedServicesForContact, setSelectedServicesForContact] = useState<string[]>([]);
  const [estimatedBudgetForContact, setEstimatedBudgetForContact] = useState<string>('');
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname);

  // Handle browser back/forward buttons (popstate event)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Handle Ctrl+K shortcut to toggle command menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandMenuOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const normalizedPath =
    currentPath.length > 1 && currentPath.endsWith('/')
      ? currentPath.slice(0, -1)
      : currentPath;

  // Update dynamic document titles & SEO meta on route changes
  useEffect(() => {
    if (normalizedPath === '/testimonials') {
      document.title = 'Client Testimonials & Endorsements | PioneerX Labs';
    } else if (normalizedPath === '/testimonials/submit') {
      document.title = 'Share Your Experience | PioneerX Labs';
    } else if (normalizedPath === '/admin/testimonials') {
      document.title = 'Admin Testimonial Console | PioneerX Labs';
    } else {
      document.title = 'PioneerX Labs | Youth-Led Technology & Innovation';
    }
  }, [normalizedPath]);


  const handleNavigate = (target: string) => {
    if (target.startsWith('/')) {
      if (window.location.pathname !== target) {
        window.history.pushState({}, '', target);
      }
      setCurrentPath(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        setCurrentPath('/');
        setTimeout(() => {
          const elem = document.getElementById(target);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      } else {
        const elem = document.getElementById(target);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const handleNavigateToContactWithServices = (services?: string[], budget?: string) => {
    if (services) setSelectedServicesForContact(services);
    if (budget) setEstimatedBudgetForContact(budget);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 font-sans selection:bg-sky-500 selection:text-slate-950">
      
      {/* Floating Glass Header */}
      <Navbar
        onOpenCommand={() => setCommandMenuOpen(true)}
        onNavigate={handleNavigate}
        currentPath={normalizedPath}
      />

      {/* Main Content & Page Views */}
      <main>
        {normalizedPath === '/testimonials' ? (
          <TestimonialsPage onNavigate={handleNavigate} />
        ) : normalizedPath === '/testimonials/submit' ? (
          <TestimonialsSubmitPage onNavigate={handleNavigate} />
        ) : normalizedPath === '/admin/testimonials' ? (
          <AdminTestimonialsPage onNavigate={handleNavigate} />
        ) : (

          <>
            <Hero onNavigate={handleNavigate} />
            <Partners />
            <About />
            <Services onNavigateToContact={handleNavigateToContactWithServices} />
            <Projects />
            <Products />
            <Awards />
            <Gallery />
            <Team />
            <Testimonials onNavigate={handleNavigate} />
            <Blog />
            <Contact
              initialSelectedServices={selectedServicesForContact}
              initialEstimatedBudget={estimatedBudgetForContact}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Global Command Menu */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
        onNavigate={handleNavigate}
      />

    </div>
  );
};

export default App;
