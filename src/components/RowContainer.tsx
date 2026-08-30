import { Container, styled } from '@mui/material';

const RowContainer = styled(Container)(({ theme }) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'row',
  gap: '1.25rem',
  justifyContent: 'flex-start',
  paddingLeft: '0 !important',
  paddingRight: '0 !important',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  width: '100%',
}));

export default RowContainer;
