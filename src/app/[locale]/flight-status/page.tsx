'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FLIGHTS_MOCK } from '@/data/flightsMock';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { Shield, Search, Plane, Radio, CheckCircle, Clock } from 'lucide-react';

export default function FlightStatusPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const [searchQuery, setSearchQuery] = useState('');

  const filteredFlights = FLIGHTS_MOCK.filter(
    (f) =>
      f.flightNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.origin.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.destination.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass text-xs uppercase font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>{isRTL ? 'رادار الرحلات المباشر' : 'LIVE FLIGHT RADAR & STATUS'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-bold ${titleFontClass}`}>
            {isRTL ? 'حالة الرحلات الجوية المباشرة' : 'Real-time SHAM AIR Tracker'}
          </h1>
          <p className={`text-xs sm:text-sm text-sham-stone/70 ${fontClass}`}>
            {isRTL ? 'تتبع رحلاتنا الملكية مباشرة عبر أحدث أنظمة الملاحة الجوية.' : 'Track live flight status, departure gates, and satellite coordinates.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search className="w-4 h-4 text-sham-brass absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isRTL ? 'ابحث برقم الرحلة (مثال: SA 101) أو رمز المطار...' : 'Search flight number (e.g. SA 101) or airport code...'}
              className="w-full bg-sham-cardDark text-xs text-sham-ivory pl-11 pr-4 py-3.5 rounded-xl border border-sham-brass/30 focus:outline-none focus:border-sham-brass shadow-luxury"
            />
          </div>
        </div>

        {/* Flight Status Cards List */}
        <div className="space-y-4">
          {filteredFlights.map((flight) => (
            <div key={flight.id} className="glass-panel p-6 rounded-2xl border border-sham-brass/30 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-sham-brass/10 border border-sham-brass/30 text-sham-brass">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-sham-brass block">{flight.flightNumber}</span>
                  <span className={`text-base font-bold text-sham-ivory ${titleFontClass}`}>
                    {flight.origin.code} ({flight.origin.city}) → {flight.destination.code} ({flight.destination.city})
                  </span>
                  <span className="text-[10px] text-sham-stone/60 block">{flight.aircraft.model}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs text-end">
                <div>
                  <span className="text-sham-stone/60 text-[10px] uppercase block">Departure</span>
                  <span className="font-bold text-sham-ivory">{new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
                <div>
                  <span className="text-sham-stone/60 text-[10px] uppercase block">Status</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800 text-[10px]">
                    <CheckCircle className="w-3 h-3" /> ON TIME
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </main>

      <Footer locale={locale} />
    </div>
  );
}
