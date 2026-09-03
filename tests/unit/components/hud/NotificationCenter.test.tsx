import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotificationCenter } from 'src/components/hud/NotificationCenter';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('NotificationCenter', () => {
  const notifications = [{ id: '1', message: 'Test notif' }];
  it('renders notifications', () => {
    render(
      <ThemeProvider>
        <NotificationCenter notifications={notifications} onDismiss={jest.fn()} />
      </ThemeProvider>
    );
    expect(screen.getByText('Test notif')).toBeInTheDocument();
  });
});
