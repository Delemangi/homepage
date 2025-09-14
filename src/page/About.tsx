import { Chip, Stack, Typography } from '@mui/material';

import Column from '../components/Column';

const skills = [
  'Microservices',
  'Node.js',
  'Serverless',
  'React',
  'FastAPI',
  'Spring Boot',
  'RAG',
  'MCP',
  'Prompt Engineering',
  'AI/ML',
  'AWS',
  'discord.js',
  'PostgreSQL',
  'MongoDB',
  'ElasticSearch',
  'LangChain',
  'Docker',
  'Kubernetes',
];

const About = () => (
  <Column sx={{ animation: 'fadeInMoveUp 900ms ease-out both' }}>
    <Typography
      sx={{
        background:
          'linear-gradient(90deg, rgba(255, 125, 125, 0.9), rgba(106, 130, 251, 0.9))',
        backgroundClip: 'text',
        color: 'transparent',
        fontWeight: 700,
        letterSpacing: 0.2,
        marginBottom: 1.5,
      }}
      variant="h5"
    >
      About
    </Typography>

    <Typography
      color="textSecondary"
      fontSize={15}
      marginBottom={1.5}
    >
      Software Engineer focused on end‑to‑end product development — from design
      and front‑end experience to resilient back‑end services to DevOps. I build
      scalable microservices and modern web apps with modern technologies,
      always balancing DX, clarity, and performance.
    </Typography>

    <Typography
      color="textSecondary"
      fontSize={15}
      marginBottom={1.5}
    >
      More recently, I&apos;ve been building AI/ML-driven systems with RAG
      pipelines, MCP integrations, prompt engineering and advanced retrieval. I
      enjoy turning research-y ideas into practical features that ship.
    </Typography>

    <Typography
      color="textSecondary"
      fontSize={15}
      marginBottom={2}
    >
      Outside work, I spend a lot of time with hobby coding projects and enjoy
      playing video games both casually and competitively — especially survival,
      roguelike, and factory games.
    </Typography>

    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1}
      useFlexGap
    >
      {skills.map((label, idx) => (
        <Chip
          key={label}
          label={label}
          size="small"
          sx={(t) => ({
            '& .MuiChip-label': { px: 1.25 },
            '&::after': {
              background:
                t.palette.mode === 'dark'
                  ? 'linear-gradient(120deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.18), rgba(255, 255, 255, 0))'
                  : 'linear-gradient(120deg, rgba(255, 255, 255, 0), rgba(238, 63, 113, 0.22), rgba(255, 255, 255, 0))',
              borderRadius: 1.5,
              content: '""',
              inset: 0,
              mixBlendMode: t.palette.mode === 'dark' ? 'screen' : 'overlay',
              opacity: 0,
              pointerEvents: 'none',
              position: 'absolute',
              transform: 'translateX(-120%)',
              transition: 'transform 700ms ease, opacity 200ms ease',
            },
            '&:active': {
              boxShadow: 'none',
              transform: 'scale(0.96)',
              transitionDuration: '50ms',
            },
            '&:focus-visible': {
              boxShadow: `0 0 0 2px ${
                t.palette.mode === 'dark'
                  ? 'rgba(106, 130, 251, 0.5)'
                  : 'rgba(238, 63, 113, 0.35)'
              }`,
              outline: 'none',
            },
            '&:hover': {
              '&::after': { opacity: 1, transform: 'translateX(120%)' },
              bgcolor:
                t.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.09)'
                  : 'rgba(0, 0, 0, 0.08)',
              border: `1px solid ${
                t.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.14)'
                  : 'rgba(0, 0, 0, 0.14)'
              }`,
              boxShadow:
                t.palette.mode === 'dark'
                  ? '0 6px 18px rgba(106, 130, 251, 0.18)'
                  : '0 6px 18px rgba(238, 63, 113, 0.12)',
              transform: 'translateY(-1px) scale(1.03)',
            },
            '@media (prefers-reduced-motion: reduce)': {
              '&::after': { transform: 'none', transition: 'none' },
              '&:hover': {
                boxShadow: 'none',
                transform: 'none',
              },
              animation: 'none',
              transition: 'none',
            },
            animation: 'fadeInStaggered 0.7s cubic-bezier(.4, 1, .4, 1) both',
            animationDelay: `${idx * 0.09 + 0.2}s`,
            bgcolor:
              t.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.06)'
                : 'rgba(0, 0, 0, 0.06)',
            border: `1px solid ${
              t.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.08)'
                : 'rgba(0, 0, 0, 0.08)'
            }`,
            borderRadius: 1.5,
            boxShadow:
              t.palette.mode === 'dark'
                ? '0 1px 0 rgba(255, 255, 255, 0.04)'
                : '0 1px 0 rgba(0, 0, 0, 0.05)',
            color: 'text.secondary',
            overflow: 'hidden',
            position: 'relative',
            transform: 'translateZ(0)',
            transition:
              'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms ease, background-color 200ms ease, border-color 200ms ease',
          })}
        />
      ))}
    </Stack>
  </Column>
);

export default About;
