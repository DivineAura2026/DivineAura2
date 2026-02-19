import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navbar = ({ onOpenWaitlist }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      data-testid="navbar"
      className={`
        fixed top-4 left-4 right-4 z-50 
        rounded-full px-6 py-3 md:px-8 md:py-4
        flex justify-between items-center
        transition-all duration-500
        ${isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border border-white/40' 
          : 'bg-white/60 backdrop-blur-lg border border-white/30'
        }
      `}
    >
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center gap-3 group"
        data-testid="logo-link"
      >
        {/* Aura Ring Mark */}
        <div className="relative w-8 h-8">
          <div 
            className="absolute inset-0 rounded-full animate-aura-spin"
            style={{
              background: 'conic-gradient(from 180deg at 50% 50%, #D8B4FE 0deg, #818CF8 72deg, #6EE7B7 144deg, #FDE047 216deg, #FB923C 288deg, #F87171 360deg)',
              padding: '2px',
            }}
          >
            <div className="w-full h-full rounded-full bg-warm-bg" />
          </div>
        </div>
        <span className="font-display text-xl md:text-2xl text-charcoal tracking-tight">
          Divine Aura
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            data-testid={`nav-link-${link.name.toLowerCase()}`}
            className={`
              font-body text-sm tracking-wider uppercase
              transition-colors duration-300
              ${isActive(link.path) 
                ? 'text-charcoal' 
                : 'text-text-secondary hover:text-charcoal'
              }
            `}
          >
            {link.name}
          </Link>
        ))}
        
        <button
          onClick={onOpenWaitlist}
          data-testid="nav-join-waitlist-btn"
          className="btn-primary text-xs px-6 py-3"
        >
          Join Waitlist
        </button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(prev => !prev)}
        className="md:hidden p-2 text-charcoal"
        data-testid="mobile-menu-toggle"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-4 p-6 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 md:hidden"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                className={`
                  font-body text-base py-2
                  ${isActive(link.path) 
                    ? 'text-charcoal font-medium' 
                    : 'text-text-secondary'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenWaitlist();
              }}
              data-testid="mobile-join-waitlist-btn"
              className="btn-primary text-sm mt-2"
            >
              Join Waitlist
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
