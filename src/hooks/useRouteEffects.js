import { useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router';
import { getVisualPreferences } from '../visualEffects.js';
import { scrollPageTo } from '../smoothScroll.js';

export default function useRouteEffects(contentRef) {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(null);

  useLayoutEffect(() => {
    const pathChanged = previousPath.current !== null && previousPath.current !== location.pathname;
    const firstVisit = previousPath.current === null;
    previousPath.current = location.pathname;

    if (pathChanged) {
      contentRef.current.dataset.clientNavigation = 'true';
      document.getElementById('main-content')?.focus({ preventScroll: true });
    }

    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target?.id === 'main-content') target.focus({ preventScroll: true });
      scrollPageTo(target, {
        immediate: pathChanged || firstVisit || target?.id === 'main-content',
      });
    } else if (pathChanged || firstVisit) {
      scrollPageTo(0, { immediate: true });
    }

    if (
      pathChanged &&
      (!document.startViewTransition || navigationType === 'POP') &&
      !getVisualPreferences().reducedMotion
    ) {
      const animation = contentRef.current.animate([{ opacity: 0.6 }, { opacity: 1 }], {
        duration: 240,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      });
      return () => animation.cancel();
    }
  }, [contentRef, location.pathname, location.hash, location.key, navigationType]);

  return { pathname: location.pathname, navigationType };
}
