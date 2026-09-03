import { useDebug } from '../contexts/DebugContext';

export function useAnnounce() {
  const { dispatchDebug } = useDebug();

  const announce = (message: string, politeness: 'polite' | 'assertive' = 'polite') => {
    if (typeof window !== 'undefined') {
      const announcer = document.getElementById('playdev-announcer');
      if (announcer) {
        announcer.setAttribute('aria-live', politeness);
        announcer.textContent = message;
        setTimeout(() => {
          announcer.textContent = '';
        }, 3000);
      } else {
        dispatchDebug({ type: 'ADD_LOG', payload: `[Announce] ${message}` });
      }
    }
  };

  return announce;
}
