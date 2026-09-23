'use client';

import React from 'react';
import Link from 'next/link';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { QrCode, Ticket, Download, Share2, Sparkles, PlaneTakeoff, ShieldCheck } from 'lucide-react';

export default function AppleBoardingPassPage({ params }: { params: Promise<{ locale: string; pnr: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const pnr = resolvedParams.pnr || 'SHAM-789X21';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-lg mx-auto px-4 w-full flex-1 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-[10px] text-sham-brass uppercase tracking-widest font-bold">DIGITAL BOARDING PASS</span>
          <h1 className={`text-2xl font-bold ${titleFontClass}`}>Apple Wallet Digital Pass</h1>
        </div>

        {/* Apple Wallet Pass Container */}
        <div className="glass-panel-gold rounded-3xl border border-sham-brass/50 shadow-luxury overflow-hidden relative space-y-6 p-6">
          <PatternOverlay variant="mashrabiya" />

          {/* Top Header */}
          <div className="flex items-center justify-between border-b border-sham-brass/30 pb-4 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-sham-dark border border-sham-brass flex items-center justify-center font-bold text-sham-brass text-xs">ش</div>
              <span className={`text-base font-bold text-sham-ivory ${titleFontClass}`}>SHAM AIR</span>
            </div>
            <span className="text-xs font-mono font-bold text-sham-brass">{pnr}</span>
          </div>

          {/* Route & Times */}
          <div className="flex items-center justify-between relative z-10 text-center">
            <div>
              <span className="text-3xl font-bold text-sham-ivory block">DAM</span>
              <span className="text-[10px] text-sham-brass font-bold">Damascus</span>
              <span className="text-[9px] text-sham-stone/60 block">08:30 AM</span>
            </div>
            <div className="flex-1 max-w-[100px] text-center space-y-1">
              <span className="text-[9px] text-sham-stone/60">SA 101</span>
              <div className="w-full h-[1px] bg-sham-brass/40 relative flex items-center justify-center">
                <PlaneTakeoff className="w-3.5 h-3.5 text-sham-brass absolute bg-sham-dark px-0.5" />
              </div>
              <span className="text-[8px] text-sham-brass uppercase font-bold">First Suite</span>
            </div>
            <div>
              <span className="text-3xl font-bold text-sham-ivory block">DXB</span>
              <span className="text-[10px] text-sham-brass font-bold">Dubai</span>
              <span className="text-[9px] text-sham-stone/60 block">12:00 PM</span>
            </div>
          </div>

          {/* Details Bar */}
          <div className="grid grid-cols-3 gap-2 bg-sham-dark/90 p-3 rounded-xl border border-sham-brass/20 text-center text-xs relative z-10">
            <div>
              <span className="text-[9px] text-sham-stone/60 block">Passenger</span>
              <span className="font-bold text-sham-ivory text-[11px]">Prince Faris</span>
            </div>
            <div>
              <span className="text-[9px] text-sham-stone/60 block">Seat</span>
              <span className="font-bold text-sham-brass text-[11px]">1A Suite</span>
            </div>
            <div>
              <span className="text-[9px] text-sham-stone/60 block">Gate</span>
              <span className="font-bold text-sham-ivory text-[11px]">A-12 VIP</span>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center justify-center gap-2 pt-2 relative z-10">
            <div className="p-3 bg-white rounded-2xl shadow-luxury">
              <QrCode className="w-28 h-28 text-sham-dark" />
            </div>
            <span className="text-[10px] text-sham-stone/70">Scan at Al-Fayhaa Terminal Boarding Gate</span>
          </div>
        </div>

        {/* Wallet Action Buttons */}
        <div className="flex gap-3 pt-2">
          <button className="flex-1 py-3 bg-sham-brass text-sham-dark text-xs font-bold rounded-xl shadow-luxury hover:bg-sham-brassHover transition-all flex items-center justify-center gap-2">
            <Download className="w-4 h-4" /> Add to Apple Wallet
          </button>
          <button className="py-3 px-4 glass-panel text-sham-stone hover:text-sham-ivory text-xs font-bold rounded-xl border border-sham-brass/30">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
