import React, { useState } from 'react';
import { PRODUCTS_DATA } from '../data/products';
import { Cpu, Layers, Zap, ArrowRight, CheckCircle2, Terminal, ExternalLink } from 'lucide-react';
import { Product } from '../types';

export const Products: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<Product>(PRODUCTS_DATA[0]);

  const getProductIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-5 h-5 text-sky-400" />;
      case 'Layers': return <Layers className="w-5 h-5 text-sky-400" />;
      default: return <Zap className="w-5 h-5 text-sky-400" />;
    }
  };

  return (
    <section id="products" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold uppercase tracking-wider border border-purple-500/20">
            <Cpu className="w-3.5 h-3.5" />
            <span>Proprietary Tech</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">
            PioneerX Flagship <span className="gradient-text">Software Products</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Our proprietary technology is built to support high-performing teams with secure systems, efficient delivery workflows, and practical digital products designed for real business use.
          </p>
        </div>

        {/* Product Selector Tabs & Showcase Box */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Tabs Column */}
          <div className="lg:col-span-4 space-y-3">
            {PRODUCTS_DATA.map((product) => {
              const isSelected = activeProduct.id === product.id;
              return (
                <button
                  key={product.id}
                  onClick={() => setActiveProduct(product)}
                  className={`w-full p-5 rounded-2xl border text-left transition-all cursor-pointer flex items-start gap-4 ${
                    isSelected
                      ? 'bg-sky-500/10 border-sky-500/50 text-white shadow-xl shadow-sky-500/10'
                      : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border ${isSelected ? 'bg-sky-500/20 border-sky-500/30' : 'bg-slate-800 border-slate-700'}`}>
                    {getProductIcon(product.icon)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-white">{product.name}</span>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                        {product.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-1">
                      {product.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Product Interactive Inspector */}
          <div className="lg:col-span-8 glass-panel p-6 sm:p-10 rounded-3xl border border-slate-800 relative overflow-hidden space-y-8 shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-[90px] pointer-events-none" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                  {activeProduct.badge}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {activeProduct.name}
                </h3>
              </div>

              <a
                href={activeProduct.demoUrl}
                className="px-5 py-2.5 text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-sky-500/20 w-fit"
              >
                <span>Try Product Preview</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {activeProduct.description}
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {activeProduct.metrics.map((m, idx) => (
                <div key={idx} className="bg-slate-950/80 p-4 rounded-xl border border-slate-800">
                  <div className="text-lg font-mono font-bold text-white gradient-text">{m.value}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Features List */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Capabilities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {activeProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-200 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
