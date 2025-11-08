import { Box, CircularProgress } from '@mui/material';

const LoadingSpinner = () => (
  <Box
    sx={{
      alignItems: 'center',
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);
export default LoadingSpinner;
