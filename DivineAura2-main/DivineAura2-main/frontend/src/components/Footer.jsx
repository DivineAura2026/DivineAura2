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
                    background: 'conic-gradient(from 180deg at 50% 50%, #DC2626 0deg, #EA580C 60deg, #CA8A04 120deg, #16A34A 180deg, #2563EB 240deg, #9333EA 300deg, #DC2626 360deg)',
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

          {/* Shop */}
          <div>
            <h4 className="font-body text-sm tracking-widest uppercase text-white/60 mb-6">
              Shop
            </h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/shop" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/aura-analysis" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                >
                  Aura Analysis
                </Link>
              </li>
              <li>
                <Link 
                  to="/consult" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                >
                  Consultation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-body text-sm tracking-widest uppercase text-white/60 mb-6">
              Company
            </h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  to="/about" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/#" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  to="/#" 
                  className="font-body text-white/80 hover:text-white transition-colors duration-300"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social & Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-body text-sm text-white/50">
            © {currentYear} Divine Aura. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors duration-300"
              aria-label="Instagram"
            >
              <Instagram size={18} className="text-white/80" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors duration-300"
              aria-label="Facebook"
            >
              <Facebook size={18} className="text-white/80" />
            </a>
            <a 
              href="#" 
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white/60 transition-colors duration-300"
              aria-label="Twitter"
            >
              <Twitter size={18} className="text-white/80" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
