import { IconButton, Tooltip } from '@mui/material';

import GitHubIcon from '../icons/GitHubIcon';

const SourceLinkButton = () => (
  <Tooltip title="Source on GitHub">
    <IconButton
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
