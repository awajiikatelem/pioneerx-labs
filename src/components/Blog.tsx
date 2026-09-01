import React, { useState } from 'react';
import { BLOG_DATA } from '../data/blog';
import { BlogModal } from './Modals/BlogModal';
import { BlogPost } from '../types';
import { BookOpen, Search, ArrowRight, Clock, Calendar, Tag } from 'lucide-react';

export const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activePost, setActivePost] = useState<BlogPost | null>(null);

  const categories = ['All', 'AI & Engineering', 'Design Systems', 'Culture & Vision'];

  const filteredPosts = BLOG_DATA.filter((post) => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-slate-950/60 border-y border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider border border-purple-500/20">
              <BookOpen className="w-3.5 h-3.5" />
              <span>PioneerX Insights</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
              Engineering Deep Dives & <span className="gradient-text">Thought Leadership</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Explore how we solve complex technical problems, design modern dark-mode interfaces, 
              and build zero-latency edge applications.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search insights..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900/90 text-sm text-white border border-slate-800 focus:border-sky-500 focus:outline-none transition-colors placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-purple-500 text-white shadow-md shadow-purple-500/20'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => setActivePost(post)}
              className="glass-card rounded-3xl overflow-hidden border border-slate-800 hover:border-purple-500/40 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-900">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  <span className="absolute top-4 left-4 text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-slate-950/80 text-purple-300 border border-slate-800 backdrop-blur-md">
                    {post.category}
                  </span>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-400" />
                      {post.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-purple-400" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-slate-400 text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Author Footer */}
              <div className="p-6 pt-0 border-t border-slate-800/80 mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5 pt-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-7 h-7 rounded-full object-cover border border-sky-500/40"
                  />
                  <span className="text-xs font-medium text-slate-300">{post.author.name}</span>
                </div>

                <div className="flex items-center gap-1 text-xs font-semibold text-sky-400 group-hover:translate-x-1 transition-transform pt-3">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>

      {/* Reader Modal */}
      <BlogModal
        post={activePost}
        onClose={() => setActivePost(null)}
      />
    </section>
  );
};
