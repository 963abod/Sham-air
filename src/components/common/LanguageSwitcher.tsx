'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';

const LANGUAGES = [
  { code: 'ar', name: 'العربية', flag: '🇸🇾' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
];

export function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleSelect = (newLocale: string) => {
    if (!pathname) return;
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  return (
    <div className="relative inline-block text-start">
      <select
        value={currentLocale}
        onChange={(e) => handleSelect(e.target.value)}
        className="bg-sham-cardDark/80 text-sham-stone text-xs font-medium px-2.5 py-1.5 rounded border border-sham-brass/30 focus:outline-none focus:border-sham-brass cursor-pointer hover:text-sham-ivory transition-colors"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code} className="bg-sham-dark text-sham-ivory">
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
