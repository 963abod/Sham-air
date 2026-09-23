'use client';

import React from 'react';
import Link from 'next/link';
import { useBooking } from '@/context/BookingContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { CheckCircle2, Ticket, QrCode, Download, Share2, Sparkles, PlaneTakeoff } from 'lucide-react';

export default function BookingConfirmationPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const { booking } = useBooking();
  const { formatPrice } = useCurrency();

  const pnr = booking.pnr || 'SHAM-789X21';
  const flight = booking.selectedOutboundFlight;

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-4xl mx-auto px-4 sm:px-6 w-full flex-1 space-y-8">

        {/* Success Header */}
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-sham-brass/20 border-2 border-sham-brass text-sham-brass flex items-center justify-center mx-auto shadow-brass-glow">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <span className="text-xs uppercase tracking-widest text-sham-brass font-bold">
            {isRTL ? 'تم إصدار الحجز الملكي بنجاح' : 'TICKET ISSUED & PNR GENERATED'}
          </span>
          <h1 className={`text-3xl sm:text-5xl font-bold ${titleFontClass}`}>
            {isRTL ? 'رحلة ميمونة مع شام للطيران' : 'Your Journey to Damascus Awaits'}
          </h1>
          <p className={`text-xs sm:text-sm text-sham-stone/70 max-w-lg mx-auto ${fontClass}`}>
            {isRTL
              ? 'تم إرسال تذكرتك الملكية وتفاصيل الصالة إلى بريدك الإلكتروني. يسعدنا استقبالك قريباً.'
              : 'Your imperial boarding pass and lounge voucher are stored below and saved to your device.'}
          </p>
        </div>

        {/* Boarding Pass Digital Ticket Card */}
        <div className="glass-panel-gold p-6 sm:p-8 rounded-3xl border border-sham-brass/50 shadow-luxury relative overflow-hidden space-y-6">
          <PatternOverlay variant="mashrabiya" />

          {/* Ticket Top Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sham-brass/30 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full border border-sham-brass flex items-center justify-center bg-sham-dark">
                <span className="text-sham-brass font-bold">ش</span>
              </div>
              <div>
                <span className={`text-lg font-bold text-sham-ivory ${titleFontClass}`}>
                  {isRTL ? 'شام للطيران' : 'SHAM AIR'}
                </span>
                <span className="text-[10px] text-sham-stone/70 block">FIRST SUITE BOARDING PASS</span>
              </div>
            </div>

            <div className="text-end">
              <span className="text-[10px] text-sham-stone/60 uppercase block">Booking Reference (PNR)</span>
              <span className="text-xl font-bold font-mono text-sham-brass tracking-wider">{pnr}</span>
            </div>
          </div>

          {/* Route & Times */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center relative z-10 text-center md:text-start">
            <div>
              <span className="text-3xl font-bold text-sham-ivory block">{flight?.origin.code || 'DAM'}</span>
              <span className="text-xs font-bold text-sham-brass">{flight?.origin.city || 'Damascus'}</span>
              <span className="text-[10px] text-sham-stone/60 block">{flight?.origin.terminal || 'Al-Fayhaa VIP Terminal'}</span>
            </div>

            <div className="flex flex-col items-center justify-center space-y-1">
              <span className="text-[10px] text-sham-stone/60">{flight?.duration || '3h 30m'}</span>
              <div className="w-full h-[1px] bg-sham-brass/50 relative flex items-center justify-center">
                <PlaneTakeoff className="w-4 h-4 text-sham-brass absolute bg-sham-dark px-0.5" />
              </div>
              <span className="text-[10px] text-sham-brass font-bold uppercase">{flight?.flightNumber || 'SA 101'}</span>
            </div>

            <div className="md:text-end">
              <span className="text-3xl font-bold text-sham-ivory block">{flight?.destination.code || 'DXB'}</span>
              <span className="text-xs font-bold text-sham-brass">{flight?.destination.city || 'Dubai'}</span>
              <span className="text-[10px] text-sham-stone/60 block">{flight?.destination.terminal || 'Terminal 3'}</span>
            </div>
          </div>

          {/* Passenger & Suite Details */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-sham-dark/90 p-4 rounded-xl border border-sham-brass/20 relative z-10 text-xs">
            <div>
              <span className="text-[10px] text-sham-stone/60 uppercase block">Passenger</span>
              <span className="font-bold text-sham-ivory">Prince Faris Al-Damashqi</span>
            </div>
            <div>
              <span className="text-[10px] text-sham-stone/60 uppercase block">Suite / Seat</span>
              <span className="font-bold text-sham-brass">{booking.selectedSeats.join(', ') || '1A (Jasmine Suite)'}</span>
            </div>
            <div>
              <span className="text-[10px] text-sham-stone/60 uppercase block">Class</span>
              <span className="font-bold text-sham-ivory uppercase">{booking.cabinClass.replace('_', ' ')}</span>
            </div>
            <div>
              <span className="text-[10px] text-sham-stone/60 uppercase block">Status</span>
              <span className="font-bold text-sham-brass">CONFIRMED</span>
            </div>
          </div>

          {/* QR Code & Barcode Simulation */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-sham-brass/30 relative z-10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white rounded-lg shadow">
                <QrCode className="w-14 h-14 text-sham-dark" />
              </div>
              <div className="text-xs space-y-0.5">
                <span className="font-bold text-sham-brass block">Scan for Al-Fayhaa VIP Lounge Access</span>
                <span className="text-[10px] text-sham-stone/70">Complimentary Rolls-Royce Chauffeur active</span>
              </div>
            </div>

            <div className="flex gap-3">
              <Link
                href={`/${locale}/boarding-pass/${pnr}`}
                className="px-5 py-2.5 bg-sham-brass text-sham-dark text-xs font-bold rounded shadow-luxury hover:bg-sham-brassHover transition-all flex items-center gap-1.5"
              >
                <Ticket className="w-4 h-4" />
                <span>Apple Wallet Pass</span>
              </Link>
            </div>
          </div>

        </div>

      </main>

      <Footer locale={locale} />
    </div>
  );
}
