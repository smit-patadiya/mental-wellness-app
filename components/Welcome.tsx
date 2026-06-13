'use client';

import * as React from 'react';

export function Welcome({ onBegin }: { onBegin: () => void }) {
  return (
    <main
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: 18,
        padding: '32px 28px',
      }}
    >
      {/* Breathing orb with inner ring */}
      <div
        className="breathe"
        aria-hidden
        style={{
          marginBottom: 14,
          background:
            'radial-gradient(circle at 50% 40%, var(--surface), var(--p-50))',
        }}
      >
        <span
          style={{
            width: 84,
            height: 84,
            borderRadius: '50%',
            border: '2px solid var(--p-400)',
            opacity: 0.7,
          }}
        />
      </div>

      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: 30,
          lineHeight: 1.15,
          letterSpacing: '-.015em',
          margin: 0,
          color: 'var(--ink)',
        }}
      >
        MindMitra
      </h1>

      <p
        style={{
          color: 'var(--muted)',
          fontSize: 15,
          lineHeight: 1.5,
          margin: 0,
          maxWidth: 240,
        }}
      >
        A calm minute, then back to your books.
      </p>

      <button
        type="button"
        className="btn btn-primary"
        onClick={onBegin}
        style={{ marginTop: 10, maxWidth: 300 }}
      >
        Begin
      </button>

      <p style={{ fontSize: 12, color: 'var(--muted)', margin: 0 }}>
        Private · stays on your device.
      </p>
    </main>
  );
}
