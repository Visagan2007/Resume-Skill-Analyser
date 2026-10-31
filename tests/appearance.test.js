import assert from 'node:assert/strict';
import { after, afterEach, before, test } from 'node:test';
import { transitionAppearance } from '../src/appearanceTransition.js';
import {
  getVisualPreferences,
  setVisualEffectsPreference,
  subscribeVisualEffects,
} from '../src/visualEffects.js';

const storage = new Map([['rsa-effects', 'reduced']]);
const motion = new EventTarget();
const transparency = new EventTarget();
const documentEvents = new EventTarget();
const browserEvents = new EventTarget();
const transitions = [];
let storageBlocked = false;
let unsubscribe;
const previousDocument = globalThis.document;
const previousWindow = globalThis.window;

function startViewTransition(update) {
  const ready = Promise.withResolvers();
  const finished = Promise.withResolvers();
  let applied = false;
  const transition = {
    ready: ready.promise,
    finished: finished.promise,
    finish() {
      if (!applied) {
        applied = true;
        update();
        ready.resolve();
      }
      finished.resolve();
    },
    skipTransition() {
      this.finish();
    },
  };
  transitions.push(transition);
  return transition;
}

function storageEvent(value) {
  storage.set('rsa-effects', value);
  browserEvents.dispatchEvent(Object.assign(new Event('storage'), { key: 'rsa-effects' }));
}

async function finishTransitions() {
  for (const transition of transitions) transition.finish();
  await Promise.resolve();
}

before(() => {
  motion.matches = false;
  transparency.matches = false;
  globalThis.document = {
    documentElement: { dataset: {}, getBoundingClientRect: () => ({}) },
    visibilityState: 'visible',
    startViewTransition,
    addEventListener: (type, listener, capture) =>
      documentEvents.addEventListener(type, listener, { capture }),
    removeEventListener: (type, listener, capture) =>
      documentEvents.removeEventListener(type, listener, { capture }),
  };
  globalThis.window = {
    localStorage: {
      getItem: (key) => storage.get(key) ?? null,
      setItem(key, value) {
        if (storageBlocked) throw new Error('Storage unavailable');
        storage.set(key, value);
      },
    },
    matchMedia: (query) => (query.includes('transparency') ? transparency : motion),
    addEventListener: (...args) => browserEvents.addEventListener(...args),
    removeEventListener: (...args) => browserEvents.removeEventListener(...args),
    setTimeout,
  };
  unsubscribe = subscribeVisualEffects(() => {});
});

afterEach(async () => {
  storageBlocked = false;
  motion.matches = false;
  transparency.matches = false;
  document.startViewTransition = startViewTransition;
  setVisualEffectsPreference('reduced');
  await finishTransitions();
  transitions.length = 0;
});

after(() => {
  unsubscribe();
  if (previousDocument === undefined) delete globalThis.document;
  else globalThis.document = previousDocument;
  if (previousWindow === undefined) delete globalThis.window;
  else globalThis.window = previousWindow;
});

test('rapid theme changes keep the latest choice after every queued callback finishes', async () => {
  let theme = 'light';
  for (const choice of ['dark', 'light', 'dark']) {
    transitionAppearance(() => {
      theme = choice;
    });
  }
  await finishTransitions();
  assert.equal(theme, 'dark');
  assert.equal(document.documentElement.dataset.appearanceTransition, undefined);
});

test('reduced motion commits immediately without starting a transition', () => {
  let applied = false;
  transitionAppearance(
    () => {
      applied = true;
    },
    { reducedMotion: true },
  );
  assert.equal(applied, true);
  assert.equal(transitions.length, 0);
});

for (const input of ['pointerdown', 'keydown']) {
  test(`${input} keeps the chosen appearance and releases an interrupted transition`, async () => {
    let applied = 0;
    transitionAppearance(() => {
      applied += 1;
    });
    documentEvents.dispatchEvent(new Event(input));
    await finishTransitions();
    assert.equal(applied, 1);
    assert.equal(document.documentElement.dataset.appearanceTransition, undefined);
  });
}

test('the CSS fallback remains interruptible by a reduced-motion change', () => {
  document.startViewTransition = undefined;
  let theme = 'light';
  transitionAppearance(() => {
    theme = 'dark';
  });
  assert.equal(theme, 'dark');
  assert.equal(document.documentElement.dataset.appearanceFallback, 'theme');
  transitionAppearance(
    () => {
      theme = 'light';
    },
    { reducedMotion: true },
  );
  assert.equal(theme, 'light');
  assert.equal(document.documentElement.dataset.appearanceFallback, undefined);
});

test('rapid effects selections keep the final preference and persisted value', async () => {
  for (const choice of ['full', 'reduced', 'full', 'reduced']) {
    setVisualEffectsPreference(choice);
  }
  await finishTransitions();
  assert.equal(getVisualPreferences().preference, 'reduced');
  assert.equal(document.documentElement.dataset.motion, 'reduced');
  assert.equal(storage.get('rsa-effects'), 'reduced');
});

test('a newer cross-tab preference supersedes a pending local choice', async () => {
  setVisualEffectsPreference('full');
  storageEvent('reduced');
  await finishTransitions();
  assert.equal(getVisualPreferences().preference, 'reduced');
  assert.equal(document.documentElement.dataset.transparency, 'reduced');
});

test('a device change keeps an explicit Full effects choice that is still pending', async () => {
  setVisualEffectsPreference('full');
  motion.matches = true;
  motion.dispatchEvent(new Event('change'));
  await finishTransitions();
  assert.equal(getVisualPreferences().preference, 'full');
  assert.equal(getVisualPreferences().reducedMotion, false);
  assert.equal(storage.get('rsa-effects'), 'full');
});

test('device settings resolve the latest pending System preference', async () => {
  setVisualEffectsPreference('system');
  motion.matches = true;
  motion.dispatchEvent(new Event('change'));
  await finishTransitions();
  assert.equal(getVisualPreferences().preference, 'system');
  assert.equal(getVisualPreferences().reducedMotion, true);
  assert.equal(getVisualPreferences().reducedTransparency, false);
});

test('an explicit choice still applies when browser storage is unavailable', async () => {
  storageBlocked = true;
  setVisualEffectsPreference('full');
  await finishTransitions();
  assert.equal(getVisualPreferences().preference, 'full');
  assert.equal(document.documentElement.dataset.effects, 'full');
});
