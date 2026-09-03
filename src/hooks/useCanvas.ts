import { useRef, useEffect, useCallback } from 'react';

export function useCanvas(
  draw: (ctx: CanvasRenderingContext2D, width: number, height: number) => void,
  deps: unknown[] = [],
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawCallback = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.parentElement?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    draw(ctx, canvas.width, canvas.height);
  }, [draw]);

  useEffect(() => {
    drawCallback();
    window.addEventListener('resize', drawCallback);
    return () => window.removeEventListener('resize', drawCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- deps is a caller-supplied array of unknown length, spread intentionally
  }, [drawCallback, ...deps]);

  return canvasRef;
}
