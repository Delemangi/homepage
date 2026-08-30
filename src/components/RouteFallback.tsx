import { Button, Stack, Typography } from '@mui/material';

import Background from './Background';
import GlobalStyle from './GlobalStyle';

type FallbackPageProps = Readonly<{
  actionLabel: string;
  body: string;
  onAction?: () => void;
  title: string;
}>;

const FallbackPage = ({
  actionLabel,
  body,
  onAction,
  title,
}: FallbackPageProps) => (
  <Background>
    <GlobalStyle />
    <Stack
      spacing={2}
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100svh',
        padding: 3,
        position: 'relative',
        textAlign: 'center',
        zIndex: 1,
      }}
    >
      <Typography
        component="h1"
        variant="h4"
      >
        {title}
      </Typography>
      <Typography color="text.secondary">{body}</Typography>
      {onAction ? (
        <Button onClick={onAction}>{actionLabel}</Button>
      ) : (
        <Button
          component="a"
          href="/"
        >
          {actionLabel}
        </Button>
      )}
    </Stack>
  </Background>
);

export const NotFoundFallback = () => (
  <FallbackPage
    actionLabel="Return home"
    body="The page you requested doesn’t exist."
    title="Page not found"
  />
);

export const ErrorFallback = () => (
  <FallbackPage
    actionLabel="Refresh page"
    body="Refresh the page to try again."
    onAction={() => {
      location.reload();
    }}
    title="Something went wrong"
  />
);
