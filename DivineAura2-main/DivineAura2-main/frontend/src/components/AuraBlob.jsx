import React from 'react';

export const AuraBlob = ({ className = '', size = 'md', color = 'purple', animate = true }) => {
  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-64 h-64',
    lg: 'w-96 h-96',
    xl: 'w-[500px] h-[500px]',
  };

  const colorClasses = {
    purple: 'bg-aura-purple',
    blue: 'bg-aura-blue',
    green: 'bg-aura-green',
    yellow: 'bg-aura-yellow',
    orange: 'bg-aura-orange',
    red: 'bg-aura-red',
    mixed: 'bg-gradient-to-br from-aura-purple via-aura-blue to-aura-green',
  };

  return (
    <div
      className={`
        absolute rounded-full blur-3xl opacity-40
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${animate ? 'animate-aura-pulse' : ''}
        ${className}
      `}
      aria-hidden="true"
    />
  );
};

export const AuraRing = ({ className = '', size = 200 }) => {
  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Outer glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-30 blur-2xl"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, #D8B4FE 0deg, #818CF8 72deg, #6EE7B7 144deg, #FDE047 216deg, #FB923C 288deg, #F87171 360deg)',
        }}
      />
      
      {/* Main ring */}
      <div 
        className="absolute inset-4 rounded-full animate-aura-spin"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%, #D8B4FE 0deg, #818CF8 72deg, #6EE7B7 144deg, #FDE047 216deg, #FB923C 288deg, #F87171 360deg)',
          padding: '2px',
        }}
      >
        <div className="w-full h-full rounded-full bg-warm-bg" />
      </div>
      
      {/* Inner glow */}
      <div 
        className="absolute inset-8 rounded-full opacity-20 blur-xl animate-aura-pulse"
        style={{
          background: 'conic-gradient(from 0deg at 50% 50%, #D8B4FE 0deg, #818CF8 72deg, #6EE7B7 144deg, #FDE047 216deg, #FB923C 288deg, #F87171 360deg)',
        }}
      />
    </div>
  );
};

export const BotanicalSVG = ({ className = '', variant = 'leaf' }) => {
  if (variant === 'leaf') {
    return (
      <svg 
        className={`${className}`} 
        viewBox="0 0 200 300" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path 
          d="M100 10C100 10 40 80 40 160C40 240 100 290 100 290C100 290 160 240 160 160C160 80 100 10 100 10Z" 
          stroke="currentColor" 
          strokeWidth="1"
          fill="none"
          opacity="0.3"
        />
        <path 
          d="M100 40V270" 
          stroke="currentColor" 
          strokeWidth="1"
          opacity="0.2"
        />
        <path 
          d="M100 80C100 80 70 100 60 130" 
          stroke="currentColor" 
          strokeWidth="0.5"
          opacity="0.2"
        />
        <path 
          d="M100 80C100 80 130 100 140 130" 
          stroke="currentColor" 
          strokeWidth="0.5"
          opacity="0.2"
        />
        <path 
          d="M100 130C100 130 65 155 55 190" 
          stroke="currentColor" 
          strokeWidth="0.5"
          opacity="0.2"
        />
        <path 
          d="M100 130C100 130 135 155 145 190" 
          stroke="currentColor" 
          strokeWidth="0.5"
          opacity="0.2"
        />
      </svg>
    );
  }

  if (variant === 'branch') {
    return (
      <svg 
        className={`${className}`} 
        viewBox="0 0 300 200" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path 
          d="M20 180C60 160 120 140 180 120C240 100 280 60 280 60" 
          stroke="currentColor" 
          strokeWidth="1"
          opacity="0.3"
          fill="none"
        />
        <circle cx="80" cy="150" r="15" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none"/>
        <circle cx="140" cy="120" r="12" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none"/>
        <circle cx="200" cy="90" r="18" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none"/>
        <circle cx="250" cy="70" r="10" stroke="currentColor" strokeWidth="0.5" opacity="0.2" fill="none"/>
      </svg>
    );
  }

  return null;
};
