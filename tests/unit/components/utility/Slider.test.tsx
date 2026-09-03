import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Slider } from 'src/components/utility/Slider';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('Slider', () => {
  it('renders with label', () => {
    render(
      <ThemeProvider>
        <Slider label="Volume" />
      </ThemeProvider>
    );
    expect(screen.getByLabelText('Volume')).toBeInTheDocument();
  });

  it('calls onChange when value changes', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <Slider onChange={onChange} />
      </ThemeProvider>
    );
    const input = screen.getByRole('slider');
    fireEvent.change(input, { target: { value: '75' } });
    expect(onChange).toHaveBeenCalledWith(75);
  });
});
