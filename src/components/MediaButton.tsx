import { IconButton, type IconButtonProps } from '@mui/material';

type Props = IconButtonProps & {
  readonly href?: string;
};

const MediaButton = ({ children, href, ...props }: Props) =>
  href ? (
    <IconButton
      component="a"
      href={href}
      sx={{
        '&:hover': {
          color: '#fff',
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
        },
        transition: 'color 0.2s, filter 0.2s',
      }}
      target="_blank"
      {...props}
    >
      {children}
    </IconButton>
  ) : (
    <IconButton
      sx={{
        '&:hover': {
          color: '#fff',
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.25))',
        },
        transition: 'color 0.2s, filter 0.2s',
      }}
      {...props}
    >
      {children}
    </IconButton>
  );

export default MediaButton;
