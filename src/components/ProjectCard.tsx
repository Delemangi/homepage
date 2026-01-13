import type {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
} from 'react';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Box, IconButton, Stack, Typography } from '@mui/material';

import SkillChip from '../page/SkillChip';
import UnderlinedLink from './UnderlinedLink';

export type Project = {
  readonly description: string;
  readonly hrefCode?: string;
  readonly hrefLive?: string;
  readonly tech?: string[];
  readonly title: string;
};

type Props = Readonly<Project>;

const emptyTech: string[] = [];

const ProjectCard = ({
  description,
  hrefCode,
  hrefLive,
  tech = emptyTech,
  title,
}: Props) => {
  const primaryHref = hrefLive ?? hrefCode;
  const clickable = Boolean(primaryHref);

  const handleCardClick = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (!primaryHref) return;

    const target = e.target as HTMLElement;

    if (target.closest('a')) return;

    window.open(primaryHref, '_blank', 'noopener,noreferrer');
  };
  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (!primaryHref) return;

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.open(primaryHref, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <Box
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      role={clickable ? 'link' : undefined}
      sx={(t) => ({
        '&:hover': {
          boxShadow:
            t.palette.mode === 'dark'
              ? '0 8px 26px rgba(106, 130, 251, 0.18)'
              : '0 8px 26px rgba(238, 63, 113, 0.14)',
          transform: 'translateY(-2px) scale(1.01)',
        },
        backgroundColor:
          t.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.09)'
            : 'rgba(0, 0, 0, 0.09)',
        border: `1px solid ${
          t.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.08)'
        }`,
        borderRadius: 2,
        boxShadow:
          t.palette.mode === 'dark'
            ? '0 1px 0 rgba(255, 255, 255, 0.04)'
            : '0 1px 0 rgba(0, 0, 0, 0.05)',
        cursor: clickable ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        height: '100%',
        padding: 2,
        transition:
          'transform 200ms cubic-bezier(.2,.8,.2,1), box-shadow 200ms ease, background-color 200ms ease, border-color 200ms ease',
      })}
      tabIndex={clickable ? 0 : undefined}
    >
      <Box
        alignItems="flex-start"
        display="flex"
        gap={1}
        justifyContent="space-between"
      >
        <Typography
          sx={(t) => ({
            background:
              t.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #6a82fb 0%, #ff63e9 100%)'
                : 'linear-gradient(90deg, #ee3f71 0%, #ffc0cd 50%, #ee3f71 100%)',
            backgroundClip: 'text',
            color: 'transparent',
            flex: 1,
            fontWeight: 700,
            letterSpacing: 0.2,
            minWidth: 0,
            mr: 1,
          })}
          variant="h6"
        >
          {title}
        </Typography>
        {clickable ? (
          <IconButton
            component="a"
            href={primaryHref ?? undefined}
            onClickCapture={(e) => {
              e.stopPropagation();
            }}
            rel="noopener noreferrer"
            size="small"
            sx={(t) => ({
              '&:hover': { color: t.palette.text.primary },
              alignSelf: 'flex-start',
              color: 'text.secondary',
            })}
            target="_blank"
          >
            <OpenInNewIcon fontSize="small" />
          </IconButton>
        ) : null}
      </Box>

      <Typography
        color="textSecondary"
        fontSize={14}
      >
        {description}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      {tech.length > 0 ? (
        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={1}
          useFlexGap
        >
          {tech.map((label) => (
            <SkillChip
              key={label}
              label={label}
            />
          ))}
        </Stack>
      ) : null}

      {(hrefCode ?? hrefLive) ? (
        <Stack
          direction="row"
          gap={2}
          marginTop={0.5}
        >
          {hrefLive ? (
            <UnderlinedLink
              href={hrefLive}
              target="_blank"
            >
              Live
            </UnderlinedLink>
          ) : null}
          {hrefCode ? (
            <UnderlinedLink
              href={hrefCode}
              target="_blank"
            >
              Code
            </UnderlinedLink>
          ) : null}
        </Stack>
      ) : null}
    </Box>
  );
};

export default ProjectCard;
