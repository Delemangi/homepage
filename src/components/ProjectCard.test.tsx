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
  it('exposes the primary destination and source as sibling anchors', () => {
    const { container } = renderCard();

    const primaryLink = screen.getByRole('link', {
      name: 'View Example project live site',
    });
    const sourceLink = screen.getByRole('link', { name: 'Source code' });

    expect(primaryLink).toHaveAttribute('href', 'https://example.com/live');
    expect(sourceLink).toHaveAttribute('href', 'https://example.com/source');
    expect(primaryLink).not.toContainElement(sourceLink);
    expect(container.firstElementChild).not.toHaveAttribute('role', 'link');
    expect(container.firstElementChild).not.toHaveAttribute('tabindex');
  });

  it('reuses the card bounds while tracking the pointer over nested content', () => {
    const { container } = renderCard();
    const card = container.firstElementChild;

    if (!(card instanceof HTMLElement)) {
      throw new TypeError('Expected the project card to render as an element');
    }

    const getBounds = vi
      .spyOn(card, 'getBoundingClientRect')
      .mockReturnValue(new DOMRect(100, 50, 400, 300));
    const sourceLink = screen.getByRole('link', { name: 'Source code' });

    fireEvent.pointerEnter(card, { clientX: 120, clientY: 80 });
    fireEvent.pointerMove(sourceLink, { clientX: 140, clientY: 90 });
    fireEvent.pointerMove(sourceLink, { clientX: 150, clientY: 100 });

    expect(getBounds).toHaveBeenCalledTimes(1);
    expect(card.style.getPropertyValue('--highlight-x')).toBe('50px');
    expect(card.style.getPropertyValue('--highlight-y')).toBe('50px');
  });
});
