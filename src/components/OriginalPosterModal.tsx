import React from 'react';
import { X, Download, Instagram, Sparkles } from 'lucide-react';

interface OriginalPosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OriginalPosterModal: React.FC<OriginalPosterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative max-w-2xl w-full bg-[#FCFAF7] rounded-3xl overflow-hidden shadow-2xl border border-amber-900/20 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#2A1406] text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-display text-lg font-bold">Original Panjiri Menu Poster</h3>
              <p className="text-xs text-amber-200">Pure Desi Goodness • Traditional Taste</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Poster Viewer */}
        <div className="overflow-y-auto p-4 sm:p-6 bg-[#1A0C04] flex items-center justify-center">
          <img
            src="/assets/aistudio/7bac042b-9584-437f-9534-415622ce73ac.jfif.png"
            alt="Original Panjiri Menu Poster"
            className="max-h-[68vh] w-auto rounded-xl shadow-lg border border-amber-700/30 object-contain"
          />
        </div>

        {/* Footer info & Instagram channel */}
        <div className="px-6 py-4 bg-[#F5EFE6] border-t border-[#E5DACB] flex flex-wrap items-center justify-between gap-3 text-xs text-[#523A29]">
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-pink-600" />
            <span className="font-medium">Follow us on Instagram:</span>
            <a
              href="https://instagram.com/desixghee"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#8A4616] hover:underline"
            >
              @desixghee
            </a>
          </div>

          <a
            href="/assets/aistudio/image_9615a613.png"
            download="panjiri-menu-poster.png"
            className="px-3.5 py-1.5 bg-[#2A1406] text-white rounded-lg hover:bg-[#43200A] transition-colors flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-amber-300" />
            <span>Save Poster</span>
          </a>
        </div>
      </div>
    </div>
  );
};
