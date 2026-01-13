import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import TextReveal from '../components/TextReveal';
import { calculateDuration } from '../utils/calculateDuration';

export type TimelineItem = {
  readonly company?: string;
  readonly endDate: string;
  readonly institution?: string;
  readonly position?: string;
  readonly skills?: string[];
  readonly startDate: string;
  readonly type: 'education' | 'work';
};

const timeline: TimelineItem[] = [
  {
    endDate: 'Sep 2024',
    institution: 'Faculty of Computer Science and Engineering',
    position: 'BSc, Computer Science',
    skills: ['DevOps', 'Spring Boot'],
    startDate: 'Oct 2020',
    type: 'education',
  },
  {
    endDate: 'Dec 2025',
    institution: 'Faculty of Computer Science and Engineering',
    position: 'MSc, Computer Science',
    skills: ['Agents', 'Retrieval-Augmented Generation (RAG)'],
    startDate: 'Oct 2024',
    type: 'education',
  },
  {
    company: 'CodeChem',
    endDate: 'Present',
    position: 'Software Engineer',
    skills: ['JavaScript', 'React.js'],
    startDate: 'Jul 2022',
    type: 'work',
  },
];

const TimelineItemComponent = ({ item }: { readonly item: TimelineItem }) => (
  <Box
    sx={{
      '&:last-child': {
        mb: 0,
      },
      borderColor: (t) =>
        item.type === 'work'
          ? t.palette.divider
          : t.palette.mode === 'dark'
            ? 'rgb(94, 234, 212)'
            : 'rgb(20, 184, 166)',
      borderLeft: '3px solid',
      display: 'flex',
      flexDirection: 'column',
      gap: 0.75,
      mb: 2,
      pb: 2,
      pl: 1.5,
    }}
  >
    <Box
      sx={{
        alignItems: 'flex-start',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: item.type === 'work' ? 600 : 500,
          }}
        >
          {item.position}
        </Typography>
        <Box
          sx={{
            backgroundColor: (t) =>
              item.type === 'work'
                ? t.palette.mode === 'dark'
                  ? 'rgba(106, 130, 251, 0.2)'
                  : 'rgba(238, 63, 113, 0.15)'
                : t.palette.mode === 'dark'
                  ? 'rgba(94, 234, 212, 0.15)'
                  : 'rgba(20, 184, 166, 0.15)',
            borderRadius: 1,
            color: (t) =>
              item.type === 'work'
                ? t.palette.mode === 'dark'
                  ? 'rgb(106, 130, 251)'
                  : 'rgb(238, 63, 113)'
                : t.palette.mode === 'dark'
                  ? 'rgb(94, 234, 212)'
                  : 'rgb(20, 184, 166)',
            fontSize: 11,
            px: 1.25,
            py: 0.4,
          }}
        >
          {item.type === 'work' ? 'Experience' : 'Education'}
        </Box>
      </Box>
      {item.type === 'work' && (
        <Typography
          color="textSecondary"
          sx={{
            fontSize: 13,
            ml: 2,
            whiteSpace: 'nowrap',
          }}
        >
          {calculateDuration(item.startDate, item.endDate)}
        </Typography>
      )}
    </Box>
    <Typography
      color="textSecondary"
      sx={{ fontSize: 14 }}
    >
      {item.type === 'work' ? item.company : item.institution}
    </Typography>
  </Box>
);

const Timeline = () => (
  <Column>
    <TextReveal>
      <Typography
        sx={(t) => ({
          background:
            t.palette.mode === 'dark'
              ? 'linear-gradient(120deg, rgb(255, 255, 255) 0%, rgb(148, 163, 184) 100%)'
              : 'linear-gradient(120deg, rgb(30, 30, 46) 0%, rgb(80, 80, 100) 100%)',
          backgroundClip: 'text',
          fontWeight: 700,
          mb: 2,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        })}
        variant="h5"
      >
        Timeline
      </Typography>
    </TextReveal>
    <Box sx={{ width: '100%' }}>
      {timeline.map((item) => (
        <TimelineItemComponent
          item={item}
          key={`${item.type}-${item.position}-${item.startDate}`}
        />
      ))}
    </Box>
  </Column>
);

export default Timeline;
