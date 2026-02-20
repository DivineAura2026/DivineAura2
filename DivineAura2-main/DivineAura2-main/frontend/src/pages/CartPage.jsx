import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <main className="min-h-screen flex items-center justify-center" data-testid="cart-empty">
        <div className="text-center px-6">
          <div className="w-20 h-20 rounded-full bg-warm-surface flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={32} className="text-text-muted" />
          </div>
          <h1 className="font-display text-2xl text-charcoal mb-4">Your cart is empty</h1>
          <p className="font-body text-text-secondary mb-8">
            Discover our aura-aligned rituals and start your journey.
          </p>
          <Link to="/shop" className="btn-primary">
            Shop Now
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-28" data-testid="cart-page">
      <div className="container-custom section-padding pt-8">
        <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-8">
          Your <span className="aura-text">Cart</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div 
                key={item.id}
                className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100"
                data-testid={`cart-item-${item.id}`}
              >
                {/* Image */}
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-warm-surface flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/shop/${item.id}`}
                    className="font-display text-base text-charcoal hover:underline line-clamp-1"
                  >
                    {item.shortName}
                  </Link>
                  <p className="font-body text-sm text-text-muted mb-2">{item.auraTag}</p>
                  <p className="font-display text-lg text-charcoal">₹{item.price}</p>
                </div>

                {/* Quantity & Remove */}
                <div className="flex flex-col items-end justify-between">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-1 text-text-muted hover:text-red-500 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="font-body text-sm w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={clearCart}
              className="font-body text-sm text-text-muted hover:text-red-500 transition-colors"
            >
              Clear Cart
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="luxury-card p-6 sticky top-28">
              <h2 className="font-display text-xl text-charcoal mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-text-secondary">Subtotal</span>
                  <span className="text-charcoal">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-text-secondary">Shipping</span>
                  <span className="text-charcoal">{cartTotal >= 999 ? 'Free' : '₹99'}</span>
                </div>
                {cartTotal < 999 && (
                  <p className="font-body text-xs text-text-muted">
                    Add ₹{999 - cartTotal} more for free shipping
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between font-display text-lg">
                  <span className="text-charcoal">Total</span>
                  <span className="text-charcoal">
                    ₹{cartTotal >= 999 ? cartTotal : cartTotal + 99}
                  </span>
                </div>
              </div>

              <button className="btn-primary w-full flex items-center justify-center gap-2">
                Checkout
                <ArrowRight size={16} />
              </button>

              <Link 
                to="/shop"
                className="block text-center font-body text-sm text-text-secondary hover:text-charcoal mt-4"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CartPage;
