import React, { createContext, useContext, ReactNode } from 'react';
import { DesignTokens, defaultTokens } from '../tokens';

const ThemeContext = createContext<DesignTokens>(defaultTokens);

interface ThemeProviderProps {
  theme?: DesignTokens;
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = defaultTokens,
  children,
}) => {
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): DesignTokens => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
