import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Toast } from 'src/components/utility/Toast';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Toast', () => {
  it('renders message and auto-closes', async () => {
    const onClose = jest.fn();
    render(
      <ThemeProvider>
        <Toast message="Test toast" duration={100} onClose={onClose} />
      </ThemeProvider>
    );
    expect(screen.getByText('Test toast')).toBeInTheDocument();
    await waitFor(() => expect(onClose).toHaveBeenCalled(), { timeout: 200 });
  });
});
