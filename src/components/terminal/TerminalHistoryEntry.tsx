import { Box, Typography } from '@mui/material';

import TerminalOutput from './TerminalOutput';
import TerminalPrompt from './TerminalPrompt';

type HistoryEntry = {
  command: string;
  id: string;
  output: Array<{ id: string; text: string }>;
};

type TerminalHistoryEntryProps = {
  readonly entry: HistoryEntry;
};

const TerminalHistoryEntry = ({ entry }: TerminalHistoryEntryProps) => (
  <Box
    key={entry.id}
    sx={{ position: 'relative', zIndex: 2 }}
  >
    {entry.command ? (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 1,
          marginBottom: 0.5,
        }}
      >
        <TerminalPrompt />
        <Typography
          component="span"
          sx={{
            color: '#00ffd0',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 500,
            textShadow: '0 0 10px rgba(0, 255, 208, 0.5)',
          }}
        >
          {entry.command}
        </Typography>
      </Box>
    ) : null}
    <TerminalOutput lines={entry.output} />
  </Box>
);

export default TerminalHistoryEntry;
