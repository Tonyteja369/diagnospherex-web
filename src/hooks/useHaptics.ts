import { useEffect, useRef } from 'react';
import { WebHaptics } from 'web-haptics';

let sharedInstance: WebHaptics | null = null;

function getHapticsInstance(): WebHaptics {
  if (!sharedInstance) {
    sharedInstance = new WebHaptics();
  }
  return sharedInstance;
}

export type HapticPreset = 'success' | 'nudge' | 'error' | 'buzz';

/**
 * Global haptic hook — safe on desktop (no-op), triggers vibration on mobile.
 */
export function useHaptics() {
  const haptics = useRef<WebHaptics | null>(null);

  useEffect(() => {
    haptics.current = getHapticsInstance();
  }, []);

  const trigger = (preset: HapticPreset = 'nudge') => {
    haptics.current?.trigger(preset);
  };

  return { trigger };
}
