import { Box, Typography } from '@mui/material';

import Column from '../components/Column';
import Name from './Name';
import SocialMedia from './SocialMedia';

const HeroCopy = () => (
  <Box>
    <Name />
    <Typography
      component="p"
      sx={{
        fontSize: 'clamp(28px, 4vw, 52px)',
        fontWeight: 600,
        letterSpacing: '-0.045em',
        lineHeight: 1.08,
        marginBottom: 0,
        marginTop: 3,
        maxWidth: '18ch',
        textWrap: 'balance',
      }}
    >
      I build enterprise software and AI-powered products.
    </Typography>
  </Box>
);

export default function Introduction() {
  return (
    <Column>
      <HeroCopy />
      <Box
        sx={{
          marginTop: { md: 5, xs: 4 },
          width: 'fit-content',
        }}
      >
        <SocialMedia />
      </Box>
    </Column>
  );
}
