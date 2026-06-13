'use client';

export type Tab = 'today' | 'insights' | 'sounds' | 'you';

export function BottomNav({
  active,
  onSelect,
  onBreathe,
}: {
  active: Tab;
  onSelect: (t: Tab) => void;
  onBreathe: () => void;
}) {
  return (
    <nav className="bottom-nav">
      <button className={active === 'today' ? 'on' : ''} onClick={() => onSelect('today')} aria-label="Today">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 10l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
        </svg>
        Today
      </button>
      <button className={active === 'insights' ? 'on' : ''} onClick={() => onSelect('insights')} aria-label="Insights">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 19V5M9 19v-7M14 19v-10M19 19V8" />
        </svg>
        Insights
      </button>
      <button onClick={onBreathe} aria-label="Breathe">
        <span className="fab">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l3 2" />
          </svg>
        </span>
      </button>
      <button className={active === 'sounds' ? 'on' : ''} onClick={() => onSelect('sounds')} aria-label="Sounds">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M9 18V5l9-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
        </svg>
        Sounds
      </button>
      <button className={active === 'you' ? 'on' : ''} onClick={() => onSelect('you')} aria-label="You">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="8" r="4" /><path d="M4 21c0-3.5 3.6-6 8-6s8 2.5 8 6" />
        </svg>
        You
      </button>
    </nav>
  );
}
