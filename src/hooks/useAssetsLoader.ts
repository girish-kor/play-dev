import { useState, useEffect } from 'react';

export function useAssetsLoader(assets: string[]) {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (assets.length === 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- must report loaded=true synchronously when there is nothing to load
      setLoaded(true);
      setProgress(100);
      return;
    }
    let loadedCount = 0;
    assets.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        setProgress((loadedCount / assets.length) * 100);
        if (loadedCount === assets.length) setLoaded(true);
      };
      img.onerror = () => {
        loadedCount++;
        setProgress((loadedCount / assets.length) * 100);
        if (loadedCount === assets.length) setLoaded(true);
      };
      img.src = src;
    });
  }, [assets]);

  return { progress, loaded };
}
