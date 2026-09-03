import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface PerformanceMonitorProps {
  fps: number;
  frameTime: number;
  memoryUsage: number;
  drawCalls?: number;
}

const MonitorContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #0f0;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: monospace;
  font-size: 12px;
  z-index: ${({ theme }) => theme.zIndex.debug};
`;

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  fps,
  frameTime,
  memoryUsage,
  drawCalls,
}) => {
  const theme = useTheme();
  return (
    <MonitorContainer theme={theme}>
      <div>FPS: {fps}</div>
      <div>Frame: {frameTime.toFixed(2)}ms</div>
      <div>Memory: {memoryUsage}MB</div>
      {drawCalls !== undefined && <div>Draw: {drawCalls}</div>}
    </MonitorContainer>
  );
};
