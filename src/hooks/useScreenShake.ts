import { useState, useEffect } from 'react';

export function useScreenShake(duration: number = 300, intensity: number = 4) {
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), duration);
  };

  useEffect(() => {
    if (!shake) return;
    const originalStyle = document.body.style.transform;
    let startTime = performance.now();
    const animate = () => {
      const elapsed = performance.now() - startTime;
      if (elapsed >= duration) {
        document.body.style.transform = originalStyle;
        return;
      }
      const progress = elapsed / duration;
      const x = (Math.random() * 2 - 1) * intensity * (1 - progress);
      const y = (Math.random() * 2 - 1) * intensity * (1 - progress);
      document.body.style.transform = `translate(${x}px, ${y}px)`;
      requestAnimationFrame(animate);
    };
    animate();
    return () => {
      document.body.style.transform = originalStyle;
    };
  }, [shake, duration, intensity]);

  return triggerShake;
}
