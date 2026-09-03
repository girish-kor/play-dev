import React, { useEffect } from 'react';
import styled from 'styled-components';

const Announcer = styled.div`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

interface ScreenReaderAnnouncerProps {
  message: string;
  politeness?: 'polite' | 'assertive';
}

export const ScreenReaderAnnouncer: React.FC<ScreenReaderAnnouncerProps> = ({
  message,
  politeness = 'polite',
}) => {
  const [announcement, setAnnouncement] = React.useState('');

  useEffect(() => {
    if (!message) return undefined;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- announcement must be posted synchronously for screen readers to pick it up
    setAnnouncement(message);
    const timer = setTimeout(() => setAnnouncement(''), 3000);
    return () => clearTimeout(timer);
  }, [message]);

  return (
    <Announcer aria-live={politeness} aria-atomic="true">
      {announcement}
    </Announcer>
  );
};
