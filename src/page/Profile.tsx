import { Typography } from '@mui/material';

import Column from '../components/Column';
import TextReveal from '../components/TextReveal';
import UnderlinedLink from '../components/UnderlinedLink';

export default function Profile() {
  return (
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
          I’m Stefan, a software engineer based in Skopje. At CodeChem, I build
          enterprise applications across industrial software, education, and
          AI—connecting user-facing products with the services and cloud
          infrastructure behind them.
        </Typography>
        <Typography
          sx={{ color: 'text.secondary', fontSize: 16, lineHeight: 1.8 }}
        >
          My work spans full-stack delivery, system integrations, and production
          AI, with a focus on reliability, maintainability, and automated
          testing. Outside client work, I run{' '}
          <UnderlinedLink
            href="https://finki-hub.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            finki-hub
          </UnderlinedLink>{' '}
          and contribute to community and open-source projects.
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
}
