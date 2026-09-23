import React from 'react';
import Link from 'next/link';
import { HeroCinematic } from '@/components/cinema/HeroCinematic';
import { DamasceneJourneyScroll } from '@/components/cinema/DamasceneJourneyScroll';
import { AircraftViewer3D } from '@/components/cinema/AircraftViewer3D';
import { BookingPanel } from '@/components/booking/BookingPanel';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { AskShamConcierge } from '@/components/common/AskShamConcierge';

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between selection:bg-sham-brass selection:text-sham-dark">
      <Navbar locale={locale} />

      <main className="flex-1">
        <HeroCinematic locale={locale} />
        <BookingPanel locale={locale} />
        <DamasceneJourneyScroll locale={locale} />
        <AircraftViewer3D locale={locale} />
      </main>

      <AskShamConcierge locale={locale} />
      <Footer locale={locale} />
    </div>
  );
}
