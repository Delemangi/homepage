import { Link, Typography } from '@mui/material';

const Name = () => (
  <Typography fontSize={48}>
    <Link
      href="https://github.com/Delemangi/homepage"
      sx={{
        '&:hover': {
          color: '#ff63e9',
          scale: 1.025,
        },
        animation: 'auroraSweep 2.5s linear infinite alternate',
        background: 'linear-gradient(90deg, #6a82fb 0%, #ff63e9 100%)',
        backgroundClip: 'text',
        backgroundPosition: '0% 50%',
        backgroundSize: '200% 100%',
        color: 'transparent',
        display: 'inline-block',
        textDecoration: 'none',
        transition: 'all 0.2s, color 0.3s ease-in-out',
      }}
      target="_blank"
    >
      Delemangi
    </Link>
  </Typography>
);

export default Name;
