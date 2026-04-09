import { Typography, type TypographyProps } from '@mui/material';
import { useEffect, useState } from 'react';

const TZ = 'Europe/Skopje';

const formatLocalTime = () =>
  new Intl.DateTimeFormat(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    timeZone: TZ,
    timeZoneName: 'short',
  }).format(new Date());

type Props = Omit<TypographyProps, 'fontSize'> & {
  readonly fontSize?: number;
};

const LocalTime = ({ fontSize, ...props }: Props) => {
  const [time, setTime] = useState(() => formatLocalTime());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(formatLocalTime());
    }, 1_000);

    return () => {
      clearInterval(id);
    };
  }, []);

  return (
    <Typography
      {...props}
      sx={{
        color: 'text.secondary',
        ...(fontSize !== undefined && { fontSize }),
      }}
    >
      {time}
    </Typography>
  );
};

export default LocalTime;
