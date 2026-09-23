import React from 'react';
import { CurrencyProvider } from '@/context/CurrencyContext';
import { BookingProvider } from '@/context/BookingContext';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CurrencyProvider>
      <BookingProvider>
        {children}
      </BookingProvider>
    </CurrencyProvider>
  );
}
