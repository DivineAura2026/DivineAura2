import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  Upload, RotateCcw, ShoppingBag, Sparkles, 
  Paintbrush, Eraser, Undo2, Trash2, Eye, EyeOff,
  Minus, Plus
} from 'lucide-react';
import { virtualTryOnShades, intensityLevels, getProductByShade, brushSettings } from '../data/virtualTryOn';
import { useCart } from '../context/CartContext';
import { AuraBlob } from '../components/AuraBlob';

const VirtualStudioPage = () => {
  const [searchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const initialCategory = searchParams.get('cat') || 'lipstick';
  const initialShade = searchParams.get('shade') || null;

  // Core state
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [selectedShade, setSelectedShade] = useState(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  
  // Brush state
  const [activeTool, setActiveTool] = useState('brush'); // 'brush' or 'eraser'
  const [brushSize, setBrushSize] = useState(30);
  const [isDrawing, setIsDrawing] = useState(false);
  
  // Canvas history for undo
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Refs
  const canvasRef = useRef(null);
  const overlayCanvasRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageRef = useRef(null);
  const lastPointRef = useRef(null); // Track last point for smooth lines

  // Set initial shade from URL param
  useEffect(() => {
    if (initialShade && activeCategory) {
      const shade = virtualTryOnShades[activeCategory]?.find(s => s.id === initialShade);
      if (shade) {
        setSelectedShade(shade);
      }
    }
  }, [initialShade, activeCategory]);

  // Update brush size when category changes
  useEffect(() => {
    if (activeCategory && brushSettings[activeCategory]) {
      setBrushSize(brushSettings[activeCategory].defaultSize);
    }
  }, [activeCategory]);

  // Initialize canvas when image loads
  useEffect(() => {
    if (uploadedImage && canvasRef.current && overlayCanvasRef.current) {
      const img = new Image();
      img.onload = () => {
        imageRef.current = img;
        const canvas = canvasRef.current;
        const overlay = overlayCanvasRef.current;
        
        // Set canvas size to match container aspect ratio
        const container = containerRef.current;
        if (container) {
          const rect = container.getBoundingClientRect();
          canvas.width = rect.width;
          canvas.height = rect.height;
          overlay.width = rect.width;
          overlay.height = rect.height;
          
          // Draw image on main canvas
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          // Clear overlay
          const overlayCtx = overlay.getContext('2d');
          overlayCtx.clearRect(0, 0, overlay.width, overlay.height);
          
          // Reset history
          setHistory([]);
          setHistoryIndex(-1);
        }
      };
      img.src = uploadedImage;
    }
  }, [uploadedImage]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
        setHistory([]);
        setHistoryIndex(-1);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setSelectedShade(null);
    setAddedToCart(false);
    // Clear overlay when changing category
    if (overlayCanvasRef.current) {
      const ctx = overlayCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
      setHistory([]);
      setHistoryIndex(-1);
    }
  };

  const handleShadeSelect = (shade) => {
    setSelectedShade(shade);
    setAddedToCart(false);
    setActiveTool('brush');
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setSelectedShade(null);
    setAddedToCart(false);
    setHistory([]);
    setHistoryIndex(-1);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClearOverlay = () => {
    if (overlayCanvasRef.current) {
      // Save state before clearing
      saveToHistory();
      const ctx = overlayCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
    }
  };

  const handleAddToCart = () => {
    if (!selectedShade) return;
    const product = getProductByShade(activeCategory, selectedShade.id);
    if (product) {
      addToCart(product);
      setAddedToCart(true);
    }
  };

  // Save canvas state to history
  const saveToHistory = useCallback(() => {
    if (!overlayCanvasRef.current) return;
    
    const canvas = overlayCanvasRef.current;
    const imageData = canvas.toDataURL();
    
    // Remove any redo states
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(imageData);
    
    // Keep only last 10 states
    if (newHistory.length > 10) {
      newHistory.shift();
    }
    
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  // Undo function
  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      
      const img = new Image();
      img.onload = () => {
        const ctx = overlayCanvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
        ctx.drawImage(img, 0, 0);
      };
      img.src = history[newIndex];
    } else if (historyIndex === 0) {
      // Clear to initial state
      const ctx = overlayCanvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, overlayCanvasRef.current.width, overlayCanvasRef.current.height);
      setHistoryIndex(-1);
    }
  };

  // Get brush color - returns rgba object with exact swatch color
  const getBrushColorRGBA = () => {
    if (!selectedShade) return { r: 0, g: 0, b: 0, a: 0 };
    const hex = selectedShade.color;
    
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    
    // Use category-specific opacity for natural look
    let baseOpacity;
    if (activeCategory === 'lipstick') {
      baseOpacity = 0.85; // Strong color for lips
    } else if (activeCategory === 'blush') {
      baseOpacity = 0.6; // Softer for cheeks
    } else {
      baseOpacity = 0.7; // Glow for strobe
    }
    
    return { r, g, b, a: baseOpacity };
  };

  // Get position relative to canvas
  const getCanvasPosition = (e) => {
    const canvas = overlayCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  // Draw a smooth line between two points
  const drawSmoothLine = (fromX, fromY, toX, toY) => {
    if (!overlayCanvasRef.current || !selectedShade) return;
    
    const ctx = overlayCanvasRef.current.getContext('2d');
    const color = getBrushColorRGBA();
    
    ctx.save();
    
    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = brushSize;
      ctx.strokeStyle = 'rgba(0,0,0,1)';
      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
    } else {
      // Use source-over to paint the actual color on top
      ctx.globalCompositeOperation = 'source-over';
      
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.lineWidth = brushSize;
      
      // Calculate distance for interpolation
      const dx = toX - fromX;
      const dy = toY - fromY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const steps = Math.max(1, Math.floor(distance / 3)); // More steps = smoother
      
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        const x = fromX + dx * t;
        const y = fromY + dy * t;
        
        // Create gradient for soft brush effect at each point
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushSize / 2);
        
        if (activeCategory === 'lipstick') {
          // Satin finish - cleaner edges
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.9})`);
          gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.7})`);
          gradient.addColorStop(0.8, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.4})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        } else if (activeCategory === 'blush') {
          // Soft diffused - feathered edges
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.6})`);
          gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.4})`);
          gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.2})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        } else if (activeCategory === 'strobe') {
          // Soft glow - highlight effect
          gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5})`);
          gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.35})`);
          gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.15})`);
          gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
        }
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Add subtle shimmer for strobe
      if (activeCategory === 'strobe' && settings.shimmer && distance > 5) {
        ctx.globalCompositeOperation = 'lighter';
        const shimmerX = (fromX + toX) / 2 + (Math.random() - 0.5) * brushSize * 0.4;
        const shimmerY = (fromY + toY) / 2 + (Math.random() - 0.5) * brushSize * 0.4;
        const shimmerGradient = ctx.createRadialGradient(
          shimmerX, shimmerY, 0,
          shimmerX, shimmerY, brushSize * 0.08
        );
        shimmerGradient.addColorStop(0, `rgba(255, 255, 255, ${color.a * 0.25})`);
        shimmerGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = shimmerGradient;
        ctx.beginPath();
        ctx.arc(shimmerX, shimmerY, brushSize * 0.08, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.restore();
  };

  // Draw a single point (for initial click)
  const drawPoint = (x, y) => {
    if (!overlayCanvasRef.current || !selectedShade) return;
    
    const ctx = overlayCanvasRef.current.getContext('2d');
    const settings = brushSettings[activeCategory];
    const color = getBrushColorRGBA();
    
    ctx.save();
    
    if (activeTool === 'eraser') {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      if (settings.blendMode === 'screen') {
        ctx.globalCompositeOperation = 'screen';
      } else {
        ctx.globalCompositeOperation = 'multiply';
      }
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, brushSize / 2);
      
      if (activeCategory === 'lipstick') {
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.9})`);
        gradient.addColorStop(0.5, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.7})`);
        gradient.addColorStop(0.8, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.4})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      } else if (activeCategory === 'blush') {
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.6})`);
        gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.4})`);
        gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.2})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      } else if (activeCategory === 'strobe') {
        gradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.5})`);
        gradient.addColorStop(0.3, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.35})`);
        gradient.addColorStop(0.6, `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a * 0.15})`);
        gradient.addColorStop(1, `rgba(${color.r}, ${color.g}, ${color.b}, 0)`);
      }
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
    
    ctx.restore();
  };

  // Mouse/Touch event handlers
  const handleStart = (e) => {
    if (!selectedShade || !showOverlay) return;
    e.preventDefault();
    setIsDrawing(true);
    saveToHistory();
    const pos = getCanvasPosition(e);
    lastPointRef.current = pos;
    drawPoint(pos.x, pos.y);
  };

  const handleMove = (e) => {
    if (!isDrawing || !selectedShade || !showOverlay) return;
    e.preventDefault();
    const pos = getCanvasPosition(e);
    
    if (lastPointRef.current) {
      drawSmoothLine(lastPointRef.current.x, lastPointRef.current.y, pos.x, pos.y);
    }
    
    lastPointRef.current = pos;
  };

  const handleEnd = () => {
    setIsDrawing(false);
    lastPointRef.current = null;
  };

  // Category icons
  const categories = [
    { id: 'lipstick', name: 'Lipstick', icon: '💄' },
    { id: 'blush', name: 'Blush', icon: '🌸' },
    { id: 'strobe', name: 'Strobe Cream', icon: '✨' },
  ];

  const currentBrushSettings = brushSettings[activeCategory] || brushSettings.lipstick;

  return (
    <main className="min-h-screen pt-14 md:pt-0 overflow-hidden" data-testid="virtual-studio-page">
      {/* Hero Header */}
      <section className="relative pt-24 md:pt-32 pb-6 section-padding">
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
              Try your shade. Paint your glow. Decide with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding pt-0 pb-12">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-10">
            {/* Left: Canvas Area */}
            <div className="order-2 lg:order-1">
              <div 
                ref={containerRef}
                className="relative aspect-[3/4] bg-gradient-to-br from-pastel-pink/20 via-white to-pastel-lavender/20 rounded-2xl overflow-hidden border-2 border-dashed border-gray-200"
                style={{ touchAction: 'none' }}
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
                    {/* Base image canvas */}
                    <canvas
                      ref={canvasRef}
                      className="absolute inset-0 w-full h-full"
                    />
                    
                    {/* Overlay canvas for painting */}
                    <canvas
                      ref={overlayCanvasRef}
                      className="absolute inset-0 w-full h-full"
                      style={{ 
                        cursor: selectedShade ? (activeTool === 'eraser' ? 'crosshair' : 'crosshair') : 'default',
                        opacity: showOverlay ? 1 : 0,
                        transition: 'opacity 0.2s ease'
                      }}
                      onMouseDown={handleStart}
                      onMouseMove={handleMove}
                      onMouseUp={handleEnd}
                      onMouseLeave={handleEnd}
                      onTouchStart={handleStart}
                      onTouchMove={handleMove}
                      onTouchEnd={handleEnd}
                    />

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

                    {/* Bottom toolbar */}
                    {selectedShade && (
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg">
                        {/* Tool buttons */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setActiveTool('brush')}
                            className={`p-2.5 rounded-lg transition-all ${
                              activeTool === 'brush' 
                                ? 'bg-purple-500 text-white shadow-md' 
                                : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                            }`}
                            title="Brush"
                            data-testid="brush-tool"
                          >
                            <Paintbrush size={18} />
                          </button>
                          <button
                            onClick={() => setActiveTool('eraser')}
                            className={`p-2.5 rounded-lg transition-all ${
                              activeTool === 'eraser' 
                                ? 'bg-purple-500 text-white shadow-md' 
                                : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                            }`}
                            title="Eraser"
                            data-testid="eraser-tool"
                          >
                            <Eraser size={18} />
                          </button>
                          <div className="w-px h-6 bg-gray-300 mx-1" />
                          <button
                            onClick={handleUndo}
                            disabled={historyIndex < 0}
                            className={`p-2.5 rounded-lg transition-all ${
                              historyIndex < 0
                                ? 'bg-gray-50 text-gray-300 cursor-not-allowed'
                                : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                            }`}
                            title="Undo"
                            data-testid="undo-btn"
                          >
                            <Undo2 size={18} />
                          </button>
                          <button
                            onClick={handleClearOverlay}
                            className="p-2.5 rounded-lg bg-gray-100 text-charcoal hover:bg-red-100 hover:text-red-600 transition-all"
                            title="Clear All"
                            data-testid="clear-all-btn"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                        
                        {/* Before/After Toggle */}
                        <button
                          onClick={() => setShowOverlay(!showOverlay)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-body font-medium transition-all ${
                            showOverlay 
                              ? 'bg-purple-500 text-white' 
                              : 'bg-gray-200 text-charcoal'
                          }`}
                          data-testid="before-after-toggle"
                        >
                          {showOverlay ? (
                            <>
                              <Eye size={14} />
                              <span>After</span>
                            </>
                          ) : (
                            <>
                              <EyeOff size={14} />
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
            <div className="order-1 lg:order-2 space-y-5">
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
                          ? 'border-purple-400 bg-pastel-lavender/20 shadow-md'
                          : 'border-gray-200 hover:border-purple-200'
                      }`}
                      data-testid={`shade-${shade.id}`}
                    >
                      <div
                        className="w-12 h-12 rounded-full border-2 border-white shadow-md"
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

              {/* Brush Controls */}
              {selectedShade && uploadedImage && (
                <>
                  {/* Brush Size */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-body text-sm text-text-muted">Brush Size</p>
                      <span className="font-body text-xs text-charcoal bg-gray-100 px-2 py-1 rounded">
                        {brushSize}px
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setBrushSize(Math.max(currentBrushSettings.minSize, brushSize - 5))}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Minus size={16} className="text-charcoal" />
                      </button>
                      <input
                        type="range"
                        min={currentBrushSettings.minSize}
                        max={currentBrushSettings.maxSize}
                        value={brushSize}
                        onChange={(e) => setBrushSize(parseInt(e.target.value))}
                        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
                        data-testid="brush-size-slider"
                      />
                      <button
                        onClick={() => setBrushSize(Math.min(currentBrushSettings.maxSize, brushSize + 5))}
                        className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <Plus size={16} className="text-charcoal" />
                      </button>
                    </div>
                  </div>

                  {/* Intensity */}
                  <div>
                    <p className="font-body text-sm text-text-muted mb-2">Intensity / Opacity</p>
                    <div className="flex gap-2">
                      {['light', 'medium', 'bold'].map((level) => (
                        <button
                          key={level}
                          onClick={() => setIntensity(level)}
                          className={`flex-1 py-2.5 rounded-lg font-body text-sm capitalize transition-all ${
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

                  {/* Brush Info */}
                  <div className="p-3 bg-pastel-mint/20 rounded-lg border border-pastel-mint/40">
                    <p className="font-body text-xs text-charcoal">
                      <strong>{currentBrushSettings.name}:</strong> {currentBrushSettings.description}
                    </p>
                  </div>
                </>
              )}

              {/* Selected Shade Info & Add to Cart */}
              {selectedShade && (
                <div className="p-4 bg-gradient-to-r from-pastel-pink/20 to-pastel-lavender/20 rounded-xl border border-pastel-lavender/30">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-14 h-14 rounded-full border-2 border-white shadow-md"
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

              {/* Instructions */}
              {uploadedImage && selectedShade && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="font-body text-xs text-text-muted leading-relaxed">
                    <strong>How to use:</strong> Select a shade, then paint on your selfie. 
                    Use the eraser to remove mistakes. Adjust brush size and intensity for best results.
                    Toggle Before/After to compare.
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
