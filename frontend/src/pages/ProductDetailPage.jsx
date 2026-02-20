import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Check, Sparkles } from 'lucide-react';
import { getProductById, products } from '../data/products';
import { virtualTryOnProducts } from '../data/virtualTryOn';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams();
  // Try to find product in main catalog first, then in virtual try-on products
  let product = getProductById(id);
  if (!product) {
    product = virtualTryOnProducts.find(p => p.id === parseInt(id));
  }
  const { addToCart, cartItems } = useCart();
  
  const isInCart = cartItems.some(item => item.id === product?.id);
  
  // Check if product has virtual try-on enabled
  const tryOnProduct = virtualTryOnProducts.find(p => p.id === product?.id);
  const hasTryOn = tryOnProduct?.tryOnEnabled;

  if (!product) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-2xl text-charcoal mb-4">Product not found</h1>
          <Link to="/shop" className="btn-secondary">Back to Shop</Link>
        </div>
      </main>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="overflow-hidden min-h-screen pt-28" data-testid="product-detail-page">
      <div className="container-custom section-padding pt-8">
        {/* Back Link */}
        <Link 
          to="/shop" 
          className="inline-flex items-center gap-2 font-body text-sm text-text-secondary hover:text-charcoal mb-8"
        >
          <ArrowLeft size={16} />
          Back to Shop
        </Link>

        {/* Product Detail */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-warm-surface">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="lg:py-8">
            {/* Aura Tag */}
            <span className="inline-block px-3 py-1 bg-gradient-to-r from-aura-purple/10 to-aura-blue/10 rounded-full text-xs font-body tracking-wider uppercase text-charcoal mb-4">
              {product.auraTag}
            </span>

            <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-4">
              {product.name}
            </h1>

            <p className="font-body text-lg text-text-secondary mb-6">
              {product.benefit}
            </p>

            <p className="font-display text-3xl text-charcoal mb-8">
              ₹{product.price}
            </p>

            {/* Add to Cart */}
            <button
              onClick={() => addToCart(product)}
              className={`w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-body text-sm tracking-wider uppercase transition-all duration-300 ${
                isInCart 
                  ? 'bg-green-600 text-white'
                  : 'bg-charcoal text-white hover:bg-charcoal/90'
              }`}
              data-testid="add-to-cart-detail"
            >
              {isInCart ? (
                <>
                  <Check size={18} />
                  Added to Cart
                </>
              ) : (
                <>
                  <Plus size={18} />
                  Add to Cart
                </>
              )}
            </button>

            {/* Try This Shade in Aura Studio Button */}
            {hasTryOn && (
              <Link
                to={`/virtual-studio?cat=${tryOnProduct.tryOnCategory}&shade=${tryOnProduct.tryOnShade}`}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 mt-4 rounded-full font-body text-sm tracking-wider uppercase transition-all duration-300 bg-gradient-to-r from-pastel-pink to-pastel-lavender text-charcoal hover:shadow-lg border border-purple-200"
                data-testid="try-shade-button"
              >
                <Sparkles size={18} />
                Try This Shade in Aura Studio
              </Link>
            )}

            {/* Ingredients */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="font-display text-lg text-charcoal mb-4">Key Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ing, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 bg-warm-surface rounded-full font-body text-sm text-text-secondary"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Best For */}
            <div className="mt-8">
              <h3 className="font-display text-lg text-charcoal mb-2">Best For Aura</h3>
              <p className="font-body text-text-secondary">{product.auraTag}</p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-20">
            <h2 className="font-display text-2xl text-charcoal mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map(p => (
                <Link key={p.id} to={`/shop/${p.id}`}>
                  <ProductCard product={p} compact />
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default ProductDetailPage;
