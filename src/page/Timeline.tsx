import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import TextReveal from '../components/TextReveal';

export type TimelineItem = {
  readonly endYear: string;
  readonly organization: string;
  readonly position: string;
  readonly startYear: string;
  readonly type: 'education' | 'work';
};

const timeline: TimelineItem[] = [
  {
    endYear: '2024',
    organization: 'Faculty of Computer Science and Engineering',
    position: 'BSc, Computer Science',
    startYear: '2020',
    type: 'education',
  },
  {
    endYear: '2025',
    organization: 'Faculty of Computer Science and Engineering',
    position: 'MSc, Computer Science',
    startYear: '2024',
    type: 'education',
  },
  {
    endYear: 'Present',
    organization: 'CodeChem',
    position: 'Software Engineer',
    startYear: '2022',
    type: 'work',
  },
];

const TIMELINE_COLORS = {
  education: {
    dark: 'rgb(94, 234, 212)',
    light: 'rgb(20, 184, 166)',
  },
  work: {
    dark: 'rgb(106, 130, 251)',
    light: 'rgb(238, 63, 113)',
  },
} as const;

const TIMELINE_BG_COLORS = {
  education: {
    dark: 'rgba(94, 234, 212, 0.15)',
    light: 'rgba(20, 184, 166, 0.15)',
  },
  work: {
    dark: 'rgba(106, 130, 251, 0.2)',
    light: 'rgba(238, 63, 113, 0.15)',
  },
} as const;

const TimelineItemComponent = ({ item }: { readonly item: TimelineItem }) => (
  <Box
    sx={{
      '&:last-child': {
        mb: 0,
      },
      borderColor: (t) => {
        const mode = t.palette.mode === 'dark' ? 'dark' : 'light';

        return item.type === 'work'
          ? t.palette.divider
          : TIMELINE_COLORS[item.type][mode];
      },
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
            backgroundColor: (t) => {
              const mode = t.palette.mode === 'dark' ? 'dark' : 'light';

              return TIMELINE_BG_COLORS[item.type][mode];
            },
            borderRadius: 1,
            color: (t) => {
              const mode = t.palette.mode === 'dark' ? 'dark' : 'light';

              return TIMELINE_COLORS[item.type][mode];
            },
            fontSize: 12,
            px: 1.25,
            py: 0.4,
          }}
        >
          {item.type === 'work' ? 'Experience' : 'Education'}
        </Box>
      </Box>
      <Typography
        color="textSecondary"
        sx={{
          fontSize: 13,
          ml: 2,
          whiteSpace: 'nowrap',
        }}
      >
        {`${item.startYear} - ${item.endYear}`}
      </Typography>
    </Box>
    <Typography
      color="textSecondary"
      sx={{ fontSize: 14 }}
    >
      {item.organization}
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
          key={`${item.type}-${item.position}-${item.startYear}`}
        />
      ))}
    </Box>
  </Column>
);

export default Timeline;
