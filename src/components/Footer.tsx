import React from 'react';
import { Instagram, MessageCircle, Download, FileText, Heart } from 'lucide-react';

interface FooterProps {
  onOpenDownloadZip: () => void;
  onOpenPosterModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDownloadZip, onOpenPosterModal }) => {
  return (
    <footer className="bg-[#1A0C04] text-[#E0D1C1] border-t border-amber-950/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-amber-900/40">
          {/* Col 1: Brand & Origin */}
          <div className="space-y-4 md:col-span-1">
            <h3 className="font-display text-xl font-bold text-white tracking-tight">
              DESI GHEE & PANJIRI
            </h3>
            <p className="text-xs text-[#BFA894] leading-relaxed">
              Pure Desi Goodness · Traditional Taste. Handcrafting authentic traditional Panjiri varieties and cultured Desi Ghee with pure dedication and zero adulteration.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com/desixghee.insta"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#FBBF24] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=923252873391"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Panjiri Varieties with Rs. currency */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FCD34D]">
              Panjiri Menu
            </h4>
            <ul className="text-xs space-y-2 text-[#C4B2A0]">
              <li>Classic Panjiri (Rs. 4000/kg)</li>
              <li>Gond Panjiri (Rs. 4400/kg)</li>
              <li>Dry Fruits Panjiri (Rs. 4800/kg)</li>
              <li>Protein Panjiri (Rs. 5000/kg)</li>
              <li>Sugar Free Panjiri (Rs. 3600/kg)</li>
              <li>Special Panjiri (Rs. 6000/kg)</li>
            </ul>
          </div>

          {/* Col 3: Pure Ghee */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FCD34D]">
              Pure Desi Ghee
            </h4>
            <ul className="text-xs space-y-2 text-[#C4B2A0]">
              <li>Pure Asli Desi Cow Ghee (Danedar)</li>
              <li>Pure Traditional Buffalo Ghee</li>
              <li>Traditional Danedar Desi Ghee</li>
              <li>Zero Preservatives, 100% Pure</li>
            </ul>
          </div>

          {/* Col 4: Quick Actions & VS Code Source */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#FCD34D]">
              Developer & Poster
            </h4>
            <div className="space-y-2">
              <button
                onClick={onOpenPosterModal}
                className="w-full text-left py-2 px-3 text-xs font-medium text-amber-200 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>View Original Menu Poster</span>
                <FileText className="w-3.5 h-3.5" />
              </button>

             
            </div>
            <p className="text-[11px] text-[#9A816E]">
              Fresh batch prepared upon order demand. Fast and secure delivery.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8F7764]">
          <div>
            © {new Date().getFullYear()} Desi Ghee & Panjiri (@desixghee). All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>Pure Desi Goodness & Traditional Taste</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
