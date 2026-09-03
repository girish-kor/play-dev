import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

export interface DebugState {
  logs: string[];
  activeTools: string[];
  selectedEntity: string | null;
  performance: { fps: number; frameTime: number; memoryUsage: number };
}

export type DebugAction =
  | { type: 'ADD_LOG'; payload: string }
  | { type: 'CLEAR_LOGS' }
  | { type: 'TOGGLE_TOOL'; payload: string }
  | { type: 'SELECT_ENTITY'; payload: string | null }
  | { type: 'UPDATE_PERFORMANCE'; payload: Partial<DebugState['performance']> };

const initialDebugState: DebugState = {
  logs: [],
  activeTools: [],
  selectedEntity: null,
  performance: { fps: 0, frameTime: 0, memoryUsage: 0 },
};

const debugReducer = (state: DebugState, action: DebugAction): DebugState => {
  switch (action.type) {
    case 'ADD_LOG':
      return { ...state, logs: [...state.logs, action.payload] };
    case 'CLEAR_LOGS':
      return { ...state, logs: [] };
    case 'TOGGLE_TOOL': {
      const index = state.activeTools.indexOf(action.payload);
      if (index >= 0) {
        return { ...state, activeTools: state.activeTools.filter((t) => t !== action.payload) };
      } else {
        return { ...state, activeTools: [...state.activeTools, action.payload] };
      }
    }
    case 'SELECT_ENTITY':
      return { ...state, selectedEntity: action.payload };
    case 'UPDATE_PERFORMANCE':
      return { ...state, performance: { ...state.performance, ...action.payload } };
    default:
      return state;
  }
};

const DebugContext = createContext<{
  debug: DebugState;
  dispatchDebug: React.Dispatch<DebugAction>;
}>({
  debug: initialDebugState,
  dispatchDebug: () => null,
});

export const DebugProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [debug, dispatchDebug] = useReducer(debugReducer, initialDebugState);
  const value = useMemo(() => ({ debug, dispatchDebug }), [debug, dispatchDebug]);
  return <DebugContext.Provider value={value}>{children}</DebugContext.Provider>;
};

export const useDebug = () => useContext(DebugContext);
