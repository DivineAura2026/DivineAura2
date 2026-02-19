import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-charcoal text-white py-16 md:py-20"
      data-testid="footer"
    >
      <div className="container-custom px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {/* Aura Ring Mark */}
              <div className="relative w-8 h-8">
                <div 
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 180deg at 50% 50%, #D8B4FE 0deg, #818CF8 72deg, #6EE7B7 144deg, #FDE047 216deg, #FB923C 288deg, #F87171 360deg)',
                    padding: '2px',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-charcoal" />
                </div>
              </div>
              <span className="font-display text-2xl tracking-tight">
                Divine Aura
              </span>
            </div>
            <p className="font-display text-xl md:text-2xl italic text-white/80 max-w-md">
              "Glow in Your True Aura."
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-body text-sm tracking-widest uppercase text-white/60 mb-6">
              Navigate
            </h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                  data-testid="footer-link-home"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                  data-testid="footer-link-about"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                  data-testid="footer-link-contact"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/#" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                  data-testid="footer-link-privacy"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-body text-sm tracking-widest uppercase text-white/60 mb-6">
              Connect
            </h4>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors duration-300"
                data-testid="social-instagram"
                aria-label="Instagram"
              >
                <Instagram size={18} className="text-white/80" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors duration-300"
                data-testid="social-facebook"
                aria-label="Facebook"
              >
                <Facebook size={18} className="text-white/80" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors duration-300"
                data-testid="social-twitter"
                aria-label="Twitter"
              >
                <Twitter size={18} className="text-white/80" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-body text-sm text-white/50">
            © {currentYear} Divine Aura. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Aura-led clean beauty for conscious souls.
          </p>
        </div>
      </div>
    </footer>
  );
};
