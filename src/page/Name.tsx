import { Link, Typography } from '@mui/material';

const Name = () => (
  <Typography fontSize={48}>
    <Link
      href="#"
      sx={(theme) => ({
        '&:hover': {
          color:
            theme.palette.mode === 'dark'
              ? theme.palette.secondary.main
              : theme.palette.info.main,
          scale: 1.02,
        },
        animation: 'auroraSweep 3s ease-in-out infinite alternate',
        background:
          theme.palette.mode === 'dark'
            ? 'linear-gradient(90deg, #6a82fb 0%, #ff63e9 100%)'
            : 'linear-gradient(90deg, #ee3f71 0%, #ffc0cd 50%, #ee3f71 100%)',
        backgroundClip: 'text',
        backgroundPosition: '0% 50%',
        backgroundSize: '250% 100%',
        color: 'transparent',
        display: 'inline-block',
        textDecoration: 'none',
        transition: 'all 0.2s, color 0.3s ease-in-out',
      })}
    >
      Delemangi
    </Link>
  </Typography>
);

export default Name;
