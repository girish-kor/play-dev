import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Portal } from '../../utils/Portal';

interface CombatTextProps {
  value: number;
  type: 'damage' | 'heal' | 'crit';
  position: { x: number; y: number };
  onComplete?: () => void;
}

const FloatingText = styled.div<{ $type: string }>`
  position: fixed;
  color: ${({ $type }) => {
    switch ($type) {
      case 'heal':
        return 'lime';
      case 'crit':
        return 'orange';
      default:
        return 'red';
    }
  }};
  font-weight: bold;
  font-size: 1.5rem;
  pointer-events: none;
  animation: floatUp 1s forwards;
  @keyframes floatUp {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    100% {
      opacity: 0;
      transform: translateY(-80px);
    }
  }
`;

export const CombatText: React.FC<CombatTextProps> = ({ value, type, position, onComplete }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, 1000);
    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <Portal>
      <FloatingText $type={type} style={{ left: position.x, top: position.y }}>
        {value}
      </FloatingText>
    </Portal>
  );
};
