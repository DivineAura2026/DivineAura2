import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Upload, RotateCcw, ShoppingBag, Sparkles, Move, ZoomIn, ZoomOut, Eye, EyeOff } from 'lucide-react';
import { virtualTryOnShades, intensityLevels, getProductByShade } from '../data/virtualTryOn';
import { useCart } from '../context/CartContext';
import { AuraBlob } from '../components/AuraBlob';

const VirtualStudioPage = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const initialCategory = searchParams.get('cat') || 'lipstick';
  const initialShade = searchParams.get('shade') || null;

  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedShade, setSelectedShade] = useState(null);
  const [intensity, setIntensity] = useState('medium');
  const [addedToCart, setAddedToCart] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true); // Before/After toggle
  
  // Overlay positions for each type
  const [lipPosition, setLipPosition] = useState({ x: 50, y: 65 }); // percentage based
  const [lipScale, setLipScale] = useState(1);
  
  const [blushLeftPosition, setBlushLeftPosition] = useState({ x: 25, y: 45 });
  const [blushRightPosition, setBlushRightPosition] = useState({ x: 75, y: 45 });
  const [blushScale, setBlushScale] = useState(1);
  
  const [strobePosition, setStrobePosition] = useState({ x: 50, y: 45 });
  const [strobeScale, setStrobeScale] = useState(1.2);
  
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });

  // Set initial shade from URL param
  useEffect(() => {
    if (initialShade && activeCategory) {
      const shade = virtualTryOnShades[activeCategory]?.find(s => s.id === initialShade);
      if (shade) {
        setSelectedShade(shade);
      }
    }
  }, [initialShade, activeCategory]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        // Reset positions when new image is uploaded
        setLipPosition({ x: 50, y: 68 });
        setBlushLeftPosition({ x: 28, y: 48 });
        setBlushRightPosition({ x: 72, y: 48 });
        setStrobePosition({ x: 50, y: 45 });
        setStrobeScale(1.2);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedShade(null);
    setAddedToCart(false);
    setActiveOverlay(null);
  };

  const handleShadeSelect = (shade) => {
    setSelectedShade(shade);
    setAddedToCart(false);
  };

  const handleReset = () => {
    setSelectedShade(null);
    setIntensity('medium');
    setLipPosition({ x: 50, y: 68 });
    setLipScale(1);
    setBlushLeftPosition({ x: 28, y: 48 });
    setBlushRightPosition({ x: 72, y: 48 });
    setBlushScale(1);
    setStrobePosition({ x: 50, y: 45 });
    setStrobeScale(1.2);
    setAddedToCart(false);
    setActiveOverlay(null);
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setSelectedShade(null);
    setAddedToCart(false);
    setActiveOverlay(null);
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

  const handleScaleChange = (type, delta) => {
    if (type === 'lip') {
      setLipScale(prev => Math.max(0.5, Math.min(2, prev + delta)));
    } else if (type === 'blush') {
      setBlushScale(prev => Math.max(0.5, Math.min(2, prev + delta)));
    } else if (type === 'strobe') {
      setStrobeScale(prev => Math.max(0.5, Math.min(2, prev + delta)));
    }
  };

  // Drag handlers
  const handleMouseDown = useCallback((e, overlayId) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    setActiveOverlay(overlayId);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    
    // Store initial position based on overlay type
    if (overlayId === 'lip') {
      initialPos.current = { ...lipPosition };
    } else if (overlayId === 'blush-left') {
      initialPos.current = { ...blushLeftPosition };
    } else if (overlayId === 'blush-right') {
      initialPos.current = { ...blushRightPosition };
    } else if (overlayId === 'strobe') {
      initialPos.current = { ...strobePosition };
    }
  }, [lipPosition, blushLeftPosition, blushRightPosition, strobePosition]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !activeOverlay || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const deltaX = ((e.clientX - dragStartPos.current.x) / rect.width) * 100;
    const deltaY = ((e.clientY - dragStartPos.current.y) / rect.height) * 100;
    
    const newX = Math.max(5, Math.min(95, initialPos.current.x + deltaX));
    const newY = Math.max(5, Math.min(95, initialPos.current.y + deltaY));
    
    if (activeOverlay === 'lip') {
      setLipPosition({ x: newX, y: newY });
    } else if (activeOverlay === 'blush-left') {
      setBlushLeftPosition({ x: newX, y: newY });
    } else if (activeOverlay === 'blush-right') {
      setBlushRightPosition({ x: newX, y: newY });
    } else if (activeOverlay === 'strobe') {
      setStrobePosition({ x: newX, y: newY });
    }
  }, [isDragging, activeOverlay]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e, overlayId) => {
    e.stopPropagation();
    const touch = e.touches[0];
    setIsDragging(true);
    setActiveOverlay(overlayId);
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
    
    if (overlayId === 'lip') {
      initialPos.current = { ...lipPosition };
    } else if (overlayId === 'blush-left') {
      initialPos.current = { ...blushLeftPosition };
    } else if (overlayId === 'blush-right') {
      initialPos.current = { ...blushRightPosition };
    } else if (overlayId === 'strobe') {
      initialPos.current = { ...strobePosition };
    }
  }, [lipPosition, blushLeftPosition, blushRightPosition, strobePosition]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || !activeOverlay || !containerRef.current) return;
    
    const touch = e.touches[0];
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    
    const deltaX = ((touch.clientX - dragStartPos.current.x) / rect.width) * 100;
    const deltaY = ((touch.clientY - dragStartPos.current.y) / rect.height) * 100;
    
    const newX = Math.max(5, Math.min(95, initialPos.current.x + deltaX));
    const newY = Math.max(5, Math.min(95, initialPos.current.y + deltaY));
    
    if (activeOverlay === 'lip') {
      setLipPosition({ x: newX, y: newY });
    } else if (activeOverlay === 'blush-left') {
      setBlushLeftPosition({ x: newX, y: newY });
    } else if (activeOverlay === 'blush-right') {
      setBlushRightPosition({ x: newX, y: newY });
    } else if (activeOverlay === 'strobe') {
      setStrobePosition({ x: newX, y: newY });
    }
  }, [isDragging, activeOverlay]);

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleTouchMove, handleMouseUp]);

  const getIntensityOpacity = () => intensityLevels[intensity];

  const categories = [
    { id: 'lipstick', name: 'Lipstick', icon: '💄' },
    { id: 'blush', name: 'Blush', icon: '🌸' },
    { id: 'strobe', name: 'Strobe Cream', icon: '✨' },
  ];

  // Render Lipstick overlay - lip-shaped
  const renderLipstickOverlay = () => {
    if (!selectedShade || activeCategory !== 'lipstick') return null;
    const opacity = getIntensityOpacity();
    const color = selectedShade.color;
    
    return (
      <div
        className={`absolute cursor-move ${activeOverlay === 'lip' ? 'z-20' : 'z-10'}`}
        style={{
          left: `${lipPosition.x}%`,
          top: `${lipPosition.y}%`,
          transform: `translate(-50%, -50%) scale(${lipScale})`,
        }}
        onMouseDown={(e) => handleMouseDown(e, 'lip')}
        onTouchStart={(e) => handleTouchStart(e, 'lip')}
        data-testid="lipstick-overlay"
      >
        {/* Upper lip */}
        <svg width="120" height="60" viewBox="0 0 120 60" className="overflow-visible">
          <defs>
            <filter id="lipBlur" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
            </filter>
            <linearGradient id="lipGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity={opacity * 0.8} />
              <stop offset="50%" stopColor={color} stopOpacity={opacity} />
              <stop offset="100%" stopColor={color} stopOpacity={opacity * 0.9} />
            </linearGradient>
          </defs>
          {/* Upper lip shape */}
          <path
            d="M 10,30 Q 30,15 60,20 Q 90,15 110,30 Q 90,35 60,32 Q 30,35 10,30"
            fill="url(#lipGradient)"
            filter="url(#lipBlur)"
            style={{ mixBlendMode: 'multiply' }}
          />
          {/* Lower lip shape */}
          <path
            d="M 15,32 Q 30,35 60,33 Q 90,35 105,32 Q 90,55 60,58 Q 30,55 15,32"
            fill="url(#lipGradient)"
            filter="url(#lipBlur)"
            style={{ mixBlendMode: 'multiply' }}
          />
        </svg>
        {activeOverlay === 'lip' && (
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg" />
        )}
      </div>
    );
  };

  // Render Blush overlay - two circles on cheeks
  const renderBlushOverlay = () => {
    if (!selectedShade || activeCategory !== 'blush') return null;
    const opacity = getIntensityOpacity();
    const color = selectedShade.color;
    
    const blushSize = 100 * blushScale;
    
    return (
      <>
        {/* Left cheek */}
        <div
          className={`absolute cursor-move ${activeOverlay === 'blush-left' ? 'z-20' : 'z-10'}`}
          style={{
            left: `${blushLeftPosition.x}%`,
            top: `${blushLeftPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: `${blushSize}px`,
            height: `${blushSize * 0.7}px`,
            background: `radial-gradient(ellipse at center, ${color} 0%, ${color}88 30%, ${color}44 60%, transparent 80%)`,
            opacity: opacity,
            borderRadius: '50%',
            filter: 'blur(12px)',
            mixBlendMode: 'multiply',
          }}
          onMouseDown={(e) => handleMouseDown(e, 'blush-left')}
          onTouchStart={(e) => handleTouchStart(e, 'blush-left')}
          data-testid="blush-left-overlay"
        >
          {activeOverlay === 'blush-left' && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg" />
          )}
        </div>
        
        {/* Right cheek */}
        <div
          className={`absolute cursor-move ${activeOverlay === 'blush-right' ? 'z-20' : 'z-10'}`}
          style={{
            left: `${blushRightPosition.x}%`,
            top: `${blushRightPosition.y}%`,
            transform: 'translate(-50%, -50%)',
            width: `${blushSize}px`,
            height: `${blushSize * 0.7}px`,
            background: `radial-gradient(ellipse at center, ${color} 0%, ${color}88 30%, ${color}44 60%, transparent 80%)`,
            opacity: opacity,
            borderRadius: '50%',
            filter: 'blur(12px)',
            mixBlendMode: 'multiply',
          }}
          onMouseDown={(e) => handleMouseDown(e, 'blush-right')}
          onTouchStart={(e) => handleTouchStart(e, 'blush-right')}
          data-testid="blush-right-overlay"
        >
          {activeOverlay === 'blush-right' && (
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500 rounded-full border-2 border-white shadow-lg" />
          )}
        </div>
      </>
    );
  };

  // Render Strobe/Highlight overlay - FULL FACE luminous glow
  const renderStrobeOverlay = () => {
    if (!selectedShade || activeCategory !== 'strobe') return null;
    const opacity = getIntensityOpacity();
    const color = selectedShade.color;
    
    // Get container dimensions for full-face coverage
    const baseWidth = 320 * strobeScale;
    const baseHeight = 420 * strobeScale;
    
    return (
      <div
        className={`absolute cursor-move ${activeOverlay === 'strobe' ? 'z-20' : 'z-10'}`}
        style={{
          left: `${strobePosition.x}%`,
          top: `${strobePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          width: `${baseWidth}px`,
          height: `${baseHeight}px`,
          pointerEvents: 'auto',
        }}
        onMouseDown={(e) => handleMouseDown(e, 'strobe')}
        onTouchStart={(e) => handleTouchStart(e, 'strobe')}
        data-testid="strobe-overlay"
      >
        {/* Full face base luminous glow - using screen blend for brightening */}
        <div
          style={{
            position: 'absolute',
            top: '0%',
            left: '5%',
            width: '90%',
            height: '100%',
            background: `radial-gradient(ellipse 80% 85% at 50% 40%, ${color}99 0%, ${color}66 25%, ${color}33 50%, transparent 75%)`,
            opacity: opacity * 0.8,
            borderRadius: '45% 45% 40% 40%',
            filter: 'blur(20px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Forehead highlight - prominent */}
        <div
          style={{
            position: 'absolute',
            top: '2%',
            left: '15%',
            width: '70%',
            height: '22%',
            background: `radial-gradient(ellipse at center, white 0%, ${color} 20%, ${color}aa 40%, transparent 70%)`,
            opacity: opacity * 0.9,
            borderRadius: '50%',
            filter: 'blur(12px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* T-zone highlight - nose bridge */}
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '42%',
            width: '16%',
            height: '35%',
            background: `linear-gradient(to bottom, white 0%, ${color} 30%, ${color}aa 60%, transparent 100%)`,
            opacity: opacity * 0.7,
            borderRadius: '30%',
            filter: 'blur(8px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Left cheekbone highlight - larger */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '5%',
            width: '35%',
            height: '20%',
            background: `radial-gradient(ellipse at center, white 0%, ${color} 25%, ${color}88 50%, transparent 80%)`,
            opacity: opacity * 0.85,
            borderRadius: '50%',
            filter: 'blur(15px)',
            mixBlendMode: 'screen',
            transform: 'rotate(-15deg)',
          }}
        />
        
        {/* Right cheekbone highlight - larger */}
        <div
          style={{
            position: 'absolute',
            top: '35%',
            right: '5%',
            width: '35%',
            height: '20%',
            background: `radial-gradient(ellipse at center, white 0%, ${color} 25%, ${color}88 50%, transparent 80%)`,
            opacity: opacity * 0.85,
            borderRadius: '50%',
            filter: 'blur(15px)',
            mixBlendMode: 'screen',
            transform: 'rotate(15deg)',
          }}
        />
        
        {/* Under eye area - subtle brightening */}
        <div
          style={{
            position: 'absolute',
            top: '32%',
            left: '18%',
            width: '25%',
            height: '10%',
            background: `radial-gradient(ellipse at center, ${color} 0%, ${color}66 50%, transparent 80%)`,
            opacity: opacity * 0.6,
            borderRadius: '50%',
            filter: 'blur(10px)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '32%',
            right: '18%',
            width: '25%',
            height: '10%',
            background: `radial-gradient(ellipse at center, ${color} 0%, ${color}66 50%, transparent 80%)`,
            opacity: opacity * 0.6,
            borderRadius: '50%',
            filter: 'blur(10px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Cupid's bow highlight */}
        <div
          style={{
            position: 'absolute',
            top: '62%',
            left: '38%',
            width: '24%',
            height: '8%',
            background: `radial-gradient(ellipse at center, white 0%, ${color} 40%, transparent 80%)`,
            opacity: opacity * 0.7,
            borderRadius: '50%',
            filter: 'blur(6px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Chin highlight */}
        <div
          style={{
            position: 'absolute',
            bottom: '5%',
            left: '30%',
            width: '40%',
            height: '15%',
            background: `radial-gradient(ellipse at center, ${color} 0%, ${color}88 40%, transparent 80%)`,
            opacity: opacity * 0.6,
            borderRadius: '50%',
            filter: 'blur(12px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Inner corner eye highlights */}
        <div
          style={{
            position: 'absolute',
            top: '28%',
            left: '35%',
            width: '12%',
            height: '8%',
            background: `radial-gradient(circle, white 0%, ${color} 40%, transparent 75%)`,
            opacity: opacity * 0.5,
            borderRadius: '50%',
            filter: 'blur(5px)',
            mixBlendMode: 'screen',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '28%',
            right: '35%',
            width: '12%',
            height: '8%',
            background: `radial-gradient(circle, white 0%, ${color} 40%, transparent 75%)`,
            opacity: opacity * 0.5,
            borderRadius: '50%',
            filter: 'blur(5px)',
            mixBlendMode: 'screen',
          }}
        />
        
        {activeOverlay === 'strobe' && (
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-purple-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <Move size={10} className="text-white" />
          </div>
        )}
      </div>
    );
  };

  const getCurrentScale = () => {
    if (activeCategory === 'lipstick') return lipScale;
    if (activeCategory === 'blush') return blushScale;
    if (activeCategory === 'strobe') return strobeScale;
    return 1;
  };

  const getCurrentScaleType = () => {
    if (activeCategory === 'lipstick') return 'lip';
    if (activeCategory === 'blush') return 'blush';
    if (activeCategory === 'strobe') return 'strobe';
    return 'lip';
  };

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
                ref={containerRef}
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
                    
                    {/* Overlays - conditionally rendered based on Before/After toggle */}
                    {showOverlay && (
                      <>
                        {renderLipstickOverlay()}
                        {renderBlushOverlay()}
                        {renderStrobeOverlay()}
                      </>
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
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-2 bg-white/90 backdrop-blur-sm rounded-lg shadow-sm">
                        <div className="flex items-center gap-2">
                          <Move size={14} className="text-purple-500" />
                          <span className="font-body text-xs text-charcoal">
                            {activeCategory === 'blush' 
                              ? 'Drag each cheek blush to position' 
                              : 'Drag overlay to position on face'}
                          </span>
                        </div>
                        
                        {/* Before/After Toggle */}
                        <button
                          onClick={() => setShowOverlay(!showOverlay)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-body transition-all ${
                            showOverlay 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-gray-200 text-charcoal'
                          }`}
                          data-testid="before-after-toggle"
                        >
                          {showOverlay ? (
                            <>
                              <Eye size={12} />
                              <span>After</span>
                            </>
                          ) : (
                            <>
                              <EyeOff size={12} />
                              <span>Before</span>
                            </>
                          )}
                        </button>
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

              {/* Size Control */}
              {selectedShade && uploadedImage && (
                <div>
                  <p className="font-body text-sm text-text-muted mb-3">
                    Overlay Size: {Math.round(getCurrentScale() * 100)}%
                  </p>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={() => handleScaleChange(getCurrentScaleType(), -0.1)}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      disabled={getCurrentScale() <= 0.5}
                    >
                      <ZoomOut size={18} className="text-charcoal" />
                    </button>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-400 transition-all"
                        style={{ width: `${((getCurrentScale() - 0.5) / 1.5) * 100}%` }}
                      />
                    </div>
                    <button
                      onClick={() => handleScaleChange(getCurrentScaleType(), 0.1)}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      disabled={getCurrentScale() >= 2}
                    >
                      <ZoomIn size={18} className="text-charcoal" />
                    </button>
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

              {/* Tips */}
              {uploadedImage && selectedShade && (
                <div className="p-3 bg-pastel-mint/20 rounded-lg border border-pastel-mint/40">
                  <p className="font-body text-xs text-charcoal leading-relaxed">
                    <strong>Tip:</strong> {
                      activeCategory === 'lipstick' 
                        ? 'Position the lip overlay on your lips. Use size controls to match your lip size.'
                        : activeCategory === 'blush'
                        ? 'Position each blush circle on your cheeks. You can move them independently.'
                        : 'Position the highlight overlay on your face. It includes forehead, nose, cheekbones, and chin highlights.'
                    }
                  </p>
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
