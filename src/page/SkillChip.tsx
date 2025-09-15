import { Chip } from '@mui/material';

export type SkillChipProps = {
  readonly animate?: boolean;
  readonly animationDelay?: number | string;
  readonly label: string;
};

const SkillChip = ({
  animate = true,
  animationDelay,
  label,
}: SkillChipProps) => (
  <Chip
    label={label}
    onClickCapture={(e) => {
      e.stopPropagation();
    }}
    onMouseDownCapture={(e) => {
      e.stopPropagation();
    }}
    onTouchStartCapture={(e) => {
      e.stopPropagation();
    }}
    size="small"
    sx={(t) => ({
      '& .MuiChip-label': { px: 1.25 },
      '&::after': {
        background:
          t.palette.mode === 'dark'
            ? 'linear-gradient(120deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0))'
            : 'linear-gradient(120deg, rgba(255, 255, 255, 0), rgba(238, 63, 113, 0.22), rgba(255, 255, 255, 0))',
        borderRadius: 1.5,
        content: '""',
        inset: 0,
        mixBlendMode: t.palette.mode === 'dark' ? 'screen' : 'overlay',
        opacity: 0,
        pointerEvents: 'none',
        position: 'absolute',
        transform: 'translateX(-120%)',
        transition: 'transform 700ms ease, opacity 200ms ease',
      },
      '&:active': {
        boxShadow: 'none',
        transform: 'scale(0.96)',
        transitionDuration: '50ms',
      },
      '&:focus-visible': {
        boxShadow: `0 0 0 2px ${
          t.palette.mode === 'dark'
            ? 'rgba(106, 130, 251, 0.5)'
            : 'rgba(238, 63, 113, 0.35)'
        }`,
        outline: 'none',
      },
      '&:hover': {
        '&::after': { opacity: 1, transform: 'translateX(120%)' },
        bgcolor:
          t.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.09)'
            : 'rgba(0, 0, 0, 0.08)',
        border: `1px solid ${
          t.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.14)'
            : 'rgba(0, 0, 0, 0.14)'
        }`,
        boxShadow:
          t.palette.mode === 'dark'
            ? '0 6px 18px rgba(106, 130, 251, 0.18)'
            : '0 6px 18px rgba(238, 63, 113, 0.12)',
        transform: 'translateY(-1px) scale(1.03)',
      },
      '@media (prefers-reduced-motion: reduce)': {
        '&::after': { transform: 'none', transition: 'none' },
        '&:hover': {
          boxShadow: 'none',
          transform: 'none',
        },
        animation: 'none',
        transition: 'none',
      },
      animation: 'fadeInStaggered 0.7s cubic-bezier(.4, 1, .4, 1) both',
      animationDelay:
        typeof animationDelay === 'number'
          ? `${animationDelay}s`
          : animationDelay,
      animationPlayState: animate ? 'running' : 'paused',
      bgcolor:
        t.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.06)'
          : 'rgba(0, 0, 0, 0.06)',
      border: `1px solid ${
        t.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(0, 0, 0, 0.08)'
      }`,
      borderRadius: 1.5,
      boxShadow:
        t.palette.mode === 'dark'
          ? '0 1px 0 rgba(255, 255, 255, 0.04)'
          : '0 1px 0 rgba(0, 0, 0, 0.05)',
      color: 'text.secondary',
      overflow: 'hidden',
      position: 'relative',
      transform: 'translateZ(0)',
      transition:
        'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms ease, background-color 200ms ease, border-color 200ms ease',
    })}
  />
);

export default SkillChip;
