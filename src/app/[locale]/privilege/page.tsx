'use client';

import React from 'react';
import Link from 'next/link';
import { useDirection } from '@/hooks/useDirection';
import { Navbar } from '@/components/common/Navbar';
import { Footer } from '@/components/common/Footer';
import { PatternOverlay } from '@/components/common/PatternOverlay';
import { Crown, Sparkles, ShieldCheck, Gift, Award, Star } from 'lucide-react';

export default function PrivilegePage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = React.use(params);
  const locale = resolvedParams.locale || 'en';
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const tiers = [
    {
      name: 'Silver Jasmine (الياسمين الفضي)',
      points: '10,000 Miles',
      perks: ['10% Bonus Miles on DAM routes', 'Priority Check-in at Al-Fayhaa Terminal', 'Extra 10kg Checked Luggage Allowance'],
      color: 'border-sham-stone text-sham-stone',
    },
    {
      name: 'Gold Basalt (البازلت الذهبي)',
      points: '30,000 Miles',
      perks: ['25% Bonus Miles', 'Complimentary Al-Fayhaa VIP Lounge Access for 2', 'Dedicated Chauffeur Airport Transfer'],
      color: 'border-sham-brass text-sham-brass',
    },
    {
      name: 'Platinum Damascus Rose (الورد الجوري الرئاسي)',
      points: '75,000 Miles',
      perks: ['50% Bonus Miles', 'Guaranteed First Suite Upgrades', 'Personal Concierge 24/7', 'Unlimited Lounge Access Worldwide'],
      color: 'border-amber-400 text-amber-300',
    },
    {
      name: 'Royal Umayyad Sovereign (الملكي الأموي)',
      points: 'Invitation Only',
      perks: ['Private Rolls-Royce Tarmac Escort', 'Dedicated Private Jet Concierge', 'Complimentary Companion First Suite Seat'],
      color: 'border-sham-brass bg-sham-brass/10 text-sham-brass shadow-brass-glow',
    },
  ];

  return (
    <div className="min-h-screen bg-sham-dark text-sham-ivory flex flex-col justify-between">
      <Navbar locale={locale} />

      <main className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass text-xs uppercase font-bold">
            <Crown className="w-3.5 h-3.5" />
            <span>{isRTL ? 'نادي شام الماسية' : 'SHAM PRIVILEGE LOYALTY CLUB'}</span>
          </div>
          <h1 className={`text-3xl sm:text-5xl font-bold ${titleFontClass}`}>
            {isRTL ? 'مكافآت الطيران الملكية' : 'Sovereign Rewards Above The Clouds'}
          </h1>
          <p className={`text-xs sm:text-sm text-sham-stone/70 ${fontClass}`}>
            {isRTL ? 'انضم إلى برنامج الولاء الأرقى وراكم الأميال الملكية مع كل رحلة إلى دمشق والعالم.' : 'Earn Imperial Miles and enjoy unprecedented privileges across our global network.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tiers.map((tier, idx) => (
            <div key={idx} className={`glass-panel p-6 rounded-3xl border ${tier.color} space-y-4 flex flex-col justify-between`}>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Award className="w-6 h-6 text-sham-brass" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-sham-brass px-2 py-0.5 rounded bg-sham-brass/10">
                    {tier.points}
                  </span>
                </div>
                <h3 className={`text-lg font-bold text-sham-ivory ${titleFontClass}`}>{tier.name}</h3>
                <ul className="space-y-2 text-xs text-sham-stone/80 pt-2 border-t border-sham-borderDark">
                  {tier.perks.map((perk, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <Star className="w-3 h-3 text-sham-brass shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-sham-borderDark">
                <button className="w-full py-2.5 bg-sham-cardDark border border-sham-brass/40 text-sham-brass text-xs font-bold rounded hover:bg-sham-brass hover:text-sham-dark transition-colors">
                  Enroll Tier
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
