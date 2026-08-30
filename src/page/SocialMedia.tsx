import { Box } from '@mui/material';
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
import SocialMediaButton from '../components/SocialMediaButton';
import DiscordIcon from '../icons/DiscordIcon';
import GitHubIcon from '../icons/GitHubIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import MailIcon from '../icons/MailIcon';

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
    href: 'https://github.com/Delemangi/',
    icon: GitHubIcon,
    title: 'Open GitHub profile',
  },
  {
    href: 'https://www.linkedin.com/in/stefan-milev/',
    icon: LinkedInIcon,
    title: 'Open LinkedIn profile',
  },
] as const;

const getTooltipSlotProps = () => ({
  arrow: {
    sx: {
      '&:before': { transform: 'rotate(45deg) scale(0.66)' },
      color: (theme: { palette: { mode: string } }) =>
        theme.palette.mode === 'dark'
          ? 'rgba(23, 27, 37, 0.96)'
          : 'rgba(255, 255, 255, 0.96)',
      height: 8,
      width: 8,
    },
  },
  popper: {
    modifiers: [{ name: 'offset', options: { offset: [0, -9] } }],
  },
  tooltip: () => ({
    sx: (t: { palette: { mode: string; text: { primary: string } } }) => ({
      backgroundColor:
        t.palette.mode === 'dark'
          ? 'rgba(23, 27, 37, 0.96)'
          : 'rgba(255, 255, 255, 0.96)',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1,
      boxShadow:
        t.palette.mode === 'dark'
          ? '0 8px 24px rgba(0, 0, 0, 0.32)'
          : '0 8px 24px rgba(61, 28, 43, 0.12)',
      color: t.palette.text.primary,
      fontSize: 14,
      fontWeight: 600,
      letterSpacing: 1,
      m: 0,
      px: 1,
      py: 0.5,
    }),
  }),
});

const SocialMedia = () => {
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
    <Box
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.5,
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          gap: 0.25,
        }}
      >
        {COPY_ICONS.map((item) => (
          <SocialMediaButton
            icon={item.icon}
            key={item.title}
            onClick={getCopyHandler(item.onClick)}
            title={item.title}
            tooltipSlotProps={getTooltipSlotProps()}
            tooltipTitle={copyFeedback === undefined ? item.title : ''}
            type="copy"
          />
        ))}
      </Box>
      <Box
        aria-hidden="true"
        sx={{
          backgroundColor: 'divider',
          height: 20,
          marginX: 1,
          width: '1px',
        }}
      />
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexWrap: 'wrap',
          gap: 0.25,
        }}
      >
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
      </Box>
      <CopyFeedbackPopover feedback={copyFeedback} />
      <Box
        aria-live="polite"
        role="status"
        sx={{
          border: 0,
          clip: 'rect(0 0 0 0)',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          padding: 0,
          position: 'absolute',
          whiteSpace: 'nowrap',
          width: '1px',
        }}
      >
        {copyFeedback?.message}
      </Box>
    </Box>
  );
};

export default SocialMedia;
