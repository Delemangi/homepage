import { Stack, Typography } from '@mui/material';

import Column from '../components/Column';
import { usePreloader } from '../hooks/usePreloader';
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

const Profile = () => {
  const { preloaderDone } = usePreloader();
  return (
    <Column
      sx={{
        animation: 'fadeInMoveUp 900ms ease-out both',
        animationPlayState: preloaderDone ? 'running' : 'paused',
      }}
    >
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
        Profile
      </Typography>
      <Typography
        align="justify"
        color="textSecondary"
        fontSize={15}
        marginBottom={1.5}
      >
        Software Engineer building end-to-end products, from front-end to
        back-end, DevOps and AI. I ship scalable microservices & web apps, as
        well as AI RAG systems that turns ideas into practical features.
      </Typography>

      <Typography
        align="justify"
        color="textSecondary"
        fontSize={15}
        marginBottom={2}
      >
        Outside work, I spend time on coding projects and play games, especially
        survival, roguelike, and factory titles. I also collect mechanical
        keyboards.
      </Typography>

      <Typography
        align="justify"
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
            animate={preloaderDone}
            animationDelay={idx * 0.06}
            key={label}
            label={label}
          />
        ))}
      </Stack>
    </Column>
  );
};

export default Profile;
