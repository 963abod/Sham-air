'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AIRPORTS } from '@/data/airports';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { Compass, MapPin, Plane, Sun, ArrowRight } from 'lucide-react';

export default function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const damascus = AIRPORTS.find((a) => a.code === 'DAM');
  const globalCapitals = AIRPORTS.filter((a) => a.code !== 'DAM');

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-12">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass text-xs uppercase font-bold">
            <Compass className="w-3.5 h-3.5" />
            <span>{isRTL ? 'محور دمشق العالمي' : 'THE DAMASCUS GLOBAL HUB'}</span>
          </div>
          <h1 className={`text-4xl sm:text-6xl font-bold ${titleFontClass}`}>
            {isRTL ? 'شبكة الوجهات العالمية' : 'Connecting Damascus to World Capitals'}
          </h1>
          <p className={`text-xs sm:text-sm text-sham-stone/70 ${fontClass}`}>
            {isRTL
              ? 'رحلات يومية مباشرة تربط دمشق بأهم العواصم العالمية على متن أسطولنا الفائق الفخامة.'
              : 'Direct non-stop flights connecting Damascus International Airport (DAM) to key global hubs.'}
          </p>
        </div>

        {/* Global Hub Map Showcase Card */}
        <div className="glass-panel-gold p-8 rounded-3xl border border-sham-brass/40 shadow-luxury relative overflow-hidden space-y-6">
          <PatternOverlay variant="mashrabiya" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-sham-brass/30 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <MapPin className="w-6 h-6 text-sham-brass" />
              <div>
                <h3 className={`text-xl font-bold text-sham-ivory ${titleFontClass}`}>
                  Damascus International Hub (DAM)
                </h3>
                <p className="text-xs text-sham-stone/70">Al-Fayhaa VIP Terminal • Sovereign Damascus Base</p>
              </div>
            </div>
            <span className="px-4 py-1.5 rounded-full bg-sham-brass/20 text-sham-brass text-xs font-bold uppercase tracking-wider">
              12 Non-stop Routes
            </span>
          </div>

          {/* Grid of Global Routes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {globalCapitals.map((dest) => (
              <Link
                key={dest.code}
                href={`/${locale}/destinations/${dest.code.toLowerCase()}`}
                className="glass-panel p-5 rounded-2xl border border-sham-borderDark hover:border-sham-brass transition-all duration-300 group space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-sham-brass px-2.5 py-1 rounded bg-sham-brass/10">
                    {dest.code}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-sham-stone/60">
                    <Sun className="w-3.5 h-3.5 text-sham-brass" /> 24°C Sunny
                  </div>
                </div>

                <div>
                  <h4 className={`text-lg font-bold text-sham-ivory group-hover:text-sham-brass transition-colors ${titleFontClass}`}>
                    {isRTL ? dest.cityArabic : dest.city}
                  </h4>
                  <span className="text-xs text-sham-stone/70">{dest.country}</span>
                </div>

                <div className="pt-2 border-t border-sham-borderDark/60 flex items-center justify-between text-xs">
                  <span className="text-sham-stone/60">Daily Flights</span>
                  <span className="text-sham-brass font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

        </div>

      </main>

      <Footer locale={locale} />
    </div>
  );
}
