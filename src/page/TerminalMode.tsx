import { Box } from '@mui/material';

import Terminal from '../components/terminal/Terminal';

const TerminalMode = () => (
  <Box
    sx={{
      backgroundColor: '#000',
      minHeight: '100vh',
      padding: 3,
      position: 'relative',
    }}
  >
    <Terminal />
  </Box>
);

export default TerminalMode;
