'use client';

import React, { useRef } from 'react';
import { useScrollCinema } from '@/hooks/useScrollCinema';
import { useDirection } from '@/hooks/useDirection';
import { PatternOverlay } from '../common/PatternOverlay';
import { DoorOpen, Sparkles, Droplets, PlaneTakeoff } from 'lucide-react';

export function DamasceneJourneyScroll({ locale }: { locale: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  useScrollCinema(containerRef);
  const { isRTL, fontClass, titleFontClass } = useDirection(locale);

  const steps = [
    {
      num: '01',
      title: isRTL ? 'الباب العتيق: مدخل التاريخ' : 'The Gate: Transition from History',
      desc: isRTL
        ? 'منذ لحظة خروجك من شوارع دمشق القديمة، تفتح لك أبواب الفيحاء النحاسية لتستقبلك بفخامة لا تُنسى.'
        : 'Step through the heavy sculpted brass gates of Old Damascus into an immaculate realm of tranquility.',
      icon: DoorOpen,
    },
    {
      num: '02',
      title: isRTL ? 'إضاءة المشربية: ظلال ونور' : 'Ambient Mashrabiya: Light & Shadow',
      desc: isRTL
        ? 'تصاميم الخشب الهندسي تعكس أضواء خافتة ودافئة تحاكي منازل دمشق التراثية.'
        : 'Geometric mashrabiya partitions filter daylight into soothing warmth across the VIP check-in lounge.',
      icon: Sparkles,
    },
    {
      num: '03',
      title: isRTL ? 'خفش البحرة ورائحة الياسمين' : 'Courtyard Water Surface & Jasmine',
      desc: isRTL
        ? 'صوت انسياب المياه ورائحة ياسمين دمشق الزكية يمهدان الطريق لراحة بال كاملة قبل الإقلاع.'
        : 'The soothing sound of trickling central courtyard fountains and fragrant jasmine notes calm your senses.',
      icon: Droplets,
    },
    {
      num: '04',
      title: isRTL ? 'التحليق الملكي: طائرة المستقبل' : 'The Jet Transition: Modern Sky Luxury',
      desc: isRTL
        ? 'تنتقل بسلاسة من الأروقة الدمشقية إلى جناحك الخاص في أحدث طائرات العالم.'
        : 'Board directly into your private high-altitude sanctuary on the Airbus A350-1000 Ultra.',
      icon: PlaneTakeoff,
    },
  ];

  return (
    <section ref={containerRef} className="py-24 bg-sham-cardDark/80 relative overflow-hidden border-y border-sham-brass/20">
      <PatternOverlay variant="mashrabiya" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs uppercase tracking-widest text-sham-brass font-bold">
            {isRTL ? 'رحلة التحول الدمشقي' : 'THE DAMASCENE JOURNEY'}
          </span>
          <h2 className={`text-3xl sm:text-5xl font-bold text-sham-ivory ${titleFontClass}`}>
            {isRTL ? 'من صحن الدار إلى عنان السماء' : 'From The Courtyard To The Horizon'}
          </h2>
          <p className={`text-sm text-sham-stone/70 ${fontClass}`}>
            {isRTL
              ? 'رحلتك معنا ليست مجرد طيران، بل تجربة حسية متكاملة تنقلك بين الضيافة العريقة والتكنولوجيا الحديثة.'
              : 'A poetic transition from architectural heritage to futuristic sky travels.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="cinema-text-fade p-6 glass-panel rounded-2xl border border-sham-brass/30 hover:border-sham-brass transition-all duration-300 relative group space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold font-serif text-sham-brass/40 group-hover:text-sham-brass transition-colors">
                    {step.num}
                  </span>
                  <div className="p-3 rounded-full bg-sham-brass/10 border border-sham-brass/30 text-sham-brass group-hover:bg-sham-brass group-hover:text-sham-dark transition-all">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className={`text-lg font-bold text-sham-ivory ${titleFontClass}`}>{step.title}</h3>
                <p className={`text-xs text-sham-stone/70 leading-relaxed ${fontClass}`}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
