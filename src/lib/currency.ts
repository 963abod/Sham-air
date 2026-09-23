export type SupportedCurrency = 'USD' | 'EUR' | 'GBP' | 'AED' | 'SAR' | 'SYP';

export interface CurrencyConfig {
  code: SupportedCurrency;
  symbol: string;
  name: string;
  rateVsUSD: number; // Conversion rate relative to 1 USD
}

export const CURRENCIES: Record<SupportedCurrency, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', rateVsUSD: 1 },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', rateVsUSD: 0.92 },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', rateVsUSD: 0.79 },
  AED: { code: 'AED', symbol: 'AED', name: 'UAE Dirham', rateVsUSD: 3.67 },
  SAR: { code: 'SAR', symbol: 'SAR', name: 'Saudi Riyal', rateVsUSD: 3.75 },
  SYP: { code: 'SYP', symbol: 'LS', name: 'Syrian Pound', rateVsUSD: 13000 },
};

export function convertCurrency(amountInUSD: number, targetCurrency: SupportedCurrency): number {
  const config = CURRENCIES[targetCurrency] || CURRENCIES.USD;
  return Math.round(amountInUSD * config.rateVsUSD);
}

export function formatCurrency(amountInUSD: number, currency: SupportedCurrency = 'USD'): string {
  const converted = convertCurrency(amountInUSD, currency);
  const config = CURRENCIES[currency] || CURRENCIES.USD;

  if (currency === 'SYP') {
    return `${converted.toLocaleString()} ${config.symbol}`;
  }
  return `${config.symbol}${converted.toLocaleString()}`;
}
