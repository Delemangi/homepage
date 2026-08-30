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
        I’m a software engineer based in Skopje. I work on web apps, backend
        services, cloud infrastructure, and RAG systems.
      </Typography>
      <Typography
        sx={{ color: 'text.secondary', fontSize: 16, lineHeight: 1.8 }}
      >
        I founded{' '}
        <UnderlinedLink
          href="https://finki-hub.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          finki-hub
        </UnderlinedLink>{' '}
        and co-founded{' '}
        <UnderlinedLink
          href="https://learnify.mk"
          rel="noopener noreferrer"
          target="_blank"
        >
          learnify.mk
        </UnderlinedLink>
        .
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
        Outside work, I build side projects, play video games, collect
        mechanical keyboards, and work on my homelab. Most of those projects
        start because I want to understand how something works. The homelab
        gives me somewhere to test ideas without worrying about breaking
        anything important.
      </Typography>
    </TextReveal>
  </Column>
);

export default Profile;
