import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, useTheme } from 'src/contexts/ThemeContext';
import { defaultTokens } from 'src/tokens';

describe('ThemeContext', () => {
  it('provides theme', () => {
    const TestComponent = () => {
      const theme = useTheme();
      return <div data-testid="theme">{theme.colors.primary}</div>;
    };
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(screen.getByTestId('theme')).toHaveTextContent(defaultTokens.colors.primary);
  });
});
