import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import ProjectCard, { type Project } from '../components/ProjectCard';

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
      '...',
    ],
    title: 'finki-hub',
  },
  {
    description:
      'Strict & modular ESLint config with presets for modern stacks (React, TS, Node) and composable rulesets.',
    hrefCode: 'https://github.com/Delemangi/eslint-config-imperium',
    tech: ['ESLint', 'TypeScript', 'Node.js', '...'],
    title: 'eslint-config-imperium',
  },
  {
    description: 'Personal site — you are currently here.',
    hrefCode: 'https://github.com/Delemangi/homepage',
    tech: ['React', 'TypeScript', 'Vite', 'Material UI', 'Docker', '...'],
    title: 'homepage',
  },
  {
    description:
      'Discord bot for managing a network of Steam accounts using ArchiSteamFarm.',
    hrefCode: 'https://github.com/Delemangi/asf-discord-bot',
    tech: ['TypeScript', 'discord.js', 'ArchiSteamFarm', 'Docker', '...'],
    title: 'asf-discord-bot',
  },
];

const Projects = () => (
  <Column sx={{ animation: 'fadeInMoveUp 900ms ease-out both' }}>
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
      Projects
    </Typography>

    <Box
      sx={(t) => ({
        alignItems: 'center',
        color: t.palette.text.secondary,
        display: 'flex',
        gap: 1,
        marginBottom: 2,
        opacity: 0.9,
      })}
    >
      <Box
        sx={(t) => ({
          backgroundColor: t.palette.success.main,
          borderRadius: '50%',
          boxShadow:
            t.palette.mode === 'dark'
              ? '0 0 10px rgba(76, 175, 80, 0.5)'
              : '0 0 8px rgba(76, 175, 80, 0.35)',
          height: 8,
          width: 8,
        })}
      />
      <Typography
        color="textSecondary"
        variant="body2"
      >
        Actively maintained
      </Typography>
    </Box>

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
      {projects.map((p, i) => (
        <ProjectCard
          animationDelay={i * 0.1 + 0.2}
          key={p.title}
          {...p}
        />
      ))}
    </Box>
  </Column>
);

export default Projects;
