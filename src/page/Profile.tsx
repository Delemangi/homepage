import { Typography } from '@mui/material';

import Column from '../components/Column';
import TextReveal from '../components/TextReveal';
import UnderlinedLink from '../components/UnderlinedLink';

const Profile = () => (
  <Column>
    <TextReveal>
      <Typography
        component="h2"
        id="about-heading"
        sx={(t) => ({
          color: t.palette.text.primary,
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 650,
          letterSpacing: '-0.035em',
          lineHeight: 1.12,
          marginBottom: 2.5,
        })}
      >
        About
      </Typography>
    </TextReveal>
    <TextReveal delay={100}>
      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: 16,
          lineHeight: 1.8,
          marginBottom: 2,
        }}
      >
        I’m Stefan, a software engineer based in Skopje. I work across frontend,
        backend, infrastructure, and AI, usually with TypeScript or Python. I
        like tinkering with frontier AI and figuring out what it is actually
        useful for.
      </Typography>
      <Typography
        sx={{ color: 'text.secondary', fontSize: 16, lineHeight: 1.8 }}
      >
        I run{' '}
        <UnderlinedLink
          href="https://finki-hub.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          finki-hub
        </UnderlinedLink>{' '}
        and{' '}
        <UnderlinedLink
          href="https://learnify.mk"
          rel="noopener noreferrer"
          target="_blank"
        >
          learnify.mk
        </UnderlinedLink>
        , along with a few other communities.
      </Typography>
    </TextReveal>

    <TextReveal delay={200}>
      <Typography
        sx={{
          color: 'text.secondary',
          fontSize: 16,
          lineHeight: 1.8,
          textWrap: 'pretty',
        }}
      >
        In my free time, I play video games, collect mechanical keyboards, and
        use my homelab to experiment with networking, Linux server
        administration, and running AI models locally.
      </Typography>
    </TextReveal>
  </Column>
);

export default Profile;
