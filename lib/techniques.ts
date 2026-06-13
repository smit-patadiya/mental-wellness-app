import type { Technique } from './schema';

export interface ActivityMeta {
  title: string;
  durationMin: number;
  kind: 'breathing' | 'cognitive' | 'grounding' | 'reflection' | 'movement';
  blurb: string;
}

export const TECHNIQUES: Record<Technique, ActivityMeta> = {
  breathing: {
    title: 'Box breathing',
    durationMin: 2,
    kind: 'breathing',
    blurb: 'Slow your body down — in 4, hold 4, out 4, hold 4.',
  },
  reframe: {
    title: 'Reframe the thought',
    durationMin: 2,
    kind: 'cognitive',
    blurb: 'Catch the harsh thought and find a fairer one. (CBT)',
  },
  grounding: {
    title: '5-4-3-2-1 grounding',
    durationMin: 2,
    kind: 'grounding',
    blurb: 'Come back to the present through your senses.',
  },
  self_compassion: {
    title: 'A kinder moment',
    durationMin: 2,
    kind: 'reflection',
    blurb: 'Speak to yourself like you would to a friend. (Self-compassion)',
  },
  break: {
    title: 'Take a real break',
    durationMin: 5,
    kind: 'reflection',
    blurb: 'Step away — water, a stretch, a window. (DBT distraction)',
  },
  affect_labeling: {
    title: 'Name what you feel',
    durationMin: 1,
    kind: 'reflection',
    blurb: 'Putting feelings into words softens them. (Affect labeling)',
  },
  yoga: {
    title: 'Gentle desk yoga',
    durationMin: 3,
    kind: 'movement',
    blurb: 'Release the tension your body is holding — a few simple stretches.',
  },
};

export function activityFor(t: Technique): ActivityMeta {
  return TECHNIQUES[t];
}
