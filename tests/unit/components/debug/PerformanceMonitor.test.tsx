import React from 'react';
import { render, screen } from '@testing-library/react';
import { PerformanceMonitor } from 'src/components/debug/PerformanceMonitor';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('PerformanceMonitor', () => {
  it('displays stats', () => {
    render(
      <ThemeProvider>
        <PerformanceMonitor fps={60} frameTime={16.5} memoryUsage={200} drawCalls={100} />
      </ThemeProvider>
    );
    expect(screen.getByText('FPS: 60')).toBeInTheDocument();
    expect(screen.getByText('Frame: 16.50ms')).toBeInTheDocument();
    expect(screen.getByText('Memory: 200MB')).toBeInTheDocument();
    expect(screen.getByText('Draw: 100')).toBeInTheDocument();
  });
});
