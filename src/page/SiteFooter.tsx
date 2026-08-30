import { Box, Typography } from '@mui/material';

import UnderlinedLink from '../components/UnderlinedLink';

const FOOTER_LINKS = [
  { href: 'mailto:milev.stefan@gmail.com', label: 'Email' },
  { href: 'https://github.com/Delemangi', label: 'GitHub' },
  { href: 'https://discord.gg/7Fw53MdbUP', label: 'Discord' },
  { href: 'https://steamcommunity.com/id/delemangi/', label: 'Steam' },
  { href: 'https://github.com/Delemangi/homepage', label: 'Source' },
] as const;

const SiteFooter = () => (
  <Box
    component="footer"
    sx={{
      alignItems: { md: 'center', xs: 'flex-start' },
      borderColor: 'divider',
      borderTop: '1px solid',
      display: 'flex',
      flexDirection: { md: 'row', xs: 'column' },
      gap: 2,
      justifyContent: 'space-between',
      paddingTop: 3,
    }}
  >
    <Box>
      <Typography
        sx={{ fontSize: 15, fontWeight: 600, letterSpacing: '-0.01em' }}
      >
        Stefan Milev
      </Typography>
      <Typography
        sx={{ color: 'text.secondary', fontSize: 13, marginTop: 0.5 }}
      >
        Software engineer based in Skopje, North Macedonia
      </Typography>
    </Box>
    <Box
      aria-label="Footer links"
      component="nav"
      sx={{ display: 'flex', flexWrap: 'wrap', gap: { sm: 2, xs: 1.5 } }}
    >
      {FOOTER_LINKS.map((link) => (
        <UnderlinedLink
          href={link.href}
          key={link.label}
          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          target={link.href.startsWith('http') ? '_blank' : undefined}
        >
          {link.label}
        </UnderlinedLink>
      ))}
    </Box>
  </Box>
);

export default SiteFooter;
