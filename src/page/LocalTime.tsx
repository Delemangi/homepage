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

type Props = TypographyProps;

const LocalTime = (props: Props) => {
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
      color="textSecondary"
      fontSize={18}
      {...props}
    >
      {time}
    </Typography>
  );
};

export default LocalTime;
