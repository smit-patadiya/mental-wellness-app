'use client';

import { useEffect, useState } from 'react';
import { MUSIC_TRACKS, playMusic, stopMusic, currentMusic, subscribeMusic } from '@/lib/music';

export function Sounds() {
  const [, force] = useState(0);
  useEffect(() => subscribeMusic(() => force((n) => n + 1)), []);
  const now = currentMusic();

  return (
    <>
      <h1 className="headline" style={{ marginBottom: 4 }}>Sounds</h1>
      <p className="muted" style={{ marginTop: 0 }}>Sound therapy — keeps playing while you use the app.</p>
      {MUSIC_TRACKS.map((t) => {
        const on = now === t.id;
        return (
          <button
            key={t.id}
            onClick={() => (on ? stopMusic() : playMusic(t.id))}
            aria-pressed={on}
            style={{
              display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
              padding: '13px 0', borderTop: '1px solid var(--line)', background: 'none', border: 0,
              borderBottom: 0, cursor: 'pointer', color: 'var(--ink)', fontFamily: 'inherit', fontSize: 15,
            }}
          >
            <span style={{ width: 40, height: 40, borderRadius: 13, background: t.color, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M9 18V5l9-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
              </svg>
            </span>
            <span style={{ flex: 1, fontWeight: 500 }}>{t.name}</span>
            <span style={{ color: on ? 'var(--p-500)' : 'var(--muted)' }} aria-label={on ? 'Pause' : 'Play'}>
              {on ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              )}
            </span>
          </button>
        );
      })}
      <div className="card" style={{ marginTop: 16, textAlign: 'center' }}>
        <div className="muted" style={{ fontSize: 13 }}>{now ? 'Now playing' : 'Tap a sound to begin'}</div>
        {now && <div style={{ fontWeight: 600, marginTop: 2 }}>{MUSIC_TRACKS.find((t) => t.id === now)?.name}</div>}
      </div>
    </>
  );
}
