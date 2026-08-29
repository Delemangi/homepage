import { Box, Typography, useTheme } from '@mui/material';
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import CopyFeedbackPopover, {
  type CopyFeedback,
} from '../components/CopyFeedbackPopover';
import FloatingBar from '../components/FloatingBar';
import RowContainer from '../components/RowContainer';
import SocialMediaButton from '../components/SocialMediaButton';
import DiscordIcon from '../icons/DiscordIcon';
import GitHubIcon from '../icons/GitHubIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import MailIcon from '../icons/MailIcon';
import MonkeyTypeIcon from '../icons/MonkeyTypeIcon';
import SteamIcon from '../icons/SteamIcon';

const COPY_ICONS = [
  {
    icon: MailIcon,
    onClick: 'mail',
    title: 'Copy email address',
  },
  {
    icon: DiscordIcon,
    onClick: 'discord',
    title: 'Copy Discord username',
  },
] as const;

type CopyTarget = (typeof COPY_ICONS)[number]['onClick'];

const COPY_DETAILS = {
  discord: {
    failureMessage: 'Couldn’t copy Discord username. Try again.',
    successMessage: 'Discord username copied',
    text: 'delemangi',
  },
  mail: {
    failureMessage: 'Couldn’t copy email address. Try again.',
    successMessage: 'Email address copied',
    text: 'milev.stefan@gmail.com',
  },
} as const satisfies Record<
  CopyTarget,
  Readonly<{
    failureMessage: string;
    successMessage: string;
    text: string;
  }>
>;

const LINK_ICONS = [
  {
    href: 'https://discord.gg/7Fw53MdbUP',
    icon: DiscordIcon,
    title: 'Open Discord server',
  },
  {
    href: 'https://github.com/Delemangi/',
    icon: GitHubIcon,
    title: 'Open GitHub profile',
  },
  {
    href: 'https://steamcommunity.com/id/delemangi/',
    icon: SteamIcon,
    title: 'Open Steam profile',
  },
  {
    href: 'https://www.linkedin.com/in/stefan-milev/',
    icon: LinkedInIcon,
    title: 'Open LinkedIn profile',
  },
  {
    href: 'https://monkeytype.com/profile/Delemangi',
    icon: MonkeyTypeIcon,
    title: 'Open Monkeytype profile',
  },
] as const;

const getTooltipSlotProps = () => ({
  arrow: {
    sx: {
      '&:before': { transform: 'rotate(45deg) scale(0.66)' },
      color: 'rgba(106, 130, 251, 0.12)',
      height: 8,
      width: 8,
    },
  },
  popper: {
    modifiers: [{ name: 'offset', options: { offset: [0, -9] } }],
  },
  tooltip: () => ({
    sx: (t: { palette: { mode: string; text: { primary: string } } }) => ({
      backgroundColor: 'rgba(106, 130, 251, 0.12)',
      borderRadius: 1,
      boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.18)',
      color: t.palette.mode === 'dark' ? 'white' : t.palette.text.primary,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1,
      m: 0,
      px: 1,
      py: 0.5,
    }),
  }),
});

const FLOATING_BAR_SX = {
  flexWrap: 'wrap',
  gap: 1,
  justifyContent: 'center',
  padding: '6px 10px',
  position: 'static',
  right: 'auto',
  top: 'auto',
  zIndex: 'auto',
} as const;

const getSectionLabelSx = (color: string) =>
  ({
    color,
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  }) as const;

const SocialMedia = () => {
  const theme = useTheme();
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>();
  const copyAttemptRef = useRef(0);
  const feedbackTimeoutRef = useRef<null | ReturnType<
    typeof globalThis.setTimeout
  >>(null);

  useEffect(
    () => () => {
      copyAttemptRef.current += 1;

      if (feedbackTimeoutRef.current !== null) {
        clearTimeout(feedbackTimeoutRef.current);
      }
    },
    [],
  );

  const scheduleFeedbackReset = useCallback((attempt: number) => {
    const timeout = setTimeout(() => {
      if (attempt === copyAttemptRef.current) {
        setCopyFeedback(undefined);
      }

      if (feedbackTimeoutRef.current === timeout) {
        feedbackTimeoutRef.current = null;
      }
    }, 1_500);

    feedbackTimeoutRef.current = timeout;
  }, []);

  const getCopyHandler = useCallback(
    (type: CopyTarget) => async (event: MouseEvent<HTMLButtonElement>) => {
      const anchorElement = event.currentTarget;
      const details = COPY_DETAILS[type];
      const attempt = copyAttemptRef.current + 1;

      anchorElement.focus();
      copyAttemptRef.current = attempt;
      setCopyFeedback(undefined);

      if (feedbackTimeoutRef.current !== null) {
        clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = null;
      }

      try {
        await navigator.clipboard.writeText(details.text);

        if (attempt !== copyAttemptRef.current) return;

        setCopyFeedback({
          anchorElement,
          message: details.successMessage,
          status: 'success',
        });
      } catch {
        if (attempt !== copyAttemptRef.current) return;

        setCopyFeedback({
          anchorElement,
          message: details.failureMessage,
          status: 'error',
        });
      }

      scheduleFeedbackReset(attempt);
    },
    [scheduleFeedbackReset],
  );

  return (
    <RowContainer sx={{ gap: 2, marginBottom: 2, marginTop: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography sx={getSectionLabelSx(theme.palette.info.main)}>
          Contact
        </Typography>
        <FloatingBar sx={FLOATING_BAR_SX}>
          {COPY_ICONS.map((item) => (
            <SocialMediaButton
              icon={item.icon}
              key={item.title}
              onClick={getCopyHandler(item.onClick)}
              title={item.title}
              tooltipSlotProps={getTooltipSlotProps()}
              type="copy"
            />
          ))}
        </FloatingBar>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        <Typography sx={getSectionLabelSx(theme.palette.primary.main)}>
          Elsewhere
        </Typography>
        <FloatingBar sx={FLOATING_BAR_SX}>
          {LINK_ICONS.map((item) => (
            <SocialMediaButton
              href={item.href}
              icon={item.icon}
              key={item.title}
              title={item.title}
              tooltipSlotProps={getTooltipSlotProps()}
              type="link"
            />
          ))}
        </FloatingBar>
      </Box>

      <CopyFeedbackPopover feedback={copyFeedback} />
    </RowContainer>
  );
};

export default SocialMedia;
