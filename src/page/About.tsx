import { Stack, Typography } from '@mui/material';

import Column from '../components/Column';
import SkillChip from './SkillChip';

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
      sx={(t) => ({
        background:
          t.palette.mode === 'dark'
            ? 'linear-gradient(90deg, rgba(255, 125, 125, 0.9), rgba(106, 130, 251, 0.9))'
            : 'linear-gradient(90deg, rgba(238, 63, 113, 0.95), rgba(244, 184, 96, 0.95))',
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

    <Typography
      color="textSecondary"
      fontSize={15}
      marginBottom={1.5}
    >
      Software Engineer focused on end-to-end product development - from
      front-end experience to resilient back-end services to DevOps. I build
      scalable microservices and web apps with modern technologies, always
      balancing DX, clarity, and performance.
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
      roguelike, and factory games. I also enjoy collecting various keyboards.
    </Typography>

    <Typography
      color="textSecondary"
      fontSize={14}
      marginBottom={1}
    >
      Here are some technologies I&apos;ve used extensively in production:
    </Typography>

    <Stack
      direction="row"
      flexWrap="wrap"
      spacing={1}
      useFlexGap
    >
      {skills.map((label, idx) => (
        <SkillChip
          animationDelay={idx * 0.09 + 0.2}
          key={label}
          label={label}
        />
      ))}
    </Stack>
  </Column>
);

export default About;
