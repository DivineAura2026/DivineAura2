import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Upload, RotateCcw, ShoppingBag, Sparkles, Move, Maximize2 } from 'lucide-react';
import { virtualTryOnShades, overlaySettings, intensityLevels, getProductByShade } from '../data/virtualTryOn';
import { useCart } from '../context/CartContext';
import { AuraBlob } from '../components/AuraBlob';

const VirtualStudioPage = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  // Initialize from URL params
  const initialCategory = searchParams.get('cat') || 'lipstick';
  const initialShade = searchParams.get('shade') || null;

  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedShade, setSelectedShade] = useState(null);
  const [intensity, setIntensity] = useState('medium');
  const [overlayPosition, setOverlayPosition] = useState({ x: 150, y: 200 });
  const [overlaySize, setOverlaySize] = useState({ width: 80, height: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });

  // Set initial shade from URL param
  useEffect(() => {
    if (initialShade && activeCategory) {
      const shade = virtualTryOnShades[activeCategory]?.find(s => s.id === initialShade);
      if (shade) {
        setSelectedShade(shade);
        const settings = overlaySettings[activeCategory];
        setOverlaySize(settings.defaultSize);
      }
    }
  }, [initialShade, activeCategory]);

  // Update overlay size when category changes
  useEffect(() => {
    const settings = overlaySettings[activeCategory];
    setOverlaySize(settings.defaultSize);
  }, [activeCategory]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setOverlayPosition({ x: 150, y: 200 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedShade(null);
    setAddedToCart(false);
  };

  const handleShadeSelect = (shade) => {
    setSelectedShade(shade);
    setAddedToCart(false);
  };

  const handleReset = () => {
    setSelectedShade(null);
    setIntensity('medium');
    const settings = overlaySettings[activeCategory];
    setOverlaySize(settings.defaultSize);
    setOverlayPosition({ x: 150, y: 200 });
    setAddedToCart(false);
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setSelectedShade(null);
    setAddedToCart(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAddToCart = () => {
    if (!selectedShade) return;
    const product = getProductByShade(activeCategory, selectedShade.id);
    if (product) {
      addToCart(product);
      setAddedToCart(true);
    }
  };

  // Drag handlers
  const handleMouseDown = useCallback((e, type) => {
    e.preventDefault();
    if (type === 'drag') {
      setIsDragging(true);
    } else if (type === 'resize') {
      setIsResizing(true);
    }
    dragStartPos.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (isDragging) {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;
      setOverlayPosition(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY,
      }));
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    } else if (isResizing) {
      const deltaX = e.clientX - dragStartPos.current.x;
      const deltaY = e.clientY - dragStartPos.current.y;
      setOverlaySize(prev => ({
        width: Math.max(30, prev.width + deltaX),
        height: Math.max(15, prev.height + deltaY),
      }));
      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  }, [isDragging, isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Get overlay styles
  const getOverlayStyle = () => {
    if (!selectedShade) return {};
    
    const settings = overlaySettings[activeCategory];
    const intensityValue = intensityLevels[intensity];
    
    // Parse the rgba color and adjust opacity
    const baseColor = selectedShade.overlayColor;
    const rgbaMatch = baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+),?\s*([\d.]+)?\)/);
    
    let adjustedColor = baseColor;
    if (rgbaMatch) {
      const [, r, g, b] = rgbaMatch;
      adjustedColor = `rgba(${r}, ${g}, ${b}, ${intensityValue})`;
    }

    return {
      position: 'absolute',
      left: overlayPosition.x,
      top: overlayPosition.y,
      width: overlaySize.width,
      height: overlaySize.height,
      backgroundColor: adjustedColor,
      borderRadius: settings.borderRadius,
      filter: `blur(${settings.blur}px)`,
      mixBlendMode: settings.blendMode,
      cursor: isDragging ? 'grabbing' : 'grab',
      transition: isDragging || isResizing ? 'none' : 'all 0.2s ease',
    };
  };

  const categories = [
    { id: 'lipstick', name: 'Lipstick', icon: '💄' },
    { id: 'blush', name: 'Blush', icon: '🌸' },
    { id: 'strobe', name: 'Strobe Cream', icon: '✨' },
  ];

  return (
    <main className="min-h-screen pt-14 md:pt-0 overflow-hidden" data-testid="virtual-studio-page">
      {/* Hero Header */}
      <section className="relative pt-24 md:pt-32 pb-8 section-padding">
        <AuraBlob color="purple" size="lg" className="absolute -right-40 top-20 opacity-10" />
        
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-pastel-lavender/30 rounded-full mb-4">
              <Sparkles size={16} className="text-purple-500" />
              <span className="font-body text-sm text-charcoal">Virtual Try-On</span>
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-charcoal mb-3">
              Aura <span className="italic aura-text">Virtual Studio</span>
            </h1>
            <p className="font-body text-text-secondary">
              Preview shades on your selfie before you buy
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding pt-0">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left: Canvas Area */}
            <div className="order-2 lg:order-1">
              <div 
                ref={canvasRef}
                className="relative aspect-[3/4] bg-gradient-to-br from-pastel-pink/20 via-white to-pastel-lavender/20 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200"
              >
                {!uploadedImage ? (
                  <div 
                    className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer hover:bg-pastel-lavender/10 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="w-20 h-20 rounded-full bg-pastel-lavender/30 flex items-center justify-center mb-4">
                      <Upload size={32} className="text-purple-500" />
                    </div>
                    <p className="font-display text-lg text-charcoal mb-2">Upload Your Selfie</p>
                    <p className="font-body text-sm text-text-muted">JPG or PNG, max 5MB</p>
                  </div>
                ) : (
                  <>
                    <img
                      src={uploadedImage}
                      alt="Your selfie"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay */}
                    {selectedShade && (
                      <div
                        style={getOverlayStyle()}
                        onMouseDown={(e) => handleMouseDown(e, 'drag')}
                        data-testid="shade-overlay"
                      >
                        {/* Resize handle */}
                        <div
                          className="absolute -right-2 -bottom-2 w-4 h-4 bg-white rounded-full border-2 border-purple-400 cursor-se-resize shadow-md"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            handleMouseDown(e, 'resize');
                          }}
                        />
                      </div>
                    )}

                    {/* Controls overlay */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={handleClearImage}
                        className="p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition-colors"
                        title="Remove image"
                      >
                        <RotateCcw size={18} className="text-charcoal" />
                      </button>
                    </div>

                    {/* Drag hint */}
                    {selectedShade && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-center gap-2 p-2 bg-white/80 backdrop-blur-sm rounded-lg">
                        <Move size={14} className="text-text-muted" />
                        <span className="font-body text-xs text-text-muted">Drag to position</span>
                        <Maximize2 size={14} className="text-text-muted ml-2" />
                        <span className="font-body text-xs text-text-muted">Drag corner to resize</span>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleImageUpload}
                className="hidden"
                data-testid="image-upload-input"
              />
            </div>

            {/* Right: Controls */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Category Tabs */}
              <div>
                <p className="font-body text-sm text-text-muted mb-3">Select Category</p>
                <div className="flex gap-2 flex-wrap">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryChange(cat.id)}
                      className={`px-4 py-2 rounded-full font-body text-sm transition-all ${
                        activeCategory === cat.id
                          ? 'bg-charcoal text-white'
                          : 'bg-pastel-lavender/30 text-charcoal hover:bg-pastel-lavender/50'
                      }`}
                      data-testid={`category-${cat.id}`}
                    >
                      <span className="mr-1">{cat.icon}</span>
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shade Selection */}
              <div>
                <p className="font-body text-sm text-text-muted mb-3">Select Shade</p>
                <div className="flex gap-3 flex-wrap">
                  {virtualTryOnShades[activeCategory]?.map((shade) => (
                    <button
                      key={shade.id}
                      onClick={() => handleShadeSelect(shade)}
                      className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${
                        selectedShade?.id === shade.id
                          ? 'border-purple-400 bg-pastel-lavender/20'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                      data-testid={`shade-${shade.id}`}
                    >
                      <div
                        className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                        style={{ backgroundColor: shade.color }}
                      />
                      <div className="text-left">
                        <p className="font-display text-sm text-charcoal">{shade.name}</p>
                        <p className="font-body text-xs text-text-muted">{shade.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Intensity Slider */}
              {selectedShade && (
                <div>
                  <p className="font-body text-sm text-text-muted mb-3">Intensity</p>
                  <div className="flex gap-2">
                    {['light', 'medium', 'bold'].map((level) => (
                      <button
                        key={level}
                        onClick={() => setIntensity(level)}
                        className={`flex-1 py-2 rounded-lg font-body text-sm capitalize transition-all ${
                          intensity === level
                            ? 'bg-charcoal text-white'
                            : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                        }`}
                        data-testid={`intensity-${level}`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Reset Button */}
              {selectedShade && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 font-body text-sm text-text-muted hover:text-charcoal transition-colors"
                >
                  <RotateCcw size={14} />
                  Reset Overlay
                </button>
              )}

              {/* Selected Shade Info & Add to Cart */}
              {selectedShade && (
                <div className="p-4 bg-gradient-to-r from-pastel-pink/20 to-pastel-lavender/20 rounded-xl border border-pastel-lavender/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                      style={{ backgroundColor: selectedShade.color }}
                    />
                    <div>
                      <p className="font-display text-lg text-charcoal">{selectedShade.name}</p>
                      <p className="font-body text-sm text-text-muted capitalize">
                        {activeCategory === 'strobe' ? 'Strobe Cream' : activeCategory} • {selectedShade.description}
                      </p>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={addedToCart}
                    className={`w-full py-3 rounded-full font-body text-sm tracking-wider uppercase flex items-center justify-center gap-2 transition-all ${
                      addedToCart
                        ? 'bg-green-500 text-white'
                        : 'bg-charcoal text-white hover:bg-charcoal/90'
                    }`}
                    data-testid="add-to-cart-studio"
                  >
                    <ShoppingBag size={16} />
                    {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
                  </button>
                </div>
              )}

              {/* Disclaimer */}
              <p className="font-body text-xs text-text-muted leading-relaxed">
                Virtual preview is a digital simulation. Actual shade may vary depending on lighting and skin tone.
              </p>

              {/* Link to Shop */}
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 font-body text-sm text-purple-600 hover:text-purple-800 transition-colors"
              >
                Browse all products →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default VirtualStudioPage;
