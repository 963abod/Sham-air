'use client';

import React from 'react';
import { Flight, CabinClass } from '@/types/flight';
import { useCurrency } from '@/context/CurrencyContext';
import { useDirection } from '@/hooks/useDirection';
import { Plane, Wifi, Utensils, Tv, Zap, Check } from 'lucide-react';

interface FlightResultsListProps {
  flights: Flight[];
  selectedFlightId?: string;
  cabinClass: CabinClass;
  onSelectFlight: (flight: Flight) => void;
  locale: string;
}

export function FlightResultsList({
  flights,
  selectedFlightId,
  cabinClass,
  onSelectFlight,
  locale,
}: FlightResultsListProps) {
  const { formatPrice } = useCurrency();
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  if (flights.length === 0) {
    return (
      <div className="glass-panel p-12 text-center rounded-2xl border border-sham-brass/20 space-y-3">
        <Plane className="w-10 h-10 text-sham-brass/50 mx-auto animate-bounce" />
        <h3 className={`text-lg font-bold text-sham-ivory ${titleFontClass}`}>
          {isRTL ? 'لم يتم العثور على رحلات مباشرة لهذا المسار' : 'No direct flights found for this route'}
        </h3>
        <p className={`text-xs text-sham-stone/70 ${fontClass}`}>
          {isRTL ? 'يرجى تغيير التواريخ أو استكشاف الوجهات الأخرى عبر شبكتنا.' : 'Please adjust your search dates or check our Damascus global hub routes.'}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {flights.map((flight) => {
        const price = flight.prices[cabinClass] || flight.prices.economy;
        const isSelected = selectedFlightId === flight.id;

        return (
          <div
            key={flight.id}
            className={`glass-panel p-6 rounded-2xl border transition-all duration-300 relative ${
              isSelected
                ? 'border-sham-brass bg-sham-brass/10 shadow-brass-glow'
                : 'border-sham-borderDark hover:border-sham-brass/40'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

              {/* Flight Info Block */}
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded bg-sham-brass/20 text-sham-brass text-[10px] font-bold uppercase tracking-wider">
                    {flight.flightNumber}
                  </span>
                  <span className="text-xs text-sham-stone/70 font-medium">
                    {flight.aircraft.model} ({flight.aircraft.registration})
                  </span>
                </div>

                {/* Times & Route */}
                <div className="flex items-center gap-6">
                  <div>
                    <span className="text-xl font-bold text-sham-ivory block">
                      {new Date(flight.departureTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-xs text-sham-stone/80 font-bold">{flight.origin.code}</span>
                  </div>

                  <div className="flex-1 max-w-[180px] text-center space-y-1">
                    <span className="text-[10px] text-sham-stone/60">{flight.duration}</span>
                    <div className="relative flex items-center justify-center">
                      <div className="w-full h-[1px] bg-sham-brass/40" />
                      <Plane className="w-3.5 h-3.5 text-sham-brass absolute bg-sham-dark px-0.5" />
                    </div>
                    <span className="text-[9px] uppercase tracking-wider text-sham-brass font-bold">Direct Flight</span>
                  </div>

                  <div>
                    <span className="text-xl font-bold text-sham-ivory block">
                      {new Date(flight.arrivalTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-xs text-sham-stone/80 font-bold">{flight.destination.code}</span>
                  </div>
                </div>

                {/* Amenities */}
                <div className="flex items-center gap-4 text-sham-stone/60 text-xs pt-1">
                  {flight.amenities.wifi && (
                    <span className="flex items-center gap-1 text-[10px]">
                      <Wifi className="w-3 h-3 text-sham-brass" /> High-speed Wifi
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-[10px]">
                    <Utensils className="w-3 h-3 text-sham-brass" /> {flight.amenities.meal}
                  </span>
                  <span className="flex items-center gap-1 text-[10px]">
                    <Tv className="w-3 h-3 text-sham-brass" /> 4K OLED
                  </span>
                </div>
              </div>

              {/* Price & Selection CTA */}
              <div className="flex flex-row md:flex-col items-center md:items-end justify-between border-t md:border-t-0 md:border-s border-sham-borderDark pt-4 md:pt-0 md:ps-6 gap-4">
                <div className="text-start md:text-end">
                  <span className="text-[10px] text-sham-stone/60 uppercase block">{cabinClass.replace('_', ' ')}</span>
                  <span className="text-2xl font-bold text-sham-brass">{formatPrice(price)}</span>
                  <span className="text-[10px] text-sham-stone/50 block">per passenger</span>
                </div>

                <button
                  onClick={() => onSelectFlight(flight)}
                  className={`px-6 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sham-brass text-sham-dark shadow-brass-glow'
                      : 'bg-sham-cardDark text-sham-brass border border-sham-brass hover:bg-sham-brass hover:text-sham-dark'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  <span>{isSelected ? (isRTL ? 'تم الاختيار' : 'Selected') : (isRTL ? 'اختيار الرحلة' : 'Select Flight')}</span>
                </button>
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}
