'use client';

import React from 'react';
import Link from 'next/link';
import { AIRPORTS } from '@/data/airports';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { MapPin, Calendar, Plane, ShieldCheck, Sun, Utensils, ArrowRight } from 'lucide-react';

export default function DestinationSlugPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const slug = resolvedParams.slug.toUpperCase();
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const destination = AIRPORTS.find((a) => a.code === slug) || AIRPORTS[1];

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-5xl mx-auto px-4 sm:px-6 w-full flex-1 space-y-10">

        {/* Destination Header Card */}
        <div className="glass-panel-gold p-8 rounded-3xl border border-sham-brass/40 shadow-luxury relative overflow-hidden space-y-6">
          <PatternOverlay variant="mashrabiya" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-sham-brass/30 pb-4 relative z-10">
            <div>
              <span className="text-xs font-bold text-sham-brass uppercase tracking-widest">NON-STOP DAMASCUS HUB ROUTE</span>
              <h1 className={`text-3xl sm:text-5xl font-bold text-sham-ivory ${titleFontClass}`}>
                Damascus (DAM) → {destination.city} ({destination.code})
              </h1>
            </div>
            <span className="px-4 py-2 rounded-xl bg-sham-brass/20 text-sham-brass text-xs font-bold uppercase tracking-wider">
              {destination.timezone}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 text-xs">
            <div className="glass-panel p-4 rounded-xl space-y-1">
              <span className="text-sham-stone/60 uppercase block">Flight Frequency</span>
              <span className="text-sm font-bold text-sham-brass">2x Daily Direct</span>
            </div>
            <div className="glass-panel p-4 rounded-xl space-y-1">
              <span className="text-sham-stone/60 uppercase block">Aircraft Model</span>
              <span className="text-sm font-bold text-sham-ivory">Airbus A350-1000 Ultra</span>
            </div>
            <div className="glass-panel p-4 rounded-xl space-y-1">
              <span className="text-sham-stone/60 uppercase block">Airport Terminal</span>
              <span className="text-sm font-bold text-sham-stone">{destination.name}</span>
            </div>
          </div>

          <div className="pt-4 flex justify-end relative z-10">
            <Link
              href={`/${locale}/book`}
              className="px-8 py-3.5 bg-sham-brass text-sham-dark text-xs font-bold uppercase tracking-widest rounded shadow-luxury hover:bg-sham-brassHover transition-all flex items-center gap-2"
            >
              <Plane className="w-4 h-4" />
              <span>{isRTL ? 'احجز رحلتك إلى هذه الوجهة' : 'Book Route Now'}</span>
            </Link>
          </div>
        </div>

      </main>

      <Footer locale={locale} />
    </div>
  );
}
