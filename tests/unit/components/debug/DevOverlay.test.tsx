import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DevOverlay } from 'src/components/debug/DevOverlay';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { DebugProvider } from 'src/contexts/DebugContext';

describe('DevOverlay', () => {
  it('toggles tools', () => {
    const onToggle = jest.fn();
    render(
      <ThemeProvider>
        <DebugProvider>
          <DevOverlay activeTools={[]} onToggleTool={onToggle} debugState={{}} dispatchDebug={jest.fn()} />
        </DebugProvider>
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Console'));
    expect(onToggle).toHaveBeenCalledWith('console');
  });
});
