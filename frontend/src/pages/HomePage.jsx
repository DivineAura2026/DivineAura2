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
      {/* ===== HERO SECTION ===== */}
      <section 
        className="relative min-h-screen flex items-center section-padding pt-32"
        data-testid="hero-section"
      >
        {/* Floating Sparkles */}
        <SparkleEffect count={25} className="z-10" />

        {/* Parallax Background Elements */}
        <AuraBlob 
          color="purple" 
          size="xl" 
          className="top-10 -right-40 opacity-25" 
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <AuraBlob 
          color="green" 
          size="lg" 
          className="bottom-20 -left-20 opacity-20 animate-float-reverse" 
          style={{ transform: `translateY(${scrollY * -0.05}px)` }}
        />
        <AuraBlob 
          color="blue" 
          size="md" 
          className="top-40 left-1/4 opacity-15 animate-float-slow" 
        />
        
        <BotanicalSVG 
          variant="leaf" 
          className="absolute right-10 top-40 w-40 h-60 text-charcoal opacity-[0.04]" 
        />
        <BotanicalSVG 
          variant="branch" 
          className="absolute left-10 bottom-40 w-60 h-40 text-charcoal opacity-[0.04]" 
        />

        <div className="container-custom w-full relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left - Aura Circle with Text Inside */}
            <div className="relative flex-shrink-0">
              {/* Outer glow */}
              <div 
                className="absolute inset-0 rounded-full opacity-40 blur-3xl scale-125 animate-aura-pulse"
                style={{
                  background: 'conic-gradient(from 180deg at 50% 50%, #D8B4FE 0deg, #818CF8 72deg, #6EE7B7 144deg, #FDE047 216deg, #FB923C 288deg, #F87171 360deg)',
                }}
              />
              
              {/* Main circle with text */}
              <div 
                className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-full flex items-center justify-center animate-float"
                style={{
                  background: 'conic-gradient(from 180deg at 50% 50%, rgba(216, 180, 254, 0.5) 0deg, rgba(129, 140, 248, 0.5) 72deg, rgba(110, 231, 183, 0.5) 144deg, rgba(253, 224, 71, 0.5) 216deg, rgba(251, 146, 60, 0.5) 288deg, rgba(248, 113, 113, 0.5) 360deg)',
                  padding: '3px',
                }}
              >
                <div className="w-full h-full rounded-full bg-warm-bg/95 backdrop-blur-sm flex items-center justify-center p-8 shadow-inner">
                  <h1 className="font-display text-2xl sm:text-3xl lg:text-4xl text-charcoal text-center leading-tight">
                    Glow in Your<br />
                    <span className="italic gold-text">True Aura.</span>
                  </h1>
                </div>
              </div>
              
              {/* Sparkle accents around circle */}
              <div className="absolute -top-2 right-8 w-3 h-3 rounded-full bg-gold animate-sparkle" style={{ animationDelay: '0s' }} />
              <div className="absolute top-1/4 -right-2 w-2 h-2 rounded-full bg-gold-light animate-sparkle" style={{ animationDelay: '1s' }} />
              <div className="absolute bottom-8 -left-2 w-2.5 h-2.5 rounded-full bg-gold animate-sparkle" style={{ animationDelay: '2s' }} />
            </div>

            {/* Center - Premium Product Image */}
            <div className="hidden xl:block relative">
              <div className="relative w-[200px] h-[280px] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img
                  src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Divine Aura Premium Skincare"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent" />
              </div>
              {/* Gold accent line */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent" />
            </div>

            {/* Right Content */}
            <div className="stagger-children text-center lg:text-left max-w-lg">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-text-secondary mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <span className="w-8 h-px bg-gold"></span>
                Aura-Led Clean Beauty
              </p>
              <p className="font-body text-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
                Aura-led clean beauty for skin, hair & mineral makeup. Formulated with intention, crafted for <span className="gold-text font-medium">radiance</span>.
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <button
                  onClick={onOpenWaitlist}
                  className="btn-primary shimmer-effect"
                  data-testid="hero-join-waitlist-btn"
                >
                  Join Waitlist
                </button>
                <a
                  href="#brand-story"
                  className="btn-secondary glow-hover"
                  data-testid="hero-learn-more-btn"
                >
                  Learn Why We're Different
                </a>
              </div>
            </div>
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
