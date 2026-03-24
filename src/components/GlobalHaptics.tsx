import { useEffect } from 'react';
import { WebHaptics } from 'web-haptics';

/**
 * GlobalHaptics — mounts once, listens for all touch/click events on
 * interactive elements and fires a subtle 'nudge' haptic.
 *
 * Works silently on desktop (WebHaptics.isSupported = false → no-op).
 */
const haptics = new WebHaptics();

const INTERACTIVE_SELECTORS = [
  'button',
  'a',
  '[role="button"]',
  '.vp-dot',
  '.apply-btn',
  '.btn-primary',
  '.btn-secondary',
  '.demo-tab',
  '.mobile-menu-btn',
  '.submit-btn',
  '.cta-btn',
  '.cta-nav',
].join(', ');

export default function GlobalHaptics() {
  useEffect(() => {
    if (!WebHaptics.isSupported) return; // Desktop no-op

    const handleTouch = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      // Check if the tapped element is or contains an interactive element
      if (target.closest(INTERACTIVE_SELECTORS)) {
        haptics.trigger('nudge');
      }
    };

    // Use touchstart for instant response before touchend
    document.addEventListener('touchstart', handleTouch, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouch);
    };
  }, []);

  return null; // No visible output
}
