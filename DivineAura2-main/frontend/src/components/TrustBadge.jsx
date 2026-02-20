import React from 'react';
import { Check, Leaf, Beaker, Eye, Heart, Stethoscope } from 'lucide-react';

const iconMap = {
  check: Check,
  leaf: Leaf,
  beaker: Beaker,
  eye: Eye,
  heart: Heart,
  stethoscope: Stethoscope,
};

export const TrustBadge = ({ icon = 'check', text, subtext }) => {
  const IconComponent = iconMap[icon] || Check;

  return (
    <div 
      className="flex items-center gap-3 px-4 py-3 bg-white/50 backdrop-blur-sm rounded-full"
      data-testid={`trust-badge-${text.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="w-8 h-8 rounded-full bg-warm-surface flex items-center justify-center flex-shrink-0">
        <IconComponent size={16} className="text-charcoal" />
      </div>
      <div className="flex flex-col">
        <span className="font-body text-sm text-charcoal whitespace-nowrap">{text}</span>
        {subtext && (
          <span className="font-body text-xs text-text-muted">{subtext}</span>
        )}
      </div>
    </div>
  );
};

export const TrustStrip = () => {
  const badges = [
    { icon: 'leaf', text: 'No Harsh Chemicals' },
    { icon: 'beaker', text: 'Small Batch' },
    { icon: 'eye', text: 'Ingredient Transparency' },
    { icon: 'heart', text: 'Made with Care' },
    { icon: 'stethoscope', text: 'Dermatologist Collaboration', subtext: 'Coming Soon' },
  ];

  return (
    <section 
      className="py-12 md:py-16 overflow-hidden bg-warm-surface/50"
      data-testid="trust-strip"
    >
      <div className="container-custom px-6 md:px-12 lg:px-24">
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          {badges.map((badge, index) => (
            <TrustBadge key={index} {...badge} />
          ))}
        </div>
      </div>
    </section>
  );
};
