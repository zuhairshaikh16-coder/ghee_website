import React from 'react';
import { Zap, ShieldCheck, Leaf, Dumbbell } from 'lucide-react';
import { CORE_BENEFITS } from '../data/products';

export const BenefitsSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap':
        return <Zap className="w-6 h-6 text-amber-600" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-amber-600" />;
      case 'Leaf':
        return <Leaf className="w-6 h-6 text-amber-600" />;
      case 'Dumbbell':
        return <Dumbbell className="w-6 h-6 text-amber-600" />;
      default:
        return <Zap className="w-6 h-6 text-amber-600" />;
    }
  };

  return (
    <section id="benefits" className="py-16 sm:py-24 bg-[#FFFDF9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#B45309] mb-2">
            Health & Energy Vitality
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1406] tracking-tight">
            Nourishment Proven Across Generations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C4535] leading-relaxed">
            More than just a sweet treat, traditional Panjiri is a restorative functional superfood designed to replenish stamina, strengthen bone density, and provide sustained energy.
          </p>
        </div>

        {/* 4 Poster Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_BENEFITS.map((benefit) => (
            <div
              key={benefit.id}
              className="p-6 bg-[#FCFAF7] border border-[#EBE4D8] rounded-2xl flex flex-col justify-between hover:border-amber-400 transition-all hover:-translate-y-1 duration-300 shadow-sm"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100/70 flex items-center justify-center mb-5">
                  {getIcon(benefit.icon)}
                </div>
                <h3 className="font-display text-lg font-bold text-[#2A1406] tracking-tight">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm text-[#5C4535] leading-relaxed">
                  {benefit.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EBE4D8] text-xs font-semibold text-[#8A5A36]">
                100% Traditional Formulation
              </div>
            </div>
          ))}
        </div>

        {/* Pure Desi Goodness Guarantee */}
        <div className="mt-12 p-6 sm:p-8 bg-[#F5EFE6] border border-[#E5DACB] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="font-display text-xl font-bold text-[#2A1406]">
              Pure Desi Goodness Guarantee
            </h4>
            <p className="text-sm text-[#5C4535] mt-1 max-w-2xl">
              Every single batch of our Panjiri is crafted only upon order to guarantee maximum crunch, fresh roasted nuts, and divine aroma. Zero refined white sugar options available.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="text-sm font-semibold text-[#2A1406] bg-white px-4 py-2 rounded-xl border border-amber-200 shadow-sm">
              No Chemicals · No Preservatives · 100% Asli Desi Ghee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
