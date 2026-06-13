'use client';

import { useEffect, useRef, useState } from 'react';
import { Button, Chip, Card } from '@/components/ui';
import { Sprout, Mic, Wind, LifeBuoy, ArrowLeft, Sparkle, Sun, Moon, Send } from '@/components/icons';
import type { AnalysisResult, Technique } from '@/lib/schema';
import { activityFor } from '@/lib/techniques';
import { DEMO_ANALYSIS } from '@/lib/demo';
import { saveEntry } from '@/lib/storage';

const FEELINGS = ['Overwhelmed', 'Anxious', "Can't focus", 'Panicking', 'Low', 'Okay'];

const HELPLINES = [
  { name: 'Tele-MANAS', num: '14416' },
  { name: 'KIRAN', num: '1800-599-0019' },
  { name: 'iCall', num: '9152987821' },
];

const STEPS: Record<Exclude<Technique, 'breathing'>, string[]> = {
  reframe: ["What's the harsh thought?", 'Is it 100% true — what would you tell a friend?', "Write a fairer, kinder version."],
  grounding: ['5 things you can see', '4 you can touch', '3 you can hear', '2 you can smell', '1 you can taste'],
  self_compassion: ['This is a hard moment.', 'Hard moments are part of being a student.', 'May I be kind to myself right now.'],
  break: ['Stand up — water, or look out a window.', 'Stretch for 60 seconds.', 'Your books will wait. Come back when ready.'],
  affect_labeling: ['Name what you feel, in plain words.', "Say it: “I feel ___ because ___.”", 'Notice it soften, even a little.'],
};

export default function Page() {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [view, setView] = useState<'home' | 'result' | 'activity'>('home');
  const [activity, setActivity] = useState<Technique | null>(null);
  const [listening, setListening] = useState(false);
  const [dark, setDark] = useState(false);
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

  function goHome() {
    setView('home');
    setActivity(null);
  }

  const isCrisis = result && (result.riskLevel === 'red' || result.riskLevel === 'orange');

  return (
    <div className="app">
      <header className="app-bar">
        {view !== 'home' ? (
          <button className="icon-btn" aria-label="Back" onClick={() => (view === 'activity' ? setView('result') : goHome())}>
            <ArrowLeft />
          </button>
        ) : (
          <div className="brand-mark"><Sprout size={20} /></div>
        )}
        <div style={{ flex: 1 }}>
          <div className="brand-name">MindMitra</div>
          <div className="brand-sub">{view === 'home' ? 'a calm minute, then back to it' : 'your moment'}</div>
        </div>
        <button className="icon-btn" aria-label={dark ? 'Light mode' : 'Dark mode'} onClick={toggleDark}>
          {dark ? <Sun /> : <Moon />}
        </button>
      </header>

      {view === 'home' && (
        <main className="screen">
          <h1 className="headline">How are you feeling right now?</h1>
          <div className="chips" role="group" aria-label="Quick feelings">
            {FEELINGS.map((f) => (
              <Chip key={f} onClick={() => submit(f, 'chip')}>{f}</Chip>
            ))}
          </div>

          <button className={`mic-btn ${listening ? 'listening' : ''}`} aria-label="Speak how you feel" onClick={startVoice}>
            <Mic size={26} />
          </button>
          <p className="muted" style={{ textAlign: 'center', fontSize: 13, margin: 0 }}>
            {listening ? 'listening…' : 'tap to talk, or type below'}
          </p>

          <p className="label">In your own words</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className="text-input"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && submit(text, 'text')}
              placeholder="What's on your mind…"
              aria-label="Describe how you feel"
            />
            <button className="icon-btn" aria-label="Send" onClick={() => submit(text, 'text')} style={{ flex: '0 0 auto', width: 48 }}>
              <Send />
            </button>
          </div>
          <p className="muted" style={{ textAlign: 'center', fontSize: 12, marginTop: 22 }}>
            Private — everything stays on your device.
          </p>
        </main>
      )}

      {view === 'result' && (
        <main className="screen">
          {loading || !result ? (
            <div className="center-load"><div className="spinner" /><p>Taking this in…</p></div>
          ) : isCrisis ? (
            <Crisis level={result.riskLevel} />
          ) : (
            <>
              <div className="r-block"><div className="r-label">Reflect</div><p className="r-reflect" style={{ margin: 0 }}>{result.reflection}</p></div>
              <div className="r-block"><div className="r-label">Noticed</div><span className="insight-chip">{result.insight}</span></div>
              <button className="activity-card" onClick={() => { setActivity(result.technique); setView('activity'); }}>
                <span className="a-ic"><Wind /></span>
                <span>
                  <span className="a-title" style={{ display: 'block' }}>{activityFor(result.technique).title}</span>
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
        <main className="screen">
          <Activity technique={activity} onDone={goHome} />
        </main>
      )}
    </div>
  );
}

function Crisis({ level }: { level: string }) {
  return (
    <div className="crisis">
      <h2>You&rsquo;re not alone</h2>
      <p className="muted" style={{ marginTop: 0 }}>
        It sounds really heavy right now. You deserve support from a real person — please reach out today.
      </p>
      {HELPLINES.map((h) => (
        <a key={h.num} className="helpline" href={`tel:${h.num.replace(/[^0-9]/g, '')}`}>
          <span><LifeBuoy size={18} /> &nbsp;{h.name}</span>
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
    <Card>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontWeight: 500, fontSize: 20, margin: '0 0 4px' }}>{meta.title}</h2>
      <p className="muted" style={{ marginTop: 0 }}>{meta.blurb}</p>

      {technique === 'breathing' ? (
        <>
          <div className="breathe" aria-hidden>breathe</div>
          <p style={{ textAlign: 'center' }} className="muted">In as the circle grows, out as it shrinks. A few rounds is enough.</p>
        </>
      ) : (
        <ol style={{ lineHeight: 1.9, paddingLeft: 20 }}>
          {STEPS[technique as Exclude<Technique, 'breathing'>].map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      )}

      <Button onClick={onDone} style={{ marginTop: 14 }}>
        <Sparkle size={18} /> Done — back to studying
      </Button>
    </Card>
  );
}
