import { useEffect } from 'react';
import useVisualEffects from '../useVisualEffects.js';

export default function useScrollReveal(pageRef, selector, visibleClass) {
  const { reducedMotion } = useVisualEffects();

  useEffect(() => {
    if (reducedMotion || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add(visibleClass);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12 },
    );

    pageRef.current?.querySelectorAll(selector).forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [pageRef, reducedMotion, selector, visibleClass]);
}
