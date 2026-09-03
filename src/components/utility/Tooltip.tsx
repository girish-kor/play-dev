import React, { ReactNode, useRef, useState } from 'react';
import styled from 'styled-components';
import { Portal } from '../../utils/Portal';
import { usePopper } from '../../hooks/usePopper';
import { useHover } from '../../hooks/useHover';
import { useFocus } from '../../hooks/useFocus';
import { useTheme } from '../../hooks/useTheme';

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right' | 'auto';

interface TooltipProps {
  content: ReactNode;
  position?: TooltipPosition;
  children: ReactNode;
  delay?: number;
  disabled?: boolean;
}

const TooltipTrigger = styled.span`
  display: inline-block;
`;

const TooltipBubble = styled.div<{ $visible: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.lg};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  max-width: 250px;
  z-index: ${({ theme }) => theme.zIndex.tooltip};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${({ theme }) => theme.animations.duration.fast};
  position: fixed;
  pointer-events: none;
`;

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'auto',
  children,
  delay = 300,
  disabled = false,
}) => {
  const triggerRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [isHovering] = useHover<HTMLSpanElement>();
  const [isFocused] = useFocus<HTMLSpanElement>();
  const [show, setShow] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const theme = useTheme();

  const visible = (isHovering || isFocused) && !disabled && !!content;

  React.useEffect(() => {
    if (visible) {
      timeoutRef.current = setTimeout(() => setShow(true), delay);
    } else {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hiding must be immediate, not delayed like the show path
      setShow(false);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [visible, delay]);

  const { position: pos } = usePopper(triggerRef, tooltipRef, position);

  return (
    <>
      <TooltipTrigger ref={triggerRef} theme={theme}>
        {children}
      </TooltipTrigger>
      <Portal>
        <TooltipBubble
          ref={tooltipRef}
          $visible={show}
          style={{ top: pos.top, left: pos.left }}
          theme={theme}
          role="tooltip"
        >
          {content}
        </TooltipBubble>
      </Portal>
    </>
  );
};
