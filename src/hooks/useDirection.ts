'use client';

import { usePathname } from 'next/navigation';

export function useDirection(overrideLocale?: string) {
  const pathname = usePathname() || '';
  const parts = pathname.split('/').filter(Boolean);
  const locale = overrideLocale || parts[0] || 'en';

  const isRTL = locale === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  return {
    locale,
    isRTL,
    dir,
    fontClass: isRTL ? 'font-arabicBody' : 'font-latinBody',
    titleFontClass: isRTL ? 'font-arabicTitle' : 'font-latinTitle',
  };
}
