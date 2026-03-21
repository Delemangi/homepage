import { SvgIcon, type SvgIconProps } from '@mui/material';

const createIcon = (title: string, path: string) => {
  const Icon = (props: SvgIconProps) => (
    <SvgIcon {...props}>
      <svg
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>{title}</title>
        <path d={path} />
      </svg>
    </SvgIcon>
  );

  Icon.displayName = `${title}Icon`;

  return Icon;
};

export default createIcon;
