'use client';

import React from 'react';
import Link from 'next/link';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { Crown, Sparkles, Utensils, Armchair, Coffee, ShieldCheck } from 'lucide-react';

export default function ExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const pillars = [
    {
      title: isRTL ? 'أجنحة الفيحاء للدرجة الأولى' : 'First Suites: Al-Fayhaa Sanctuary',
      desc: isRTL
        ? 'أجنحة خاصة مغلقة بالكامل مع أسرة مستقيمة، إضاءة مشربية خافتة ورعاية شخصية فائقة.'
        : 'Enclosed private sanctuaries with lie-flat beds, ambient mashrabiya light controls, and dedicated butler service.',
      href: `/${locale}/experience/cabins`,
      icon: Crown,
    },
    {
      title: isRTL ? 'مذاق دمشق العريق' : 'A Taste of Damascus Fine Dining',
      desc: isRTL
        ? 'أشهى المأكولات الدمشقية التراثية المعدة طازجة بخلاصة المطبخ السوري العريق على ارتفاع 38 ألف قدم.'
        : 'Syrian-inspired high-altitude fine dining curated by world-class executive Damascene chefs.',
      href: `/${locale}/experience/dining`,
      icon: Utensils,
    },
    {
      title: isRTL ? 'صالة الفيحاء بدمشق' : 'The Damascus Al-Fayhaa Lounge',
      desc: isRTL
        ? 'صالة انتظار فاخرة بدمشق تتميز ببحرة تراثية مركزي، أشجار ياسمين طازجة وخدمة رولز رويس للتوصيل.'
        : 'Our flagship lounge in Damascus with central trickling water courtyards, fresh jasmine scent, and Rolls-Royce transfers.',
      href: `/${locale}/experience/lounge`,
      icon: Coffee,
    },
  ];

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass text-xs uppercase font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isRTL ? 'التجربة الرقمية والحسية' : 'THE SHAM AIR EXPERIENCE'}</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-bold ${titleFontClass}`}>
            {isRTL ? 'الفخامة الدمشقية في كل تفصيلة' : 'Ultra-Luxury Redefined Above The Clouds'}
          </h1>
          <p className={`text-xs sm:text-sm text-sham-stone/70 ${fontClass}`}>
            {isRTL
              ? 'مزج بدائع الضيافة الشامية مع أحدث ابتكارات الطيران لعام 2026.'
              : 'Every detail of your journey is crafted to evoke the majesty of Old Damascus and modern sky elegance.'}
          </p>
        </div>

        {/* Experience Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-panel p-8 rounded-3xl border border-sham-brass/30 space-y-4 hover:border-sham-brass transition-all group flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-sham-brass/10 border border-sham-brass/40 flex items-center justify-center text-sham-brass group-hover:bg-sham-brass group-hover:text-sham-dark transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-xl font-bold text-sham-ivory ${titleFontClass}`}>{item.title}</h3>
                  <p className={`text-xs text-sham-stone/70 leading-relaxed ${fontClass}`}>{item.desc}</p>
                </div>

                <div className="pt-4 border-t border-sham-borderDark">
                  <Link
                    href={item.href}
                    className="text-xs font-bold uppercase tracking-wider text-sham-brass hover:text-sham-ivory transition-colors flex items-center gap-1.5"
                  >
                    <span>{isRTL ? 'استكشف التفاصيل' : 'Explore Deep Dive'}</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </main>

      <Footer locale={locale} />
    </div>
  );
}
