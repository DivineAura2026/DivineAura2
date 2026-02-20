// Divine Aura Virtual Try-On Shades Database
// tryOnEnabled: true means the product appears in Aura Virtual Studio

export const virtualTryOnShades = {
  lipstick: [
    {
      id: 'peach-veil',
      name: 'Peach Veil',
      description: 'Soft Warm Nude',
      color: '#E8A090',
      overlayColor: 'rgba(232, 160, 144, 0.7)',
      productId: 18, // Link to product in main catalog
      tryOnEnabled: true,
    },
  ],
  blush: [
    {
      id: 'soft-petal',
      name: 'Soft Petal',
      description: 'Rosy Pink',
      color: '#E8B4B8',
      overlayColor: 'rgba(232, 180, 184, 0.5)',
      productId: 19,
      tryOnEnabled: true,
    },
  ],
  strobe: [
    {
      id: 'pearl-glow',
      name: 'Pearl Glow',
      description: 'Champagne Highlight',
      color: '#F5E6D3',
      overlayColor: 'rgba(245, 230, 211, 0.4)',
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
    name: 'Peach Veil Ritual – Satin Lipstick',
    shortName: 'Peach Veil Lipstick',
    category: 'Makeup',
    subcategory: 'Lipstick',
    price: 699,
    benefit: 'Soft warm nude lipstick with satin matte finish',
    auraTag: 'Peach Glow',
    image: 'https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: ['Shea Butter', 'Vitamin E', 'Jojoba Oil', 'Natural Pigments'],
    featured: false,
    tryOnEnabled: true,
    tryOnShade: 'peach-veil',
    tryOnCategory: 'lipstick',
  },
  {
    id: 19,
    name: 'Soft Petal Ritual – Cream Blush',
    shortName: 'Soft Petal Blush',
    category: 'Makeup',
    subcategory: 'Blush',
    price: 599,
    benefit: 'Buildable rosy pink cream blush for a natural flush',
    auraTag: 'Pink Radiance',
    image: 'https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: ['Rose Extract', 'Vitamin E', 'Coconut Oil', 'Mica'],
    featured: false,
    tryOnEnabled: true,
    tryOnShade: 'soft-petal',
    tryOnCategory: 'blush',
  },
  {
    id: 20,
    name: 'Pearl Glow Ritual – Strobe Cream',
    shortName: 'Pearl Glow Strobe',
    category: 'Makeup',
    subcategory: 'Strobe Cream',
    price: 799,
    benefit: 'Champagne highlighter for luminous, dewy skin',
    auraTag: 'Golden Aura',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=600',
    ingredients: ['Pearl Powder', 'Hyaluronic Acid', 'Vitamin C', 'Mica'],
    featured: false,
    tryOnEnabled: true,
    tryOnShade: 'pearl-glow',
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

// Overlay settings per category
export const overlaySettings = {
  lipstick: {
    defaultSize: { width: 80, height: 30 },
    blendMode: 'multiply',
    blur: 0,
    borderRadius: '40%',
  },
  blush: {
    defaultSize: { width: 100, height: 60 },
    blendMode: 'soft-light',
    blur: 15,
    borderRadius: '50%',
  },
  strobe: {
    defaultSize: { width: 120, height: 40 },
    blendMode: 'overlay',
    blur: 20,
    borderRadius: '50%',
  },
};

// Intensity multipliers - increased for better visibility
export const intensityLevels = {
  light: 0.5,
  medium: 0.75,
  bold: 1.0,
};
