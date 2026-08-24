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
          background:
            t.palette.mode === 'dark'
              ? 'linear-gradient(90deg, rgba(255, 125, 125, 0.9), rgba(106, 130, 251, 0.9))'
              : `linear-gradient(90deg, ${t.palette.primary.main}, ${t.palette.info.main})`,
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 700,
          letterSpacing: 0.2,
          marginBottom: 1.5,
        })}
        variant="h5"
      >
        About
      </Typography>
    </TextReveal>
    <TextReveal delay={100}>
      <Typography
        sx={{ color: 'text.secondary', fontSize: 15, marginBottom: 1.5 }}
      >
        I’m a software engineer building end-to-end products across frontend,
        backend, infrastructure, and AI. My work spans web applications,
        scalable services, and retrieval-augmented generation (RAG) systems.
      </Typography>
    </TextReveal>

    <TextReveal delay={200}>
      <Typography sx={{ color: 'text.secondary', fontSize: 15 }}>
        Outside work, I build side projects, play video games, collect
        mechanical keyboards, and occasionally break my homelab.
      </Typography>
    </TextReveal>
  </Column>
);

export default Profile;
