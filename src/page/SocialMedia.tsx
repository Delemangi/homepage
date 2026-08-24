import {
  Alert,
  Box,
  Portal,
  Snackbar,
  Typography,
  useTheme,
} from '@mui/material';
import { type MouseEvent, useCallback, useRef, useState } from 'react';

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

type CopyFeedback = Readonly<{
  id: number;
  kind: 'error' | 'success';
  message: string;
}>;

const SocialMedia = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback>();
  const feedbackIdRef = useRef(0);

  const handleCopyOnClick = useCallback(
    (text: string) => async (event: MouseEvent<HTMLButtonElement>) => {
      event.currentTarget.focus();
      let kind: CopyFeedback['kind'];
      let message: string;

      try {
        await navigator.clipboard.writeText(text);
        kind = 'success';
        message = 'Copied to clipboard';
      } catch {
        kind = 'error';
        message = 'Could not copy to clipboard';
      }

      feedbackIdRef.current += 1;
      setCopyFeedback({ id: feedbackIdRef.current, kind, message });
    },
    [],
  );

  const getCopyHandler = useCallback(
    (type: 'discord' | 'mail') => {
      const text = type === 'discord' ? 'delemangi' : 'milev.stefan@gmail.com';

      return handleCopyOnClick(text);
    },
    [handleCopyOnClick],
  );

  return (
    <RowContainer sx={{ gap: 2, marginBottom: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5,
        }}
      >
        <Typography
          sx={getSectionLabelSx(isDark ? '#00ffd0' : theme.palette.info.main)}
        >
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
          gap: 0.5,
        }}
      >
        <Typography
          sx={getSectionLabelSx(
            isDark ? '#6a82fb' : theme.palette.primary.main,
          )}
        >
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

      <Portal>
        <Snackbar
          anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
          autoHideDuration={1_500}
          key={copyFeedback?.id}
          onClose={(_, reason) => {
            if (reason !== 'clickaway') setCopyFeedback(undefined);
          }}
          open={copyFeedback !== undefined}
        >
          <Alert
            role="status"
            severity={copyFeedback?.kind ?? 'success'}
            sx={{
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.24)',
              fontWeight: 600,
            }}
            variant="filled"
          >
            {copyFeedback?.message}
          </Alert>
        </Snackbar>
      </Portal>
    </RowContainer>
  );
};

export default SocialMedia;
