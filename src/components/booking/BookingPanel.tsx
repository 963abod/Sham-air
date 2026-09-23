'use client';

import React from 'react';
import { FlightSearchForm } from './FlightSearchForm';

export function BookingPanel({ locale }: { locale: string }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-12 relative z-30">
      <FlightSearchForm locale={locale} />
    </div>
  );
}
