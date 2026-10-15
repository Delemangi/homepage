import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import TextReveal from '../components/TextReveal';
import UnderlinedLink from '../components/UnderlinedLink';
import { TIMELINE_BADGE_COLORS } from './timelineBadgeColors';

type TimelineItem = {
  readonly endYear: string;
  readonly organization: string;
  readonly organizationHref: string;
  readonly position: string;
  readonly startYear: string;
  readonly type: 'education' | 'work';
};

const isCurrent = (item: TimelineItem) => item.endYear === 'Present';

const timeline: TimelineItem[] = [
  {
    endYear: 'Present',
    organization: 'CodeChem',
    organizationHref: 'https://codechem.com',
    position: 'Software Engineer',
    startYear: '2022',
    type: 'work',
  },
  {
    endYear: '2024',
    organization: 'Faculty of Computer Science and Engineering',
    organizationHref: 'https://www.finki.ukim.mk/en',
    position: 'BSc in Computer Science',
    startYear: '2020',
    type: 'education',
  },
  {
    endYear: '2025',
    organization: 'Faculty of Computer Science and Engineering',
    organizationHref: 'https://www.finki.ukim.mk/en',
    position: 'MSc in Data Science',
    startYear: '2024',
    type: 'education',
  },
];

const TimelineItemComponent = ({ item }: { readonly item: TimelineItem }) => (
  <Box
    sx={(theme) => ({
      '&::before': {
        backgroundColor: isCurrent(item)
          ? theme.palette.primary.main
          : theme.palette.divider,
        border: `2px solid ${theme.palette.background.paper}`,
        borderRadius: '50%',
        content: '""',
        height: 8,
        left: 0,
        position: 'absolute',
        top: 'calc(30px + 0.45em)',
        width: 8,
        zIndex: 1,
      },
      minWidth: 0,
      pl: 2.5,
      position: 'relative',
      py: 1.5,
    })}
  >
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1.25,
        justifyContent: 'space-between',
      }}
    >
      <Typography
        color="textSecondary"
        component="p"
        sx={{
          fontFamily: 'Kode Mono, ui-monospace, monospace',
          fontSize: 11,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.6,
          whiteSpace: 'nowrap',
        }}
      >
        {`${item.startYear}–${item.endYear}`}
      </Typography>
      {isCurrent(item) && (
        <Typography
          component="span"
          sx={(theme) => ({
            color: theme.palette.primary.main,
            fontSize: 11,
            fontWeight: 650,
            lineHeight: 1.5,
            whiteSpace: 'nowrap',
          })}
        >
          Current
        </Typography>
      )}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        component="h3"
        sx={{
          color: 'text.primary',
          fontSize: 17,
          fontWeight: item.type === 'work' ? 700 : 600,
          lineHeight: 1.35,
        }}
      >
        {item.position}
      </Typography>
      <Typography
        color="text.secondary"
        sx={{
          fontSize: 14,
          lineHeight: 1.55,
          mt: 0.5,
        }}
      >
        <UnderlinedLink
          href={item.organizationHref}
          rel="noopener noreferrer"
          target="_blank"
        >
          {item.organization}
        </UnderlinedLink>
      </Typography>
      <Box
        component="span"
        sx={(t) => {
          const mode = t.palette.mode === 'dark' ? 'dark' : 'light';

          return {
            backgroundColor: TIMELINE_BADGE_COLORS[item.type][mode].background,
            borderRadius: 1,
            color: TIMELINE_BADGE_COLORS[item.type][mode].foreground,
            display: 'inline-block',
            fontSize: 11,
            lineHeight: 1.45,
            mt: 1,
            px: 1,
            py: 0.25,
          };
        }}
      >
        {item.type === 'work' ? 'Experience' : 'Education'}
      </Box>
    </Box>
  </Box>
);

export default function Timeline() {
  return (
    <Column>
      <TextReveal>
        <Typography
          component="h2"
          id="timeline-heading"
          sx={(t) => ({
            color: t.palette.text.primary,
            fontSize: 'clamp(26px, 3vw, 32px)',
            fontWeight: 700,
            letterSpacing: '-0.035em',
            lineHeight: 1.12,
            mb: 2,
          })}
        >
          Experience & education
        </Typography>
      </TextReveal>
      <Box
        component="ul"
        sx={(theme) => ({
          '&::before': {
            borderLeft: `1px solid ${theme.palette.divider}`,
            bottom: 8,
            content: '""',
            left: 4,
            position: 'absolute',
            top: 8,
          },
          listStyle: 'none',
          m: 0,
          p: 0,
          position: 'relative',
          width: '100%',
        })}
      >
        {timeline.map((item) => (
          <Box
            component="li"
            key={`${item.type}-${item.position}-${item.startYear}`}
            sx={{
              '&:not(:last-child)': {
                borderBottom: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            <TimelineItemComponent item={item} />
          </Box>
        ))}
      </Box>
    </Column>
  );
}
