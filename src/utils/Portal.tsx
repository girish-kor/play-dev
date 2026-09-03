import { FC, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  containerId?: string;
}

export const Portal: FC<PortalProps> = ({ children, containerId = 'playdev-portal' }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let element = document.getElementById(containerId);
    if (!element) {
      element = document.createElement('div');
      element.id = containerId;
      document.body.appendChild(element);
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- container must exist before children can portal into it; deferring would flash empty content
    setContainer(element);

    return () => {
      if (element && element.childNodes.length === 0) {
        element.remove();
      }
    };
  }, [containerId]);

  if (!container) return null;
  return createPortal(children, container);
};
