import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Aura Analysis', path: '/aura-analysis' },
    { name: 'Consult', path: '/consult' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      data-testid="navbar"
      className={`
        fixed top-4 left-4 right-4 z-50 
        rounded-full px-4 py-3 md:px-8 md:py-4
        flex justify-between items-center
        transition-all duration-500
        ${isScrolled 
          ? 'bg-white/90 backdrop-blur-xl shadow-lg border border-white/40' 
          : 'bg-white/70 backdrop-blur-lg border border-white/30'
        }
      `}
    >
      {/* Logo */}
      <Link 
        to="/" 
        className="flex items-center gap-2 md:gap-3 group"
        data-testid="logo-link"
      >
        {/* Aura Ring Mark */}
        <div className="relative w-7 h-7 md:w-8 md:h-8">
          <div 
            className="absolute inset-0 rounded-full animate-aura-spin"
            style={{
              background: 'conic-gradient(from 180deg at 50% 50%, #DC2626 0deg, #EA580C 60deg, #CA8A04 120deg, #16A34A 180deg, #2563EB 240deg, #9333EA 300deg, #DC2626 360deg)',
              padding: '2px',
            }}
          >
            <div className="w-full h-full rounded-full bg-warm-bg" />
          </div>
        </div>
        <span className="font-display text-lg md:text-2xl text-charcoal tracking-tight">
          Divine Aura
        </span>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden lg:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
            className={`
              font-body text-xs tracking-wider uppercase
              transition-colors duration-300
              ${isActive(link.path) 
                ? 'text-charcoal font-medium' 
                : 'text-text-secondary hover:text-charcoal'
              }
            `}
          >
            {link.name}
          </Link>
        ))}
        
        {/* Cart Icon */}
        <Link
          to="/cart"
          className="relative p-2 hover:bg-charcoal/5 rounded-full transition-colors"
          data-testid="cart-icon"
        >
          <ShoppingBag size={20} className="text-charcoal" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-white text-xs rounded-full flex items-center justify-center font-body">
              {cartCount}
            </span>
          )}
        </Link>
      </div>

      {/* Mobile - Cart + Menu */}
      <div className="flex items-center gap-2 lg:hidden">
        <Link
          to="/cart"
          className="relative p-2"
          data-testid="mobile-cart-icon"
        >
          <ShoppingBag size={20} className="text-charcoal" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-charcoal text-white text-xs rounded-full flex items-center justify-center font-body">
              {cartCount}
            </span>
          )}
        </Link>
        
        <button
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          className="p-2 text-charcoal"
          data-testid="mobile-menu-toggle"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="absolute top-full left-0 right-0 mt-4 p-6 bg-white/98 backdrop-blur-xl rounded-2xl shadow-xl border border-white/40 lg:hidden"
          data-testid="mobile-menu"
        >
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                className={`
                  font-body text-base py-2 border-b border-gray-100
                  ${isActive(link.path) 
                    ? 'text-charcoal font-medium' 
                    : 'text-text-secondary'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
