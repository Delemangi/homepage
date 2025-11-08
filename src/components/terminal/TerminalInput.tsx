import { Box, Typography } from '@mui/material';
import { type ChangeEvent, type KeyboardEvent, type RefObject } from 'react';

import TerminalPrompt from './TerminalPrompt';

type TerminalInputProps = {
  readonly input: string;
  readonly inputRef: RefObject<HTMLInputElement | null>;
  readonly onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  readonly suggestion: string;
};

const TerminalInput = ({
  input,
  inputRef,
  onInputChange,
  onKeyDown,
  suggestion,
}: TerminalInputProps) => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      gap: 1,
      position: 'relative',
      zIndex: 2,
    }}
  >
    <TerminalPrompt animated />
    <Box sx={{ flex: 1, position: 'relative' }}>
      {suggestion && input ? (
        <Typography
          component="span"
          sx={{
            color: '#2a2a2a',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            fontWeight: 500,
            left: 0,
            pointerEvents: 'none',
            position: 'absolute',
            top: 0,
          }}
        >
          <Box
            component="span"
            sx={{ visibility: 'hidden' }}
          >
            {input}
          </Box>
          {suggestion.slice(input.length)}
        </Typography>
      ) : null}
      <Box
        component="input"
        contentEditable
        onInput={onInputChange}
        onKeyDown={onKeyDown}
        ref={inputRef}
        spellCheck={false}
        sx={{
          backgroundColor: 'transparent',
          border: 'none',
          caretColor: '#00ffd0',
          color: '#00ffd0',
          fontFamily: 'inherit',
          fontSize: 'inherit',
          fontWeight: 500,
          outline: 'none',
          textShadow: '0 0 10px rgba(0, 255, 208, 0.5)',
          width: '100%',
        }}
        value={input}
      />
    </Box>
  </Box>
);

export default TerminalInput;
