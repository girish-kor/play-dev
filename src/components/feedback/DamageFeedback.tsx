import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useScreenShake } from '../../hooks/useScreenShake';

interface DamageFeedbackProps {
  damage: number;
  type?: 'physical' | 'magic';
  duration?: number;
}

const FlashOverlay = styled.div<{ $active: boolean; $type: 'physical' | 'magic' }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: ${({ $type }) => ($type === 'magic' ? 'rgba(128,0,255,0.2)' : 'rgba(255,0,0,0.2)')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.1s;
  z-index: 9999;
`;

export const DamageFeedback: React.FC<DamageFeedbackProps> = ({
  damage,
  type = 'physical',
  duration = 300,
}) => {
  const triggerShake = useScreenShake(duration, 4);
  const [active, setActive] = React.useState(false);

  useEffect(() => {
    if (damage <= 0) return undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- flash must appear immediately when damage is taken
    setActive(true);
    triggerShake();
    const timer = setTimeout(() => setActive(false), duration);
    return () => clearTimeout(timer);
  }, [damage, triggerShake, duration]);

  return <FlashOverlay $active={active} $type={type} data-testid="damage-flash-overlay" />;
};
