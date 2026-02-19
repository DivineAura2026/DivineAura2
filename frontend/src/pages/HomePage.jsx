import React, { useState } from 'react';
import { Sparkles, Droplets, Leaf, Palette, ArrowRight, Check } from 'lucide-react';
import { AuraRing, AuraBlob, BotanicalSVG } from '../components/AuraBlob';
import { CategoryCard } from '../components/CategoryCard';
import { TrustStrip } from '../components/TrustBadge';

const HomePage = ({ onOpenWaitlist }) => {
  const [inlineForm, setInlineForm] = useState({ name: '', email: '', whatsapp: '' });
  const [inlineSubmitted, setInlineSubmitted] = useState(false);

  const handleInlineSubmit = (e) => {
    e.preventDefault();
    console.log('Inline Waitlist Form:', inlineForm);
    setInlineSubmitted(true);
  };

  const categories = [
    {
      title: 'Skincare Rituals',
      description: 'Curated formulations designed to restore your skin\'s natural radiance and balance.',
      image: 'https://images.pexels.com/photos/30979444/pexels-photo-30979444.jpeg?auto=compress&cs=tinysrgb&w=800',
    },
    {
      title: 'Haircare Elixirs',
      description: 'Nourishing elixirs crafted to strengthen, shine, and revitalize from root to tip.',
      image: 'https://images.unsplash.com/photo-1737316992981-1d2660a3e2c4?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Mineral Makeup',
      description: 'Clean mineral makeup that enhances your natural beauty without compromise.',
      image: 'https://images.pexels.com/photos/8131571/pexels-photo-8131571.jpeg?auto=compress&cs=tinysrgb&w=800',
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
        {/* Background Elements */}
        <AuraBlob 
          color="purple" 
          size="xl" 
          className="top-20 -right-40 opacity-20" 
        />
        <AuraBlob 
          color="green" 
          size="lg" 
          className="bottom-20 -left-20 opacity-15" 
        />
        <BotanicalSVG 
          variant="leaf" 
          className="absolute right-10 top-40 w-40 h-60 text-charcoal opacity-[0.03]" 
        />
        <BotanicalSVG 
          variant="branch" 
          className="absolute left-10 bottom-40 w-60 h-40 text-charcoal opacity-[0.03]" 
        />

        <div className="container-custom w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="stagger-children">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
                Aura-Led Clean Beauty
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal mb-6 leading-tight">
                Glow in Your<br />
                <span className="italic">True Aura.</span>
              </h1>
              <p className="font-body text-lg text-text-secondary max-w-lg mb-10">
                Aura-led clean beauty for skin, hair & mineral makeup. Formulated with intention, crafted for radiance.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={onOpenWaitlist}
                  className="btn-primary"
                  data-testid="hero-join-waitlist-btn"
                >
                  Join Waitlist
                </button>
                <a
                  href="#brand-story"
                  className="btn-secondary"
                  data-testid="hero-learn-more-btn"
                >
                  Learn Why We're Different
                </a>
              </div>
            </div>

            {/* Right - Aura Ring Visual */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <AuraRing size={350} className="animate-float" />
                {/* Nature touch near the rings */}
                <BotanicalSVG 
                  variant="leaf" 
                  className="absolute -bottom-10 -left-10 w-24 h-36 text-charcoal opacity-[0.05]" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BRAND STORY SECTION ===== */}
      <section 
        id="brand-story"
        className="section-padding bg-warm-surface/30"
        data-testid="brand-story-section"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left - Copy */}
            <div className="space-y-12">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
                  What is Divine Aura?
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
                  Why are we different?
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
                <p className="font-body text-text-secondary leading-relaxed italic">
                  "Because beauty should be transparent, intentional, and consciously made."
                </p>
              </div>
            </div>

            {/* Right - Differentiators */}
            <div className="lg:pt-12">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-8">
                What Sets Us Apart
              </p>
              <div className="space-y-6">
                {differentiators.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-5 p-6 card-glass"
                    data-testid={`differentiator-${index}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-aura-purple/20 to-aura-blue/20 flex items-center justify-center flex-shrink-0">
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

      {/* ===== CATEGORY CARDS SECTION ===== */}
      <section 
        className="section-padding"
        data-testid="categories-section"
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-4">
              Explore Our Collections
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              Rituals for Every <span className="italic">Radiance</span>
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

      {/* ===== AURA DISCOVERY SECTION ===== */}
      <section 
        className="section-padding relative overflow-hidden"
        data-testid="aura-discovery-section"
      >
        <AuraBlob 
          color="mixed" 
          size="xl" 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10" 
        />
        
        <div className="container-custom relative">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-aura-purple/10 rounded-full mb-6">
              <Sparkles size={16} className="text-aura-purple" />
              <span className="font-body text-sm text-charcoal">Coming Soon</span>
            </div>
            
            <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
              Aura Discovery is <span className="italic">coming.</span>
            </h2>
            <p className="font-body text-lg text-text-secondary mb-10">
              Soon you'll answer a few questions and get ritual recommendations for your skin & hair, aligned with your unique aura.
            </p>
            
            <button
              onClick={onOpenWaitlist}
              className="btn-secondary group"
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
        {/* Aura accents */}
        <div 
          className="absolute top-0 left-0 w-full h-1"
          style={{
            background: 'linear-gradient(90deg, #D8B4FE 0%, #818CF8 20%, #6EE7B7 40%, #FDE047 60%, #FB923C 80%, #F87171 100%)',
          }}
        />
        
        <div className="container-custom">
          <div className="max-w-xl mx-auto">
            {!inlineSubmitted ? (
              <>
                <h2 className="font-display text-3xl md:text-4xl text-white mb-4 text-center">
                  Get early access to launches + rituals
                </h2>
                <p className="font-body text-white/70 text-center mb-10">
                  Be the first to experience Divine Aura.
                </p>

                <form onSubmit={handleInlineSubmit} className="space-y-6">
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={inlineForm.name}
                    onChange={(e) => setInlineForm({ ...inlineForm, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder:text-white/40 focus:border-white outline-none transition-colors"
                    required
                    data-testid="inline-name-input"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={inlineForm.email}
                    onChange={(e) => setInlineForm({ ...inlineForm, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder:text-white/40 focus:border-white outline-none transition-colors"
                    required
                    data-testid="inline-email-input"
                  />
                  <input
                    type="tel"
                    placeholder="WhatsApp Number (optional)"
                    value={inlineForm.whatsapp}
                    onChange={(e) => setInlineForm({ ...inlineForm, whatsapp: e.target.value })}
                    className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder:text-white/40 focus:border-white outline-none transition-colors"
                    data-testid="inline-whatsapp-input"
                  />
                  
                  <button
                    type="submit"
                    className="w-full py-4 bg-white text-charcoal rounded-full font-body text-sm tracking-wider uppercase hover:bg-white/90 transition-colors"
                    data-testid="inline-submit-btn"
                  >
                    Join Divine Aura
                  </button>
                </form>
              </>
            ) : (
              <div className="text-center py-8" data-testid="inline-success">
                <div className="w-16 h-16 rounded-full bg-aura-green/20 flex items-center justify-center mx-auto mb-6">
                  <Check size={32} className="text-aura-green" />
                </div>
                <h3 className="font-display text-2xl text-white mb-3">
                  Welcome to Divine Aura
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
