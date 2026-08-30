import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import UnderlinedLink from '../components/UnderlinedLink';
import Age from './Age';
import LocalTime from './LocalTime';
import Name from './Name';

const UTILITY_FONT = 'Kode Mono, ui-monospace, monospace';
const SECONDARY_TEXT = 'text.secondary';
const HERO_IDENTITY =
  'STEFAN MILEV · SOFTWARE ENGINEER · SKOPJE, NORTH MACEDONIA';

const HeroCopy = () => (
  <Box>
    <Typography
      sx={{
        color: SECONDARY_TEXT,
        fontFamily: UTILITY_FONT,
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: '0.16em',
        marginBottom: 2,
        textTransform: 'uppercase',
      }}
    >
      <Box
        component="span"
        sx={{
          clip: 'rect(0 0 0 0)',
          clipPath: 'inset(50%)',
          height: 1,
          overflow: 'hidden',
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: 1,
        }}
      >
        {HERO_IDENTITY}
      </Box>
      <Box
        aria-hidden="true"
        component="span"
      >
        <Box
          component="span"
          sx={{ whiteSpace: 'nowrap' }}
        >
          STEFAN MILEV
        </Box>
        <wbr />
        <Box
          component="span"
          sx={{ whiteSpace: 'nowrap' }}
        >
          {' · SOFTWARE ENGINEER'}
        </Box>
        <wbr />
        <Box
          component="span"
          sx={{
            '&::before': {
              content: '" · "',
              display: { md: 'inline', xs: 'none' },
            },
            whiteSpace: 'nowrap',
          }}
        >
          SKOPJE, NORTH MACEDONIA
        </Box>
      </Box>
    </Typography>
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
      I build web apps, cloud systems, and AI tools.
    </Typography>
    <Typography
      sx={{
        color: SECONDARY_TEXT,
        fontSize: { md: 17, xs: 16 },
        lineHeight: 1.75,
        marginTop: 2.5,
        maxWidth: '60ch',
      }}
    >
      I like working across the stack and seeing how the pieces fit.
    </Typography>
  </Box>
);

const StatusPanel = () => (
  <Box
    aria-labelledby="current-state-heading"
    component="aside"
    sx={(theme) => ({
      backdropFilter: 'blur(20px) saturate(130%)',
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(23, 27, 37, 0.78)'
          : 'rgba(255, 255, 255, 0.84)',
      border: `1px solid ${
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.08)'
          : 'rgba(35, 25, 42, 0.10)'
      }`,
      borderRadius: 3,
      boxShadow:
        theme.palette.mode === 'dark'
          ? '0 28px 80px rgba(0,0,0,.34), inset 0 1px 0 rgba(255,255,255,.06)'
          : '0 28px 80px rgba(61,28,43,.10), inset 0 1px 0 rgba(255,255,255,.9)',
      padding: { md: 3.5, xs: 3 },
    })}
  >
    <Box
      sx={{ alignItems: 'center', display: 'flex', gap: 1, marginBottom: 3 }}
    >
      <Box
        sx={(theme) => ({
          backgroundColor: theme.palette.info.main,
          borderRadius: '50%',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 0 14px rgba(83,230,195,.55)'
              : 'none',
          height: 7,
          width: 7,
        })}
      />
      <Typography
        id="current-state-heading"
        sx={{
          color: SECONDARY_TEXT,
          fontFamily: UTILITY_FONT,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        Now
      </Typography>
    </Box>
    <Box sx={{ marginBottom: 2 }}>
      <Typography
        component="p"
        sx={{
          fontSize: { md: 28, xs: 24 },
          fontWeight: 700,
          letterSpacing: '-0.035em',
          lineHeight: 1.15,
          textWrap: 'balance',
        }}
      >
        Software Engineer
      </Typography>
      <Typography
        component="p"
        sx={{
          color: SECONDARY_TEXT,
          fontSize: 15,
          lineHeight: 1.6,
          marginTop: 0.75,
        }}
      >
        at{' '}
        <UnderlinedLink
          href="https://codechem.com"
          rel="noopener noreferrer"
          sx={{ fontWeight: 650 }}
          target="_blank"
        >
          CodeChem
        </UnderlinedLink>
      </Typography>
    </Box>
    <Typography
      sx={{
        color: SECONDARY_TEXT,
        fontSize: 14,
        lineHeight: 1.75,
        marginTop: 2,
      }}
    >
      At CodeChem, I build interfaces and RAG systems, and work on the cloud
      infrastructure behind them.
    </Typography>
    <Box
      sx={{
        borderBottom: '1px solid',
        borderColor: 'divider',
        borderTop: '1px solid',
        display: 'grid',
        gap: 1.5,
        gridTemplateColumns: 'minmax(88px, auto) minmax(0, 1fr)',
        marginTop: 3,
        paddingY: 2.5,
      }}
    >
      <Typography sx={{ color: SECONDARY_TEXT, fontSize: 12 }}>
        LOCAL TIME
      </Typography>
      <Box sx={{ minWidth: 0 }}>
        <LocalTime fontSize={13} />
      </Box>
      <Typography sx={{ color: SECONDARY_TEXT, fontSize: 12 }}>AGE</Typography>
      <Box sx={{ minWidth: 0 }}>
        <Age fontSize={13} />
      </Box>
    </Box>
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
      <StatusPanel />
    </Box>
  </Column>
);

export default Introduction;
