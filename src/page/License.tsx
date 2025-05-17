import { Link, Typography } from '@mui/material';

const License = () => (
  <Typography
    align="center"
    color="textSecondary"
    fontSize={12}
    variant="body2"
  >
    <Link
      href="https://github.com/Delemangi/homepage"
      target="_blank"
    >
      Source code
    </Link>{' '}
    (MIT).
  </Typography>
);

export default License;
