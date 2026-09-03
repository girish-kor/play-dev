import { useState, useEffect, useCallback, type RefObject } from 'react';

type Placement = 'top' | 'bottom' | 'left' | 'right' | 'auto';

export function usePopper<T extends HTMLElement = HTMLElement, U extends HTMLElement = HTMLElement>(
  triggerRef: RefObject<T | null>,
  contentRef: RefObject<U | null>,
  placement: Placement = 'bottom',
  offset: number = 8,
) {
  const [position, setPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !contentRef.current) return;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const contentRect = contentRef.current.getBoundingClientRect();
    const spaceAbove = triggerRect.top;
    const spaceBelow = window.innerHeight - triggerRect.bottom;
    const spaceLeft = triggerRect.left;
    const spaceRight = window.innerWidth - triggerRect.right;

    let top = 0;
    let left = 0;

    let finalPlacement = placement;
    if (placement === 'auto') {
      if (spaceBelow >= contentRect.height + offset) finalPlacement = 'bottom';
      else if (spaceAbove >= contentRect.height + offset) finalPlacement = 'top';
      else if (spaceRight >= contentRect.width + offset) finalPlacement = 'right';
      else if (spaceLeft >= contentRect.width + offset) finalPlacement = 'left';
      else finalPlacement = 'bottom';
    }

    switch (finalPlacement) {
      case 'bottom':
        top = triggerRect.bottom + offset;
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
        break;
      case 'top':
        top = triggerRect.top - contentRect.height - offset;
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
        break;
      case 'left':
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
        left = triggerRect.left - contentRect.width - offset;
        break;
      case 'right':
        top = triggerRect.top + triggerRect.height / 2 - contentRect.height / 2;
        left = triggerRect.right + offset;
        break;
    }

    if (left < 0) left = 0;
    if (top < 0) top = 0;
    if (left + contentRect.width > window.innerWidth) left = window.innerWidth - contentRect.width;
    if (top + contentRect.height > window.innerHeight)
      top = window.innerHeight - contentRect.height;

    setPosition({ top, left });
  }, [triggerRef, contentRef, placement, offset]);

  useEffect(() => {
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [updatePosition]);

  return { position, updatePosition };
}
