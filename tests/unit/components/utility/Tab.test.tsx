import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Tab } from 'src/components/utility/Tab';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Tab', () => {
  const tabs = [{ label: 'Tab1', content: <div>Content1</div> }, { label: 'Tab2', content: <div>Content2</div> }];
  it('switches tabs', () => {
    render(
      <ThemeProvider>
        <Tab tabs={tabs} />
      </ThemeProvider>
    );
    expect(screen.getByText('Content1')).toBeInTheDocument();
    expect(screen.queryByText('Content2')).not.toBeInTheDocument();
    fireEvent.click(screen.getByText('Tab2'));
    expect(screen.getByText('Content2')).toBeInTheDocument();
    expect(screen.queryByText('Content1')).not.toBeInTheDocument();
  });
});
