'use client';

import { useEffect } from 'react';

/**
 * Sets a `data-daypart` attribute on <html> based on the local hour so the
 * palette can shift gently across the day (see app/globals.scss). Calm, subtle —
 * mood-based theming is layered on top by the design team (see ANTIGRAVITY.md).
 */
export function DaypartTheme() {
  useEffect(() => {
    const h = new Date().getHours();
    const part =
      h < 5 ? 'night' : h < 11 ? 'morning' : h < 17 ? 'day' : h < 21 ? 'evening' : 'night';
    document.documentElement.dataset.daypart = part;
  }, []);
  return null;
}
