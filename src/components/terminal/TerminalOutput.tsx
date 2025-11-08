import { Typography } from '@mui/material';

type OutputLine = {
  id: string;
  text: string;
};

type TerminalOutputProps = {
  readonly lines: OutputLine[];
};

const TerminalOutput = ({ lines }: TerminalOutputProps) => (
  <>
    {lines.map((line) => (
      <Typography
        component="pre"
        key={line.id}
        sx={{
          color: line.text.startsWith('Error:')
            ? '#ff6b6b'
            : line.text.startsWith('✓')
              ? '#4ade80'
              : line.text.includes('─')
                ? '#666'
                : '#aaa',
          fontFamily: 'inherit',
          margin: 0,
          textShadow: line.text.startsWith('✓')
            ? '0 0 5px rgba(74, 222, 128, 0.3)'
            : 'none',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {line.text}
      </Typography>
    ))}
  </>
);

export default TerminalOutput;
