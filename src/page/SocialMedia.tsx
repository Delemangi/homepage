import { Box, Popover, Tooltip, Typography } from '@mui/material';
import { type MouseEvent, useCallback, useState } from 'react';

import MediaButton from '../components/MediaButton';
import RowContainer from '../components/RowContainer';
import DiscordIcon from '../icons/DiscordIcon';
import GitHubIcon from '../icons/GitHubIcon';
import LinkedInIcon from '../icons/LinkedInIcon';
import MailIcon from '../icons/MailIcon';
import SteamIcon from '../icons/SteamIcon';

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
    <RowContainer sx={{ animation: 'fadeInMoveUp 1.5s ease-in-out both' }}>
      <Tooltip title="Mail">
        <MediaButton href="mailto:milev.stefan@gmail.com">
          <MailIcon />
        </MediaButton>
      </Tooltip>

      <Tooltip title="Discord">
        <MediaButton onClick={handleDiscordOnClick}>
          <DiscordIcon />
        </MediaButton>
      </Tooltip>
      <Popover
        anchorEl={anchorElement}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        onClose={() => {
          setAnchorElement(undefined);
        }}
        open={Boolean(anchorElement)}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
      >
        <Box>
          <Typography
            sx={{
              backgroundColor: 'rgba(106,130,251,0.12)', // subtle blue accent
              borderRadius: 1,
              color: 'inherit',
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
              px: 2,
              py: 0.5,
            }}
          >
            Copied!
          </Typography>
        </Box>
      </Popover>

      <Tooltip title="GitHub">
        <MediaButton href="https://github.com/Delemangi/">
          <GitHubIcon />
        </MediaButton>
      </Tooltip>

      <Tooltip title="Steam">
        <MediaButton href="https://steamcommunity.com/id/delemangi/">
          <SteamIcon />
        </MediaButton>
      </Tooltip>

      <Tooltip title="LinkedIn">
        <MediaButton href="https://www.linkedin.com/in/stefan-milev/">
          <LinkedInIcon />
        </MediaButton>
      </Tooltip>
    </RowContainer>
  );
};

export default SocialMedia;
