import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import UnderlinedLink from '../components/UnderlinedLink';
import Age from './Age';
import LocalTime from './LocalTime';
import Name from './Name';

const Introduction = () => (
  <Column>
    <Name />
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography sx={{ color: 'text.secondary', fontSize: 18 }}>
        Stefan Milev
      </Typography>
      <Typography sx={{ color: 'text.secondary', fontSize: 18 }}>
        Skopje, North Macedonia
      </Typography>
      <LocalTime fontSize={18} />
      <Age
        fontSize={18}
        marginBottom={2}
      />
      <Typography sx={{ fontSize: 18 }}>
        Software Engineer @{' '}
        <UnderlinedLink
          href="https://codechem.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          CodeChem
        </UnderlinedLink>
      </Typography>
      <Typography sx={{ fontSize: 16 }}>
        MSc, Computer Science @{' '}
        <UnderlinedLink
          href="https://finki.ukim.mk"
          rel="noopener noreferrer"
          target="_blank"
        >
          FCSE
        </UnderlinedLink>
      </Typography>
      <Typography sx={{ fontSize: 16 }}>
        Founder @{' '}
        <UnderlinedLink
          href="https://finki-hub.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          finki-hub
        </UnderlinedLink>{' '}
      </Typography>
      <Typography sx={{ fontSize: 16, marginBottom: 2 }}>
        Co-founder @{' '}
        <UnderlinedLink
          href="https://learnify.mk"
          rel="noopener noreferrer"
          target="_blank"
        >
          learnify.mk
        </UnderlinedLink>{' '}
      </Typography>
    </Box>
  </Column>
);

export default Introduction;
