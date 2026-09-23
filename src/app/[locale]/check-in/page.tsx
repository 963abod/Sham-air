'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { Ticket, Search, CheckCircle, QrCode } from 'lucide-react';

export default function CheckInPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const router = useRouter();
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const [pnr, setPnr] = useState('');
  const [lastName, setLastName] = useState('');

  const handleCheckIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pnr) return;
    router.push(`/${locale}/boarding-pass/${pnr}`);
  };

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-3xl mx-auto px-4 sm:px-6 w-full flex-1 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass text-xs uppercase font-bold">
            <Ticket className="w-3.5 h-3.5" />
            <span>{isRTL ? 'إنهاء إجراءات السفر الرقمية' : 'DIGITAL CHECK-IN & BOARDING PASS'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-bold ${titleFontClass}`}>
            {isRTL ? 'إنهاء إجراءات السفر واستخراج التذكرة' : 'Online Check-in Portal'}
          </h1>
        </div>

        <form onSubmit={handleCheckIn} className="glass-panel-gold p-8 rounded-3xl border border-sham-brass/40 shadow-luxury space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] text-sham-brass uppercase font-bold">{isRTL ? 'رمز الحجز (PNR)' : 'Booking Reference (PNR)'}</label>
              <input
                type="text"
                placeholder="e.g. SHAM-789X21"
                value={pnr}
                onChange={(e) => setPnr(e.target.value)}
                required
                className="w-full bg-sham-cardDark text-xs text-sham-ivory px-4 py-3 rounded-xl border border-sham-borderDark focus:border-sham-brass outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-sham-brass uppercase font-bold">{isRTL ? 'اسم العائلة' : 'Passenger Last Name'}</label>
              <input
                type="text"
                placeholder="e.g. Al-Damashqi"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full bg-sham-cardDark text-xs text-sham-ivory px-4 py-3 rounded-xl border border-sham-borderDark focus:border-sham-brass outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-sham-brass text-sham-dark text-xs font-bold uppercase tracking-widest rounded shadow-luxury hover:bg-sham-brassHover transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isRTL ? 'إصدار بطاقة الصعود' : 'Generate Boarding Pass'}</span>
          </button>
        </form>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
