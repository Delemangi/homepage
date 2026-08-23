import { IconButton, Tooltip } from '@mui/material';

import GitHubIcon from '../icons/GitHubIcon';

const SourceLinkButton = () => (
  <Tooltip title="View source on GitHub">
    <IconButton
      aria-label="View source on GitHub"
      component="a"
      href="https://github.com/Delemangi/homepage"
      rel="noopener noreferrer"
      size="small"
      target="_blank"
    >
      <GitHubIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

export default SourceLinkButton;
