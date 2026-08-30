import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import UnderlinedLink from '../components/UnderlinedLink';
import Name from './Name';

const SECONDARY_TEXT = 'text.secondary';

const HeroCopy = () => (
  <Box>
    <Name />
    <Typography
      component="p"
      sx={{
        fontSize: 'clamp(28px, 4vw, 52px)',
        fontWeight: 600,
        letterSpacing: '-0.045em',
        lineHeight: 1.08,
        marginBottom: 0,
        marginTop: 3,
        maxWidth: '18ch',
        textWrap: 'balance',
      }}
    >
      I build software, from{' '}
      <Box
        component="span"
        sx={{ whiteSpace: 'nowrap' }}
      >
        web apps
      </Box>{' '}
      to cloud infrastructure.
    </Typography>
  </Box>
);

const WorkNote = () => (
  <Box
    component="aside"
    sx={{
      borderColor: 'primary.main',
      borderLeft: '2px solid',
      paddingLeft: { md: 4, xs: 3 },
      paddingY: 1,
    }}
  >
    <Typography
      component="p"
      sx={{
        fontSize: { md: 26, xs: 22 },
        fontWeight: 650,
        letterSpacing: '-0.035em',
        lineHeight: 1.25,
        textWrap: 'balance',
      }}
    >
      Software engineer at{' '}
      <UnderlinedLink
        href="https://codechem.com"
        rel="noopener noreferrer"
        target="_blank"
      >
        CodeChem
      </UnderlinedLink>
      .
    </Typography>
    <Typography
      sx={{
        color: SECONDARY_TEXT,
        fontSize: { md: 16, xs: 15 },
        lineHeight: 1.75,
        marginTop: 2,
        maxWidth: '42ch',
        textWrap: 'pretty',
      }}
    >
      I build web apps, RAG tools, and the cloud infrastructure behind them.
    </Typography>
  </Box>
);

const Introduction = () => (
  <Column>
    <Box
      sx={{
        '@media (min-width: 768px)': {
          gap: 4,
          gridTemplateColumns: 'minmax(0, 1.25fr) minmax(296px, 0.75fr)',
        },
        '@media (min-width: 900px)': {
          gap: 8,
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(280px, 0.65fr)',
        },
        alignItems: 'center',
        display: 'grid',
        gap: 5,
        gridTemplateColumns: '1fr',
      }}
    >
      <HeroCopy />
      <WorkNote />
    </Box>
  </Column>
);

export default Introduction;
