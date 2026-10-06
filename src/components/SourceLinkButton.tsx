import { IconButton, Tooltip } from '@mui/material';

import GitHubIcon from '../icons/GitHubIcon';

export default function SourceLinkButton() {
  return (
    <Tooltip title="View homepage source on GitHub">
      <IconButton
        aria-label="View homepage source on GitHub"
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
}
