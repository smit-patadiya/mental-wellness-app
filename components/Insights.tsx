'use client';

import * as React from 'react';
import { getEntries, type Entry } from '../lib/storage';

/** Bar color for a 1–10 mood score. */
function moodColor(score: number): string {
  if (score >= 7) return 'var(--p-500)';
  if (score >= 4) return 'var(--a-500)';
  return 'var(--rose-700)';
}

/** Tally stressors across all entries, most frequent first. */
function topTriggers(entries: Entry[]): string[] {
  const counts = new Map<string, number>();
  for (const e of entries) {
    for (const s of e.stressors) {
      const key = s.trim();
      if (key) counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name]) => name);
}

const labelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '.06em',
  textTransform: 'uppercase',
  color: 'var(--muted)',
  margin: '20px 2px 8px',
};

export function Insights() {
  const entries = getEntries();

  if (entries.length === 0) {
    return (
      <section>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 27, letterSpacing: '-.015em', margin: '2px 0 16px' }}>
          Your patterns
        </h2>
        <div className="card" style={{ padding: 20, textAlign: 'center', color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
          Your patterns will appear here after a few check-ins.
        </div>
      </section>
    );
  }

  const triggers = topTriggers(entries);
  const topTriggers4 = triggers.slice(0, 4);
  const topStressor = triggers[0];
  const recent = entries.slice(-14);

  return (
    <section>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 27, letterSpacing: '-.015em', margin: '2px 0 16px' }}>
        Your patterns
      </h2>

      {entries.length >= 2 && topStressor && (
        <div className="card" style={{ padding: 14 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--p-500)', marginBottom: 5 }}>
            This week
          </div>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: 'var(--ink)' }}>
            Your mood tends to dip when{' '}
            <b style={{ color: 'var(--p-700)' }}>{topStressor}</b> comes up.
          </p>
        </div>
      )}

      {topTriggers4.length > 0 && (
        <>
          <p style={labelStyle}>Triggers</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {topTriggers4.map((t) => (
              <span
                key={t}
                style={{
                  background: 'var(--p-50)',
                  color: 'var(--p-700)',
                  border: '1px solid var(--p-200)',
                  borderRadius: 999,
                  padding: '6px 13px',
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </>
      )}

      <p style={labelStyle}>Mood · last {recent.length} {recent.length === 1 ? 'check-in' : 'check-ins'}</p>
      <div
        style={{ display: 'flex', alignItems: 'flex-end', gap: 5, height: 64 }}
        role="img"
        aria-label={`Mood trend across your last ${recent.length} check-ins`}
      >
        {recent.map((e, i) => (
          <i
            key={e.id ?? i}
            style={{
              flex: 1,
              minHeight: 6,
              height: `${Math.max(0, Math.min(10, e.moodScore)) * 10}%`,
              background: moodColor(e.moodScore),
              borderRadius: '5px 5px 0 0',
            }}
          />
        ))}
      </div>
    </section>
  );
}
