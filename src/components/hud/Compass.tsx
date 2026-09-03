import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface CompassProps {
  heading?: number;
  waypoints?: Array<{ label: string; bearing: number }>;
}

const CompassContainer = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CompassRose = styled.div<{ $rotation: number }>`
  transform: rotate(${({ $rotation }) => $rotation}deg);
  font-size: 2rem;
  font-weight: bold;
`;

const WaypointMarker = styled.div<{ $angle: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(${({ $angle }) => $angle}deg) translate(0, -42px)
    rotate(${({ $angle }) => -$angle}deg);
  font-size: 0.6rem;
  white-space: nowrap;
`;

export const Compass: React.FC<CompassProps> = ({ heading, waypoints = [] }) => {
  const h = heading ?? 0;
  const theme = useTheme();
  return (
    <CompassContainer theme={theme}>
      <CompassRose $rotation={h}>N</CompassRose>
      {waypoints.map((waypoint) => (
        <WaypointMarker key={waypoint.label} $angle={waypoint.bearing - h}>
          {waypoint.label}
        </WaypointMarker>
      ))}
    </CompassContainer>
  );
};
