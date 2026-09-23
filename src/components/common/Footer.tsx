'use client';

import React from 'react';
import Link from 'next/link';
import { useDirection } from '@/hooks/useDirection';

export function Footer({ locale }: { locale: string }) {
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  return (
    <footer className="bg-sham-dark border-t border-sham-brass/20 text-sham-stone py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 rtl:space-x-reverse">
              <div className="w-9 h-9 rounded-full border border-sham-brass flex items-center justify-center bg-sham-cardDark">
                <span className="text-sham-brass font-bold text-lg">ش</span>
              </div>
              <span className={`text-2xl font-bold tracking-wider text-sham-ivory ${titleFontClass}`}>
                {isRTL ? 'شام للطيران' : 'SHAM AIR'}
              </span>
            </div>
            <p className={`text-xs text-sham-stone/70 leading-relaxed ${fontClass}`}>
              {isRTL
                ? 'الناقل الوطني الملكي فائق الفخامة. نجسد الضيافة الدمشقية العريقة عبر أرقى أسطول جوي عالمي.'
                : 'The international ultra-luxury flag carrier distilled through ancient Damascene heritage and modern aviation innovation.'}
            </p>
            <p className="text-[11px] text-sham-brass font-serif tracking-widest uppercase">
              {isRTL ? 'من دمشق، إلى العالم.' : 'FROM DAMASCUS, TO THE WORLD.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest text-sham-brass mb-4 ${titleFontClass}`}>
              {isRTL ? 'الروابط السريعة' : 'Quick Navigation'}
            </h4>
            <ul className={`space-y-2 text-xs ${fontClass}`}>
              <li><Link href={`/${locale}/book`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'حجز رحلة' : 'Book a Flight'}</Link></li>
              <li><Link href={`/${locale}/destinations`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'شبكة الوجهات' : 'Global Network'}</Link></li>
              <li><Link href={`/${locale}/fleet`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'الأسطول الأسطوري' : 'Our Fleet'}</Link></li>
              <li><Link href={`/${locale}/experience/dining`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'مذاق دمشق' : 'A Taste of Damascus'}</Link></li>
              <li><Link href={`/${locale}/privilege`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'نادي الماسية' : 'Sham Privilege'}</Link></li>
            </ul>
          </div>

          {/* Travel Tools */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest text-sham-brass mb-4 ${titleFontClass}`}>
              {isRTL ? 'خدمات المسافرين' : 'Travel Concierge'}
            </h4>
            <ul className={`space-y-2 text-xs ${fontClass}`}>
              <li><Link href={`/${locale}/flight-status`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'رادار الرحلات' : 'Flight Radar & Status'}</Link></li>
              <li><Link href={`/${locale}/check-in`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'إنهاء إجراءات السفر' : 'Digital Check-in'}</Link></li>
              <li><Link href={`/${locale}/manage-trip`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'إدارة الحجز' : 'Manage Booking'}</Link></li>
              <li><Link href={`/${locale}/experience/lounge`} className="hover:text-sham-ivory transition-colors">{isRTL ? 'صالة الفيحاء الفاخرة' : 'Al-Fayhaa Lounge'}</Link></li>
            </ul>
          </div>

          {/* Legal & Hub Info */}
          <div>
            <h4 className={`text-xs font-bold uppercase tracking-widest text-sham-brass mb-4 ${titleFontClass}`}>
              {isRTL ? 'المقر الرئيسي' : 'Global Headquarters'}
            </h4>
            <p className={`text-xs text-sham-stone/70 leading-relaxed ${fontClass}`}>
              Damascus International Airport (DAM)<br />
              Al-Fayhaa VIP Terminal, Damascus, Syrian Arab Republic
            </p>
            <div className="mt-4 pt-4 border-t border-sham-borderDark text-[11px] text-sham-stone/50">
              © 2026 SHAM AIR. All Rights Reserved.
            </div>
          </div>

        </div>

        {/* Footer Credit Link required by Brief */}
        <div className="mt-12 pt-6 border-t border-sham-borderDark flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-sham-stone/60">
          <div>
            <span>{isRTL ? 'شام للطيران © 2026 - التجربة الرقمية الملكية' : 'SHAM AIR © 2026 - Modern Luxury Airline Digital Experience'}</span>
          </div>

          {/* Aboud Web required credit link */}
          <div className="text-xs text-sham-stone/60 font-latinBody">
            Designed & Developed by{' '}
            <a
              href="https://aboudweb.onrender.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sham-brass hover:text-sham-ivory transition-colors duration-300 underline underline-offset-4 ms-1"
            >
              Aboud Web
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
