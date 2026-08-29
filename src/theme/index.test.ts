import { describe, expect, it } from 'vitest';

import { createAppTheme } from '.';

describe('application theme', () => {
  it.each(['dark', 'light'] as const)(
    'gives keyboard-focused icon buttons a visible ring in %s mode',
    (mode) => {
      const theme = createAppTheme(mode);

      expect(
        theme.components?.MuiIconButton?.styleOverrides?.root,
      ).toMatchObject({
        '&.Mui-focusVisible': {
          outline: `2px solid ${theme.palette.primary.main}`,
          outlineOffset: 2,
        },
      });
    },
  );
});
