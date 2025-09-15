import type { SxProps, Theme } from '@mui/material/styles';

import { Typography } from '@mui/material';

import { AURORA_ANIMATION } from '../constants';

type Props = Readonly<{
  animate?: boolean;
  children: string;
  component?: 'div' | 'span';
  fontSize?: number | string;
  fontWeight?: number;
  sx?: SxProps<Theme>;
}>;

const GradientTitle = ({
  animate = true,
  children,
  component = 'div',
  fontSize = 48,
  fontWeight = 700,
  sx,
}: Props) => (
  <Typography
    component={component}
    sx={(t) => ({
      animation: animate ? AURORA_ANIMATION : 'none',
      background:
        t.palette.mode === 'dark'
          ? 'linear-gradient(90deg, #6a82fb 0%, #ff63e9 100%)'
          : 'linear-gradient(90deg, #ee3f71 0%, #ffc0cd 50%, #ee3f71 100%)',
      backgroundClip: 'text',
      backgroundPosition: '0% 50%',
      backgroundSize: '250% 100%',
      color: 'transparent',
      display: 'inline-block',
      fontSize,
      fontWeight,
      lineHeight: 1,
      userSelect: 'none',
      ...((typeof sx === 'function' ? sx(t) : sx) as object),
    })}
  >
    {children}
  </Typography>
);

export default GradientTitle;
