import { ThemeProvider } from '@mui/material';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { createAppTheme } from '../theme';
import ProjectCard from './ProjectCard';

const renderCard = () =>
  render(
    <ThemeProvider theme={createAppTheme('light')}>
      <ProjectCard
        description="A project with separate destinations."
        hrefCode="https://example.com/source"
        hrefLive="https://example.com/live"
        title="Example project"
      />
    </ThemeProvider>,
  );

describe('ProjectCard', () => {
  it('does not activate the primary destination when a nested link handles Enter', () => {
    const open = vi.spyOn(globalThis, 'open').mockImplementation(() => null);
    const { container } = renderCard();

    const sourceLink = screen.getByRole('link', { name: 'Source code' });
    fireEvent.keyDown(sourceLink, { key: 'Enter' });

    expect(open).not.toHaveBeenCalled();
    expect(container.firstElementChild).not.toHaveAttribute('role', 'link');
    expect(container.firstElementChild).not.toHaveAttribute('tabindex');
  });
});
