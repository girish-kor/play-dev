import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DevInspector } from 'src/components/debug/DevInspector';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('DevInspector', () => {
  const props = { selectedEntity: 'Player', properties: { health: 100 }, methods: ['heal'], onPropertyChange: jest.fn() };
  it('renders properties and methods', () => {
    render(
      <ThemeProvider>
        <DevInspector {...props} />
      </ThemeProvider>
    );
    expect(screen.getByText('Player')).toBeInTheDocument();
    expect(screen.getByText('health:')).toBeInTheDocument();
    expect(screen.getByDisplayValue('100')).toBeInTheDocument();
    expect(screen.getByText('heal')).toBeInTheDocument();
  });
});
