import React from 'react';
import { render, screen } from '@testing-library/react';
import { FocusTrap } from 'src/components/accessibility/FocusTrap';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('FocusTrap', () => {
  it('renders children', () => {
    render(
      <ThemeProvider>
        <FocusTrap active>
          <button>Focus me</button>
        </FocusTrap>
      </ThemeProvider>
    );
    expect(screen.getByText('Focus me')).toBeInTheDocument();
  });
});
