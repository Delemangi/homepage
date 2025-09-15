import { Typography } from '@mui/material';

import Column from '../components/Column';
import UnderlinedLink from '../components/UnderlinedLink';
import { usePreloader } from '../hooks/usePreloader';
import Age from './Age';
import LocalTime from './LocalTime';
import Name from './Name';

const Introduction = () => {
  const { preloaderDone } = usePreloader();
  return (
    <Column
      sx={{
        animation: 'fadeIn 1.5s ease-in-out both',
        animationPlayState: preloaderDone ? 'running' : 'paused',
      }}
    >
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
          href="https://github.com/finki-hub"
          target="_blank"
        >
          finki-hub
        </UnderlinedLink>{' '}
        (
        <UnderlinedLink
          href="https://discord.gg/finki-studenti-810997107376914444"
          target="_blank"
        >
          Discord
        </UnderlinedLink>
        )
      </Typography>
    </Column>
  );
};

export default Introduction;
