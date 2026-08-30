import { Box, Popper, Typography } from '@mui/material';

export type CopyFeedback = Readonly<{
  anchorElement: HTMLElement;
  message: string;
  status: 'error' | 'success';
}>;

type Props = Readonly<{ feedback?: CopyFeedback }>;

const FEEDBACK_COLORS = {
  error: { dark: '#fb7185', light: '#b3261e' },
  success: { dark: '#5eead4', light: '#006b5b' },
} as const;

const CopyFeedbackPopover = ({ feedback }: Props) => (
  <Popper
    anchorEl={feedback?.anchorElement}
    modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
    open={feedback !== undefined}
    placement="bottom"
    sx={{ zIndex: 'tooltip' }}
  >
    <Box
      sx={(theme) => ({
        backgroundColor:
          FEEDBACK_COLORS[feedback?.status ?? 'success'][theme.palette.mode],
        borderRadius: 1,
        boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.18)',
        color: theme.palette.mode === 'dark' ? '#0f172a' : '#fff',
        fontSize: 14,
        fontWeight: 600,
        letterSpacing: 1,
        px: 2,
        py: 0.5,
      })}
    >
      <Typography
        aria-live="polite"
        component="span"
        role="status"
      >
        {feedback?.message}
      </Typography>
    </Box>
  </Popper>
);

export default CopyFeedbackPopover;
