import { Box, Stack, Typography } from '@mui/material';

import Column from '../components/Column';
import ProjectCard, { type Project } from '../components/ProjectCard';
import TextReveal from '../components/TextReveal';
import SkillChip from './SkillChip';

const SKILLS = [
  'Node.js',
  'React',
  'Solid',
  'Next.js',
  'Electron',
  'Material UI',
  'Chakra UI',
  'FastAPI',
  'Django',
  'Spring Boot',
  'MCP',
  'AWS',
  'Azure',
  'Cloudflare',
  'discord.js',
  'PostgreSQL',
  'MongoDB',
  'Milvus',
  'Elasticsearch',
  'LangChain',
  'Docker',
  'Kubernetes',
] as const;

const projects: Project[] = [
  {
    description:
      'Open-source tools for FCSE students, including scrapers, bots, web apps, and a RAG chatbot.',
    hrefCode: 'https://github.com/finki-hub',
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
      'A strict, modular ESLint configuration with composable presets for React, TypeScript, and Node.js.',
    hrefCode: 'https://github.com/Delemangi/eslint-config-imperium',
    tech: ['ESLint', 'TypeScript', 'Node.js'],
    title: 'eslint-config-imperium',
  },
  {
    description: 'This website. You are currently using the live demo.',
    hrefCode: 'https://github.com/Delemangi/homepage',
    tech: ['React', 'TypeScript', 'Vite', 'Material UI', 'Docker'],
    title: 'homepage',
  },
  {
    description:
      'A Discord bot for managing multiple Steam accounts through ArchiSteamFarm.',
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
          background:
            t.palette.mode === 'dark'
              ? 'linear-gradient(90deg, rgba(125, 255, 214, 0.9), rgba(106, 130, 251, 0.9))'
              : `linear-gradient(90deg, ${t.palette.primary.main}, #006b8c)`,
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 700,
          letterSpacing: 0.2,
          marginBottom: 0.75,
        })}
        variant="h5"
      >
        Projects & skills
      </Typography>
    </TextReveal>

    <TextReveal delay={100}>
      <Typography
        align="justify"
        sx={{ color: 'text.secondary', fontSize: 14, marginBottom: 1 }}
      >
        Technologies I use regularly at work and in personal projects.
      </Typography>
    </TextReveal>

    <TextReveal delay={200}>
      <Stack
        direction="row"
        spacing={1}
        sx={{ flexWrap: 'wrap', marginBottom: 3 }}
        useFlexGap
      >
        {SKILLS.map((label) => (
          <SkillChip
            key={label}
            label={label}
          />
        ))}
      </Stack>
    </TextReveal>

    <TextReveal delay={300}>
      <Typography
        align="justify"
        sx={{ color: 'text.secondary', fontSize: 14, marginBottom: 2 }}
      >
        A selection of personal and open-source projects I still maintain,
        mostly built to solve problems I had myself.
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
        <TextReveal
          delay={400 + index * 100}
          key={p.title}
        >
          <ProjectCard {...p} />
        </TextReveal>
      ))}
    </Box>
  </Column>
);

export default Portfolio;
