import { Box, Popover, Typography, useTheme } from '@mui/material';
import { type MouseEvent, useCallback, useState } from 'react';

import FloatingBar from '../components/FloatingBar';
import RowContainer from '../components/RowContainer';
import SocialMediaButton from '../components/SocialMediaButton';
import DiscordIcon from '../icons/DiscordIcon';
import GitHubIcon from '../icons/GitHubIcon';
import InstagramIcon from '../icons/InstagramIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import MailIcon from '../icons/MailIcon';
import MonkeyTypeIcon from '../icons/MonkeyTypeIcon';
import SteamIcon from '../icons/SteamIcon';

const COPY_ICONS = [
  {
    icon: MailIcon,
    onClick: 'mail',
    title: 'Mail',
  },
  {
    icon: DiscordIcon,
    onClick: 'discord',
    title: 'Discord Username',
  },
] as const;

const LINK_ICONS = [
  {
    href: 'https://discord.gg/7Fw53MdbUP',
    icon: DiscordIcon,
    title: 'Discord Server',
  },
  {
    href: 'https://github.com/Delemangi/',
    icon: GitHubIcon,
    title: 'GitHub',
  },
  {
    href: 'https://steamcommunity.com/id/delemangi/',
    icon: SteamIcon,
    title: 'Steam',
  },
  {
    href: 'https://www.linkedin.com/in/stefan-milev/',
    icon: LinkedInIcon,
    title: 'LinkedIn',
  },
  {
    href: 'https://www.instagram.com/stefan_milev_/',
    icon: InstagramIcon,
    title: 'Instagram',
  },
  {
    href: 'https://monkeytype.com/profile/Delemangi',
    icon: MonkeyTypeIcon,
    title: 'Monkeytype',
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

const SocialMedia = () => {
  const theme = useTheme();
  const [anchorElement, setAnchorElement] = useState<HTMLElement>();

  const handleCopyOnClick = useCallback(
    (text: string) => async (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget);
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        setAnchorElement(undefined);
      }, 1_500);
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
          sx={{
            color: theme.palette.mode === 'dark' ? '#00ffd0' : '#f4b860',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 1.5,
            opacity: 0.6,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Contact
        </Typography>
        <FloatingBar
          sx={{
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            padding: '6px 10px',
            position: 'static',
            right: 'auto',
            top: 'auto',
            zIndex: 'auto',
          }}
        >
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
          sx={{
            color: theme.palette.mode === 'dark' ? '#6a82fb' : '#ee3f71',
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: 1.5,
            opacity: 0.6,
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          Profiles
        </Typography>
        <FloatingBar
          sx={{
            flexWrap: 'wrap',
            gap: 1,
            justifyContent: 'center',
            padding: '6px 10px',
            position: 'static',
            right: 'auto',
            top: 'auto',
            zIndex: 'auto',
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
        </FloatingBar>
      </Box>

      <Popover
        anchorEl={anchorElement}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        disableRestoreFocus
        onClose={() => {
          setAnchorElement(undefined);
        }}
        open={Boolean(anchorElement)}
        slotProps={{
          paper: () => ({
            backgroundColor: 'rgba(106, 130, 251, 0.12)',
            borderRadius: 1,
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.18)',
            color: 'inherit',
            px: 2,
            py: 0.5,
          }),
        }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Box
          sx={{
            backgroundColor: 'rgba(0, 255, 208, 0.12)',
            borderRadius: 1,
            boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.18)',
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
            px: 2,
            py: 0.5,
          }}
        >
          <Typography component="span">Copied!</Typography>
        </Box>
      </Popover>
    </RowContainer>
  );
};

export default SocialMedia;
