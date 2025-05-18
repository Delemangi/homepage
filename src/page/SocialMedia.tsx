import { Box, Popover, Tooltip, Typography } from '@mui/material';
import { type MouseEvent, useCallback, useState } from 'react';

import MediaButton from '../components/MediaButton';
import RowContainer from '../components/RowContainer';
import DiscordIcon from '../icons/DiscordIcon';
import GitHubIcon from '../icons/GitHubIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import MailIcon from '../icons/MailIcon';
import SteamIcon from '../icons/SteamIcon';

const socialIcons = [
  {
    href: 'mailto:milev.stefan@gmail.com',
    icon: MailIcon,
    title: 'Mail',
  },
  {
    icon: DiscordIcon,
    onClick: 'discord',
    title: 'Discord',
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
];

const SocialMedia = () => {
  const [anchorElement, setAnchorElement] = useState<HTMLElement>();

  const handleDiscordOnClick = useCallback(
    async (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorElement(event.currentTarget);
      await navigator.clipboard.writeText('delemangi');
      setTimeout(() => {
        setAnchorElement(undefined);
      }, 1_500);
    },
    [],
  );

  return (
    <RowContainer>
      {socialIcons.map((item, i) => {
        const isDiscord = item.onClick === 'discord';
        const Icon = item.icon;
        return (
          <Tooltip
            key={item.title}
            slotProps={{
              tooltip: () => ({
                sx: {
                  backgroundColor: 'rgba(106, 130, 251, 0.12)',
                  borderRadius: 1,
                  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.18)',
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: 1,
                },
              }),
            }}
            title={item.title}
          >
            <MediaButton
              href={item.href}
              onClick={isDiscord ? handleDiscordOnClick : undefined}
              sx={{
                '&:hover': {
                  scale: 1.2,
                },
                animation: `fadeInStaggered 0.7s cubic-bezier(.4, 1, .4, 1) both`,
                animationDelay: `${i * 0.09 + 0.2}s`,
                transition: 'all 0.2s, color 0.3s ease-in-out',
              }}
            >
              <Icon />
            </MediaButton>
          </Tooltip>
        );
      })}

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
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
            }}
          >
            Copied!
          </Typography>
        </Box>
      </Popover>
    </RowContainer>
  );
};

export default SocialMedia;
