import React from 'react';
import { BILONA_STEPS } from '../data/products';

export const BilonaProcessSection: React.FC = () => {
  return (
    <section id="bilona-process" className="py-16 sm:py-24 bg-[#F8F3EA] border-y border-[#E8DFD1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-wider uppercase text-[#B45309] mb-2">
            Traditional Heritage Craft
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2A1406] tracking-tight">
            The 5-Stage Wooden Churning Method
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#5C4535] leading-relaxed">
            Unlike industrial centrifugal processing, our ghee is cultured from fresh dahi and hand-churned bi-directionally with wooden mathanis to protect delicate aroma and natural vitamins.
          </p>
        </div>

        {/* 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Visual Showcase (Photo + Traditional Quote) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="relative rounded-3xl overflow-hidden border border-[#DFD3C2] shadow-md h-full min-h-[360px] bg-[#E8DFD1]">
              <img
                src="/images/tradition_vedic_bilona_1793636457582.jpg"
                alt="Traditional Churning of cultured butter in earthen pot"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs font-semibold text-[#FCD34D] uppercase tracking-wider block mb-1">
                  Pure Craftsmanship
                </span>
                <p className="font-display text-xl sm:text-2xl font-bold leading-snug">
                  "Only butter derived from cultured curd produces true aromatic, grainy danedar ghee."
                </p>
                <p className="text-xs text-amber-200 mt-2">
                  — Time-tested heirloom method
                </p>
              </div>
            </div>
          </div>

          {/* Steps List */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            {BILONA_STEPS.map((step) => (
              <div
                key={step.step}
                className="p-5 sm:p-6 bg-[#FCFAF7] border border-[#EBE4D8] rounded-2xl hover:border-[#D4AF37] transition-colors shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#B45309] shrink-0 tabular-nums">
                    {step.step}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-[#2A1406]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#5C4535] mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
