'use client';

import React, { useState } from 'react';
import { useBooking } from '@/context/BookingContext';
import { useDirection } from '@/hooks/useDirection';
import { FLIGHTS_MOCK } from '@/data/flightsMock';
import { FlightResultsList } from '@/components/booking/FlightResultsList';
import { InteractiveSeatMap } from '@/components/booking/InteractiveSeatMap';
import { AncillariesAddons } from '@/components/booking/AncillariesAddons';
import { CheckoutPayment } from '@/components/booking/CheckoutPayment';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { Flight } from '@/types/flight';
import { ArrowLeft, ArrowRight, CheckCircle, Plane } from 'lucide-react';

export default function BookPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const { booking, updateBooking } = useBooking();
  const [currentStep, setCurrentStep] = useState(booking.step || 1);

  // Filter flights matching selected origin & destination
  const matchedOutbound = FLIGHTS_MOCK.filter(
    (f) => f.origin.code === booking.origin && f.destination.code === booking.destination
  );

  const handleSelectOutbound = (flight: Flight) => {
    updateBooking({ selectedOutboundFlight: flight });
  };

  const handleToggleSeat = (seatId: string) => {
    const seats = [...booking.selectedSeats];
    const index = seats.indexOf(seatId);
    if (index > -1) {
      seats.splice(index, 1);
    } else {
      seats.push(seatId);
    }
    updateBooking({ selectedSeats: seats });
  };

  const handleToggleMeal = (mealId: string) => {
    const meals = [...booking.selectedMeals];
    const index = meals.indexOf(mealId);
    if (index > -1) {
      meals.splice(index, 1);
    } else {
      meals.push(mealId);
    }
    updateBooking({ selectedMeals: meals });
  };

  const steps = [
    { num: 1, title: isRTL ? 'اختيار الرحلة' : 'Flight Selection' },
    { num: 2, title: isRTL ? 'خريطة المقاعد' : 'Suite & Seat Map' },
    { num: 3, title: isRTL ? 'المأكولات والخدمات' : 'Dining & Ancillaries' },
    { num: 4, title: isRTL ? 'الدفع والإصدار' : 'Payment & Issuance' },
  ];

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-8">

        {/* Step Indicator Header */}
        <div className="glass-panel p-6 rounded-2xl border border-sham-brass/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {steps.map((s) => {
              const isActive = s.num === currentStep;
              const isCompleted = s.num < currentStep;

              return (
                <div
                  key={s.num}
                  onClick={() => isCompleted && setCurrentStep(s.num)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                    isCompleted ? 'cursor-pointer hover:bg-sham-brass/10' : ''
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                      isActive
                        ? 'bg-sham-brass text-sham-dark shadow-brass-glow'
                        : isCompleted
                        ? 'bg-sham-olive text-sham-ivory border border-sham-brass/40'
                        : 'bg-sham-cardDark text-sham-stone border border-sham-borderDark'
                    }`}
                  >
                    {isCompleted ? <CheckCircle className="w-4 h-4 text-sham-brass" /> : s.num}
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-[10px] text-sham-stone/60 uppercase block">Step 0{s.num}</span>
                    <span className={`text-xs font-bold ${isActive ? 'text-sham-brass' : 'text-sham-ivory'} ${titleFontClass}`}>
                      {s.title}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 1: Flight Selection */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`text-2xl font-bold text-sham-ivory ${titleFontClass}`}>
                {isRTL ? `الرحلات المتاحة: ${booking.origin} إلى ${booking.destination}` : `Available Flights: ${booking.origin} to ${booking.destination}`}
              </h2>
              <span className="text-xs text-sham-brass font-bold uppercase">{booking.departureDate}</span>
            </div>

            <FlightResultsList
              flights={matchedOutbound.length > 0 ? matchedOutbound : FLIGHTS_MOCK}
              selectedFlightId={booking.selectedOutboundFlight?.id}
              cabinClass={booking.cabinClass}
              onSelectFlight={handleSelectOutbound}
              locale={locale}
            />

            {/* Navigation Next */}
            <div className="flex justify-end pt-4">
              <button
                disabled={!booking.selectedOutboundFlight && matchedOutbound.length > 0}
                onClick={() => setCurrentStep(2)}
                className="px-8 py-3.5 bg-sham-brass text-sham-dark text-xs font-bold uppercase tracking-widest rounded shadow-luxury hover:bg-sham-brassHover transition-all flex items-center gap-2 disabled:opacity-50"
              >
                <span>{isRTL ? 'الانتقال إلى اختيار المقاعد' : 'Proceed to Seat Map'}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Interactive Seat Map */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <InteractiveSeatMap
              selectedSeats={booking.selectedSeats}
              onToggleSeat={handleToggleSeat}
              locale={locale}
            />

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 glass-panel text-sham-stone hover:text-sham-ivory text-xs font-bold uppercase rounded border border-sham-brass/30"
              >
                {isRTL ? 'الرجوع إلى الرحلات' : 'Back to Flights'}
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="px-8 py-3.5 bg-sham-brass text-sham-dark text-xs font-bold uppercase tracking-widest rounded shadow-luxury hover:bg-sham-brassHover transition-all flex items-center gap-2"
              >
                <span>{isRTL ? 'الانتقال إلى قائمة الطعام' : 'Proceed to Dining'}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Ancillaries & Dining */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <AncillariesAddons
              selectedMeals={booking.selectedMeals}
              onToggleMeal={handleToggleMeal}
              locale={locale}
            />

            <div className="flex justify-between items-center pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 glass-panel text-sham-stone hover:text-sham-ivory text-xs font-bold uppercase rounded border border-sham-brass/30"
              >
                {isRTL ? 'الرجوع إلى خريطة المقاعد' : 'Back to Seat Map'}
              </button>

              <button
                onClick={() => setCurrentStep(4)}
                className="px-8 py-3.5 bg-sham-brass text-sham-dark text-xs font-bold uppercase tracking-widest rounded shadow-luxury hover:bg-sham-brassHover transition-all flex items-center gap-2"
              >
                <span>{isRTL ? 'الانتقال إلى الدفع والإصدار' : 'Proceed to Payment'}</span>
                {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Checkout & Payment */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <CheckoutPayment locale={locale} />

            <div className="flex justify-start pt-2">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 glass-panel text-sham-stone hover:text-sham-ivory text-xs font-bold uppercase rounded border border-sham-brass/30"
              >
                {isRTL ? 'الرجوع للخدمات' : 'Back to Ancillaries'}
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer locale={locale} />
    </div>
  );
}
