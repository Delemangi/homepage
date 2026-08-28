import { Box, styled } from '@mui/material';

const ColumnBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 'clamp(4.5rem, 9vw, 7.5rem)',
  width: '100%',
});

export default ColumnBox;
