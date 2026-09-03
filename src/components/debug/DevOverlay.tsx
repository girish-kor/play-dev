import React from 'react';
import { Portal } from '../../utils/Portal';
import { DebugConsole } from './DebugConsole';
import { PerformanceMonitor } from './PerformanceMonitor';
import { DevInspector } from './DevInspector';
import type { DebugState, DebugAction } from '../../contexts/DebugContext';

interface DevOverlayProps {
  activeTools: string[];
  onToggleTool: (tool: string) => void;
  debugState: DebugState;
  dispatchDebug: React.Dispatch<DebugAction>;
}

export const DevOverlay: React.FC<DevOverlayProps> = ({
  activeTools,
  onToggleTool,
  debugState,
  dispatchDebug,
}) => {
  return (
    <Portal>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 9999,
          background: '#333',
          padding: '4px',
        }}
      >
        <button onClick={() => onToggleTool('console')}>Console</button>
        <button onClick={() => onToggleTool('monitor')}>Monitor</button>
        <button onClick={() => onToggleTool('inspector')}>Inspector</button>
        {activeTools.includes('console') && (
          <DebugConsole
            logs={debugState.logs}
            commands={[]}
            visible={true}
            onCommand={(input) => dispatchDebug({ type: 'ADD_LOG', payload: input })}
            onClearLogs={() => dispatchDebug({ type: 'CLEAR_LOGS' })}
          />
        )}
        {activeTools.includes('monitor') && (
          <PerformanceMonitor
            fps={debugState.performance.fps}
            frameTime={debugState.performance.frameTime}
            memoryUsage={debugState.performance.memoryUsage}
          />
        )}
        {activeTools.includes('inspector') && (
          <DevInspector
            selectedEntity={debugState.selectedEntity}
            properties={{}}
            methods={[]}
            onPropertyChange={() => {}}
          />
        )}
      </div>
    </Portal>
  );
};
