'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { BookingState } from '@/types/booking';
import { Flight } from '@/types/flight';

const initialBookingState: BookingState = {
  tripType: 'round_trip',
  origin: 'DAM',
  destination: 'DXB',
  departureDate: '2026-04-15',
  returnDate: '2026-04-20',
  passengers: { adults: 1, children: 0, infants: 0 },
  cabinClass: 'first',
  selectedOutboundFlight: null,
  selectedReturnFlight: null,
  selectedSeats: [],
  selectedMeals: [],
  totalPrice: 0,
  currency: 'USD',
  step: 1,
  pnr: null,
};

interface BookingContextType {
  booking: BookingState;
  setBooking: React.Dispatch<React.SetStateAction<BookingState>>;
  updateBooking: (partial: Partial<BookingState>) => void;
  resetBooking: () => void;
  calculateTotal: () => number;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [booking, setBooking] = useState<BookingState>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sham_air_booking');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialBookingState;
        }
      }
    }
    return initialBookingState;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sham_air_booking', JSON.stringify(booking));
    }
  }, [booking]);

  const updateBooking = (partial: Partial<BookingState>) => {
    setBooking((prev) => ({ ...prev, ...partial }));
  };

  const resetBooking = () => {
    setBooking(initialBookingState);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sham_air_booking');
    }
  };

  const calculateTotal = (): number => {
    let base = 0;
    const cabin = booking.cabinClass;
    if (booking.selectedOutboundFlight) {
      base += booking.selectedOutboundFlight.prices[cabin] || 0;
    }
    if (booking.tripType === 'round_trip' && booking.selectedReturnFlight) {
      base += booking.selectedReturnFlight.prices[cabin] || 0;
    }
    const passengerMultiplier = booking.passengers.adults + booking.passengers.children * 0.75;
    let total = base * Math.max(1, passengerMultiplier);

    // Seat additions
    total += booking.selectedSeats.length * 45;
    return Math.round(total);
  };

  return (
    <BookingContext.Provider
      value={{
        booking,
        setBooking,
        updateBooking,
        resetBooking,
        calculateTotal,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
