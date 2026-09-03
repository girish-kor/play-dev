import { renderHook } from '@testing-library/react';
import { useAnnounce } from 'src/hooks/useAnnounce';
import { DebugProvider } from 'src/contexts/DebugContext';
import React from 'react';

describe('useAnnounce', () => {
  it('announces message', () => {
    const announcerEl = document.createElement('div');
    announcerEl.id = 'play-dev-announcer';
    document.body.appendChild(announcerEl);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <DebugProvider>{children}</DebugProvider>
    );
    const { result } = renderHook(() => useAnnounce(), { wrapper });
    result.current('Test');
    const announcer = document.getElementById('play-dev-announcer');
    expect(announcer).toBeInTheDocument();
    expect(announcer).toHaveTextContent('Test');

    document.body.removeChild(announcerEl);
  });
});
