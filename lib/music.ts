// Background sound therapy — streams from online links via an <audio> singleton,
// so ambient keeps playing across screens. Swap the URLs for calmer tracks anytime.

export type MusicTrack = { id: string; name: string; color: string; url: string };

export const MUSIC_TRACKS: MusicTrack[] = [
  { id: 'piano', name: 'Gentle piano', color: '#5BA7C9', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3' },
  { id: 'focus', name: 'Soft focus', color: '#2E8270', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3' },
  { id: 'calm', name: 'Warm calm', color: '#9B86C9', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3' },
  { id: 'night', name: 'Night wind-down', color: '#E89A6B', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3' },
];

let audio: HTMLAudioElement | null = null;
let currentId: string | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

export function subscribeMusic(cb: () => void): () => void {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

export function currentMusic(): string | null {
  return currentId;
}
export function isMusicPlaying(): boolean {
  return currentId !== null;
}

export function stopMusic(): void {
  if (audio) audio.pause();
  currentId = null;
  emit();
}

export function playMusic(id = 'piano'): void {
  if (typeof Audio === 'undefined') return;
  const t = MUSIC_TRACKS.find((x) => x.id === id) || MUSIC_TRACKS[0];
  if (!audio) audio = new Audio();
  if (audio.src !== t.url) audio.src = t.url;
  audio.loop = true;
  audio.volume = 0.4;
  void audio.play().catch(() => {
    /* autoplay blocked until a user gesture — fine */
  });
  currentId = t.id;
  emit();
}

export function toggleMusic(id = 'piano'): void {
  if (currentId) stopMusic();
  else playMusic(id);
}
