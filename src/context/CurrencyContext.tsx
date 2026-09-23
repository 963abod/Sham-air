'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedCurrency, convertCurrency, formatCurrency as formatCurrencyUtil } from '@/lib/currency';

interface CurrencyContextType {
  currency: SupportedCurrency;
  setCurrency: (c: SupportedCurrency) => void;
  formatPrice: (amountInUSD: number) => string;
  convertPrice: (amountInUSD: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<SupportedCurrency>('USD');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sham_air_currency') as SupportedCurrency;
      if (saved) {
        setCurrencyState(saved);
      }
    }
  }, []);

  const setCurrency = (c: SupportedCurrency) => {
    setCurrencyState(c);
    if (typeof window !== 'undefined') {
      localStorage.setItem('sham_air_currency', c);
    }
  };

  const formatPrice = (amountInUSD: number) => {
    return formatCurrencyUtil(amountInUSD, currency);
  };

  const convertPrice = (amountInUSD: number) => {
    return convertCurrency(amountInUSD, currency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
