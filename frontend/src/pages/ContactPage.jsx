import React, { useState } from 'react';
import { Mail, MapPin, Clock, Send, Check } from 'lucide-react';
import { AuraBlob, BotanicalSVG } from '../components/AuraBlob';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      console.log('Contact Form Data:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'hello@divineaura.com',
      subtext: 'We\'ll respond within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Location',
      details: 'Crafted with love',
      subtext: 'Small batch, global reach',
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: 'Within 24-48 hours',
      subtext: 'Monday to Friday',
    },
  ];

  return (
    <main className="overflow-hidden" data-testid="contact-page">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center section-padding pt-32">
        <AuraBlob 
          color="green" 
          size="lg" 
          className="top-20 -right-20 opacity-15" 
        />
        <BotanicalSVG 
          variant="leaf" 
          className="absolute right-20 top-40 w-32 h-48 text-charcoal opacity-[0.03]" 
        />

        <div className="container-custom">
          <div className="max-w-2xl">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-secondary mb-6">
              Get in Touch
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-charcoal mb-8 leading-tight">
              Let's <span className="italic">connect.</span>
            </h1>
            <p className="font-body text-lg text-text-secondary">
              Have questions about Divine Aura? We'd love to hear from you. 
              Reach out and let's start a conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-warm-surface/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Contact Form */}
            <div>
              <h2 className="font-display text-3xl text-charcoal mb-8">
                Send us a message
              </h2>

              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6" data-testid="contact-form">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input-minimal"
                      required
                      data-testid="contact-name-input"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input-minimal"
                      required
                      data-testid="contact-email-input"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="input-minimal"
                      required
                      data-testid="contact-subject-input"
                    />
                  </div>
                  
                  <div>
                    <textarea
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="input-minimal min-h-[150px] resize-none"
                      required
                      data-testid="contact-message-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary flex items-center gap-2 disabled:opacity-60"
                    data-testid="contact-submit-btn"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div 
                  className="text-center py-16 card-glass"
                  data-testid="contact-success"
                >
                  <div className="w-16 h-16 rounded-full bg-aura-green/20 flex items-center justify-center mx-auto mb-6">
                    <Check size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-display text-2xl text-charcoal mb-3">
                    Message Sent!
                  </h3>
                  <p className="font-body text-text-secondary mb-6">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="btn-secondary"
                    data-testid="contact-reset-btn"
                  >
                    Send Another Message
                  </button>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div className="lg:pt-12">
              <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-8">
                Other Ways to Reach Us
              </p>
              
              <div className="space-y-8">
                {contactInfo.map((info, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-5"
                    data-testid={`contact-info-${index}`}
                  >
                    <div className="w-12 h-12 rounded-full bg-warm-surface flex items-center justify-center flex-shrink-0">
                      <info.icon size={20} className="text-charcoal" />
                    </div>
                    <div>
                      <h4 className="font-body text-sm tracking-wider uppercase text-text-muted mb-1">
                        {info.title}
                      </h4>
                      <p className="font-display text-xl text-charcoal mb-1">
                        {info.details}
                      </p>
                      <p className="font-body text-sm text-text-secondary">
                        {info.subtext}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ Teaser */}
              <div className="mt-12 p-8 card-glass">
                <h3 className="font-display text-xl text-charcoal mb-3">
                  Frequently Asked Questions
                </h3>
                <p className="font-body text-text-secondary text-sm mb-4">
                  Looking for quick answers? Our FAQ section is coming soon with everything 
                  you need to know about Divine Aura.
                </p>
                <span className="inline-block px-3 py-1 bg-aura-purple/10 rounded-full text-xs font-body text-charcoal">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactPage;
