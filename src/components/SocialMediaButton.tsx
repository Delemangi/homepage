import type { ComponentType, MouseEventHandler } from 'react';

import { Tooltip, type TooltipProps } from '@mui/material';

import MediaButton from './MediaButton';

type SocialMediaButtonProps = {
  readonly href?: string;
  readonly icon: ComponentType;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly title: string;
  readonly tooltipSlotProps?: TooltipProps['slotProps'];
  readonly tooltipTitle?: string;
};

const SocialMediaButton = ({
  href,
  icon: Icon,
  onClick,
  title,
  tooltipSlotProps,
  tooltipTitle = title,
}: SocialMediaButtonProps) => (
  <Tooltip
    arrow
    placement="bottom"
    slotProps={tooltipSlotProps}
    title={tooltipTitle}
  >
    <MediaButton
      aria-label={title}
      href={href}
      onClick={onClick}
    >
      <Icon />
    </MediaButton>
  </Tooltip>
);

export default SocialMediaButton;
