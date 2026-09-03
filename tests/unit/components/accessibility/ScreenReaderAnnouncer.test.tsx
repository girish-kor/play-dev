import React from 'react';
import { render, screen } from '@testing-library/react';
import { ScreenReaderAnnouncer } from 'src/components/accessibility/ScreenReaderAnnouncer';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('ScreenReaderAnnouncer', () => {
  it('announces message', () => {
    render(
      <ThemeProvider>
        <ScreenReaderAnnouncer message="Update" politeness="assertive" />
      </ThemeProvider>
    );
    const announcer = screen.getByText('Update');
    expect(announcer).toHaveAttribute('aria-live', 'assertive');
  });
});
