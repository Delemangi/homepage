import { Link, Typography } from '@mui/material';

const Name = () => (
  <Typography fontSize={48}>
    <Link
      href="https://github.com/Delemangi/homepage"
      sx={{
        animation: 'auroraSweep 2.5s linear infinite alternate',
        background: 'linear-gradient(90deg, #6a82fb 0%, #ff63e9 100%)',
        backgroundPosition: '0% 50%',
        backgroundSize: '200% 100%',
        display: 'inline-block',
        textDecoration: 'none',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
      target="_blank"
    >
      Delemangi
    </Link>
  </Typography>
);

export default Name;
