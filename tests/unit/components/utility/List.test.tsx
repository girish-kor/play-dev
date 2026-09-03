import React from 'react';
import { render, screen } from '@testing-library/react';
import { List } from 'src/components/utility/List';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('List', () => {
  const items = [{ id: '1', name: 'Item 1' }, { id: '2', name: 'Item 2' }];
  it('renders all items', () => {
    render(
      <ThemeProvider>
        <List
          items={items}
          renderItem={(item) => <div>{item.name}</div>}
          keyExtractor={(item) => item.id}
        />
      </ThemeProvider>
    );
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });
});
