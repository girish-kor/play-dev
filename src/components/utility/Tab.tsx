import React, { useState, ReactNode, useRef } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { useId } from '../../hooks/useId';
import { useTabKeyboard } from '../../hooks/useTabKeyboard';

export interface TabItem {
  label: string;
  content: ReactNode;
}

interface TabProps {
  tabs: TabItem[];
  selectedIndex?: number;
  lazy?: boolean;
  onChange?: (index: number) => void;
}

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 2px solid ${({ theme }) => theme.colors.border};
  gap: ${({ theme }) => theme.spacing.sm};
`;

const TabButton = styled.button<{ $active: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : 'transparent')};
  color: ${({ $active, theme }) => ($active ? theme.colors.primary : theme.colors.textSecondary)};
  cursor: pointer;
  font-weight: ${({ $active, theme }) => ($active ? theme.typography.fontWeight.medium : theme.typography.fontWeight.normal)};
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

const TabPanel = styled.div`
  padding-top: ${({ theme }) => theme.spacing.md};
`;

export const Tab: React.FC<TabProps> = ({
  tabs,
  selectedIndex: controlledIndex,
  lazy = false,
  onChange,
}) => {
  const [internalIndex, setInternalIndex] = useState(0);
  const isControlled = controlledIndex !== undefined;
  const activeIndex = isControlled ? controlledIndex : internalIndex;
  const containerRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const instanceId = useId();

  useTabKeyboard(
    containerRef,
    (idx) => {
      if (!isControlled) setInternalIndex(idx);
      onChange?.(idx);
    },
    tabs.length,
  );

  const handleTabClick = (idx: number) => {
    if (!isControlled) setInternalIndex(idx);
    onChange?.(idx);
  };

  return (
    <TabContainer ref={containerRef} theme={theme}>
      <TabList role="tablist" theme={theme}>
        {tabs.map((tab, idx) => (
          <TabButton
            key={idx}
            $active={idx === activeIndex}
            onClick={() => handleTabClick(idx)}
            role="tab"
            aria-selected={idx === activeIndex}
            aria-controls={`tabpanel-${instanceId}-${idx}`}
            id={`tab-${instanceId}-${idx}`}
            theme={theme}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      {tabs.map((tab, idx) => {
        const isActive = idx === activeIndex;
        if (lazy && !isActive) return null;
        return (
          <TabPanel
            key={idx}
            role="tabpanel"
            id={`tabpanel-${instanceId}-${idx}`}
            aria-labelledby={`tab-${instanceId}-${idx}`}
            hidden={!isActive}
            theme={theme}
          >
            {isActive && tab.content}
          </TabPanel>
        );
      })}
    </TabContainer>
  );
};
