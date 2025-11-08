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
      <Typography
        color="textSecondary"
        fontSize={14}
      >
        Stefan Milev
      </Typography>
      <Typography
        color="textSecondary"
        fontSize={14}
      >
        Skopje, North Macedonia
      </Typography>
      <LocalTime fontSize={14} />
      <Age
        fontSize={14}
        marginBottom={2}
      />
      <Typography fontSize={16}>
        Software Engineer @{' '}
        <UnderlinedLink
          href="https://codechem.com"
          target="_blank"
        >
          CodeChem
        </UnderlinedLink>
      </Typography>
      <Typography fontSize={16}>
        CS Master&apos;s Student @{' '}
        <UnderlinedLink
          href="https://finki.ukim.mk"
          target="_blank"
        >
          FCSE
        </UnderlinedLink>
      </Typography>
      <Typography
        fontSize={16}
        marginBottom={2}
      >
        Founder @{' '}
        <UnderlinedLink
          href="https://finki-hub.com"
          target="_blank"
        >
          finki-hub
        </UnderlinedLink>{' '}
      </Typography>
    </Box>
  </Column>
);

export default Introduction;
