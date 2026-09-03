import React, { ReactNode } from 'react';
import { useBreakpoint } from '../../hooks/useBreakpoint';

interface ResponsiveContainerProps {
  breakpoints: Record<string, number>;
  children: (breakpoint: string) => ReactNode;
}

export const ResponsiveContainer: React.FC<ResponsiveContainerProps> = ({
  breakpoints,
  children,
}) => {
  const breakpoint = useBreakpoint(breakpoints);
  return <>{children(breakpoint)}</>;
};
