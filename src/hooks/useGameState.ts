import { useGameStateContext, type GameState } from '../contexts/GameStateContext';
import { useMemo, useState } from 'react';

export function useGameState<T>(
  selector: (state: GameState) => T,
  equalityFn: (a: T, b: T) => boolean = Object.is,
): T {
  const { state } = useGameStateContext();
  const selected = useMemo(() => selector(state), [state, selector]);
  const [memoized, setMemoized] = useState(selected);
  if (!equalityFn(memoized, selected)) {
    setMemoized(selected);
    return selected;
  }
  return memoized;
}
