import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Droplets, Leaf, Palette, ArrowRight, Wand2 } from 'lucide-react';
import { AuraBlob, BotanicalSVG } from '../components/AuraBlob';
import { ProductCard } from '../components/ProductCard';
import { TrustStrip } from '../components/TrustBadge';
import { Sparkles as SparkleEffect, AuraDivider } from '../components/LuxuryElements';
import { featuredProducts } from '../data/products';

const HomePage = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const trustIndicators = [
    'Small-batch crafted',
    'Clean formulations',
    'Dermat-inspired',
    'Personalized by aura',
  ];

  const differentiators = [
    { icon: Sparkles, text: 'Aura-Led Formulation Mapping' },
    { icon: Leaf, text: 'Clean, Conscious Ingredients' },
    { icon: Droplets, text: 'Small-Batch Quality Focus' },
    { icon: Palette, text: 'Transparent Beauty Philosophy' },
  ];

  return (
    <main className="overflow-hidden pt-14 md:pt-0" data-testid="home-page">
      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative min-h-screen flex items-center justify-center pt-16 md:pt-0"
        data-testid="hero-section"
      >
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1645586222783-d1062e1d3db6?auto=format&fit=crop&w=1920&q=80"
            alt="Divine Aura Beauty"
            className="w-full h-full object-cover"
          />
          {/* Soft pastel overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-pastel-pink/20 via-white/30 to-pastel-lavender/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-pastel-mint/20 via-transparent to-pastel-peach/20" />
          
          {/* Aura glow effects */}
          <div 
            className="absolute inset-0 opacity-40 mix-blend-soft-light"
            style={{
              background: 'radial-gradient(ellipse at 30% 40%, rgba(216, 180, 254, 0.5) 0%, transparent 50%), radial-gradient(ellipse at 70% 60%, rgba(110, 231, 183, 0.4) 0%, transparent 50%)',
            }}
          />
          <div 
            className="absolute top-1/3 left-1/3 w-[500px] h-[500px] opacity-30 blur-3xl animate-aura-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(253, 224, 71, 0.4) 0%, rgba(251, 146, 60, 0.2) 50%, transparent 70%)',
            }}
          />
        </div>

        <SparkleEffect count={25} className="z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <div className="stagger-children">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-charcoal/70 mb-6 flex items-center justify-center gap-3">
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></span>
              Aura-Led Clean Beauty
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></span>
            </p>
            
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-charcoal mb-6 leading-tight drop-shadow-sm">
              Glow in Your<br />
              <span className="italic aura-text">True Aura.</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-charcoal/80 max-w-2xl mx-auto mb-4 leading-relaxed">
              Aura-led clean beauty for skin, hair & makeup.<br className="hidden sm:block" />
              Self-manufactured. Thoughtfully formulated.
            </p>

            {/* Trust Indicators - Pastel Pills */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
              {trustIndicators.map((item, idx) => {
                const pastelColors = [
                  'bg-pastel-pink/60',
                  'bg-pastel-lavender/60', 
                  'bg-pastel-mint/60',
                  'bg-pastel-peach/60'
                ];
                return (
                  <span 
                    key={idx}
                    className={`px-3 py-1.5 ${pastelColors[idx]} backdrop-blur-sm rounded-full font-body text-xs text-charcoal/80 border border-white/50`}
                  >
                    • {item}
                  </span>
                );
              })}
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/shop"
                className="bg-charcoal text-white rounded-full px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-charcoal/90 transition-all duration-300 hover:shadow-xl shimmer-effect"
                data-testid="hero-shop-btn"
              >
                Shop The Ritual
              </Link>
              <Link
                to="/aura-analysis"
                className="border border-charcoal/30 text-charcoal rounded-full px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-charcoal/5 hover:border-charcoal/50 transition-all duration-300 backdrop-blur-sm"
                data-testid="hero-aura-btn"
              >
                Discover Your Aura
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-charcoal/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-charcoal/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Pastel Divider */}
      <div className="pastel-divider" />

      {/* ===== FEATURED PRODUCTS SECTION ===== */}
      <section 
        className="section-padding pastel-section-lavender"
        data-testid="featured-section"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-gradient-to-r from-pastel-pink to-pastel-lavender"></span>
              Curated For You
              <span className="w-8 h-px bg-gradient-to-r from-pastel-lavender to-pastel-mint"></span>
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-3">
              Featured <span className="italic aura-text">Aura Rituals</span>
            </h2>
            <p className="font-body text-text-secondary max-w-lg mx-auto">
              Curated essentials aligned to your skin & hair energy.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.slice(0, 7).map(product => (
              <Link key={product.id} to={`/shop/${product.id}`}>
                <ProductCard product={product} compact />
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link
              to="/shop"
              className="btn-secondary inline-flex items-center gap-2 group"
            >
              View All Products
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <AuraDivider />

      {/* ===== BRAND STORY SECTION ===== */}
      <section 
        id="brand-story"
        className="section-padding bg-warm-surface/30 relative"
        data-testid="brand-story-section"
      >
        <AuraBlob 
          color="yellow" 
          size="lg" 
          className="absolute -right-40 top-1/3 opacity-10"
          style={{ transform: `translateY(${(scrollY - 600) * 0.08}px)` }}
        />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Copy */}
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
                  What is <span className="aura-text">Divine Aura</span>?
                </h2>
                <p className="font-body text-text-secondary leading-relaxed mb-4">
                  Divine Aura is an aura-led clean beauty brand crafted for modern skin and real concerns.
                  We don't just formulate products — we design balance, glow, and confidence into every ritual.
                </p>
                <p className="font-body text-text-secondary leading-relaxed">
                  Divine Aura is not another natural brand.
                  It's a structured, aura-led formulation system for skin, hair, and mineral makeup.
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
                  Why are we <span className="italic">different</span>?
                </h2>
                <p className="font-body text-text-secondary leading-relaxed mb-4">
                  Our formulations align ingredient science with energy-inspired categorization, created in small batches with uncompromising quality standards.
                </p>
                <p className="font-body text-text-secondary leading-relaxed">
                  We combine clean ingredient philosophy with intentional product architecture — so every formula has a purpose.
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
                  Why trust us?
                </h2>
                <p className="font-body text-text-secondary leading-relaxed italic border-l-2 border-gold pl-6">
                  "Because beauty should be transparent, intentional, and consciously made."
                </p>
              </div>
            </div>

            {/* Right - Differentiators */}
            <div className="lg:pt-12">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-8 flex items-center gap-3">
                <span className="w-6 h-px bg-gold"></span>
                What Sets Us Apart
              </p>
              <div className="space-y-6">
                {differentiators.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-5 p-6 luxury-card glow-hover"
                    data-testid={`differentiator-${index}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-aura-purple/20 flex items-center justify-center flex-shrink-0 border border-gold/20">
                      <item.icon size={22} className="text-charcoal" />
                    </div>
                    <div>
                      <h4 className="font-display text-lg text-charcoal mb-1">
                        {item.text}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <TrustStrip />

      {/* ===== VIRTUAL TRY-ON CTA ===== */}
      <section 
        className="py-12 md:py-16 section-padding bg-gradient-to-r from-pastel-pink/30 via-pastel-lavender/20 to-pastel-mint/30"
        data-testid="virtual-tryon-cta"
      >
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pastel-lavender to-pastel-pink flex items-center justify-center flex-shrink-0">
                <Wand2 size={24} className="text-purple-600" />
              </div>
              <div>
                <p className="font-display text-lg md:text-xl text-charcoal">
                  Not sure about shades?
                </p>
                <p className="font-body text-sm text-text-secondary">
                  Try them instantly with our Virtual Studio
                </p>
              </div>
            </div>
            <Link
              to="/virtual-studio"
              className="w-full md:w-auto px-8 py-4 bg-charcoal text-white rounded-full font-body text-sm tracking-wider uppercase hover:bg-charcoal/90 transition-all duration-300 text-center flex items-center justify-center gap-2 group"
              data-testid="virtual-studio-cta-btn"
            >
              <Sparkles size={16} />
              <span>Try Aura Studio</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <AuraDivider />

      {/* ===== AURA DISCOVERY SECTION ===== */}
      <section 
        className="section-padding relative overflow-hidden"
        data-testid="aura-discovery-section"
      >
        <SparkleEffect count={15} />
        <AuraBlob 
          color="mixed" 
          size="xl" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-15" 
        />
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 rounded-full mb-6 border border-gold/20">
              <Sparkles size={16} className="text-gold" />
              <span className="font-body text-sm text-charcoal">Personalized Experience</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
              Discover Your <span className="italic aura-text">Aura</span>
            </h2>
            <p className="font-body text-lg text-text-secondary mb-10">
              Answer a few questions and get personalized ritual recommendations for your skin & hair, aligned with your unique energy.
            </p>
            
            <Link
              to="/aura-analysis"
              className="btn-primary inline-flex items-center gap-2 group"
              data-testid="discover-aura-btn"
            >
              <span>Start Aura Analysis</span>
              <ArrowRight 
                size={18} 
                className="transition-transform duration-300 group-hover:translate-x-1" 
              />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CONSULT CTA SECTION ===== */}
      <section 
        className="section-padding bg-charcoal text-white relative overflow-hidden"
        data-testid="consult-section"
      >
        <div 
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background: 'linear-gradient(90deg, #DC2626 0%, #EA580C 17%, #CA8A04 33%, #16A34A 50%, #2563EB 67%, #9333EA 83%, #DC2626 100%)',
          }}
        />
        
        <SparkleEffect count={20} />
        
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-gold mb-4">
              Expert Guidance
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
              Dermatologist Consultation
            </h2>
            <p className="font-body text-white/70 mb-8">
              Get personalized skincare advice from our experts for just ₹199.
            </p>
            
            <Link
              to="/consult"
              className="inline-block py-4 px-8 bg-gradient-to-r from-gold to-gold-light text-charcoal rounded-full font-body text-sm tracking-wider uppercase hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 shimmer-effect"
            >
              Book Consultation – ₹199
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
