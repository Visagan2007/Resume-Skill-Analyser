import { useMemo, useSyncExternalStore } from 'react';
import {
  getServerVisualPreferences,
  getVisualPreferences,
  setVisualEffectsPreference,
  subscribeVisualEffects,
} from './visualEffects.js';

export default function useVisualEffects() {
  const preference = useSyncExternalStore(
    subscribeVisualEffects,
    getVisualPreferences,
    getServerVisualPreferences,
  );
  return useMemo(
    () => ({ ...preference, setPreference: setVisualEffectsPreference }),
    [preference],
  );
}
