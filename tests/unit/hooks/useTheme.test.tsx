import { renderHook } from '@testing-library/react';
import { useTheme } from 'src/hooks/useTheme';
import { ThemeProvider } from 'src/contexts/ThemeContext';
import { defaultTokens } from 'src/tokens';
import React from 'react';

describe('useTheme', () => {
  it('returns theme', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current).toEqual(defaultTokens);
  });
});
