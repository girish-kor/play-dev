import React from 'react';
import { render, screen } from '@testing-library/react';
import { DebugProvider, useDebug } from 'src/contexts/DebugContext';

describe('DebugContext', () => {
  it('provides debug state', () => {
    const TestComponent = () => {
      const { debug } = useDebug();
      return <div data-testid="logs">{debug.logs.length}</div>;
    };
    render(
      <DebugProvider>
        <TestComponent />
      </DebugProvider>
    );
    expect(screen.getByTestId('logs')).toHaveTextContent('0');
  });
});
