import React from 'react';
import { ArrowRight } from 'lucide-react';

export const CategoryCard = ({ title, description, image, onCTA }) => {
  return (
    <div 
      className="group luxury-card p-6 md:p-8 flex flex-col h-full glow-hover"
      data-testid={`category-card-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-6 bg-warm-surface">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Launching Soon Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-xs font-body tracking-wider uppercase text-text-secondary border border-gold/20">
            Launching Soon
          </span>
        </div>

        {/* Gold corner accent on hover */}
        <div className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-2 right-2 w-8 h-px bg-gradient-to-l from-gold to-transparent" />
          <div className="absolute bottom-2 right-2 w-px h-8 bg-gradient-to-t from-gold to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-display text-xl md:text-2xl text-charcoal mb-3 group-hover:gold-text transition-all duration-300">
          {title}
        </h3>
        <p className="font-body text-text-secondary text-sm leading-relaxed mb-6 flex-1">
          {description}
        </p>
        
        <button
          onClick={onCTA}
          className="flex items-center gap-2 font-body text-sm tracking-wider uppercase text-charcoal group/btn relative overflow-hidden"
          data-testid={`category-cta-${title.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <span className="relative">
            Get Updates
            <span className="absolute bottom-0 left-0 w-0 h-px bg-gold group-hover/btn:w-full transition-all duration-300" />
          </span>
          <ArrowRight 
            size={16} 
            className="transition-transform duration-300 group-hover/btn:translate-x-1 text-gold" 
          />
        </button>
      </div>
    </div>
  );
};
