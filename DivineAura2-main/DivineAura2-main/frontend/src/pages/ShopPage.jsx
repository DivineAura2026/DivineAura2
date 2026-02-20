import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter } from 'lucide-react';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { AuraBlob } from '../components/AuraBlob';

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <main className="overflow-hidden min-h-screen" data-testid="shop-page">
      {/* Hero */}
      <section className="relative pt-32 pb-16 section-padding">
        <AuraBlob color="purple" size="lg" className="absolute -right-40 top-20 opacity-10" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-body text-sm tracking-[0.2em] uppercase text-text-muted mb-4">
              The Divine Collection
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-charcoal mb-4">
              Shop <span className="italic aura-text">Rituals</span>
            </h1>
            <p className="font-body text-text-secondary">
              Aura-aligned clean beauty products, self-manufactured in small batches.
            </p>
          </div>
        </div>
      </section>

      {/* Shop Content */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Categories */}
            <aside className="lg:w-64 flex-shrink-0">
              {/* Mobile Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 mb-4 font-body text-sm text-charcoal"
              >
                <Filter size={18} />
                Filter by Category
              </button>

              <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
                <h3 className="font-display text-lg text-charcoal mb-4">Categories</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`block w-full text-left px-4 py-2 rounded-lg font-body text-sm transition-colors ${
                      selectedCategory === 'All'
                        ? 'bg-charcoal text-white'
                        : 'text-text-secondary hover:bg-warm-surface'
                    }`}
                  >
                    All Products ({products.length})
                  </button>
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`block w-full text-left px-4 py-2 rounded-lg font-body text-sm transition-colors ${
                        selectedCategory === cat
                          ? 'bg-charcoal text-white'
                          : 'text-text-secondary hover:bg-warm-surface'
                      }`}
                    >
                      {cat} ({products.filter(p => p.category === cat).length})
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-6">
                <p className="font-body text-sm text-text-muted">
                  {filteredProducts.length} products
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map(product => (
                  <Link key={product.id} to={`/shop/${product.id}`}>
                    <ProductCard product={product} compact />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ShopPage;
