'use client';

import { useEffect, useRef, useState } from 'react';

// Sound therapy — gentle ambient generated with the Web Audio API (no external files).
const TRACKS = [
  { id: 'rain', name: 'Rain on a window', color: '#5BA7C9', cutoff: 900, gain: 0.16 },
  { id: 'forest', name: 'Forest morning', color: '#2E8270', cutoff: 1400, gain: 0.13 },
  { id: 'focus', name: 'Deep focus', color: '#9B86C9', cutoff: 500, gain: 0.18 },
  { id: 'sleep', name: 'Wind-down for sleep', color: '#E89A6B', cutoff: 340, gain: 0.2 },
];

export function Sounds() {
  const [playing, setPlaying] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const srcRef = useRef<AudioBufferSourceNode | null>(null);

  function stop() {
    if (srcRef.current) {
      try {
        srcRef.current.stop();
      } catch {
        /* already stopped */
      }
      srcRef.current = null;
    }
    setPlaying(null);
  }

  function play(t: (typeof TRACKS)[number]) {
    const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!AC) return;
    if (!ctxRef.current) ctxRef.current = new AC();
    const ctx = ctxRef.current!;
    stop();
    const size = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, size, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let last = 0;
    for (let i = 0; i < size; i++) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[i] = last * 3.5;
    }
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = t.cutoff;
    const gain = ctx.createGain();
    gain.gain.value = t.gain;
    src.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    src.start();
    srcRef.current = src;
    setPlaying(t.id);
  }

  function toggle(t: (typeof TRACKS)[number]) {
    if (playing === t.id) stop();
    else play(t);
  }

  useEffect(() => {
    return () => {
      stop();
      if (ctxRef.current) {
        try {
          ctxRef.current.close();
        } catch {
          /* noop */
        }
      }
    };
  }, []);

  const now = TRACKS.find((t) => t.id === playing);

  return (
    <>
      <h1 className="headline" style={{ marginBottom: 4 }}>Sounds</h1>
      <p className="muted" style={{ marginTop: 0 }}>Sound therapy — gentle ambience to settle the mind.</p>
      {TRACKS.map((t) => (
        <button
          key={t.id}
          onClick={() => toggle(t)}
          aria-pressed={playing === t.id}
          style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
            padding: '13px 0', borderTop: '1px solid var(--line)', background: 'none', border: 0,
            borderBottom: 0, cursor: 'pointer', color: 'var(--ink)', fontFamily: 'inherit', fontSize: 15,
          }}
        >
          <span style={{ width: 38, height: 38, borderRadius: 12, background: t.color, flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M9 18V5l9-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
            </svg>
          </span>
          <span style={{ flex: 1, fontWeight: 500 }}>{t.name}</span>
          <span style={{ color: playing === t.id ? 'var(--p-500)' : 'var(--muted)' }} aria-label={playing === t.id ? 'Pause' : 'Play'}>
            {playing === t.id ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            )}
          </span>
        </button>
      ))}
      <div className="card" style={{ marginTop: 16, textAlign: 'center' }}>
        <div className="muted" style={{ fontSize: 13 }}>{now ? 'Now playing' : 'Tap a sound to begin'}</div>
        {now && <div style={{ fontWeight: 600, marginTop: 2 }}>{now.name}</div>}
      </div>
    </>
  );
}
