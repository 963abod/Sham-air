'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { useDirection } from '@/hooks/useDirection';
import { Compass, Plane, ShieldCheck, Sparkles } from 'lucide-react';

export function HeroCinematic({ locale }: { locale: string }) {
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-sham-dark">
      {/* Background Ablaq & Ambient Atmosphere */}
      <PatternOverlay variant="ablaq" />
      <PatternOverlay variant="mashrabiya" />

      {/* Atmospheric Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sham-brass/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-[400px] h-[400px] bg-sham-olive/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">

        {/* Crest & Tagline Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-gold border border-sham-brass/40 shadow-brass-glow animate-fade-in">
          <Sparkles className="w-4 h-4 text-sham-brass" />
          <span className="text-xs uppercase tracking-widest text-sham-brass font-semibold">
            {isRTL ? 'من دمشق، إلى العالم' : 'FROM DAMASCUS, TO THE WORLD'}
          </span>
        </div>

        {/* Hero Main Heading */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-sham-ivory leading-tight ${titleFontClass}`}>
            {isRTL ? (
              <>
                الفخامة الدمشقية فوق السحاب <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sham-brass via-sham-stone to-sham-brass">
                  شام للطيران
                </span>
              </>
            ) : (
              <>
                Imperial Damascene Flight <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sham-brass via-sham-stone to-sham-brass">
                  Reimagined Above The Clouds
                </span>
              </>
            )}
          </h1>
          <p className={`text-sm sm:text-lg text-sham-stone/80 max-w-2xl mx-auto font-light leading-relaxed ${fontClass}`}>
            {isRTL
              ? 'الناقل الجوي الفائق الفخامة الذي يمزج عراقة العمارة الدمشقية، أنغام البحرات، وشذى الياسمين بحدثية الطيران العالمي لعام 2026.'
              : 'Experience 2026 ultra-contemporary aviation distilled through Damascene Ablaq rhythms, courtyard water trickles, and aromatic jasmine cabin notes.'}
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href={`/${locale}/book`}
            className="w-full sm:w-auto px-8 py-4 bg-sham-brass text-sham-dark text-xs sm:text-sm font-bold uppercase tracking-widest rounded shadow-luxury hover:bg-sham-brassHover transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2"
          >
            <Plane className="w-4 h-4" />
            <span>{isRTL ? 'احجز جناحك الآن' : 'Book Your Sanctuary'}</span>
          </Link>
          <Link
            href={`/${locale}/experience`}
            className="w-full sm:w-auto px-8 py-4 glass-panel border border-sham-brass/40 text-sham-stone hover:text-sham-ivory hover:border-sham-brass text-xs sm:text-sm font-semibold uppercase tracking-widest rounded transition-all flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4 text-sham-brass" />
            <span>{isRTL ? 'استكشف عالم شام' : 'Explore The Experience'}</span>
          </Link>
        </div>

        {/* Floating Flight Metrics Dock */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[
            { label: isRTL ? 'الوجهات العالمية' : 'Global Hubs', val: '12 Capitals' },
            { label: isRTL ? 'الأسطول المتميز' : 'Ultra Fleet', val: 'A350-1000 & 787' },
            { label: isRTL ? 'أجنحة الفيحاء' : 'First Suites', val: 'Private Sanctuary' },
            { label: isRTL ? 'الضيافة الدمشقية' : 'Gastronomy', val: '5-Course Fine Dining' },
          ].map((stat, i) => (
            <div key={i} className="p-4 glass-panel rounded-xl border border-sham-brass/20 text-center space-y-1">
              <span className="text-sm font-bold text-sham-brass block">{stat.val}</span>
              <span className="text-[11px] text-sham-stone/70 uppercase tracking-wider block">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
