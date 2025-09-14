import { Typography } from '@mui/material';

import Column from '../components/Column';
import UnderlinedLink from '../components/UnderlinedLink';
import Age from './Age';
import Name from './Name';

const Introduction = () => (
  <Column sx={{ animation: 'fadeIn 1.5s ease-in-out both' }}>
    <Name />
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
    <Typography
      fontSize={16}
      marginBottom={2}
    >
      CS Master&apos;s Student @{' '}
      <UnderlinedLink
        href="https://finki.ukim.mk"
        target="_blank"
      >
        FCSE
      </UnderlinedLink>
    </Typography>
  </Column>
);

export default Introduction;
