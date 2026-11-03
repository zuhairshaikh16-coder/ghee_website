import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { HeroVideo } from './components/HeroVideo';
import { HowItsMadeVideoSection } from './components/HowItsMadeVideoSection';
import { ProductCard } from './components/ProductCard';
import { BilonaProcessSection } from './components/BilonaProcessSection';
import { BenefitsSection } from './components/BenefitsSection';
import { CartDrawer } from './components/CartDrawer';
import { OriginalPosterModal } from './components/OriginalPosterModal';
import { DownloadZipModal } from './components/DownloadZipModal';
import { Footer } from './components/Footer';
import { PRODUCTS } from './data/products';
import { Product, ProductWeightOption, CartItem, Category } from './types';
import { MessageCircle, ShoppingBag, Sparkles, Image as ImageIcon, Download, Video } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);
  const [isDownloadZipOpen, setIsDownloadZipOpen] = useState(false);

  // Filtered products list
  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return PRODUCTS;
    return PRODUCTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const panjiriProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'panjiri'),
    []
  );

  const gheeProducts = useMemo(
    () => PRODUCTS.filter((p) => p.category === 'ghee'),
    []
  );

  // Add to cart handler
  const handleAddToCart = (product: Product, weight: ProductWeightOption) => {
    const calculatedPrice = Math.round(product.pricePerKgOrLitre * weight.multiplier);
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedWeight.label === weight.label
      );
      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx].quantity += 1;
        return next;
      }
      return [
        ...prev,
        {
          product,
          selectedWeight: weight,
          quantity: 1,
          price: calculatedPrice,
        },
      ];
    });
  };

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(index);
      return;
    }
    setCartItems((prev) => {
      const next = [...prev];
      next[index].quantity = newQty;
      return next;
    });
  };

  const handleRemoveItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Quick WhatsApp Order
  const handleQuickWhatsApp = (product: Product, weight: ProductWeightOption) => {
    const price = Math.round(product.pricePerKgOrLitre * weight.multiplier);
    const message = `*INQUIRY / ORDER - DESI GHEE & PANJIRI*%0A%0AHello! I want to order:%0A*Product:* ${product.name}%0A*Size / Weight:* ${weight.label}%0A*Price:* Rs. ${price.toLocaleString('en-US')}%0A%0APlease let me know the availability and payment options for delivery.`;
    const url = `https://api.whatsapp.com/send?phone=923252873391&text=${message}`;
    window.open(url, '_blank');
  };

  const scrollToMenu = () => {
    const element = document.getElementById('menu');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#291B13] flex flex-col selection:bg-amber-500/20">
      {/* Top Banner with Free Delivery notice & Instant 1-Click VS Code Download */}
      <div className="bg-[#2A1406] text-[#FDE68A] text-[11px] sm:text-xs py-2 px-4 border-b border-amber-950/40 flex flex-wrap items-center justify-center gap-2 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 mx-auto   ">
          <span>✨ Pure Desi Goodness · 100% Asli Desi Ghee</span>
          <span className="hidden lg:inline text-amber-500">|</span>
          <a
            href="https://instagram.com/desixghee.insta"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline hover:underline text-amber-300 font-semibold"
          >
            @desixghee
          </a>
        </div>

        {/* High visibility 1-click download trigger */}

      </div>

      {/* Top Navigation Bar */}
      <Navbar
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenDownloadZip={() => setIsDownloadZipOpen(true)}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
        activeSection="menu"
      />

      <main className="flex-1">
        {/* Hero Section with Animated Video and Generative AI Canvas */}
        <HeroVideo
          onExploreMenu={scrollToMenu}
          onOpenOriginalPoster={() => setIsPosterModalOpen(true)}
          onDownloadZip={() => setIsDownloadZipOpen(true)}
        />

        {/* Original Menu Spotlight Bar */}
                {/* Interactive Video: How Ghee & Panjiri Is Made */}
        <HowItsMadeVideoSection />

        {/* Product Catalog Section */}
        <section id="menu" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="text-xs font-semibold tracking-wider uppercase text-[#B45309] mb-2">
              Our Handcrafted Varieties
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1406] tracking-tight">
              Panjiri Menu & Pure Desi Ghee
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#5C4535] leading-relaxed">
              Every preparation is slow-roasted in pure Asli Desi Ghee with authentic whole ingredients. Select your custom pack size (250g, 500g, 1kg, 2kg).
            </p>

            {/* Interactive Category Filter Segmented Control */}
            <div className="inline-flex items-center gap-1.5 p-1.5 mt-8 bg-[#F2ECE1] rounded-2xl border border-[#DFD3C2]">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === 'all'
                    ? 'bg-[#2A1406] text-white shadow-sm'
                    : 'text-[#614532] hover:text-[#2A1406] hover:bg-white/50'
                }`}
              >
                All Products ({PRODUCTS.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('panjiri')}
                className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === 'panjiri'
                    ? 'bg-[#2A1406] text-white shadow-sm'
                    : 'text-[#614532] hover:text-[#2A1406] hover:bg-white/50'
                }`}
              >
                Panjiri Varieties ({panjiriProducts.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('ghee')}
                className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                  selectedCategory === 'ghee'
                    ? 'bg-[#2A1406] text-white shadow-sm'
                    : 'text-[#614532] hover:text-[#2A1406] hover:bg-white/50'
                }`}
              >
                Pure Desi Ghee ({gheeProducts.length})
              </button>
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onQuickWhatsApp={handleQuickWhatsApp}
              />
            ))}
          </div>
        </section>

        {/* Traditional Crafting Method */}
        <BilonaProcessSection />

        {/* 4 Poster Health & Energy Pillars */}
        <BenefitsSection />

        {/* Instagram & Community Callout */}
        <section className="py-16 bg-[#FDF9F2] border-t border-[#E8DFD1]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
            <span className="text-xs font-semibold tracking-wider uppercase text-[#B45309]">
              Connect With Us On Instagram
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#2A1406]">
              Follow @desixghee for Daily Kitchen Preparation Videos
            </h3>
            <p className="text-sm sm:text-base text-[#614532] max-w-xl mx-auto">
              Watch our live morning butter churning, slow roasting of nuts, and seasonal winter panjiri batches on Instagram reels.
            </p>
            <div className="pt-2">
              <a
                href="https://instagram.com/desixghee"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D97706] to-[#B45309] text-white font-semibold text-sm rounded-xl shadow-md hover:from-[#B45309] hover:to-[#92400E] transition-all transform hover:-translate-y-0.5"
              >
                <span>Visit Instagram @desixghee</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer
        onOpenDownloadZip={() => setIsDownloadZipOpen(true)}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
      />

      {/* Floating Bottom Action for Mobile (Under 15% mobile viewport cap) */}
      <div className="sm:hidden fixed bottom-3 inset-x-3 z-30 flex items-center gap-2 p-1.5 bg-[#2A1406]/95 backdrop-blur-md text-white rounded-2xl shadow-xl border border-amber-900/40">
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex-1 py-2.5 px-3 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer text-amber-200"
        >
          <ShoppingBag className="w-4 h-4 text-amber-300" />
          <span>Bag ({totalCartCount})</span>
        </button>

        <a
          href="https://api.whatsapp.com/send?phone=923001234567&text=Assalam%20o%20Alaikum!%20I%20would%20like%20to%20order%20Desi%20Ghee%20and%20Panjiri."
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 py-2.5 px-3 bg-[#15803D] hover:bg-[#166534] rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer text-white"
        >
          <MessageCircle className="w-4 h-4" />
          <span>WhatsApp Order</span>
        </a>
      </div>

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      <OriginalPosterModal
        isOpen={isPosterModalOpen}
        onClose={() => setIsPosterModalOpen(false)}
      />

      <DownloadZipModal
        isOpen={isDownloadZipOpen}
        onClose={() => setIsDownloadZipOpen(false)}
      />
    </div>
  );
}
