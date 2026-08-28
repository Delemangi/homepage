import { Typography } from '@mui/material';

import Column from '../components/Column';
import TextReveal from '../components/TextReveal';

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
        I’m a software engineer building end-to-end products across frontend,
        backend, infrastructure, and AI. My work spans web applications,
        scalable services, and retrieval-augmented generation (RAG) systems.
      </Typography>
    </TextReveal>

    <TextReveal delay={200}>
      <Typography
        sx={{ color: 'text.secondary', fontSize: 16, lineHeight: 1.8 }}
      >
        Outside work, I build side projects, play video games, collect
        mechanical keyboards, and occasionally break my homelab.
      </Typography>
    </TextReveal>
  </Column>
);

export default Profile;
