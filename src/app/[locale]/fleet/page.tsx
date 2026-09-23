'use client';

import React from 'react';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { AircraftViewer3D } from '@/components/cinema/AircraftViewer3D';

export default function FleetPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-24 pb-12 flex-1">
        <AircraftViewer3D locale={locale} />
      </main>

      <Footer locale={locale} />
    </div>
  );
}
