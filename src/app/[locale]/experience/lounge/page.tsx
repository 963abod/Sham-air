'use client';

import React from 'react';
import Link from 'next/link';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { Coffee, Droplets, Sparkles, ShieldCheck } from 'lucide-react';

export default function LoungeExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass text-xs uppercase font-bold">
            <Coffee className="w-3.5 h-3.5" />
            <span>{isRTL ? 'صالة الفيحاء بدمشق' : 'AL-FAYHAA LOUNGE DAMASCUS'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-bold ${titleFontClass}`}>
            {isRTL ? 'صالة الفيحاء الفاخرة بمطار دمشق الدولي' : 'The Damascus Al-Fayhaa Flagship Lounge'}
          </h1>
          <p className={`text-xs sm:text-sm text-sham-stone/70 ${fontClass}`}>
            {isRTL
              ? 'صالة انتظار فاخرة مع بحرة تراثية مركزي، أشجار ياسمين طازجة وخدمة رولز رويس للتوصيل.'
              : 'A serene oasis of Damascene courtyard tranquility before your journey.'}
          </p>
        </div>

        <div className="glass-panel-gold p-8 sm:p-12 rounded-3xl border border-sham-brass/40 shadow-luxury space-y-6 relative overflow-hidden">
          <PatternOverlay variant="mashrabiya" />
          <div className="relative z-10 space-y-4">
            <h3 className={`text-2xl font-bold text-sham-ivory ${titleFontClass}`}>
              {isRTL ? 'مميزات الصالة الملكية' : 'Al-Fayhaa Sanctuary Features'}
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-sham-stone/80">
              <li className="p-4 bg-sham-dark/80 rounded-xl border border-sham-brass/20">
                <strong className="text-sham-brass block mb-1">Central Fountain Courtyard:</strong> Authentic Damascene marble water trickle surface.
              </li>
              <li className="p-4 bg-sham-dark/80 rounded-xl border border-sham-brass/20">
                <strong className="text-sham-brass block mb-1">Rolls-Royce Tarmac Transfer:</strong> Private chauffeur to jet bridge for First Suites passengers.
              </li>
              <li className="p-4 bg-sham-dark/80 rounded-xl border border-sham-brass/20">
                <strong className="text-sham-brass block mb-1">Private Cigar & Arabic Coffee Suite:</strong> Cardamom coffee & traditional Damascene hospitality.
              </li>
              <li className="p-4 bg-sham-dark/80 rounded-xl border border-sham-brass/20">
                <strong className="text-sham-brass block mb-1">Jasmine Aromatherapy Spa:</strong> Refreshing shower suites with organic Damascus rose essential oils.
              </li>
            </ul>
          </div>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
