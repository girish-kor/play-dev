import React from 'react';
import { render, screen } from '@testing-library/react';
import { MapView } from 'src/components/map/MapView';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('MapView', () => {
  const markers = [{ id: '1', x: 50, y: 50, label: 'Town' }];
  it('renders markers', () => {
    render(
      <ThemeProvider>
        <MapView center={{ x: 0, y: 0 }} zoom={1} markers={markers} />
      </ThemeProvider>
    );
    const marker = document.querySelector('div[style*="left: 50%; top: 50%"]');
    expect(marker).toBeInTheDocument();
  });
});
