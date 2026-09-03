import React, { ReactNode, useRef } from 'react';
import { useFocusTrap } from '../../hooks/useFocusTrap';

interface FocusTrapProps {
  active: boolean;
  children: ReactNode;
  autoFocus?: boolean;
}

export const FocusTrap: React.FC<FocusTrapProps> = ({ active, children, autoFocus = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useFocusTrap(containerRef, active, autoFocus);

  return <div ref={containerRef}>{children}</div>;
};
