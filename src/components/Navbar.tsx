import React, { useState } from 'react';
import { ShoppingBag, Download, Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenDownloadZip: () => void;
  onOpenPosterModal: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenDownloadZip,
  onOpenPosterModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-[#E8DFD3] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* ZONE 1: Single Brand Wordmark Element */}
          <a
            href="/"
            className="flex items-center gap-2 group whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 rounded-lg"
          >
            <img
                    src="/assets/aistudio/logo.png"
                    alt="Desi Ghee"
                    className="h-12 sm:h-20 w-auto max-w-[180px] object-contain shrink-0"
            />
          </a>

          {/* ZONE 2: 4–5 Clean Single-Line Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#5C3D28]">
            <a
              href="#how-its-made"
              className="text-[#B45309] font-semibold hover:text-[#7A3606] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <span>Watch Making Video</span>
            </a>
            <a
              href="#menu"
              className="hover:text-[#A14E15] transition-colors whitespace-nowrap shrink-0"
            >
              Panjiri Menu
            </a>
            <a
              href="#menu"
              className="hover:text-[#A14E15] transition-colors whitespace-nowrap shrink-0"
            >
              Pure Desi Ghee
            </a>
            <a
              href="#bilona-process"
              className="hover:text-[#A14E15] transition-colors whitespace-nowrap shrink-0"
            >
              Craft Method
            </a>
           
          </nav>

          {/* ZONE 3: 1 Primary Action Area (Cart & VS Code Download) */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
           

            {/* Shopping Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#2A1407] hover:bg-[#43200A] active:bg-[#1A0A02] rounded-xl transition-all shadow-sm flex items-center gap-2 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-700"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#FDE68A]" />
              <span className="hidden sm:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold text-[#1F0C02] bg-[#FBBF24] rounded-full tabular-nums">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#5C3D28] hover:text-[#2D1406] hover:bg-amber-100/50 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#E8DFD3] bg-[#FFFDF9] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <a
            href="#menu"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#3E2312] hover:bg-amber-50 rounded-lg"
          >
            Panjiri Varieties (from ₹1,200/kg)
          </a>
          <a
            href="#ghee"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#3E2312] hover:bg-amber-50 rounded-lg"
          >
            Pure Desi Ghee
          </a>
          <a
            href="#bilona-process"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#3E2312] hover:bg-amber-50 rounded-lg"
          >
            Vedic Bilona Method
          </a>
          <a
            href="#benefits"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 text-base font-medium text-[#3E2312] hover:bg-amber-50 rounded-lg"
          >
            Health & Energy Benefits
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenPosterModal();
            }}
            className="w-full text-left px-3 py-2 text-base font-medium text-[#854D0E] hover:bg-amber-50 rounded-lg flex items-center justify-between"
          >
            <span>Original Menu Poster</span>
            <FileText className="w-4 h-4" />
          </button>
          <div className="pt-2 border-t border-amber-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownloadZip();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-[#854D0E] bg-[#FEF3C7] border border-[#FCD34D] rounded-lg flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-[#B45309]" />
            
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
