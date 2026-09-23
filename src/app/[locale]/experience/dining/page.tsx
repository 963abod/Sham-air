'use client';

import React from 'react';
import Link from 'next/link';
import { DINING_MENUS } from '@/data/diningMenus';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { Utensils, Sparkles, Coffee } from 'lucide-react';

export default function DiningExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass text-xs uppercase font-bold">
            <Utensils className="w-3.5 h-3.5" />
            <span>{isRTL ? 'مذاق دمشق العريق' : 'IN-FLIGHT FINE DINING'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-bold ${titleFontClass}`}>
            {isRTL ? 'مذاق دمشق العريق على ارتفاع 38 ألف قدم' : 'A Taste of Damascus At 38,000 Feet'}
          </h1>
          <p className={`text-xs sm:text-sm text-sham-stone/70 ${fontClass}`}>
            {isRTL
              ? 'تذوق أشهى الأطباق الشامية التراثية المعدة طازجة بخلاصة المطبخ السوري العريق.'
              : 'Authentic Syrian gastronomy prepared with passion and served on high-altitude fine china.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {DINING_MENUS.map((menu) => (
            <div key={menu.id} className="glass-panel p-8 rounded-3xl border border-sham-brass/30 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider font-bold text-sham-brass px-3 py-1 rounded bg-sham-brass/10">
                  {menu.category}
                </span>
                <span className="text-[11px] text-sham-stone/60">{menu.calories}</span>
              </div>
              <h3 className={`text-2xl font-bold text-sham-ivory ${titleFontClass}`}>
                {isRTL ? menu.nameArabic : menu.nameEnglish}
              </h3>
              <p className={`text-xs text-sham-stone/70 leading-relaxed ${fontClass}`}>{menu.description}</p>
              <div className="pt-2 border-t border-sham-borderDark text-[11px] text-sham-brass">
                Complimentary in First & Business Suite
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
