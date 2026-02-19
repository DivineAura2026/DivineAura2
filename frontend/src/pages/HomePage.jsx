import React, { useState, useEffect } from 'react';
import { Sparkles, Droplets, Leaf, Palette, ArrowRight, Check } from 'lucide-react';
import { AuraBlob, BotanicalSVG } from '../components/AuraBlob';
import { CategoryCard } from '../components/CategoryCard';
import { TrustStrip } from '../components/TrustBadge';
import { Sparkles as SparkleEffect, AuraDivider } from '../components/LuxuryElements';

const HomePage = ({ onOpenWaitlist }) => {
  const [inlineForm, setInlineForm] = useState({ name: '', email: '', whatsapp: '' });
  const [inlineSubmitted, setInlineSubmitted] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    console.log('Inline Waitlist Form:', inlineForm);
    setInlineSubmitted(true);
  };

  const categories = [
    {
      title: 'Skincare Rituals',
      description: 'Curated formulations designed to restore your skin\'s natural radiance and balance.',
      image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Haircare Elixirs',
      description: 'Nourishing elixirs crafted to strengthen, shine, and revitalize from root to tip.',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Mineral Makeup',
      description: 'Clean mineral makeup that enhances your natural beauty without compromise.',
      image: 'https://images.pexels.com/photos/2587370/pexels-photo-2587370.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
  ];

  const differentiators = [
    { icon: Sparkles, text: 'Aura-Led Formulation Mapping' },
    { icon: Leaf, text: 'Clean, Conscious Ingredients' },
    { icon: Droplets, text: 'Small-Batch Quality Focus' },
    { icon: Palette, text: 'Transparent Beauty Philosophy' },
  ];

  return (
    <main className="overflow-hidden" data-testid="home-page">
      {/* ===== HERO SECTION - CINEMATIC ===== */}
      <section 
        className="relative min-h-screen flex items-center justify-center"
        data-testid="hero-section"
      >
        {/* Full-width Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3785806/pexels-photo-3785806.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Divine Aura Beauty"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/60" />
          
          {/* Aura glow backdrop effect */}
          <div 
            className="absolute inset-0 opacity-30 mix-blend-overlay"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(216, 180, 254, 0.4) 0%, rgba(129, 140, 248, 0.3) 25%, rgba(110, 231, 183, 0.2) 50%, transparent 70%)',
            }}
          />
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 opacity-20 blur-3xl animate-aura-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(253, 224, 71, 0.5) 0%, transparent 70%)',
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 opacity-20 blur-3xl animate-aura-pulse"
            style={{
              background: 'radial-gradient(circle, rgba(216, 180, 254, 0.5) 0%, transparent 70%)',
              animationDelay: '2s',
            }}
          />
        </div>

        {/* Floating Sparkles */}
        <SparkleEffect count={30} className="z-10" />

        {/* Content */}
        <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
          <div className="stagger-children">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-white/80 mb-6 flex items-center justify-center gap-3">
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></span>
              Aura-Led Clean Beauty
              <span className="w-12 h-px bg-gradient-to-r from-transparent via-gold to-transparent"></span>
            </p>
            
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white mb-6 leading-tight">
              Glow in Your<br />
              <span className="italic gold-text">True Aura.</span>
            </h1>
            
            <p className="font-body text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Aura-led clean beauty for skin, hair & mineral makeup.<br className="hidden sm:block" />
              Formulated with intention, crafted for radiance.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <button
                onClick={onOpenWaitlist}
                className="bg-white text-charcoal rounded-full px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-gold hover:text-charcoal transition-all duration-300 hover:shadow-lg hover:shadow-gold/30 shimmer-effect"
                data-testid="hero-join-waitlist-btn"
              >
                Join Waitlist
              </button>
              <a
                href="#brand-story"
                className="border border-white/40 text-white rounded-full px-8 py-4 font-body text-sm tracking-wider uppercase hover:bg-white/10 hover:border-white transition-all duration-300"
                data-testid="hero-learn-more-btn"
              >
                Learn Why We're Different
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/60 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* Aura Divider */}
      <AuraDivider />

      {/* ===== BRAND STORY SECTION ===== */}
      <section 
        id="brand-story"
        className="section-padding bg-warm-surface/30 relative"
        data-testid="brand-story-section"
      >
        {/* Parallax blob */}
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
                  What is <span className="gold-text">Divine Aura</span>?
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
                  What do we offer?
                </h2>
                <p className="font-body text-lg text-charcoal font-medium mb-2">
                  Skincare. Haircare. Mineral Makeup.
                </p>
                <p className="font-body text-text-secondary leading-relaxed">
                  Each designed to restore your natural radiance.
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

      {/* Aura Divider */}
      <AuraDivider />

      {/* ===== CATEGORY CARDS SECTION ===== */}
      <section 
        className="section-padding relative"
        data-testid="categories-section"
      >
        {/* Parallax blob */}
        <AuraBlob 
          color="purple" 
          size="xl" 
          className="absolute -left-60 top-1/2 opacity-10"
          style={{ transform: `translateY(${(scrollY - 1200) * 0.06}px)` }}
        />

        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-4 flex items-center justify-center gap-3">
              <span className="w-8 h-px bg-gold"></span>
              Explore Our Collections
              <span className="w-8 h-px bg-gold"></span>
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              Rituals for Every <span className="italic gold-text">Radiance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                {...category}
                onCTA={onOpenWaitlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <TrustStrip />

      {/* Aura Divider */}
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
              <span className="font-body text-sm text-charcoal">Coming Soon</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
              Aura Discovery is <span className="italic gold-text">coming.</span>
            </h2>
            <p className="font-body text-lg text-text-secondary mb-10">
              Soon you'll answer a few questions and get ritual recommendations for your skin & hair, aligned with your unique aura.
            </p>
            
            <button
              onClick={onOpenWaitlist}
              className="btn-secondary glow-hover group"
              data-testid="discover-aura-btn"
            >
              <span>Discover Your Aura</span>
              <ArrowRight 
                size={18} 
                className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1" 
              />
            </button>
          </div>
        </div>
      </section>

      {/* ===== WAITLIST CAPTURE SECTION ===== */}
      <section 
        className="section-padding bg-charcoal text-white relative overflow-hidden"
        data-testid="waitlist-section"
      >
        {/* Aura gradient top border */}
        <div 
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background: 'linear-gradient(90deg, #D4AF37 0%, #D8B4FE 20%, #818CF8 40%, #6EE7B7 60%, #FDE047 80%, #D4AF37 100%)',
          }}
        />
        
        {/* Sparkles in dark section */}
        <SparkleEffect count={20} />
        
        <div className="container-custom relative z-10">
          <div className="max-w-xl mx-auto">
            {!inlineSubmitted ? (
              <>
                <div className="text-center mb-10">
                  <p className="font-body text-sm tracking-[0.2em] uppercase text-gold mb-4">
                    Exclusive Access
                  </p>
                  <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
                    Get early access to launches + rituals
                  </h2>
                  <p className="font-body text-white/70">
                    Be the first to experience Divine Aura.
                  </p>
                </div>

                <form onSubmit={handleInlineSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={inlineForm.name}
                    onChange={(e) => setInlineForm({ ...inlineForm, name: e.target.value })}
                    className="w-full bg-transparent border-b border-gold/30 py-4 text-white placeholder:text-white/40 focus:border-gold outline-none transition-colors"
                    required
                    data-testid="inline-name-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={inlineForm.email}
                    onChange={(e) => setInlineForm({ ...inlineForm, email: e.target.value })}
                    className="w-full bg-transparent border-b border-gold/30 py-4 text-white placeholder:text-white/40 focus:border-gold outline-none transition-colors"
                    required
                    data-testid="inline-email-input"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number (optional)"
                    value={inlineForm.whatsapp}
                    onChange={(e) => setInlineForm({ ...inlineForm, whatsapp: e.target.value })}
                    className="w-full bg-transparent border-b border-gold/30 py-4 text-white placeholder:text-white/40 focus:border-gold outline-none transition-colors"
                    data-testid="inline-whatsapp-input"
                  />
                  
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-charcoal rounded-full font-body text-sm tracking-wider uppercase hover:shadow-lg hover:shadow-gold/20 transition-all duration-300 shimmer-effect"
                    data-testid="inline-submit-btn"
                  >
                    Join Divine Aura
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8" data-testid="inline-success">
                <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6 border border-gold/30">
                  <Check size={32} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl text-white mb-3">
                  Welcome to <span className="gold-text">Divine Aura</span>
                </h3>
                <p className="font-body text-white/70">
                  You're on the list! We'll notify you when we launch.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;
