import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';

interface DevInspectorProps {
  selectedEntity: string | null;
  properties: Record<string, unknown>;
  methods: string[];
  onPropertyChange: (key: string, value: string) => void;
}

const InspectorContainer = styled.div`
  position: fixed;
  bottom: 220px;
  right: 10px;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: monospace;
  min-width: 250px;
  z-index: ${({ theme }) => theme.zIndex.debug};
`;

export const DevInspector: React.FC<DevInspectorProps> = ({
  selectedEntity,
  properties,
  methods,
  onPropertyChange,
}) => {
  const theme = useTheme();
  if (!selectedEntity) return null;

  return (
    <InspectorContainer theme={theme}>
      <h4>{selectedEntity}</h4>
      {Object.entries(properties).map(([key, value]) => (
        <div key={key}>
          <span>{key}: </span>
          <input
            type="text"
            value={String(value)}
            onChange={(e) => onPropertyChange(key, e.target.value)}
          />
        </div>
      ))}
      {methods.map((method) => (
        <button key={method} onClick={() => console.log(`Call ${method}`)}>
          {method}
        </button>
      ))}
    </InspectorContainer>
  );
};
