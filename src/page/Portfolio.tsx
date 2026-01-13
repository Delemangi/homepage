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
  'ElasticSearch',
  'LangChain',
  'Docker',
  'Kubernetes',
] as const;

const projects: Project[] = [
  {
    description:
      'Collection of FCSE data tools: scrapers, bots, web apps and a RAG chatbot.',
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
      'Strict & modular ESLint config with presets for modern stacks (React, TS, Node) and composable rulesets.',
    hrefCode: 'https://github.com/Delemangi/eslint-config-imperium',
    tech: ['ESLint', 'TypeScript', 'Node.js'],
    title: 'eslint-config-imperium',
  },
  {
    description: 'You are currently here!',
    hrefCode: 'https://github.com/Delemangi/homepage',
    tech: ['React', 'TypeScript', 'Vite', 'Material UI', 'Docker'],
    title: 'homepage',
  },
  {
    description:
      'Discord bot for managing a network of Steam accounts using ArchiSteamFarm.',
    hrefCode: 'https://github.com/Delemangi/asf-discord-bot',
    tech: ['TypeScript', 'discord.js', 'ArchiSteamFarm', 'Docker'],
    title: 'asf-discord-bot',
  },
];

const Portfolio = () => (
  <Column>
    <TextReveal>
      <Typography
        sx={(t) => ({
          background:
            t.palette.mode === 'dark'
              ? 'linear-gradient(90deg, rgba(125, 255, 214, 0.9), rgba(106, 130, 251, 0.9))'
              : 'linear-gradient(90deg, rgba(238, 63, 113, 0.95), rgba(96, 211, 244, 0.95))',
          backgroundClip: 'text',
          color: 'transparent',
          fontWeight: 700,
          letterSpacing: 0.2,
          marginBottom: 0.75,
        })}
        variant="h5"
      >
        Portfolio
      </Typography>
    </TextReveal>

    <TextReveal delay={100}>
      <Typography
        align="justify"
        color="textSecondary"
        fontSize={14}
        marginBottom={1}
      >
        Here are some technologies I use frequently professionally and in my own
        projects:
      </Typography>
    </TextReveal>

    <TextReveal delay={200}>
      <Stack
        direction="row"
        flexWrap="wrap"
        spacing={1}
        sx={{ marginBottom: 3 }}
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
        color="textSecondary"
        fontSize={14}
        marginBottom={2}
      >
        Below are some of my personal projects and open-source contributions
        that I still maintain. Each project is something I needed and built for
        myself.
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
