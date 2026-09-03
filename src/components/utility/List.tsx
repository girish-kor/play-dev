import React, { ReactNode, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../hooks/useTheme';
import { useResizeObserver } from '../../hooks/useResizeObserver';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  itemHeight?: number;
  loading?: boolean;
  emptyMessage?: ReactNode;
  onItemClick?: (item: T, index: number) => void;
  onScroll?: (scrollTop: number) => void;
}

const ListContainer = styled.div`
  overflow-y: auto;
  position: relative;
  height: 100%;
`;

const ListInner = styled.div<{ $totalHeight: number }>`
  position: relative;
  height: ${({ $totalHeight }) => $totalHeight}px;
`;

const ListItemWrapper = styled.div<{ $top: number; $height: number }>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: 0;
  right: 0;
  height: ${({ $height }) => $height}px;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

export function List<T>({
  items,
  renderItem,
  keyExtractor,
  itemHeight = 50,
  loading = false,
  emptyMessage = 'No items',
  onItemClick,
  onScroll,
}: ListProps<T>) {
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerRect = useResizeObserver(containerRef);
  const theme = useTheme();

  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const st = e.currentTarget.scrollTop;
      setScrollTop(st);
      onScroll?.(st);
    },
    [onScroll],
  );

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil((containerRect?.height || 0) / itemHeight) + 1,
    items.length,
  );
  const visibleItems = items.slice(startIndex, endIndex);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (items.length === 0) {
    return <div>{emptyMessage}</div>;
  }

  return (
    <ListContainer ref={containerRef} onScroll={handleScroll} theme={theme}>
      <ListInner $totalHeight={totalHeight} theme={theme}>
        {visibleItems.map((item, index) => {
          const actualIndex = startIndex + index;
          return (
            <ListItemWrapper
              key={keyExtractor(item, actualIndex)}
              $top={actualIndex * itemHeight}
              $height={itemHeight}
              theme={theme}
              onClick={() => onItemClick?.(item, actualIndex)}
            >
              {renderItem(item, actualIndex)}
            </ListItemWrapper>
          );
        })}
      </ListInner>
    </ListContainer>
  );
}
