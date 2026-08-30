import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import ProjectCard, { type Project } from '../components/ProjectCard';
import TextReveal from '../components/TextReveal';

const projects: readonly Project[] = [
  {
    description:
      'A community platform of apps, bots, and scrapers that helps FCSE students find the university information they need and automate routine tasks.',
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
      'A shareable ruleset that keeps my React, TypeScript, and Node.js projects consistent without repeating configuration.',
    hrefCode: 'https://github.com/Delemangi/eslint-config-imperium',
    hrefLive: 'https://www.npmjs.com/package/eslint-config-imperium',
    liveLabel: 'Package',
    tech: ['ESLint', 'TypeScript', 'Node.js'],
    title: 'eslint-config-imperium',
  },
  {
    description: 'My personal homepage. You are currently here.',
    hrefCode: 'https://github.com/Delemangi/homepage',
    hrefLive: 'https://delemangi.com',
    tech: ['React', 'TypeScript', 'Vite', 'Material UI', 'Docker'],
    title: 'homepage',
  },
  {
    description:
      'A Discord control plane for managing several Steam accounts through ArchiSteamFarm without touching each client.',
    hrefCode: 'https://github.com/Delemangi/asf-discord-bot',
    tech: ['TypeScript', 'discord.js', 'ArchiSteamFarm', 'Docker'],
    title: 'asf-discord-bot',
  },
];

const Portfolio = () => (
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
        Selected work
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
        A few things I’ve built and still maintain.
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

export default Portfolio;
