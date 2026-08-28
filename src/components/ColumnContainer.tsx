import { Container, styled } from '@mui/material';

const ColumnContainer = styled(Container)({
  alignItems: 'stretch',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  maxWidth: '1180px !important',
  width: 'min(1180px, calc(100% - 32px))',
});

export default ColumnContainer;
