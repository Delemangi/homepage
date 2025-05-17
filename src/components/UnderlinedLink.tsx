import { Link, type LinkProps, styled } from '@mui/material';

const UnderlinedLink = styled(Link)<LinkProps>(({ theme }) => ({
  '&:hover': {
    color: '#fff',
    textDecorationColor: '#fff',
  },
  color: theme.palette.primary.main,
  textDecoration: 'underline',
  textDecorationColor: '#f5f5f5',
  textDecorationStyle: 'wavy',
  transition: 'color 0.2s, text-decoration-color 0.2s',
}));

export default UnderlinedLink;
