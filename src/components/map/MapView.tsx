import React, { useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface Marker {
  id: string;
  x: number;
  y: number;
  label: string;
}

interface MapViewProps {
  center: { x: number; y: number };
  zoom: number;
  markers: Marker[];
  tileLayer?: string;
  onMarkerClick?: (marker: Marker) => void;
  onZoomChange?: (zoom: number) => void;
}

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: #2d3748;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radius.md};
`;

const MapTile = styled.div<{ $zoom: number }>`
  width: 100%;
  height: 100%;
  background: #4a5568;
  transform: scale(${({ $zoom }) => $zoom});
  transform-origin: center;
`;

const MarkerDot = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: red;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

export const MapView: React.FC<MapViewProps> = ({ center, zoom, markers, onMarkerClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  return (
    <MapContainer ref={containerRef} theme={theme}>
      <MapTile $zoom={zoom} />
      {markers.map((marker) => (
        <MarkerDot
          key={marker.id}
          style={{
            left: `${(marker.x - center.x) * zoom}%`,
            top: `${(marker.y - center.y) * zoom}%`,
          }}
          onClick={() => onMarkerClick?.(marker)}
        />
      ))}
    </MapContainer>
  );
};
