import React from 'react';
import { Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, compact = false }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div 
      className="group luxury-card overflow-hidden flex flex-col h-full"
      data-testid={`product-card-${product.id}`}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-warm-surface">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Aura Tag */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-1 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-body tracking-wider uppercase text-text-secondary">
            {product.auraTag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 relative z-20">
        <h3 className={`font-display text-charcoal mb-1 leading-tight ${compact ? 'text-sm' : 'text-base'}`}>
          {compact ? product.shortName : product.name}
        </h3>
        <p className="font-body text-text-secondary text-xs leading-relaxed mb-3 flex-1 line-clamp-2">
          {product.benefit}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="font-display text-lg text-charcoal">
            ₹{product.price}
          </span>
          <button
            onClick={handleAddToCart}
            className="relative z-30 flex items-center gap-1 px-3 py-2 bg-charcoal text-white rounded-full text-xs font-body tracking-wider uppercase hover:bg-charcoal/90 transition-colors cursor-pointer"
            data-testid={`add-to-cart-${product.id}`}
            type="button"
          >
            <Plus size={14} />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
