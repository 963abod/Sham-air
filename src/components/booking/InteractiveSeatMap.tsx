'use client';

import React from 'react';
import { useDirection } from '@/hooks/useDirection';
import { AircraftSeat } from '@/types/booking';
import { useCurrency } from '@/context/CurrencyContext';
import { Sparkles, Check } from 'lucide-react';

interface InteractiveSeatMapProps {
  selectedSeats: string[];
  onToggleSeat: (seatId: string) => void;
  locale: string;
}

export function InteractiveSeatMap({ selectedSeats, onToggleSeat, locale }: InteractiveSeatMapProps) {
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);
  const { formatPrice } = useCurrency();

  // Generate interactive seat grid
  const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const cols = ['A', 'B', 'D', 'E', 'J', 'K'];

  const occupiedSeats = ['1A', '2D', '4K', '5B', '7E'];

  return (
    <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-sham-brass/30 space-y-6">

      {/* Header & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-sham-brass/20 pb-4">
        <div>
          <h3 className={`text-lg font-bold text-sham-ivory ${titleFontClass}`}>
            {isRTL ? 'محدد المقاعد التفاعلي' : 'Interactive Suite & Seat Map'}
          </h3>
          <p className={`text-xs text-sham-stone/70 ${fontClass}`}>
            Airbus A350-1000 First Suite & Business Layout
          </p>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-sham-cardDark border border-sham-brass/40" />
            <span className="text-sham-stone text-[11px]">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-sham-brass text-sham-dark font-bold flex items-center justify-center text-[9px]">✓</div>
            <span className="text-sham-brass font-bold text-[11px]">Selected</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-4 h-4 rounded bg-sham-borderDark opacity-50 cursor-not-allowed" />
            <span className="text-sham-stone/50 text-[11px]">Occupied</span>
          </div>
        </div>
      </div>

      {/* Airplane Fuselage Visual Graphic */}
      <div className="max-w-md mx-auto bg-sham-cardDark/90 p-6 rounded-3xl border border-sham-brass/20 relative shadow-luxury">

        {/* Cockpit Nose Indicator */}
        <div className="w-32 h-10 border-t-2 border-x-2 border-sham-brass/40 rounded-t-full mx-auto mb-6 flex items-center justify-center text-[10px] text-sham-brass font-bold uppercase tracking-widest">
          Cockpit
        </div>

        {/* Seats Grid */}
        <div className="space-y-3">
          {rows.map((row) => {
            const isFirstClassRow = row <= 2;
            return (
              <div key={row} className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold text-sham-brass/60 w-4">{row}</span>

                {/* Left A/B */}
                <div className="flex gap-2">
                  {['A', 'B'].map((col) => {
                    const seatId = `${row}${col}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <button
                        key={seatId}
                        disabled={isOccupied}
                        onClick={() => onToggleSeat(seatId)}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center border ${
                          isOccupied
                            ? 'bg-sham-borderDark text-sham-stone/30 border-transparent cursor-not-allowed'
                            : isSelected
                            ? 'bg-sham-brass text-sham-dark border-sham-brass shadow-brass-glow scale-105'
                            : isFirstClassRow
                            ? 'bg-sham-cardDark text-sham-brass border-sham-brass/50 hover:border-sham-brass'
                            : 'bg-sham-cardDark text-sham-stone border-sham-borderDark hover:border-sham-brass/40'
                        }`}
                      >
                        {isSelected ? '✓' : seatId}
                      </button>
                    );
                  })}
                </div>

                {/* Aisle */}
                <div className="text-[9px] text-sham-stone/30 font-mono tracking-widest uppercase">Aisle</div>

                {/* Right D/E */}
                <div className="flex gap-2">
                  {['D', 'E'].map((col) => {
                    const seatId = `${row}${col}`;
                    const isOccupied = occupiedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);

                    return (
                      <button
                        key={seatId}
                        disabled={isOccupied}
                        onClick={() => onToggleSeat(seatId)}
                        className={`w-9 h-9 rounded-lg text-xs font-bold transition-all flex items-center justify-center border ${
                          isOccupied
                            ? 'bg-sham-borderDark text-sham-stone/30 border-transparent cursor-not-allowed'
                            : isSelected
                            ? 'bg-sham-brass text-sham-dark border-sham-brass shadow-brass-glow scale-105'
                            : isFirstClassRow
                            ? 'bg-sham-cardDark text-sham-brass border-sham-brass/50 hover:border-sham-brass'
                            : 'bg-sham-cardDark text-sham-stone border-sham-borderDark hover:border-sham-brass/40'
                        }`}
                      >
                        {isSelected ? '✓' : seatId}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Selected Seats Summary Footer */}
      <div className="bg-sham-dark p-4 rounded-xl border border-sham-brass/20 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-sham-stone/60 uppercase block">{isRTL ? 'المقاعد المختارة' : 'Selected Seats'}</span>
          <span className="text-sm font-bold text-sham-brass">
            {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'None'}
          </span>
        </div>
        <div className="text-end">
          <span className="text-[10px] text-sham-stone/60 uppercase block">Seat Selection Fee</span>
          <span className="text-sm font-bold text-sham-ivory">{formatPrice(selectedSeats.length * 45)}</span>
        </div>
      </div>

    </div>
  );
}
