import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import ProjectCard, { type Project } from '../components/ProjectCard';
import TextReveal from '../components/TextReveal';

const projects: readonly Project[] = [
  {
    description:
      'A student platform combining university information, workflow automation, and an AI assistant backed by retrieval-augmented generation.',
    hrefCode: 'https://github.com/finki-hub',
    hrefLive: 'https://finki-hub.com',
    tech: [
      'React',
      'Node.js',
      'PostgreSQL',
      'Prisma',
      'Docker',
      'LangChain',
      'FastAPI',
      'discord.js',
    ],
    title: 'finki-hub',
  },
  {
    description:
      'A shared ESLint configuration for consistent code quality across React, TypeScript, and Node.js projects.',
    hrefCode: 'https://github.com/Delemangi/eslint-config-imperium',
    hrefLive: 'https://www.npmjs.com/package/eslint-config-imperium',
    liveLabel: 'Package',
    tech: ['ESLint', 'TypeScript', 'Node.js'],
    title: 'eslint-config-imperium',
  },
  {
    description:
      'A personal portfolio built with React and TypeScript, with responsive layouts and accessible interactions.',
    hrefCode: 'https://github.com/Delemangi/homepage',
    hrefLive: 'https://delemangi.com',
    tech: ['React', 'TypeScript', 'Vite', 'Material UI', 'Docker'],
    title: 'homepage',
  },
  {
    description:
      'A Discord integration for managing multiple Steam accounts through ArchiSteamFarm.',
    hrefCode: 'https://github.com/Delemangi/asf-discord-bot',
    tech: ['TypeScript', 'discord.js', 'ArchiSteamFarm', 'Docker'],
    title: 'asf-discord-bot',
  },
];

export default function Portfolio() {
  return (
    <Column>
      <TextReveal>
        <Typography
          component="h2"
          id="portfolio-heading"
          sx={(t) => ({
            color: t.palette.text.primary,
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 650,
            letterSpacing: '-0.045em',
            lineHeight: 1.08,
            marginBottom: 1.5,
          })}
        >
          Open source & community
        </Typography>
      </TextReveal>

      <TextReveal delay={100}>
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: 16,
            lineHeight: 1.75,
            marginBottom: 1,
            maxWidth: '62ch',
          }}
        >
          Alongside enterprise work, I build and maintain these independent
          projects.
        </Typography>
      </TextReveal>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: {
            md: 'repeat(2, minmax(0, 1fr))',
            xs: '1fr',
          },
        }}
      >
        {projects.map((p, index) => (
          <Box
            component="article"
            key={p.title}
            sx={{
              '& > *': { flex: 1, height: '100%' },
              display: 'flex',
              height: '100%',
            }}
          >
            <TextReveal delay={200 + index * 100}>
              <ProjectCard {...p} />
            </TextReveal>
          </Box>
        ))}
      </Box>
    </Column>
  );
}
