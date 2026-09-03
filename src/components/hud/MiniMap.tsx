import React from 'react';
import styled from 'styled-components';
import { useCanvas } from '../../hooks/useCanvas';
import { useTheme } from '../../hooks/useTheme';

interface MiniMapProps {
  width?: number;
  height?: number;
  zoom?: number;
  center?: { x: number; y: number };
  markers?: Array<{ x: number; y: number; icon: string }>;
  fogOfWar?: boolean;
}

const MiniMapContainer = styled.div<{ $width: number; $height: number }>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
`;

export const MiniMap: React.FC<MiniMapProps> = ({
  width = 200,
  height = 200,
  zoom = 1,
  center = { x: 0, y: 0 },
  markers = [],
  fogOfWar = false,
}) => {
  const canvasRef = useCanvas(
    (ctx, w, h) => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, w, h);
      markers.forEach((marker) => {
        const x = (marker.x - center.x) * zoom + w / 2;
        const y = (marker.y - center.y) * zoom + h / 2;
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = 'lime';
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, 5, 0, Math.PI * 2);
      ctx.fill();

      if (fogOfWar) {
        const gradient = ctx.createRadialGradient(w / 2, h / 2, h / 4, w / 2, h / 2, h / 2);
        gradient.addColorStop(0, 'rgba(0,0,0,0)');
        gradient.addColorStop(1, 'rgba(0,0,0,0.85)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, w, h);
      }
    },
    [markers, center, zoom, fogOfWar],
  );
  const theme = useTheme();

  return (
    <MiniMapContainer $width={width} $height={height} theme={theme}>
      <canvas ref={canvasRef} width={width} height={height} />
    </MiniMapContainer>
  );
};
