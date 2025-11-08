import { Box } from '@mui/material';

import { useTerminal } from '../../hooks/useTerminal';
import TerminalHistoryEntry from './TerminalHistoryEntry';
import TerminalInput from './TerminalInput';

const Terminal = () => {
  const {
    handleInputChange,
    handleKeyDown,
    handleScroll,
    history,
    input,
    inputRef,
    suggestion,
    terminalRef,
  } = useTerminal();

  return (
    <Box
      onClick={() => inputRef.current?.focus()}
      onScroll={handleScroll}
      ref={terminalRef}
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        '&::before': {
          animation: 'scanline 8s linear infinite',
          background:
            'linear-gradient(transparent 0%, rgba(0, 255, 208, 0.03) 50%, transparent 100%)',
          content: '""',
          height: '100%',
          left: 0,
          pointerEvents: 'none',
          position: 'absolute',
          top: 0,
          width: '100%',
          zIndex: 1,
        },
        '@keyframes scanline': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        backgroundColor: '#0a0a0a',
        border: { sm: '2px solid #00ffd0', xs: '1px solid #00ffd0' },
        borderRadius: { sm: 2, xs: 1 },
        boxShadow: {
          sm: '0 0 30px rgba(0, 255, 208, 0.2), inset 0 0 100px rgba(0, 255, 208, 0.02)',
          xs: '0 0 15px rgba(0, 255, 208, 0.15), inset 0 0 50px rgba(0, 255, 208, 0.02)',
        },
        color: '#00ffd0',
        cursor: 'text',
        fontFamily: '"Fira Code", "Courier New", monospace',
        fontSize: { sm: 14, xs: 12 },
        fontWeight: 500,
        height: { sm: '85vh', xs: '90vh' },
        lineHeight: 1.6,
        maxWidth: { md: '1000px', sm: '100%', xs: '100%' },
        msOverflowStyle: 'none',
        mx: 'auto',
        overflowX: 'hidden',
        overflowY: 'auto',
        padding: { sm: 3, xs: 2 },
        position: 'relative',
        scrollbarWidth: 'none',
        wordBreak: 'break-word',
      }}
    >
      {history.map((entry) => (
        <TerminalHistoryEntry
          entry={entry}
          key={entry.id}
        />
      ))}

      <TerminalInput
        input={input}
        inputRef={inputRef}
        onInputChange={handleInputChange}
        onKeyDown={handleKeyDown}
        suggestion={suggestion}
      />
    </Box>
  );
};

export default Terminal;
