import { Typography } from '@mui/material';

type TerminalPromptProps = {
  readonly animated?: boolean;
};

const TerminalPrompt = ({ animated = false }: TerminalPromptProps) => (
  <>
    <Typography
      component="span"
      sx={{
        color: '#888',
        display: {
          sm: 'inline',
          xs: 'none',
        },
        fontFamily: 'inherit',
        fontSize: 12,
      }}
    >
      guest@delemangi
    </Typography>
    <Typography
      component="span"
      sx={{
        color: '#888',
        display: {
          sm: 'none',
          xs: 'inline',
        },
        fontFamily: 'inherit',
        fontSize: 11,
      }}
    >
      guest
    </Typography>
    <Typography
      component="span"
      sx={{
        color: '#666',
        fontFamily: 'inherit',
      }}
    >
      ~
    </Typography>
    <Typography
      component="span"
      sx={{
        ...(animated && {
          '@keyframes blink': {
            '0%, 49%': {
              opacity: 1,
            },
            '50%, 100%': {
              opacity: 0.3,
            },
          },
          animation: 'blink 1.2s infinite',
        }),
        color: '#ff63e9',
        fontFamily: 'inherit',
        fontWeight: 700,
      }}
    >
      ❯
    </Typography>
  </>
);

export default TerminalPrompt;
