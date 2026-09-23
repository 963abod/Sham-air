'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDirection } from '@/hooks/useDirection';
import { LanguageSwitcher } from './LanguageSwitcher';
import { CurrencySwitcher } from './CurrencySwitcher';
import { Menu, X, Plane, Compass, Crown, Shield, Utensils, Info } from 'lucide-react';

export function Navbar({ locale }: { locale: string }) {
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: `/${locale}/book`, label: isRTL ? 'حجز الرحلات' : 'Book Flight', icon: Plane },
    { href: `/${locale}/destinations`, label: isRTL ? 'الوجهات' : 'Destinations', icon: Compass },
    { href: `/${locale}/experience`, label: isRTL ? 'تجربة الطيران' : 'The Experience', icon: Utensils },
    { href: `/${locale}/fleet`, label: isRTL ? 'الأسطول' : 'Fleet', icon: Info },
    { href: `/${locale}/privilege`, label: isRTL ? 'شام الماسية' : 'Sham Privilege', icon: Crown },
    { href: `/${locale}/flight-status`, label: isRTL ? 'حالة الرحلات' : 'Flight Status', icon: Shield },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-panel border-b border-sham-brass/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Identity */}
          <Link href={`/${locale}`} className="flex items-center space-x-3 rtl:space-x-reverse group">
            <div className="w-10 h-10 rounded-full border border-sham-brass/50 flex items-center justify-center bg-sham-cardDark/80 group-hover:border-sham-brass transition-all duration-300 shadow-brass-glow">
              <span className="text-sham-brass font-bold text-lg">ش</span>
            </div>
            <div className="flex flex-col">
              <span className={`text-xl font-bold tracking-wider text-sham-ivory group-hover:text-sham-brass transition-colors ${titleFontClass}`}>
                {isRTL ? 'شام للطيران' : 'SHAM AIR'}
              </span>
              <span className="text-[10px] tracking-widest text-sham-stone/70 font-sans uppercase">
                {isRTL ? 'من دمشق، إلى العالم' : 'FROM DAMASCUS, TO THE WORLD'}
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs uppercase tracking-wider font-medium text-sham-stone hover:text-sham-brass transition-colors flex items-center gap-1.5 ${fontClass}`}
                >
                  <Icon className="w-3.5 h-3.5 text-sham-brass/70" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Controls & Quick Actions */}
          <div className="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
            <CurrencySwitcher />
            <LanguageSwitcher currentLocale={locale} />
            <Link
              href={`/${locale}/book`}
              className="bg-sham-brass text-sham-dark text-xs font-bold uppercase tracking-wider px-4 py-2 rounded shadow-luxury hover:bg-sham-brassHover transition-all transform hover:-translate-y-0.5"
            >
              {isRTL ? 'احجز الآن' : 'Book Now'}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-3 rtl:space-x-reverse">
            <CurrencySwitcher />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-sham-stone hover:text-sham-brass focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-sham-cardDark border-b border-sham-brass/30 px-4 pt-4 pb-6 space-y-3">
          <div className="flex justify-between items-center pb-3 border-b border-sham-borderDark">
            <LanguageSwitcher currentLocale={locale} />
            <span className="text-xs text-sham-stone">10 Languages Supported</span>
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`block py-2 text-sm text-sham-stone hover:text-sham-brass font-medium border-b border-sham-borderDark/40 ${fontClass}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href={`/${locale}/book`}
              onClick={() => setIsOpen(false)}
              className="block text-center bg-sham-brass text-sham-dark text-xs font-bold uppercase py-3 rounded shadow-luxury"
            >
              {isRTL ? 'احجز الآن' : 'Book Now'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
