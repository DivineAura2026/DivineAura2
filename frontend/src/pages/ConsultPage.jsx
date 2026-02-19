import React, { useState } from 'react';
import { Check, Calendar, Video, FileText, Clock } from 'lucide-react';
import { AuraBlob } from '../components/AuraBlob';

const ConsultPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    concern: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Consult Form:', formData);
    setSubmitted(true);
  };

  const benefits = [
    { icon: Video, text: '15-minute video consultation' },
    { icon: FileText, text: 'Personalized skincare routine' },
    { icon: Calendar, text: 'Product recommendations' },
    { icon: Clock, text: 'Follow-up support' },
  ];

  return (
    <main className="overflow-hidden min-h-screen" data-testid="consult-page">
      {/* Hero */}
      <section className="relative pt-32 pb-16 section-padding">
        <AuraBlob color="blue" size="lg" className="absolute -right-40 top-20 opacity-10" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-4">
              Expert Guidance
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              Dermatologist <span className="italic aura-text">Consultation</span>
            </h1>
            <p className="font-body text-lg text-text-secondary mb-2">
              Get personalized skincare advice from our experts
            </p>
            <p className="font-display text-3xl text-charcoal">₹199</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Benefits */}
            <div>
              <h2 className="font-display text-2xl text-charcoal mb-8">
                What's Included
              </h2>
              
              <div className="space-y-4 mb-8">
                {benefits.map((benefit, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center gap-4 p-4 bg-warm-surface/50 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <benefit.icon size={20} className="text-charcoal" />
                    </div>
                    <span className="font-body text-charcoal">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="p-6 luxury-card">
                <h3 className="font-display text-lg text-charcoal mb-3">How it Works</h3>
                <ol className="space-y-3 font-body text-sm text-text-secondary">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center text-xs flex-shrink-0">1</span>
                    Fill out your concern below
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center text-xs flex-shrink-0">2</span>
                    Pay ₹199 consultation fee
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center text-xs flex-shrink-0">3</span>
                    Schedule your preferred time slot
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-charcoal text-white flex items-center justify-center text-xs flex-shrink-0">4</span>
                    Get personalized advice & product recommendations
                  </li>
                </ol>
              </div>
            </div>

            {/* Form */}
            <div>
              <div className="luxury-card p-8">
                <h2 className="font-display text-2xl text-charcoal mb-6">
                  Tell Us Your Concern
                </h2>

                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block font-body text-sm text-text-secondary mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input-minimal"
                        required
                        data-testid="consult-name"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-text-secondary mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="input-minimal"
                        required
                        data-testid="consult-phone"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-text-secondary mb-2">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input-minimal"
                        data-testid="consult-email"
                      />
                    </div>

                    <div>
                      <label className="block font-body text-sm text-text-secondary mb-2">
                        Describe Your Concern *
                      </label>
                      <textarea
                        value={formData.concern}
                        onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
                        className="input-minimal min-h-[120px] resize-none"
                        placeholder="Tell us about your skin/hair concerns..."
                        required
                        data-testid="consult-concern"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 relative z-20">
                      <button
                        type="submit"
                        className="btn-primary flex-1 relative z-30"
                        data-testid="consult-submit"
                      >
                        Pay ₹199
                      </button>
                      <button
                        type="button"
                        className="btn-secondary flex-1 relative z-30"
                      >
                        Schedule Appointment
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="text-center py-8" data-testid="consult-success">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <Check size={32} className="text-green-600" />
                    </div>
                    <h3 className="font-display text-2xl text-charcoal mb-3">
                      Request Received!
                    </h3>
                    <p className="font-body text-text-secondary mb-6">
                      We'll contact you shortly to schedule your consultation.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', phone: '', email: '', concern: '' });
                      }}
                      className="btn-secondary"
                    >
                      Submit Another Request
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ConsultPage;
