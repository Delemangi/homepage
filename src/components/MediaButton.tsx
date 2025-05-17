import { IconButton, type IconButtonProps } from '@mui/material';

type Props = IconButtonProps & {
  readonly href?: string;
};

const MediaButton = ({ children, href, ...props }: Props) =>
  href ? (
    <IconButton
      component="a"
      href={href}
      target="_blank"
      {...props}
    >
      {children}
    </IconButton>
  ) : (
    <IconButton {...props}>{children}</IconButton>
  );

export default MediaButton;
