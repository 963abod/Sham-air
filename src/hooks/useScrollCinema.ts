'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function useScrollCinema(targetRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!targetRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cinema-layer-1',
        { y: 0, opacity: 1 },
        {
          y: -100,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: targetRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        '.cinema-text-fade',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: targetRef.current,
            start: 'top 80%',
          },
        }
      );
    }, targetRef);

    return () => ctx.revert();
  }, [targetRef]);
}
