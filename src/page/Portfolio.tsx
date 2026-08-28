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
          color: t.palette.text.primary,
          fontSize: 'clamp(28px, 4vw, 44px)',
          fontWeight: 650,
          letterSpacing: '-0.045em',
          lineHeight: 1.08,
          marginBottom: 1.5,
        })}
      >
        Projects & skills
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
        sx={{
          color: 'text.secondary',
          fontSize: 16,
          lineHeight: 1.75,
          marginBottom: 3,
          maxWidth: '62ch',
        }}
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
        <Box
          component="article"
          key={p.title}
          sx={{
            '& > *': { flex: 1, height: '100%' },
            display: 'flex',
            height: '100%',
          }}
        >
          <TextReveal delay={400 + index * 100}>
            <ProjectCard {...p} />
          </TextReveal>
        </Box>
      ))}
    </Box>
  </Column>
);

export default Portfolio;
