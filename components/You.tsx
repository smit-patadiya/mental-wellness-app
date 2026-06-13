'use client';

import * as React from 'react';
import { getEntries, exportData, clearAll } from '../lib/storage';
import { activityFor } from '../lib/techniques';
import type { Technique } from '../lib/schema';
import { Sprout, Check, Sparkle } from './icons';

const EXAM_KEY = 'mindmitra.exam';

interface Exam {
  name: string;
  date: string; // ISO yyyy-mm-dd
}

function readExam(): Exam | null {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(EXAM_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Exam>;
    if (typeof parsed.name === 'string' && typeof parsed.date === 'string') {
      return { name: parsed.name, date: parsed.date };
    }
    return null;
  } catch {
    return null;
  }
}

/** Whole days from today (local midnight) until the exam date, floored, never below 0. */
function daysUntil(date: string): number {
  const target = new Date(`${date}T00:00:00`);
  if (Number.isNaN(target.getTime())) return 0;
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.floor((target.getTime() - today.getTime()) / 86_400_000);
  return Math.max(0, diff);
}

const card: React.CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--line)',
  borderRadius: 'var(--r-lg)',
  boxShadow: 'var(--e1)',
  padding: 16,
  marginBottom: 12,
};

const label: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: '.07em',
  textTransform: 'uppercase',
  color: 'var(--p-500)',
  marginBottom: 8,
};

const linkBtn: React.CSSProperties = {
  background: 'none',
  border: 0,
  padding: 0,
  cursor: 'pointer',
  color: 'var(--p-600)',
  fontFamily: 'inherit',
  fontSize: 13,
  fontWeight: 600,
};

const field: React.CSSProperties = {
  width: '100%',
  fontSize: 15,
  padding: '12px 14px',
  border: '1px solid var(--line)',
  borderRadius: 'var(--r-md)',
  background: 'var(--surface)',
  color: 'var(--ink)',
  outline: 'none',
};

export function You() {
  const [exam, setExam] = React.useState<Exam | null>(null);
  const [editing, setEditing] = React.useState(false);
  const [name, setName] = React.useState('');
  const [date, setDate] = React.useState('');
  const [helps, setHelps] = React.useState<string[]>([]);

  // Hydrate from localStorage on mount (avoids SSR mismatch).
  React.useEffect(() => {
    const stored = readExam();
    setExam(stored);
    setEditing(stored === null);

    const counts = new Map<Technique, number>();
    for (const e of getEntries()) {
      counts.set(e.technique, (counts.get(e.technique) ?? 0) + 1);
    }
    const top = [...counts.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([t]) => activityFor(t).title);
    setHelps(top);
  }, []);

  function startEdit() {
    setName(exam?.name ?? '');
    setDate(exam?.date ?? '');
    setEditing(true);
  }

  function saveExam() {
    const next: Exam = { name: name.trim(), date };
    if (!next.name || !next.date) return;
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(EXAM_KEY, JSON.stringify(next));
    }
    setExam(next);
    setEditing(false);
  }

  function clearExam() {
    if (typeof localStorage !== 'undefined') localStorage.removeItem(EXAM_KEY);
    setExam(null);
    setName('');
    setDate('');
    setEditing(true);
  }

  function handleExport() {
    if (typeof window === 'undefined') return;
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmitra-data.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function handleDelete() {
    if (typeof window === 'undefined') return;
    if (!window.confirm('Delete all your check-ins? This cannot be undone.')) return;
    clearAll();
    setHelps([]);
  }

  const days = exam ? daysUntil(exam.date) : 0;

  return (
    <main className="screen" style={{ paddingTop: 18 }}>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontWeight: 500,
          fontSize: 27,
          lineHeight: 1.2,
          letterSpacing: '-.015em',
          margin: '2px 0 18px',
          color: 'var(--ink)',
        }}
      >
        You
      </h1>

      {/* 1 — Exam countdown */}
      <section className="card" style={card} aria-label="Exam countdown">
        {exam && !editing ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div
              aria-hidden
              style={{
                width: 48,
                height: 48,
                flex: '0 0 auto',
                borderRadius: 14,
                background: 'var(--p-500)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-serif)',
                fontWeight: 500,
                fontSize: 18,
                boxShadow: 'var(--e1)',
              }}
            >
              {days}
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 15, color: 'var(--ink)' }}>
                {exam.name} · {days} {days === 1 ? 'day' : 'days'} to go
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                advice adapts as it nears
              </div>
            </div>
            <button type="button" style={linkBtn} onClick={startEdit}>
              Edit
            </button>
          </div>
        ) : (
          <div>
            <div style={label}>Your exam</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              <input
                style={field}
                type="text"
                value={name}
                placeholder="NEET, JEE…"
                aria-label="Exam name"
                onChange={(e) => setName(e.target.value)}
              />
              <input
                style={field}
                type="date"
                value={date}
                aria-label="Exam date"
                onChange={(e) => setDate(e.target.value)}
              />
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ width: 'auto', flex: 1, padding: '11px 18px', fontSize: 15 }}
                  onClick={saveExam}
                  disabled={!name.trim() || !date}
                >
                  Save
                </button>
                {exam && (
                  <button type="button" style={linkBtn} onClick={clearExam}>
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 2 — What helps you */}
      <section className="card" style={card} aria-label="What helps you">
        <div style={label}>What helps you</div>
        {helps.length > 0 ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span
              aria-hidden
              style={{
                width: 36,
                height: 36,
                flex: '0 0 auto',
                borderRadius: 11,
                background: 'var(--p-50)',
                color: 'var(--p-600)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sprout size={20} />
            </span>
            <div>
              <div style={{ fontSize: 15, color: 'var(--ink)', lineHeight: 1.4 }}>
                {helps.join(' · ')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>
                learned from your check-ins
              </div>
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
            <span
              aria-hidden
              style={{
                width: 36,
                height: 36,
                flex: '0 0 auto',
                borderRadius: 11,
                background: 'var(--surface-2)',
                color: 'var(--muted)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Sparkle size={18} />
            </span>
            <div style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.45 }}>
              A few check-ins and your best ways to cope show up here.
            </div>
          </div>
        )}
      </section>

      {/* 3 — Data */}
      <section className="card" style={card} aria-label="Your data">
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginBottom: 14 }}>
          <span
            aria-hidden
            style={{
              width: 36,
              height: 36,
              flex: '0 0 auto',
              borderRadius: 11,
              background: 'var(--p-50)',
              color: 'var(--p-600)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Check size={20} />
          </span>
          <div style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.45 }}>
            Gentle progress — no streaks, no guilt.
          </div>
        </div>
        <div style={{ display: 'flex', gap: 9 }}>
          <button
            type="button"
            className="btn btn-quiet"
            style={{ flex: 1, padding: '12px 16px', fontSize: 15 }}
            onClick={handleExport}
          >
            Export
          </button>
          <button
            type="button"
            className="btn btn-quiet"
            style={{ flex: 1, padding: '12px 16px', fontSize: 15, color: 'var(--rose-700)' }}
            onClick={handleDelete}
          >
            Delete all
          </button>
        </div>
      </section>
    </main>
  );
}
