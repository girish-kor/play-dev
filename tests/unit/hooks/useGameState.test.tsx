import { renderHook } from '@testing-library/react';
import { useGameState } from 'src/hooks/useGameState';
import { GameStateProvider } from 'src/contexts/GameStateContext';
import React from 'react';

describe('useGameState', () => {
  it('returns selected state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <GameStateProvider>{children}</GameStateProvider>;
    const { result } = renderHook(() => useGameState((state) => state.player.health), { wrapper });
    expect(result.current).toBe(100);
  });
});
