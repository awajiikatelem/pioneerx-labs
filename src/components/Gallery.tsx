import React, { useState } from 'react';
import { Camera, X, Maximize2 } from 'lucide-react';
import hackathonOne from '../assets/team/Hacathon.jpg';
import hackathonTwo from '../assets/team/hacathon pic 2.jpg';
import hackathonThree from '../assets/team/Hacathon pic.jpg';
import graduationOne from '../assets/team/Graduation pics.jpg';
import graduationTwo from '../assets/team/Team pics 1.jpg';
import graduationThree from '../assets/team/20260612_150408.jpg';
import graduationFour from '../assets/team/20260612_150801.jpg';
import communityOne from '../assets/team/team pics 2.jpg';
import communityTwo from '../assets/team/Goodnews.jpg';
import communityThree from '../assets/team/Samuel.jpg';
import communityFour from '../assets/team/Tenerifa.jpg';

interface GalleryItem {
  id: string;
  title: string;
  category: 'Hackathons' | 'Graduation' | 'Community';
  image: string;
  caption: string;
}

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g-1',
      title: 'Hackathon Sprint',
      category: 'Hackathons',
      image: hackathonOne,
      caption: 'Our team in a focused innovation sprint, building and testing ideas under pressure.'
    },
    {
      id: 'g-2',
      title: 'Innovation Challenge',
      category: 'Hackathons',
      image: hackathonTwo,
      caption: 'A high-energy team moment during our hackathon session and rapid prototype cycle.'
    },
    {
      id: 'g-3',
      title: 'Hackathon Session',
      category: 'Hackathons',
      image: hackathonThree,
      caption: 'Team members collaborating and presenting work during a live hackathon moment.'
    },
    {
      id: 'g-4',
      title: 'Graduation Day',
      category: 'Graduation',
      image: graduationOne,
      caption: 'A proud graduation moment celebrating our achievement and next chapter together.'
    },
    {
      id: 'g-6',
      title: 'Campus Graduation Moment',
      category: 'Graduation',
      image: graduationTwo,
      caption: 'The team captured during a memorable graduation experience and shared success.'
    },
    {
      id: 'g-7',
      title: 'Hackathon picture',
      category: 'Hackathons',
      image: graduationThree,
      caption: 'Team members collaborating and presenting work during a live hackathon moment.'},
    {
      id: 'g-8',
      title: 'Hackathon picture',
      category: 'Hackathons',
      image: graduationFour,
      caption: 'Team members collaborating and presenting work during a live hackathon moment.'},
    {
      id: 'g-9',
      title: 'Community Engagement',
      category: 'Hackathons',
      image: communityOne,
      caption: 'Connecting with the community through technology awareness and youth digital engagement.'
    }
  ];

  const categories = ['All', 'Hackathons', 'Graduation', 'Community'];

  const filtered = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 text-sky-400 text-xs font-semibold uppercase tracking-wider border border-sky-500/20">
              <Camera className="w-3.5 h-3.5" />
              <span>Behind The Scenes</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              PioneerX <span className="gradient-text">Culture & Gallery</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Moments from our 5 team members working in the lab, collaborating with Technoville, and supporting community digital initiatives.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-sky-500 text-slate-950 shadow-md shadow-sky-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedImage(item)}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 group cursor-pointer relative"
            >
              <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                <img
                  src={item.image}
                  alt={item.title}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = item.image;
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                
                <div className="absolute top-4 right-4 p-2 rounded-xl bg-slate-950/80 text-white border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative max-w-3xl w-full glass-panel rounded-3xl overflow-hidden border border-slate-800 shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-slate-950/80 text-white border border-slate-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src = selectedImage.image;
              }}
              className="w-full max-h-[65vh] object-cover"
            />

            <div className="p-6 bg-slate-950 space-y-2">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase">
                {selectedImage.category}
              </span>
              <h3 className="text-xl font-bold text-white">{selectedImage.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
