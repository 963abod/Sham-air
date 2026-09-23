'use client';

import React from 'react';
import { useCurrency } from '@/context/CurrencyContext';
import { CURRENCIES, SupportedCurrency } from '@/lib/currency';

export function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value as SupportedCurrency)}
      className="bg-sham-cardDark/80 text-sham-brass text-xs font-semibold px-2.5 py-1.5 rounded border border-sham-brass/30 focus:outline-none focus:border-sham-brass cursor-pointer hover:bg-sham-cardDark transition-colors"
    >
      {Object.values(CURRENCIES).map((c) => (
        <option key={c.code} value={c.code} className="bg-sham-dark text-sham-ivory">
          {c.code} ({c.symbol})
        </option>
      ))}
    </select>
  );
}
