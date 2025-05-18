import { Link, styled } from '@mui/material';

const UnderlinedLink = styled(Link)({
  '&:hover': {
    backgroundImage: 'linear-gradient(90deg, #ff63e9, #ff63e9)',
    backgroundSize: '100% 2px',
    color: '#ff63e9',
  },
  backgroundImage: 'linear-gradient(90deg, #6a82fb, #6a82fb)',
  backgroundPosition: '0 100%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '0% 2px',
  color: '#6a82fb',
  position: 'relative',
  textDecoration: 'none',
  textDecorationThickness: 2,
  textUnderlineOffset: 3,
  transition:
    'color 0.2s, background-size 0.3s cubic-bezier(.4,1,.4,1), background-image 0.2s',
});

export default UnderlinedLink;
