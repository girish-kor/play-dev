import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameStateProvider, useGameStateContext } from 'src/contexts/GameStateContext';

describe('GameStateContext', () => {
  it('provides state', () => {
    const TestComponent = () => {
      const { state } = useGameStateContext();
      return <div data-testid="health">{state.player.health}</div>;
    };
    render(
      <GameStateProvider>
        <TestComponent />
      </GameStateProvider>
    );
    expect(screen.getByTestId('health')).toHaveTextContent('100');
  });
});
