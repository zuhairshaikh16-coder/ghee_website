import React, { useState } from 'react';
import { ShoppingBag, MessageCircle, Check, Info } from 'lucide-react';
import { Product, ProductWeightOption } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, weight: ProductWeightOption) => void;
  onQuickWhatsApp: (product: Product, weight: ProductWeightOption) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickWhatsApp,
}) => {
  const [selectedWeight, setSelectedWeight] = useState<ProductWeightOption>(
    product.weightOptions[1] || product.weightOptions[0]
  );
  const [addedAnimation, setAddedAnimation] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Dynamic price calculation
  const calculatedPrice = Math.round(product.pricePerKgOrLitre * selectedWeight.multiplier);

  const handleAdd = () => {
    onAddToCart(product, selectedWeight);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  return (
    <article className="group relative bg-[#FCFAF7] border border-[#EBE4D8] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Product Image Frame */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F4EDE2]">
          <img
            src={product.image}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

          {/* Micro Status Flag */}
          {product.isBestseller && (
            <span className="absolute top-3 left-3 bg-[#B45309] text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
              Bestseller
            </span>
          )}
          {product.isSpecial && (
            <span className="absolute top-3 left-3 bg-[#9333EA] text-white text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded shadow-sm">
              Royal Batch
            </span>
          )}

          {/* Base Unit Tag with Rs. currency */}
          <div className="absolute bottom-2.5 right-3 text-right">
            <span className="text-white text-xs font-semibold drop-shadow-md tabular-nums">
              Rs. {product.pricePerKgOrLitre.toLocaleString('en-US')}/{product.category === 'panjiri' ? 'kg' : 'L'}
            </span>
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 sm:p-6 space-y-3">
          {/* Unboxed clean metadata line */}
          <div className="flex items-center gap-1.5 text-xs text-[#8A5A36] font-medium">
            <span>{product.category === 'panjiri' ? 'Traditional Panjiri' : 'Pure Cultured Ghee'}</span>
            <span aria-hidden="true">·</span>
            <span>{product.nutrition.shelfLife}</span>
          </div>

          <div>
            <h3 className="font-display text-xl font-bold text-[#2A1406] group-hover:text-[#A14E15] transition-colors">
              {product.name}
            </h3>
            {product.subtitle && (
              <p className="text-xs text-[#7A5B45] font-medium mt-0.5">
                {product.subtitle}
              </p>
            )}
          </div>

          <p className="text-sm text-[#5C4535] line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          {/* Highlights */}
          <ul className="text-xs text-[#4F3624] space-y-1 pt-1">
            {product.highlights.slice(0, 2).map((item, idx) => (
              <li key={idx} className="flex items-center gap-1.5">
                <span className="text-[#B45309] font-bold">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          {/* Weight / Pack Size Selector (interactive button controls) */}
          <div className="pt-2">
            <label className="block text-xs font-medium text-[#7A5B45] mb-1.5">
              Select Quantity / Weight:
            </label>
            <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F2ECE1] rounded-xl">
              {product.weightOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setSelectedWeight(opt)}
                  className={`py-1.5 px-1 text-xs font-semibold rounded-lg transition-all cursor-pointer text-center ${
                    selectedWeight.label === opt.label
                      ? 'bg-[#2A1406] text-white shadow-sm'
                      : 'text-[#614532] hover:text-[#2A1406] hover:bg-white/60'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing & Purchase Controls */}
      <div className="p-5 sm:p-6 pt-0 border-t border-[#EBE4D8]/70 mt-2">
        <div className="flex items-baseline justify-between pt-3 pb-3">
          <div>
            <div className="text-[11px] text-[#8C6445]">Price for {selectedWeight.label}:</div>
            <div className="text-2xl font-bold text-[#2A1406] font-display tabular-nums">
              Rs. {calculatedPrice.toLocaleString('en-US')}
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-[#8A5A36] hover:text-[#2A1406] flex items-center gap-1 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{showDetails ? 'Hide' : 'Nutrients'}</span>
          </button>
        </div>

        {/* Nutritional popover if open */}
        {showDetails && (
          <div className="mb-3 p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-[#523A29] space-y-1">
            <div className="font-semibold text-[#3D2517]">Key Nutritional Profile:</div>
            <div className="flex justify-between">
              <span>Energy:</span>
              <span className="font-medium tabular-nums">{product.nutrition.energy}</span>
            </div>
            <div className="flex justify-between">
              <span>Natural Protein:</span>
              <span className="font-medium tabular-nums">{product.nutrition.protein}</span>
            </div>
            <div className="flex justify-between">
              <span>Healthy Good Fats:</span>
              <span className="font-medium tabular-nums">{product.nutrition.goodFats}</span>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={handleAdd}
            className={`py-2.5 px-3 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-700 text-white'
                : 'bg-[#2A1406] hover:bg-[#43200A] text-white active:scale-95'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-4 h-4 text-emerald-200" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 text-amber-200" />
                <span>Add to Bag</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onQuickWhatsApp(product, selectedWeight)}
            className="py-2.5 px-3 rounded-xl font-semibold text-xs sm:text-sm bg-[#15803D] hover:bg-[#166534] text-white flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
            title="Direct WhatsApp Order"
          >
            <MessageCircle className="w-4 h-4 text-green-200" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  );
};
