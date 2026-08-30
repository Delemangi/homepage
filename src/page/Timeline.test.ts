import { getContrastRatio } from '@mui/material';
import { describe, expect, it } from 'vitest';

import { TIMELINE_BADGE_COLOR_PAIRS } from './timelineBadgeColors';

describe('timeline badge colors', () => {
  it('keeps normal-size badge text above WCAG AA contrast', () => {
    for (const colors of TIMELINE_BADGE_COLOR_PAIRS) {
      expect(
        getContrastRatio(colors.foreground, colors.background),
      ).toBeGreaterThanOrEqual(4.5);
    }
  });
});
