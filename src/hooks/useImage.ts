import { useState, useEffect } from 'react';

export function useImage(src: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- error state must be reported synchronously for a missing src
      setLoaded(false);
      setError(true);
      return;
    }
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;
  }, [src]);

  return { loaded, error };
}
