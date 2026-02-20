import React, { useState } from 'react';
import { X, Check, Sparkles } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';

export const WaitlistModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      console.log('Waitlist Form Data:', formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', whatsapp: '' });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent 
        className="sm:max-w-md bg-warm-bg border-none shadow-2xl"
        data-testid="waitlist-modal"
        aria-describedby="waitlist-description"
      >
        <DialogHeader>
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-2 rounded-full hover:bg-warm-surface transition-colors"
            data-testid="modal-close-btn"
            aria-label="Close"
          >
            <X size={20} className="text-text-secondary" />
          </button>
        </DialogHeader>

        {!isSubmitted ? (
          <div className="p-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aura-purple to-aura-blue flex items-center justify-center">
                <Sparkles size={20} className="text-white" />
              </div>
              <DialogTitle className="font-display text-2xl text-charcoal">
                Join Divine Aura
              </DialogTitle>
            </div>
            
            <p id="waitlist-description" className="font-body text-text-secondary mb-8">
              Get early access to launches, rituals, and exclusive offers.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-minimal"
                  required
                  data-testid="modal-name-input"
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
                  data-testid="modal-email-input"
                />
              </div>
              
              <div>
                <input
                  type="tel"
                  placeholder="WhatsApp Number (optional)"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="input-minimal"
                  data-testid="modal-whatsapp-input"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full disabled:opacity-60"
                data-testid="modal-submit-btn"
              >
                {isSubmitting ? 'Joining...' : 'Join Divine Aura'}
              </button>
            </form>
          </div>
        ) : (
          <div className="p-2 text-center py-8" data-testid="modal-success">
            <div className="w-16 h-16 rounded-full bg-aura-green/20 flex items-center justify-center mx-auto mb-6">
              <Check size={32} className="text-green-600" />
            </div>
            <h3 className="font-display text-2xl text-charcoal mb-3">
              Welcome to Divine Aura
            </h3>
            <p className="font-body text-text-secondary mb-6">
              You're on the list! We'll notify you when we launch.
            </p>
            <button
              onClick={handleClose}
              className="btn-secondary"
              data-testid="modal-done-btn"
            >
              Done
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
