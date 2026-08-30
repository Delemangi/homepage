import { alpha, Box, Popper, Typography } from '@mui/material';

export type CopyFeedback = Readonly<{
  anchorElement: HTMLElement;
  message: string;
  status: 'error' | 'success';
}>;

type Props = Readonly<{ feedback?: CopyFeedback }>;

const CopyFeedbackPopover = ({ feedback }: Props) => (
  <Popper
    anchorEl={feedback?.anchorElement}
    modifiers={[{ name: 'offset', options: { offset: [0, 8] } }]}
    open={feedback !== undefined}
    placement="bottom"
    sx={{ zIndex: 'tooltip' }}
  >
    <Box
      aria-hidden="true"
      sx={(theme) => {
        const accentColor =
          feedback?.status === 'error'
            ? theme.palette.error.main
            : theme.palette.info.main;

        return {
          backdropFilter: 'blur(18px) saturate(130%)',
          backgroundColor:
            theme.palette.mode === 'dark'
              ? 'rgba(23, 27, 37, 0.96)'
              : 'rgba(255, 255, 255, 0.96)',
          border: '1px solid',
          borderColor: alpha(
            accentColor,
            theme.palette.mode === 'dark' ? 0.38 : 0.26,
          ),
          borderRadius: 1,
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 8px 24px rgba(0, 0, 0, 0.32)'
              : '0 8px 24px rgba(61, 28, 43, 0.12)',
          color: theme.palette.text.primary,
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: 1,
          px: 2,
          py: 0.5,
          WebkitBackdropFilter: 'blur(18px) saturate(130%)',
        };
      }}
    >
      <Typography component="span">{feedback?.message}</Typography>
    </Box>
  </Popper>
);

export default CopyFeedbackPopover;
