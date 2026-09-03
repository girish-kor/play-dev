import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Tooltip } from 'src/components/utility/Tooltip';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Tooltip', () => {
  it('shows tooltip on hover after delay', async () => {
    render(
      <ThemeProvider>
        <Tooltip content="Tooltip content" delay={100}>
          <span>Hover me</span>
        </Tooltip>
      </ThemeProvider>
    );
    fireEvent.mouseEnter(screen.getByText('Hover me'));
    await waitFor(() => expect(screen.getByText('Tooltip content')).toBeVisible(), { timeout: 200 });
  });
});
