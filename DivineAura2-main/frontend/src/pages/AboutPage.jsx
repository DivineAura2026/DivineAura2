import React from 'react';
import { Heart, Sparkles, Leaf, Target } from 'lucide-react';
import { AuraBlob, BotanicalSVG } from '../components/AuraBlob';

const AboutPage = () => {
  const values = [
    {
      icon: Sparkles,
      title: 'Aura-Led Philosophy',
      description: 'We believe beauty is energy. Our formulations are designed to align with your unique radiance, not mask it.',
    },
    {
      icon: Leaf,
      title: 'Clean Consciousness',
      description: 'Every ingredient is intentionally chosen. No harsh chemicals, no compromises — just pure, conscious beauty.',
    },
    {
      icon: Heart,
      title: 'Self-Manufactured',
      description: 'Small-batch production in our own facility ensures quality and attention to detail in every product.',
    },
    {
      icon: Target,
      title: 'Personalization First',
      description: 'From Aura Analysis to dermat consultations, we help you find what truly works for your skin.',
    },
  ];

  return (
    <main className="overflow-hidden" data-testid="about-page">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center section-padding pt-32">
        <AuraBlob 
          color="blue" 
          size="lg" 
          className="top-20 right-20 opacity-15" 
        />
        <BotanicalSVG 
          variant="branch" 
          className="absolute left-10 top-40 w-48 h-32 text-charcoal opacity-[0.03]" 
        />

        <div className="container-custom">
          <div className="max-w-3xl">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
              Our Story
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal mb-8 leading-tight">
              Beauty that <span className="italic aura-text">resonates</span><br />
              with your soul.
            </h1>
            <p className="font-body text-lg text-text-secondary max-w-2xl">
              Divine Aura is an aura-led clean beauty brand, self-manufactured in small batches 
              with a focus on personalization and intentional formulation.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding bg-warm-surface/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/5914432/pexels-photo-5914432.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Divine Aura brand story"
                  className="w-full h-full object-cover"
                />
              </div>
              <div 
                className="absolute -bottom-6 -right-6 w-32 h-32 rounded-full opacity-60"
                style={{
                  background: 'conic-gradient(from 180deg at 50% 50%, #DC2626 0deg, #EA580C 60deg, #CA8A04 120deg, #16A34A 180deg, #2563EB 240deg, #9333EA 300deg, #DC2626 360deg)',
                  filter: 'blur(40px)',
                }}
              />
            </div>

            {/* Content */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
                  The Beginning
                </h2>
                <p className="font-body text-text-secondary leading-relaxed mb-4">
                  In a world saturated with beauty products making empty promises, we asked ourselves: 
                  What if beauty could be different? What if it could be intentional, transparent, and 
                  aligned with the energy you bring to the world?
                </p>
                <p className="font-body text-text-secondary leading-relaxed">
                  Divine Aura emerged from this question — a clean beauty brand that doesn't just 
                  formulate products, but designs rituals. Each creation is a careful balance of 
                  science and intention, self-manufactured in small batches to ensure quality.
                </p>
              </div>

              <div>
                <h2 className="font-display text-3xl md:text-4xl text-charcoal mb-6">
                  Our Mission
                </h2>
                <p className="font-body text-text-secondary leading-relaxed">
                  We're here to redefine what clean beauty means. Not just free from harmful 
                  ingredients, but full of purpose. Every formula is created with the understanding 
                  that true beauty radiates from within — we're just here to help it shine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding" data-testid="values-section">
        <div className="container-custom">
          <div className="text-center mb-16">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-4">
              What Guides Us
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-charcoal">
              Our Core <span className="italic aura-text">Values</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="p-8 md:p-10 luxury-card glow-hover"
                data-testid={`value-card-${index}`}
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-aura-purple/20 to-aura-green/20 flex items-center justify-center mb-6">
                  <value.icon size={26} className="text-charcoal" />
                </div>
                <h3 className="font-display text-2xl text-charcoal mb-4">
                  {value.title}
                </h3>
                <p className="font-body text-text-secondary leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-padding bg-charcoal text-white relative overflow-hidden">
        <AuraBlob 
          color="purple" 
          size="lg" 
          className="absolute -top-20 -right-20 opacity-20" 
        />
        
        <div className="container-custom relative">
          <div className="max-w-3xl mx-auto text-center">
            <blockquote className="font-display text-3xl md:text-4xl lg:text-5xl text-white italic leading-relaxed mb-8">
              "Beauty should be transparent, intentional, and consciously made."
            </blockquote>
            <p className="font-body text-white/60 tracking-widest uppercase text-sm">
              — Divine Aura Philosophy
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
