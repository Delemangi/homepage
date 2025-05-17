import { Link, Typography } from '@mui/material';

import Column from '../components/Column';
import Age from './Age';
import Name from './Name';

const Introduction = () => (
  <Column sx={{ animation: 'fadeIn 1.5s ease-in-out both' }}>
    <Name />
    <Typography fontSize={14}>Stefan Milev</Typography>
    <Typography fontSize={14}>Skopje, North Macedonia</Typography>
    <Age
      fontSize={14}
      marginBottom={2}
    />
    <Typography fontSize={16}>
      Software Engineer @{' '}
      <Link
        href="https://codechem.com"
        target="_blank"
      >
        CodeChem
      </Link>
    </Typography>
    <Typography
      fontSize={16}
      marginBottom={2}
    >
      CS Master&apos;s Student @{' '}
      <Link
        href="https://finki.ukim.mk"
        target="_blank"
      >
        FCSE
      </Link>
    </Typography>
  </Column>
);

export default Introduction;
