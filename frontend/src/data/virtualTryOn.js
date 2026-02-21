// Divine Aura Virtual Try-On Shades Database
// tryOnEnabled: true means the product appears in Aura Virtual Studio

export const virtualTryOnShades = {
  lipstick: [
    {
      id: 'red-earth-aura',
      name: 'Red Earth Aura',
      description: 'Reddish Brown',
      color: '#8C3B32',
      // Warm reddish brown, brick-terracotta depth
      // Optimized for medium Indian skin
      productId: 18,
      tryOnEnabled: true,
    },
  ],
  blush: [
    {
      id: 'soft-petal-deep',
      name: 'Soft Petal Deep',
      description: 'Deeper Rosy Pink',
      color: '#C97B84',
      // Slightly deeper than soft pink, flattering on medium skin
      // Warm rose-pink tone
      productId: 19,
      tryOnEnabled: true,
    },
  ],
  strobe: [
    {
      id: 'golden-aura-glow',
      name: 'Golden Aura Glow',
      description: 'Pinkish Golden Highlight',
      color: '#E8CDB5',
      // Soft pink-gold champagne for medium skin
      // Subtle radiance, not icy silver or white
      shimmer: true,
      productId: 20,
      tryOnEnabled: true,
    },
  ],
};

// Demo products for Virtual Try-On (Phase 1)
export const virtualTryOnProducts = [
  {
    id: 18,
    name: 'Red Earth Aura Ritual – Satin Lipstick',
    shortName: 'Red Earth Aura Lipstick',
    category: 'Makeup',
    subcategory: 'Lipstick',
    price: 699,
    benefit: 'Warm reddish brown lipstick with satin matte finish',
    auraTag: 'Earth Glow',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: ['Shea Butter', 'Vitamin E', 'Jojoba Oil', 'Natural Pigments'],
    featured: true,
    tryOnEnabled: true,
    tryOnShade: 'red-earth-aura',
    tryOnCategory: 'lipstick',
  },
  {
    id: 19,
    name: 'Soft Petal Deep Ritual – Cream Blush',
    shortName: 'Soft Petal Deep Blush',
    category: 'Makeup',
    subcategory: 'Blush',
    price: 599,
    benefit: 'Deeper rosy pink cream blush for a natural flush on medium skin',
    auraTag: 'Rose Radiance',
    image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: ['Rose Extract', 'Vitamin E', 'Coconut Oil', 'Mica'],
    featured: true,
    tryOnEnabled: true,
    tryOnShade: 'soft-petal-deep',
    tryOnCategory: 'blush',
  },
  {
    id: 20,
    name: 'Golden Aura Glow Ritual – Strobe Cream',
    shortName: 'Golden Aura Strobe',
    category: 'Makeup',
    subcategory: 'Strobe Cream',
    price: 799,
    benefit: 'Pinkish golden highlighter for luminous, radiant skin',
    auraTag: 'Golden Aura',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: ['Pearl Powder', 'Hyaluronic Acid', 'Vitamin C', 'Mica'],
    featured: true,
    tryOnEnabled: true,
    tryOnShade: 'golden-aura-glow',
    tryOnCategory: 'strobe',
  },
];

// Get shade by category and ID
export const getShade = (category, shadeId) => {
  const categoryShades = virtualTryOnShades[category];
  if (!categoryShades) return null;
  return categoryShades.find(s => s.id === shadeId);
};

// Get all try-on enabled products
export const getTryOnProducts = () => {
  return virtualTryOnProducts.filter(p => p.tryOnEnabled);
};

// Get product by try-on shade
export const getProductByShade = (category, shadeId) => {
  return virtualTryOnProducts.find(p => p.tryOnCategory === category && p.tryOnShade === shadeId);
};

// Brush settings per category
export const brushSettings = {
  lipstick: {
    name: 'Satin Finish',
    defaultSize: 15,
    minSize: 5,
    maxSize: 40,
    softness: 0.3, // Lower = cleaner edges
    blendMode: 'multiply',
    description: 'Smooth satin finish with clean edges',
  },
  blush: {
    name: 'Soft Diffused',
    defaultSize: 40,
    minSize: 20,
    maxSize: 80,
    softness: 0.8, // Higher = more feathered
    blendMode: 'multiply',
    description: 'Feathered edges for natural cheek tint',
  },
  strobe: {
    name: 'Glow Brush',
    defaultSize: 35,
    minSize: 15,
    maxSize: 70,
    softness: 0.7,
    blendMode: 'screen',
    shimmer: true,
    description: 'Soft glow with subtle shimmer effect',
  },
};

// Intensity/Opacity levels
export const intensityLevels = {
  light: 0.35,
  medium: 0.55,
  bold: 0.8,
};

// Get all shades for a category (for future dynamic loading)
export const getShadesByCategory = (category) => {
  return virtualTryOnShades[category]?.filter(s => s.tryOnEnabled) || [];
};
