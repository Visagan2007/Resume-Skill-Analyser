import { transitionAppearance } from './appearanceTransition.js';

const storageKey = 'rsa-effects';
const preferences = new Set(['system', 'full', 'reduced']);
const serverSnapshot = Object.freeze({
  preference: 'full',
  reducedMotion: false,
  reducedTransparency: false,
});
const listeners = new Set();
let snapshot = serverSnapshot;
let initialized = false;
let motionQuery;
let transparencyQuery;

function normalizePreference(value) {
  return preferences.has(value) ? value : 'full';
}

function storedPreference() {
  try {
    return normalizePreference(window.localStorage.getItem(storageKey));
  } catch {
    return normalizePreference(document.documentElement.dataset.effects);
  }
}

function resolvedSnapshot(preference) {
  return {
    preference,
    reducedMotion: preference === 'reduced' || (preference === 'system' && !!motionQuery?.matches),
    reducedTransparency:
      preference === 'reduced' || (preference === 'system' && !!transparencyQuery?.matches),
  };
}

function applyAttributes(value) {
  const root = document.documentElement;
  root.dataset.effects = value.preference;
  root.dataset.motion = value.reducedMotion ? 'reduced' : 'full';
  root.dataset.transparency = value.reducedTransparency ? 'reduced' : 'full';
}

function initialize() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  motionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  transparencyQuery = window.matchMedia?.('(prefers-reduced-transparency: reduce)');
  snapshot = Object.freeze(resolvedSnapshot(storedPreference()));
  applyAttributes(snapshot);
}

function update(preference) {
  const next = resolvedSnapshot(preference);
  applyAttributes(next);
  if (
    snapshot.preference === next.preference &&
    snapshot.reducedMotion === next.reducedMotion &&
    snapshot.reducedTransparency === next.reducedTransparency
  )
    return;
  snapshot = Object.freeze(next);
  for (const listener of listeners) listener();
}

function onSystemChange() {
  transitionAppearance(() => update(snapshot.preference), { reducedMotion: true });
}

function onStorage(event) {
  if (event.key === storageKey || event.key === null) {
    const preference = storedPreference();
    transitionAppearance(() => update(preference), { reducedMotion: true });
  }
}

export function getVisualPreferences() {
  initialize();
  return snapshot;
}

export function getServerVisualPreferences() {
  return serverSnapshot;
}

export function setVisualEffectsPreference(value) {
  initialize();
  if (typeof window === 'undefined') return;
  const preference = normalizePreference(value);
  try {
    window.localStorage.setItem(storageKey, preference);
  } catch {
    // An explicit choice still works for this visit when storage is blocked.
  }
  const next = resolvedSnapshot(preference);
  const appearanceChanged =
    snapshot.reducedMotion !== next.reducedMotion ||
    snapshot.reducedTransparency !== next.reducedTransparency;
  transitionAppearance(() => update(preference), {
    reducedMotion: next.reducedMotion || !appearanceChanged,
    kind: 'effects',
  });
}

export function subscribeVisualEffects(listener) {
  initialize();
  listeners.add(listener);
  if (listeners.size === 1 && typeof window !== 'undefined') {
    motionQuery?.addEventListener('change', onSystemChange);
    transparencyQuery?.addEventListener('change', onSystemChange);
    window.addEventListener('storage', onStorage);
    update(snapshot.preference);
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && typeof window !== 'undefined') {
      motionQuery?.removeEventListener('change', onSystemChange);
      transparencyQuery?.removeEventListener('change', onSystemChange);
      window.removeEventListener('storage', onStorage);
    }
  };
}
