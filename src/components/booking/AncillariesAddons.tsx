'use client';

import React from 'react';
import { DINING_MENUS } from '@/data/diningMenus';
import { useDirection } from '@/hooks/useDirection';
import { Utensils, Luggage, Shield, Sparkles, Check } from 'lucide-react';

interface AncillariesAddonsProps {
  selectedMeals: string[];
  onToggleMeal: (mealId: string) => void;
  locale: string;
}

export function AncillariesAddons({ selectedMeals, onToggleMeal, locale }: AncillariesAddonsProps) {
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  return (
    <div className="space-y-8">

      {/* Dining Selection Showcase */}
      <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-sham-brass/30 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sham-brass text-xs font-bold uppercase tracking-wider mb-1">
            <Utensils className="w-4 h-4" />
            <span>{isRTL ? 'مذاق دمشق العريق' : 'A Taste of Damascus In-Flight Gastronomy'}</span>
          </div>
          <h3 className={`text-xl font-bold text-sham-ivory ${titleFontClass}`}>
            {isRTL ? 'القائمة الملكية مسبقة الطلب' : 'Pre-Select Your Haute Cuisine'}
          </h3>
          <p className={`text-xs text-sham-stone/70 ${fontClass}`}>
            {isRTL ? 'اختر أطباقك المفضل المجهزة طازجة بخلاصة المطبخ الدمشقي الأصيل.' : 'Curated gourmet meals prepared by Damascene executive chefs at 38,000 feet.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {DINING_MENUS.map((menu) => {
            const isSelected = selectedMeals.includes(menu.id);
            return (
              <div
                key={menu.id}
                onClick={() => onToggleMeal(menu.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                  isSelected
                    ? 'bg-sham-brass/10 border-sham-brass shadow-brass-glow'
                    : 'bg-sham-cardDark border-sham-borderDark hover:border-sham-brass/30'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-sham-brass px-2 py-0.5 rounded bg-sham-brass/10">
                    {menu.category}
                  </span>
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                      isSelected ? 'bg-sham-brass text-sham-dark border-sham-brass font-bold' : 'border-sham-stone/40'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </div>
                </div>

                <h4 className={`text-sm font-bold text-sham-ivory ${titleFontClass}`}>
                  {isRTL ? menu.nameArabic : menu.nameEnglish}
                </h4>
                <p className={`text-xs text-sham-stone/70 leading-relaxed ${fontClass}`}>{menu.description}</p>
                <span className="text-[10px] text-sham-stone/50 block">{menu.calories}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Luggage & Fast Track Ancillaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Extra Luggage */}
        <div className="glass-panel p-6 rounded-2xl border border-sham-brass/20 space-y-3">
          <div className="flex items-center gap-2 text-sham-brass text-xs font-bold uppercase">
            <Luggage className="w-4 h-4" />
            <span>{isRTL ? 'الأمتعة الإضافية' : 'Extra Imperial Luggage'}</span>
          </div>
          <h4 className={`text-base font-bold text-sham-ivory ${titleFontClass}`}>
            {isRTL ? 'حقيبة إضافية 32 كجم' : '+32kg Extra Allowance'}
          </h4>
          <p className={`text-xs text-sham-stone/70 ${fontClass}`}>
            Complimentary in First Suite. Business & Premium Economy passengers can add extra check-in luggage.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-sham-brass">$75 USD</span>
            <button className="px-4 py-2 bg-sham-cardDark border border-sham-brass/40 text-sham-brass text-xs font-bold rounded hover:bg-sham-brass hover:text-sham-dark transition-colors">
              Add Luggage
            </button>
          </div>
        </div>

        {/* Fast Track & Chauffeur */}
        <div className="glass-panel p-6 rounded-2xl border border-sham-brass/20 space-y-3">
          <div className="flex items-center gap-2 text-sham-brass text-xs font-bold uppercase">
            <Shield className="w-4 h-4" />
            <span>{isRTL ? 'خدمة السائق والمسار السريع' : 'Luxury Chauffeur & Fast-Track'}</span>
          </div>
          <h4 className={`text-base font-bold text-sham-ivory ${titleFontClass}`}>
            {isRTL ? 'سيارة رولز رويس أو مايباخ' : 'Damascus VIP Transfer'}
          </h4>
          <p className={`text-xs text-sham-stone/70 ${fontClass}`}>
            Chauffeur pickup to Al-Fayhaa VIP Terminal at Damascus Airport & expedited immigration.
          </p>
          <div className="pt-2 flex items-center justify-between">
            <span className="text-sm font-bold text-sham-brass">Complimentary (First)</span>
            <button className="px-4 py-2 bg-sham-brass text-sham-dark text-xs font-bold rounded shadow-luxury">
              Included
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
