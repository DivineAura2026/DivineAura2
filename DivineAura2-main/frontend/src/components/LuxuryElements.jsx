import React, { useEffect, useState } from 'react';

export const Sparkles = ({ count = 20, className = '' }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const generateSparkles = () => {
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 2,
      }));
    };
    setSparkles(generateSparkles());
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute rounded-full animate-sparkle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: sparkle.size,
            height: sparkle.size,
            background: 'linear-gradient(135deg, #D4AF37 0%, #F5E6C8 50%, #D4AF37 100%)',
            boxShadow: '0 0 6px rgba(212, 175, 55, 0.6)',
            animationDelay: `${sparkle.delay}s`,
            animationDuration: `${sparkle.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export const AuraDivider = ({ className = '' }) => {
  return (
    <div className={`w-full flex justify-center py-8 ${className}`} aria-hidden="true">
      <div className="relative w-full max-w-md h-[2px]">
        {/* Gradient line */}
        <div 
          className="absolute inset-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, #D8B4FE 15%, #818CF8 30%, #6EE7B7 50%, #FDE047 70%, #FB923C 85%, transparent 100%)',
          }}
        />
        {/* Center diamond */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-gradient-to-br from-gold to-gold-light" />
      </div>
    </div>
  );
};

export const GoldAccent = ({ children, className = '' }) => {
  return (
    <span className={`text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-gold ${className}`}>
      {children}
    </span>
  );
};

export const ShimmerButton = ({ children, onClick, className = '', variant = 'primary', ...props }) => {
  const baseClasses = "relative overflow-hidden group transition-all duration-300";
  
  const variants = {
    primary: "bg-charcoal text-white rounded-full px-8 py-4 hover:shadow-2xl hover:-translate-y-1",
    secondary: "bg-transparent border border-charcoal/20 text-charcoal rounded-full px-8 py-4 hover:border-charcoal",
  };

  return (
    <button 
      onClick={onClick} 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <span className="relative z-10 font-body text-sm tracking-wider uppercase">{children}</span>
    </button>
  );
};
