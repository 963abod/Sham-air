'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AIRPORTS } from '@/data/airports';
import { useBooking } from '@/context/BookingContext';
import { useDirection } from '@/hooks/useDirection';
import { CabinClass } from '@/types/flight';
import { Calendar, Users, PlaneTakeoff, PlaneLanding, Search, ArrowRightLeft } from 'lucide-react';

export function FlightSearchForm({ locale }: { locale: string }) {
  const router = useRouter();
  const { booking, updateBooking } = useBooking();
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const [tripType, setTripType] = useState(booking.tripType);
  const [origin, setOrigin] = useState(booking.origin);
  const [destination, setDestination] = useState(booking.destination);
  const [departureDate, setDepartureDate] = useState(booking.departureDate || '2026-04-15');
  const [returnDate, setReturnDate] = useState(booking.returnDate || '2026-04-20');
  const [cabinClass, setCabinClass] = useState<CabinClass>(booking.cabinClass);
  const [adults, setAdults] = useState(booking.passengers.adults);

  const handleSwap = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateBooking({
      tripType,
      origin,
      destination,
      departureDate,
      returnDate: tripType === 'round_trip' ? returnDate : null,
      cabinClass,
      passengers: { adults, children: 0, infants: 0 },
      step: 1,
    });
    router.push(`/${locale}/book`);
  };

  return (
    <form onSubmit={handleSearch} className="glass-panel-gold p-6 rounded-2xl border border-sham-brass/40 shadow-luxury space-y-6">

      {/* Trip Type Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sham-brass/20 pb-4">
        <div className="flex items-center gap-2">
          {[
            { id: 'round_trip', label: isRTL ? 'ذهاب وإياد' : 'Round Trip' },
            { id: 'one_way', label: isRTL ? 'ذهاب فقط' : 'One Way' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTripType(tab.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${
                tripType === tab.id
                  ? 'bg-sham-brass text-sham-dark shadow-brass-glow'
                  : 'bg-sham-cardDark/80 text-sham-stone hover:text-sham-ivory border border-sham-brass/20'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Cabin Select */}
        <select
          value={cabinClass}
          onChange={(e) => setCabinClass(e.target.value as CabinClass)}
          className="bg-sham-cardDark text-sham-brass text-xs font-semibold px-3 py-2 rounded border border-sham-brass/30 focus:outline-none"
        >
          <option value="first">First Suite (أجنحة الفيحاء)</option>
          <option value="business">Business Class (درجة الأعمال)</option>
          <option value="premium_economy">Premium Economy (الدرجة الممتازة)</option>
          <option value="economy">Economy (الدرجة السياحية)</option>
        </select>
      </div>

      {/* Grid Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

        {/* Origin */}
        <div className="md:col-span-3 space-y-1">
          <label className="text-[10px] text-sham-brass font-bold uppercase tracking-wider flex items-center gap-1">
            <PlaneTakeoff className="w-3.5 h-3.5" />
            {isRTL ? 'من' : 'From'}
          </label>
          <select
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full bg-sham-cardDark text-sham-ivory text-xs font-bold px-3 py-3 rounded border border-sham-borderDark focus:border-sham-brass outline-none"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code} className="bg-sham-dark">
                {a.city} ({a.code}) - {a.country}
              </option>
            ))}
          </select>
        </div>

        {/* Swap Button */}
        <div className="md:col-span-1 flex justify-center pt-3 md:pt-0">
          <button
            type="button"
            onClick={handleSwap}
            className="p-2.5 rounded-full bg-sham-cardDark border border-sham-brass/30 text-sham-brass hover:bg-sham-brass hover:text-sham-dark transition-all transform hover:rotate-180"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Destination */}
        <div className="md:col-span-3 space-y-1">
          <label className="text-[10px] text-sham-brass font-bold uppercase tracking-wider flex items-center gap-1">
            <PlaneLanding className="w-3.5 h-3.5" />
            {isRTL ? 'إلى' : 'To'}
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-sham-cardDark text-sham-ivory text-xs font-bold px-3 py-3 rounded border border-sham-borderDark focus:border-sham-brass outline-none"
          >
            {AIRPORTS.map((a) => (
              <option key={a.code} value={a.code} className="bg-sham-dark">
                {a.city} ({a.code}) - {a.country}
              </option>
            ))}
          </select>
        </div>

        {/* Departure Date */}
        <div className="md:col-span-2 space-y-1">
          <label className="text-[10px] text-sham-brass font-bold uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {isRTL ? 'المغادرة' : 'Depart'}
          </label>
          <input
            type="date"
            value={departureDate}
            onChange={(e) => setDepartureDate(e.target.value)}
            className="w-full bg-sham-cardDark text-sham-ivory text-xs font-bold px-3 py-2.5 rounded border border-sham-borderDark focus:border-sham-brass outline-none"
          />
        </div>

        {/* Return Date or Passengers */}
        {tripType === 'round_trip' ? (
          <div className="md:col-span-3 space-y-1">
            <label className="text-[10px] text-sham-brass font-bold uppercase tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {isRTL ? 'العودة' : 'Return'}
            </label>
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full bg-sham-cardDark text-sham-ivory text-xs font-bold px-3 py-2.5 rounded border border-sham-borderDark focus:border-sham-brass outline-none"
            />
          </div>
        ) : (
          <div className="md:col-span-3 space-y-1">
            <label className="text-[10px] text-sham-brass font-bold uppercase tracking-wider flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {isRTL ? 'المسافرون' : 'Passengers'}
            </label>
            <input
              type="number"
              min="1"
              max="9"
              value={adults}
              onChange={(e) => setAdults(parseInt(e.target.value) || 1)}
              className="w-full bg-sham-cardDark text-sham-ivory text-xs font-bold px-3 py-2.5 rounded border border-sham-borderDark focus:border-sham-brass outline-none"
            />
          </div>
        )}

      </div>

      {/* Submit Search CTA */}
      <div className="flex justify-end pt-2">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3.5 bg-sham-brass text-sham-dark text-xs font-bold uppercase tracking-widest rounded shadow-luxury hover:bg-sham-brassHover transition-all flex items-center justify-center gap-2"
        >
          <Search className="w-4 h-4" />
          <span>{isRTL ? 'ابحث عن الرحلات الملكية' : 'Search Imperial Flights'}</span>
        </button>
      </div>

    </form>
  );
}
