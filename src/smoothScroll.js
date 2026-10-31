import Lenis from 'lenis';
import { getVisualPreferences, subscribeVisualEffects } from './visualEffects.js';

let scroller = null;
let pageLocked = false;
const scrollKeys = new Set([
  'ArrowUp',
  'ArrowDown',
  'PageUp',
  'PageDown',
  'Home',
  'End',
  ' ',
  'Escape',
]);

function interruptScroll() {
  scroller?.stop();
  if (!pageLocked) scroller?.start();
}

export function scrollPageTo(target, { immediate = false } = {}) {
  const instant = immediate || getVisualPreferences().reducedMotion;
  if (scroller) {
    interruptScroll();
    scroller.resize();
    scroller.scrollTo(target, { immediate: instant, force: instant, duration: 0.9 });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, left: 0, behavior: instant ? 'instant' : 'smooth' });
  } else {
    target?.scrollIntoView({ block: 'start', behavior: instant ? 'instant' : 'smooth' });
  }
}

export function setPageScrollLocked(locked) {
  pageLocked = locked;
  if (locked) scroller?.stop();
  else scroller?.start();
}

export function initializeSmoothScroll() {
  const configure = () => {
    if (getVisualPreferences().reducedMotion) {
      scroller?.destroy();
      scroller = null;
    } else if (!scroller) {
      scroller = new Lenis({
        autoRaf: true,
        lerp: 0.12,
        smoothWheel: true,
        syncTouch: false,
        respectReducedMotion: false,
        stopInertiaOnNavigate: true,
        prevent: (node) => node.matches('dialog, [role="listbox"]'),
      });
      if (pageLocked) scroller.stop();
    }
  };
  const onKeyDown = (event) => {
    if (scrollKeys.has(event.key)) interruptScroll();
  };
  configure();
  const unsubscribe = subscribeVisualEffects(configure);
  window.addEventListener('pointerdown', interruptScroll, { passive: true });
  window.addEventListener('keydown', onKeyDown);
  return () => {
    unsubscribe();
    window.removeEventListener('pointerdown', interruptScroll);
    window.removeEventListener('keydown', onKeyDown);
    scroller?.destroy();
    scroller = null;
  };
}
