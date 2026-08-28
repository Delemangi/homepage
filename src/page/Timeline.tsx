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
    position: 'BSc in Computer Science',
    startYear: '2020',
    type: 'education',
  },
  {
    endYear: '2025',
    organization: 'Faculty of Computer Science and Engineering',
    position: 'MSc in Computer Science',
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
    sx={(theme) => ({
      '&:last-child': {
        mb: 0,
      },
      backgroundColor:
        theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.025)'
          : 'rgba(35, 25, 42, 0.025)',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 0.75,
      mb: 1.5,
      padding: 2,
    })}
  >
    <Box
      sx={{
        alignItems: 'flex-start',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.5,
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
          marginLeft: 'auto',
          whiteSpace: 'nowrap',
        }}
      >
        {`${item.startYear}–${item.endYear}`}
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
        component="h2"
        id="timeline-heading"
        sx={(t) => ({
          color: t.palette.text.primary,
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 700,
          letterSpacing: '-0.035em',
          lineHeight: 1.12,
          mb: 2.5,
        })}
      >
        Experience & education
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
