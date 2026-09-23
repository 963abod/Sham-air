'use client';

import React from 'react';
import Link from 'next/link';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { Crown, Armchair, ShieldCheck, Sparkles, Tv, Wifi } from 'lucide-react';

export default function CabinsExperiencePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const cabins = [
    {
      name: 'First Suite (أجنحة الفيحاء)',
      pitch: '82" Private Sanctuary',
      door: 'Sliding Privacy Door',
      bed: 'Fully Lie-Flat Bed with Organic Silk Linen',
      desc: 'Private enclosed suite with ambient jasmine aromatherapy, Ablaq inlaid luxury wood finishes, and 4K 32" OLED cinema display.',
    },
    {
      name: 'Business Class (درجة الأعمال)',
      pitch: '78" Fully Flat Bed',
      door: 'Direct Aisle Access (1-2-1)',
      bed: 'Ergonomic Memory Foam Lie-Flat',
      desc: 'Generous suite with privacy divider, noise-canceling headsets, and multi-course dining on demand.',
    },
    {
      name: 'Premium Economy (الدرجة الممتازة)',
      pitch: '40" Recline Pitch',
      door: 'Dedicated Cabin Zone',
      bed: 'Calf & Foot Rest Cushioning',
      desc: 'Extra legroom, elevated dining service, and priority boarding at Damascus Hub.',
    },
    {
      name: 'Economy Class (الدرجة السياحية)',
      pitch: '34" Ergonomic Contour',
      door: '3-3-3 Layout',
      bed: 'Multi-angle Adjustable Headrest',
      desc: 'Industry-leading legroom with 13.3" 4K touchscreen and complimentary high-speed Wi-Fi.',
    },
  ];

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-10">

        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-sham-brass uppercase tracking-widest">LUXURY CABIN CLASSES</span>
          <h1 className={`text-3xl sm:text-5xl font-bold ${titleFontClass}`}>
            {isRTL ? 'درجات الطيران الملكية' : 'Sanctuaries In The Sky'}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cabins.map((c, i) => (
            <div key={i} className="glass-panel p-8 rounded-3xl border border-sham-brass/30 space-y-4">
              <span className="text-xs font-bold text-sham-brass uppercase">{c.pitch}</span>
              <h3 className={`text-2xl font-bold text-sham-ivory ${titleFontClass}`}>{c.name}</h3>
              <p className={`text-xs text-sham-stone/70 leading-relaxed ${fontClass}`}>{c.desc}</p>

              <div className="pt-4 border-t border-sham-borderDark space-y-1 text-xs text-sham-stone/80">
                <div><strong className="text-sham-brass">Layout:</strong> {c.door}</div>
                <div><strong className="text-sham-brass">Bed Comfort:</strong> {c.bed}</div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer locale={locale} />
    </div>
  );
}
