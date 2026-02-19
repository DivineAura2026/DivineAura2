import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CategoryCard = ({ title, description, image, onCTA }) => {
  return (
    <div 
      className="group card-glass p-6 md:p-8 flex flex-col h-full"
      data-testid={`category-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-warm-surface">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Launching Soon Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-body tracking-wider uppercase text-text-secondary">
            Launching Soon
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-xl md:text-2xl text-charcoal mb-3">
          {title}
        </h3>
        <p className="font-body text-text-secondary text-sm leading-relaxed mb-6 flex-1">
          {description}
        </p>
        
        <button
          onClick={onCTA}
          className="flex items-center gap-2 font-body text-sm tracking-wider uppercase text-charcoal group/btn"
          data-testid={`category-cta-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <span>Get Updates</span>
          <ArrowRight 
            size={16} 
            className="transition-transform duration-300 group-hover/btn:translate-x-1" 
          />
        </button>
      </div>
    </div>
  );
};
