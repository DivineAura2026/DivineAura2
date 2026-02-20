import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'Aura Virtual Studio', path: '/virtual-studio' },
    { name: 'Aura Analysis', path: '/aura-analysis' },
    { name: 'Consult', path: '/consult' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Main Navbar */}
      <nav
        data-testid="navbar"
        className={`
          fixed top-0 left-0 right-0 z-50 
          px-4 py-3 md:px-8 md:py-4
          flex justify-between items-center
          transition-all duration-500
          ${isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-md' 
            : 'bg-gradient-to-b from-white/90 to-white/70 backdrop-blur-lg'
          }
        `}
      >
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 group flex-shrink-0"
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
              <div className="w-full h-full rounded-full bg-white" />
            </div>
          </div>
          <span className="font-display text-base md:text-xl text-charcoal tracking-tight whitespace-nowrap">
            Divine Aura
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              data-testid={`nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
              className={`
                font-body text-xs tracking-wider uppercase whitespace-nowrap
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
            className="relative p-2 hover:bg-pastel-purple/20 rounded-full transition-colors ml-2"
            data-testid="cart-icon"
          >
            <ShoppingBag size={20} className="text-charcoal" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pastel-pink to-pastel-purple text-white text-xs rounded-full flex items-center justify-center font-body">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Cart Icon */}
        <Link
          to="/cart"
          className="relative p-2 md:hidden"
          data-testid="mobile-cart-icon"
        >
          <ShoppingBag size={20} className="text-charcoal" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-pastel-pink to-pastel-purple text-white text-xs rounded-full flex items-center justify-center font-body">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>

      {/* Mobile Navigation Bar - Visible Menu Items */}
      <div 
        className="md:hidden fixed top-14 left-0 right-0 z-40 bg-gradient-to-r from-pastel-pink/30 via-pastel-lavender/30 to-pastel-mint/30 backdrop-blur-md border-b border-white/40"
        data-testid="mobile-nav-bar"
      >
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex items-center gap-1 px-3 py-2 min-w-max">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`mobile-nav-link-${link.name.toLowerCase().replace(' ', '-')}`}
                className={`
                  font-body text-[11px] tracking-wide uppercase whitespace-nowrap
                  px-3 py-1.5 rounded-full transition-all duration-300
                  ${isActive(link.path) 
                    ? 'bg-charcoal text-white' 
                    : 'bg-white/60 text-text-secondary hover:bg-white/90'
                  }
                `}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
