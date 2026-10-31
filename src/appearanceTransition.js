import { flushSync } from 'react-dom';

let activeChange;

export function transitionAppearance(update, { reducedMotion = false, kind = 'theme' } = {}) {
  activeChange?.commit();
  activeChange?.transition?.skipTransition();
  activeChange?.cleanup();

  const root = document.documentElement;
  let committed = false;
  const change = {
    commit() {
      if (committed) return;
      committed = true;
      flushSync(update);
    },
    cleanup() {
      clearTimeout(change.timer);
      document.removeEventListener('pointerdown', interrupt, true);
      document.removeEventListener('keydown', interrupt, true);
      if (activeChange !== change) return;
      delete root.dataset.appearanceTransition;
      delete root.dataset.appearanceFallback;
      activeChange = undefined;
    },
  };
  function interrupt() {
    change.commit();
    change.transition?.skipTransition();
    change.cleanup();
  }

  if (reducedMotion || document.visibilityState === 'hidden') {
    change.commit();
    return;
  }

  activeChange = change;
  if (!document.startViewTransition) {
    root.dataset.appearanceFallback = kind;
    root.getBoundingClientRect();
    change.commit();
    change.timer = window.setTimeout(change.cleanup, 400);
    return;
  }

  root.dataset.appearanceTransition = kind;
  try {
    change.transition = document.startViewTransition(change.commit);
    document.addEventListener('pointerdown', interrupt, true);
    document.addEventListener('keydown', interrupt, true);
    change.transition.ready.catch(() => {});
    change.transition.finished.then(change.cleanup, change.cleanup);
  } catch {
    change.commit();
    change.cleanup();
  }
}
