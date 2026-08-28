import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Box,
  type BoxProps,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useRef } from 'react';

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

type ProjectCardPointerEvent = Parameters<
  NonNullable<BoxProps['onPointerMove']>
>[0];

const useHighlightTracking = () => {
  const highlightBoundsRef = useRef<DOMRect>(null);

  const clearHighlight = (event: ProjectCardPointerEvent) => {
    highlightBoundsRef.current = null;
    event.currentTarget.style.removeProperty('--highlight-x');
    event.currentTarget.style.removeProperty('--highlight-y');
  };

  const updateHighlight = (event: ProjectCardPointerEvent) => {
    const rect =
      highlightBoundsRef.current ?? event.currentTarget.getBoundingClientRect();
    highlightBoundsRef.current = rect;
    event.currentTarget.style.setProperty(
      '--highlight-x',
      `${event.clientX - rect.left}px`,
    );
    event.currentTarget.style.setProperty(
      '--highlight-y',
      `${event.clientY - rect.top}px`,
    );
  };

  return { clearHighlight, updateHighlight };
};

const ProjectCard = ({
  description,
  hrefCode,
  hrefLive,
  tech = emptyTech,
  title,
}: Props) => {
  const { clearHighlight, updateHighlight } = useHighlightTracking();
  const primaryHref = hrefLive ?? hrefCode;
  const clickable = Boolean(primaryHref);

  return (
    <Box
      onPointerEnter={updateHighlight}
      onPointerLeave={clearHighlight}
      onPointerMove={updateHighlight}
      sx={(t) => ({
        '&::before': {
          background:
            t.palette.mode === 'dark'
              ? 'radial-gradient(circle at var(--highlight-x, 20%) var(--highlight-y, 0%), rgba(139,157,255,.18), transparent 42%)'
              : 'radial-gradient(circle at var(--highlight-x, 20%) var(--highlight-y, 0%), rgba(181,25,77,.10), transparent 42%)',
          content: "''",
          inset: 0,
          opacity: 0.5,
          pointerEvents: 'none',
          position: 'absolute',
          transition: 'opacity 220ms ease-out',
        },
        '&:active': {
          transform: 'translateY(-1px) scale(0.995)',
        },
        '&:has(a:focus-visible)': {
          '&::before': { opacity: 1 },
          outline: `2px solid ${t.palette.primary.main}`,
          outlineOffset: 3,
          transform: 'translateY(-2px)',
        },
        '&:hover': {
          '&::before': { opacity: 1 },
          boxShadow:
            t.palette.mode === 'dark'
              ? '0 28px 70px rgba(0, 0, 0, 0.30), 0 0 0 1px rgba(139,157,255,.12), inset 0 1px 0 rgba(255,255,255,.07)'
              : '0 28px 70px rgba(61, 28, 43, 0.12), 0 0 0 1px rgba(181,25,77,.10), inset 0 1px 0 rgba(255,255,255,.9)',
          transform: 'translateY(-4px)',
        },
        '@media (prefers-reduced-motion: reduce)': {
          '&:active, &:has(a:focus-visible), &:hover': { transform: 'none' },
          transition: 'none',
        },
        backgroundColor:
          t.palette.mode === 'dark'
            ? 'rgba(17, 20, 28, 0.76)'
            : 'rgba(255, 255, 255, 0.76)',
        border: `1px solid ${
          t.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.08)'
            : 'rgba(0, 0, 0, 0.08)'
        }`,
        borderRadius: 3,
        boxShadow:
          t.palette.mode === 'dark'
            ? '0 20px 54px rgba(0, 0, 0, 0.22), inset 0 1px 0 rgba(255,255,255,.05)'
            : '0 20px 54px rgba(61, 28, 43, 0.08), inset 0 1px 0 rgba(255,255,255,.85)',
        cursor: 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        height: '100%',
        overflow: 'hidden',
        padding: { md: 3, xs: 2.5 },
        position: 'relative',
        transition:
          'transform 220ms cubic-bezier(.2,.8,.2,1), box-shadow 220ms ease, background-color 220ms ease, border-color 220ms ease',
      })}
    >
      <Box
        sx={{
          alignItems: 'flex-start',
          display: 'flex',
          gap: 1,
          justifyContent: 'space-between',
        }}
      >
        <Typography
          component="h3"
          sx={(t) => ({
            background:
              t.palette.mode === 'dark'
                ? 'linear-gradient(90deg, #f4f6ff 0%, #8b9dff 100%)'
                : `linear-gradient(90deg, ${t.palette.text.primary} 0%, ${t.palette.primary.main} 100%)`,
            backgroundClip: 'text',
            color: 'transparent',
            flex: 1,
            fontWeight: 700,
            letterSpacing: '-0.025em',
            minWidth: 0,
            mr: 1,
          })}
          variant="h6"
        >
          {title}
        </Typography>
        {clickable ? (
          <IconButton
            aria-label={`Open ${title}`}
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
        sx={{
          color: 'text.secondary',
          fontSize: 15,
          lineHeight: 1.7,
          maxWidth: '68ch',
          position: 'relative',
        }}
      >
        {description}
      </Typography>

      <Box sx={{ flexGrow: 1 }} />

      {tech.length > 0 ? (
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: 'wrap' }}
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
          sx={{
            '& a': {
              alignItems: 'center',
              display: 'inline-flex',
              minHeight: { sm: 'auto', xs: 44 },
            },
            gap: 2,
            marginTop: 0.5,
          }}
        >
          {hrefLive ? (
            <UnderlinedLink
              href={hrefLive}
              rel="noopener noreferrer"
              target="_blank"
            >
              Live site
            </UnderlinedLink>
          ) : null}
          {hrefCode ? (
            <UnderlinedLink
              href={hrefCode}
              rel="noopener noreferrer"
              target="_blank"
            >
              Source code
            </UnderlinedLink>
          ) : null}
        </Stack>
      ) : null}
    </Box>
  );
};

export default ProjectCard;
