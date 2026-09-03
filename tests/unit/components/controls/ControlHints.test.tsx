import React from 'react';
import { render, screen } from '@testing-library/react';
import { ControlHints } from 'src/components/controls/ControlHints';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('ControlHints', () => {
  const actions = [{ action: 'move', label: 'Move', key: 'W' }];
  it('renders hints', () => {
    render(
      <ThemeProvider>
        <ControlHints actions={actions} />
      </ThemeProvider>
    );
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('Move')).toBeInTheDocument();
  });
});
