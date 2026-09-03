import React, { createContext, useContext, useReducer, ReactNode, useMemo } from 'react';

export interface SettingsState {
  keybindings: Record<string, string>;
  audio: { volume: number; muted: boolean };
  video: { brightness: number; fullscreen: boolean };
  gameplay: { difficulty: string };
}

type SettingsAction =
  | { type: 'UPDATE_KEYBINDINGS'; payload: Record<string, string> }
  | { type: 'UPDATE_AUDIO'; payload: Partial<SettingsState['audio']> }
  | { type: 'UPDATE_VIDEO'; payload: Partial<SettingsState['video']> }
  | { type: 'UPDATE_GAMEPLAY'; payload: Partial<SettingsState['gameplay']> };

const defaultSettings: SettingsState = {
  keybindings: {
    pause: 'Escape',
    inventory: 'I',
    map: 'M',
  },
  audio: { volume: 0.8, muted: false },
  video: { brightness: 1, fullscreen: false },
  gameplay: { difficulty: 'normal' },
};

const settingsReducer = (state: SettingsState, action: SettingsAction): SettingsState => {
  switch (action.type) {
    case 'UPDATE_KEYBINDINGS':
      return { ...state, keybindings: action.payload };
    case 'UPDATE_AUDIO':
      return { ...state, audio: { ...state.audio, ...action.payload } };
    case 'UPDATE_VIDEO':
      return { ...state, video: { ...state.video, ...action.payload } };
    case 'UPDATE_GAMEPLAY':
      return { ...state, gameplay: { ...state.gameplay, ...action.payload } };
    default:
      return state;
  }
};

const SettingsContext = createContext<{
  settings: SettingsState;
  dispatchSettings: React.Dispatch<SettingsAction>;
}>({
  settings: defaultSettings,
  dispatchSettings: () => null,
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, dispatchSettings] = useReducer(settingsReducer, defaultSettings);
  const value = useMemo(() => ({ settings, dispatchSettings }), [settings, dispatchSettings]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
};

export const useSettings = () => useContext(SettingsContext);
