'use client';

import { useEffect, useRef, useState } from 'react';
import { Sprout, Mic, Wind, LifeBuoy, ArrowLeft, Sparkle, Sun, Moon, Send } from '@/components/icons';
import type { AnalysisResult, Technique } from '@/lib/schema';
import { activityFor } from '@/lib/techniques';
import { DEMO_ANALYSIS } from '@/lib/demo';
import { saveEntry, getEntries, getTrend, exportData, clearAll, type Entry } from '@/lib/storage';

const FEELINGS = ['Overwhelmed', 'Anxious', "Can't focus", 'Panicking', 'Low', 'Okay'];
const HELPLINES = [
  { name: 'Tele-MANAS', num: '14416' },
  { name: 'KIRAN', num: '1800-599-0019' },
  { name: 'iCall', num: '9152987821' },
];
const STEPS: Record<Exclude<Technique, 'breathing'>, string[]> = {
  reframe: ["What's the harsh thought?", 'Is it 100% true — what would you tell a friend?', 'Write a fairer, kinder version.'],
  grounding: ['5 things you can see', '4 you can touch', '3 you can hear', '2 you can smell', '1 you can taste'],
  self_compassion: ['This is a hard moment.', 'Hard moments are part of being a student.', 'May I be kind to myself right now.'],
  break: ['Stand up — water, or look out a window.', 'Stretch for 60 seconds.', 'Your books will wait. Come back when ready.'],
  affect_labeling: ['Name what you feel, in plain words.', 'Say it: “I feel ___ because ___.”', 'Notice it soften, even a little.'],
};

function greeting(): string {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : h < 21 ? 'Good evening' : 'Late night';
}
function moodFromScore(s: number): string {
  return s >= 7 ? 'calm' : s >= 4 ? 'neutral' : 'low';
}
function dotColor(s: number): string {
  return s >= 7 ? 'var(--p-500)' : s >= 4 ? 'var(--a-500)' : 'var(--rose-700)';
}
function ago(ts: number): string {
  const m = Math.max(0, Math.floor((Date.now() - ts) / 60000));
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export default function Page() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [view, setView] = useState<'home' | 'result' | 'activity' | 'dashboard'>('home');
  const [activity, setActivity] = useState<Technique | null>(null);
  const [listening, setListening] = useState(false);
  const [dark, setDark] = useState(false);
  const [mood, setMood] = useState('calm');
  const [entries, setEntries] = useState<Entry[]>([]);
  const recRef = useRef<any>(null);

  useEffect(() => {
    const d = localStorage.getItem('mindmitra.dark') === '1';
    setDark(d);
    document.documentElement.classList.toggle('dark', d);
  }, []);

  function toggleDark() {
    const d = !dark;
    setDark(d);
    document.documentElement.classList.toggle('dark', d);
    localStorage.setItem('mindmitra.dark', d ? '1' : '0');
  }

  async function submit(input: string, source: string) {
    const t = input.trim();
    if (!t || loading) return;
    setLoading(true);
    setView('result');
    setResult(null);
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: t, source }),
      });
      const data: AnalysisResult = res.ok ? await res.json() : DEMO_ANALYSIS;
      setResult(data);
      setMood(moodFromScore(data.moodScore));
      saveEntry(t, source, data);
    } catch {
      setResult(DEMO_ANALYSIS);
    } finally {
      setLoading(false);
      setText('');
    }
  }

  function startVoice() {
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      alert('Voice input is not supported in this browser — please type instead.');
      return;
    }
    const rec = new SR();
    recRef.current = rec;
    rec.lang = 'en-IN';
    rec.interimResults = false;
    rec.onresult = (e: any) => submit(e.results[0][0].transcript, 'voice');
    rec.onend = () => setListening(false);
    rec.onerror = () => setListening(false);
    setListening(true);
    rec.start();
  }

  function openDashboard() {
    setEntries(getEntries().slice().reverse());
    setView('dashboard');
  }
  function goHome() {
    setView('home');
    setActivity(null);
  }

  const isCrisis = result && (result.riskLevel === 'red' || result.riskLevel === 'orange');
  const showNav = view === 'home' || view === 'dashboard';

  return (
    <div className="app" data-mood={mood}>
      <header className="app-bar">
        {view === 'result' || view === 'activity' ? (
          <button className="icon-btn" aria-label="Back" onClick={() => (view === 'activity' ? setView('result') : goHome())}>
            <ArrowLeft />
          </button>
        ) : (
          <div className="brand-mark"><Sprout size={20} /></div>
        )}
        <div style={{ flex: 1 }}>
          <div className="brand-name">MindMitra</div>
          <div className="brand-sub">a calm minute, then back to it</div>
        </div>
        <button className="icon-btn" aria-label={dark ? 'Light mode' : 'Dark mode'} onClick={toggleDark}>
          {dark ? <Sun /> : <Moon />}
        </button>
      </header>

      {view === 'home' && (
        <main className="screen home">
          <p className="greeting">{greeting()}.</p>
          <h1 className="headline">How are you feeling right now?</h1>
          <div className="feel-grid" role="group" aria-label="Quick feelings">
            {FEELINGS.map((f) => (
              <button key={f} className="chip" onClick={() => submit(f, 'chip')}>{f}</button>
            ))}
          </div>
          <div className="mic-wrap">
            <button className={`mic-btn ${listening ? 'listening' : ''}`} aria-label="Speak how you feel" onClick={startVoice}>
              <Mic size={30} />
            </button>
            <span className="muted" style={{ fontSize: 13 }}>{listening ? 'listening…' : 'tap to talk'}</span>
          </div>
          <div className="say">
            <input
              className="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit(text, 'text')}
              placeholder="…or write it in your own words"
              aria-label="Describe how you feel"
            />
            <button className="icon-btn" aria-label="Send" onClick={() => submit(text, 'text')} style={{ flex: '0 0 auto' }}>
              <Send />
            </button>
          </div>
          <p className="priv">Private — everything stays on your device.</p>
        </main>
      )}

      {view === 'result' && (
        <main className="screen">
          {loading || !result ? (
            <div className="center-load"><div className="spinner" /><p>Taking this in…</p></div>
          ) : isCrisis ? (
            <Crisis />
          ) : (
            <>
              <div className="r-block"><div className="r-label">Reflect</div><p className="r-reflect">{result.reflection}</p></div>
              <div className="r-block"><div className="r-label">Noticed</div><span className="insight-chip">{result.insight}</span></div>
              <button className="activity-card" onClick={() => { setActivity(result.technique); setView('activity'); }}>
                <span className="a-ic"><Wind /></span>
                <span>
                  <span className="a-title">{activityFor(result.technique).title}</span>
                  <span className="a-sub">{activityFor(result.technique).durationMin} min · {activityFor(result.technique).blurb}</span>
                </span>
              </button>
              <div className="r-block"><div className="r-label">Encourage</div><p style={{ margin: 0 }}>{result.encouragement}</p></div>
              <button className="back-to-study" onClick={goHome}><ArrowLeft size={16} /> Back to studying</button>
            </>
          )}
        </main>
      )}

      {view === 'activity' && activity && (
        <main className="screen"><Activity technique={activity} onDone={goHome} /></main>
      )}

      {view === 'dashboard' && (
        <main className="screen"><Dashboard entries={entries} onChanged={openDashboard} /></main>
      )}

      {showNav && (
        <nav className="nav">
          <button className={view === 'home' ? 'on' : ''} onClick={goHome}>Today</button>
          <button className={view === 'dashboard' ? 'on' : ''} onClick={openDashboard}>Your week</button>
        </nav>
      )}
    </div>
  );
}

function Crisis() {
  return (
    <div className="crisis">
      <h2>You&rsquo;re not alone</h2>
      <p className="muted" style={{ marginTop: 0 }}>
        It sounds really heavy right now. You deserve support from a real person — please reach out today.
      </p>
      {HELPLINES.map((h) => (
        <a key={h.num} className="helpline" href={`tel:${h.num.replace(/[^0-9]/g, '')}`}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}><LifeBuoy size={18} /> {h.name}</span>
          <span className="num">{h.num}</span>
        </a>
      ))}
      <p style={{ fontSize: 14, marginTop: 10 }}>If you can, tell someone you trust how you&rsquo;re feeling.</p>
      <p className="disclaimer">MindMitra is a supportive companion, not a therapist or emergency service.</p>
    </div>
  );
}

function Activity({ technique, onDone }: { technique: Technique; onDone: () => void }) {
  const meta = activityFor(technique);
  return (
    <>
      <h1 className="headline" style={{ marginBottom: 6 }}>{meta.title}</h1>
      <p className="muted" style={{ marginTop: 0 }}>{meta.blurb}</p>
      {technique === 'breathing' ? (
        <Breathing />
      ) : (
        <ol style={{ lineHeight: 2, paddingLeft: 20, fontSize: 16 }}>
          {STEPS[technique as Exclude<Technique, 'breathing'>].map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      )}
      <button className="btn btn-primary" onClick={onDone} style={{ marginTop: 'auto' }}>
        <Sparkle size={18} /> Done — back to studying
      </button>
    </>
  );
}

function Breathing() {
  const PHASES: [string, number][] = [['Breathe in', 1], ['Hold', 1], ['Breathe out', 0.62], ['Hold', 0.62]];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % 4), 4000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="breathe-wrap">
      <div className="breathe" style={{ transform: `scale(${PHASES[i][1]})` }} aria-hidden />
      <div className="breathe-phase">{PHASES[i][0]}</div>
      <p className="muted" style={{ textAlign: 'center', fontSize: 13 }}>Follow the circle. A few rounds is enough.</p>
    </div>
  );
}

function Dashboard({ entries, onChanged }: { entries: Entry[]; onChanged: () => void }) {
  const trend = getTrend(14);
  function download() {
    const blob = new Blob([exportData()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mindmitra-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }
  function wipe() {
    if (confirm('Delete all your entries from this device?')) {
      clearAll();
      onChanged();
    }
  }
  if (entries.length === 0) {
    return <div className="empty">No check-ins yet.<br />Your moods will show up here.</div>;
  }
  return (
    <>
      <h1 className="headline">Your week</h1>
      <div className="r-block">
        <div className="r-label">Mood trend</div>
        <div className="trend" aria-label="Recent mood trend">
          {trend.map((m, i) => <i key={i} style={{ height: `${m * 10}%`, background: dotColor(m) }} />)}
        </div>
      </div>
      <p className="section-title">Recent</p>
      {entries.slice(0, 12).map((e) => (
        <div className="entry" key={e.id}>
          <span className="dot" style={{ background: dotColor(e.moodScore) }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15 }}>{e.text}</div>
            <div className="when">{ago(e.ts)} · {activityFor(e.technique).title}</div>
          </div>
        </div>
      ))}
      <div style={{ display: 'flex', gap: 9, marginTop: 18 }}>
        <button className="btn btn-quiet" style={{ flex: 1 }} onClick={download}>Export</button>
        <button className="btn btn-quiet" style={{ flex: 1 }} onClick={wipe}>Delete all</button>
      </div>
    </>
  );
}
