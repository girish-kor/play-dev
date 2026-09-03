import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

export interface GameState {
  player: {
    health: number;
    maxHealth: number;
    stamina: number;
    maxStamina: number;
    mana: number;
    maxMana: number;
    experience: number;
    nextLevelExperience: number;
    level: number;
    name: string;
    stats: Record<string, number>;
  };
  inventory: Array<{ id: string; name: string; quantity: number }>;
  equipment: Record<string, { id: string; name: string } | null>;
  quests: Array<{ id: string; title: string; objectives: string[]; completed: boolean }>;
  currency: { gold: number; gems: number };
}

type GameAction =
  | { type: 'UPDATE_PLAYER'; payload: Partial<GameState['player']> }
  | { type: 'UPDATE_INVENTORY'; payload: GameState['inventory'] }
  | { type: 'UPDATE_EQUIPMENT'; payload: GameState['equipment'] }
  | { type: 'UPDATE_QUESTS'; payload: GameState['quests'] }
  | { type: 'UPDATE_CURRENCY'; payload: Partial<GameState['currency']> };

const initialState: GameState = {
  player: {
    health: 100,
    maxHealth: 100,
    stamina: 100,
    maxStamina: 100,
    mana: 50,
    maxMana: 50,
    experience: 0,
    nextLevelExperience: 100,
    level: 1,
    name: 'Hero',
    stats: { strength: 10, agility: 10, intelligence: 10 },
  },
  inventory: [],
  equipment: {},
  quests: [],
  currency: { gold: 0, gems: 0 },
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'UPDATE_PLAYER':
      return { ...state, player: { ...state.player, ...action.payload } };
    case 'UPDATE_INVENTORY':
      return { ...state, inventory: action.payload };
    case 'UPDATE_EQUIPMENT':
      return { ...state, equipment: action.payload };
    case 'UPDATE_QUESTS':
      return { ...state, quests: action.payload };
    case 'UPDATE_CURRENCY':
      return { ...state, currency: { ...state.currency, ...action.payload } };
    default:
      return state;
  }
};

const GameStateContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

export const GameStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
};

export const useGameStateContext = () => useContext(GameStateContext);
