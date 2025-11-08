import { type SxProps, Tooltip, type TooltipProps } from '@mui/material';
import { type ComponentType, type MouseEventHandler } from 'react';

import MediaButton from './MediaButton';

type SocialMediaButtonProps = {
  readonly href?: string;
  readonly icon: ComponentType;
  readonly onClick?: MouseEventHandler<HTMLButtonElement>;
  readonly title: string;
  readonly tooltipSlotProps?: TooltipProps['slotProps'];
  readonly type: 'copy' | 'link';
};

const SocialMediaButton = ({
  href,
  icon: Icon,
  onClick,
  title,
  tooltipSlotProps,
  type,
}: SocialMediaButtonProps) => {
  const accentColor = type === 'copy' ? '#00ffd0' : '#6a82fb';

  const buttonStyles: SxProps = {
    '&::after': {
      backgroundColor: accentColor,
      borderRadius: '50%',
      bottom: -2,
      boxShadow: `0 0 8px ${accentColor}`,
      content: '""',
      height: 4,
      left: '50%',
      opacity: 0,
      position: 'absolute',
      transform: 'translateX(-50%) scale(0)',
      transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      width: 4,
    },
    '&:hover': {
      filter: `drop-shadow(0 0 8px ${accentColor}40)`,
      scale: 1.15,
    },
    '&:hover::after': {
      opacity: 1,
      transform: 'translateX(-50%) scale(1)',
    },
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  return (
    <Tooltip
      arrow
      placement="bottom"
      slotProps={tooltipSlotProps}
      title={title}
    >
      <MediaButton
        href={href}
        onClick={onClick}
        sx={buttonStyles}
      >
        <Icon />
      </MediaButton>
    </Tooltip>
  );
};

export default SocialMediaButton;
