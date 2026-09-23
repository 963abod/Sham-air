'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBooking } from '@/context/BookingContext';
import { useCurrency } from '@/context/CurrencyContext';
import { useDirection } from '@/hooks/useDirection';
import confetti from 'canvas-confetti';
import { CreditCard, ShieldCheck, Lock, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

export function CheckoutPayment({ locale }: { locale: string }) {
  const router = useRouter();
  const { booking, updateBooking, calculateTotal } = useBooking();
  const { formatPrice } = useCurrency();
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const [isProcessing, setIsProcessing] = useState(false);
  const [passengerName, setPassengerName] = useState('Prince Faris Al-Damashqi');
  const [passportNumber, setPassportNumber] = useState('SY-99203108');

  const totalPrice = calculateTotal();

  const handlePayAndIssue = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Generate realistic PNR
    const generatedPnr = 'SHAM-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    setTimeout(() => {
      updateBooking({
        pnr: generatedPnr,
        passengerDetails: [
          {
            firstName: passengerName.split(' ')[0] || 'Passenger',
            lastName: passengerName.split(' ').slice(1).join(' ') || 'VIP',
            passportNumber,
            nationality: 'Syrian Arab Republic',
          },
        ],
        totalPrice,
        step: 4,
      });

      // Launch victory confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#B79A63', '#D8CDBA', '#344238'],
        });
      } catch {
        // Fallback
      }

      router.push(`/${locale}/book/confirmation`);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      {/* Payment & Passenger Form */}
      <form onSubmit={handlePayAndIssue} className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-2xl border border-sham-brass/30 space-y-6">
        <div>
          <div className="flex items-center gap-2 text-sham-brass text-xs font-bold uppercase tracking-wider mb-1">
            <Lock className="w-4 h-4" />
            <span>{isRTL ? 'معالجة الدفع المشفرة' : '256-Bit Encrypted Imperial Checkout'}</span>
          </div>
          <h3 className={`text-xl font-bold text-sham-ivory ${titleFontClass}`}>
            {isRTL ? 'بيانات المسافر والدفع الملكي' : 'Passenger Information & Payment'}
          </h3>
        </div>

        {/* Passenger Information */}
        <div className="space-y-4 pt-2 border-t border-sham-borderDark">
          <h4 className="text-xs font-bold uppercase text-sham-brass">{isRTL ? 'تفاصيل المسافر الرئيسي' : 'Primary Passenger'}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] text-sham-stone/70 uppercase font-bold">{isRTL ? 'الاسم الكامل' : 'Full Name (As in Passport)'}</label>
              <input
                type="text"
                value={passengerName}
                onChange={(e) => setPassengerName(e.target.value)}
                required
                className="w-full bg-sham-cardDark text-sham-ivory text-xs px-3 py-2.5 rounded border border-sham-borderDark focus:border-sham-brass outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] text-sham-stone/70 uppercase font-bold">{isRTL ? 'رقم جواز السفر' : 'Passport Number'}</label>
              <input
                type="text"
                value={passportNumber}
                onChange={(e) => setPassportNumber(e.target.value)}
                required
                className="w-full bg-sham-cardDark text-sham-ivory text-xs px-3 py-2.5 rounded border border-sham-borderDark focus:border-sham-brass outline-none"
              />
            </div>
          </div>
        </div>

        {/* Payment Simulation Controls */}
        <div className="space-y-4 pt-4 border-t border-sham-borderDark">
          <h4 className="text-xs font-bold uppercase text-sham-brass">{isRTL ? 'طريقة الدفع الفاخرة' : 'Payment Method'}</h4>
          <div className="p-4 bg-sham-cardDark rounded-xl border border-sham-brass/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-sham-ivory flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sham-brass" /> Visa Imperial Signature / Mastercard Black
              </span>
              <span className="text-[10px] bg-sham-brass/20 text-sham-brass px-2 py-0.5 rounded font-bold">Encrypted</span>
            </div>
            <input
              type="text"
              readOnly
              value="•••• •••• •••• 8892"
              className="w-full bg-sham-dark text-sham-brass text-xs tracking-widest px-3 py-2 rounded border border-sham-borderDark"
            />
            <div className="grid grid-cols-2 gap-2 text-xs">
              <input type="text" readOnly value="Exp: 08/30" className="bg-sham-dark text-sham-stone/70 px-3 py-2 rounded border border-sham-borderDark" />
              <input type="text" readOnly value="CVC: •••" className="bg-sham-dark text-sham-stone/70 px-3 py-2 rounded border border-sham-borderDark" />
            </div>
          </div>
        </div>

        {/* Confirm & Issue CTA */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full py-4 bg-sham-brass text-sham-dark text-xs sm:text-sm font-bold uppercase tracking-widest rounded shadow-luxury hover:bg-sham-brassHover transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>{isRTL ? 'جاري إصدار التذكرة الملكية PNR...' : 'Issuing Ticket & Generating PNR...'}</span>
            </>
          ) : (
            <>
              <ShieldCheck className="w-4 h-4" />
              <span>{isRTL ? `إصدار التذكرة الآن (${formatPrice(totalPrice)})` : `Authorize & Issue Ticket (${formatPrice(totalPrice)})`}</span>
            </>
          )}
        </button>
      </form>

      {/* Fare Summary Sidebar */}
      <div className="lg:col-span-5 glass-panel-gold p-6 rounded-2xl border border-sham-brass/40 space-y-4">
        <h4 className={`text-sm font-bold uppercase text-sham-brass border-b border-sham-brass/20 pb-3 ${titleFontClass}`}>
          {isRTL ? 'ملخص الحجز الملكي' : 'Imperial Booking Summary'}
        </h4>

        <div className="space-y-3 text-xs">
          <div className="flex justify-between text-sham-stone/80">
            <span>Route:</span>
            <span className="font-bold text-sham-ivory">{booking.origin} → {booking.destination}</span>
          </div>
          <div className="flex justify-between text-sham-stone/80">
            <span>Cabin Class:</span>
            <span className="font-bold text-sham-brass uppercase">{booking.cabinClass.replace('_', ' ')}</span>
          </div>
          <div className="flex justify-between text-sham-stone/80">
            <span>Selected Seats:</span>
            <span className="font-bold text-sham-ivory">{booking.selectedSeats.length > 0 ? booking.selectedSeats.join(', ') : 'Assigned at check-in'}</span>
          </div>
          <div className="flex justify-between text-sham-stone/80">
            <span>Pre-selected Dining:</span>
            <span className="font-bold text-sham-ivory">{booking.selectedMeals.length} Course Gourmet</span>
          </div>
        </div>

        <div className="border-t border-sham-brass/30 pt-4 flex items-center justify-between">
          <span className="text-xs uppercase text-sham-stone font-bold">{isRTL ? 'المبلغ الإجمالي' : 'Total Amount'}</span>
          <span className="text-2xl font-bold text-sham-brass">{formatPrice(totalPrice)}</span>
        </div>
      </div>

    </div>
  );
}
