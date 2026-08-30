export const TIMELINE_BADGE_COLORS = {
  education: {
    dark: {
      background: '#1f4544',
      foreground: '#7cf4e3',
    },
    light: {
      background: '#d8f3ef',
      foreground: '#0d6b60',
    },
  },
  work: {
    dark: {
      background: '#2a315e',
      foreground: '#aeb9ff',
    },
    light: {
      background: '#f8dce5',
      foreground: '#9e1944',
    },
  },
} as const;

export const TIMELINE_BADGE_COLOR_PAIRS = [
  TIMELINE_BADGE_COLORS.education.dark,
  TIMELINE_BADGE_COLORS.education.light,
  TIMELINE_BADGE_COLORS.work.dark,
  TIMELINE_BADGE_COLORS.work.light,
] as const;
