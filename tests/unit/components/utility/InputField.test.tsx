import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { InputField } from 'src/components/utility/InputField';
import { ThemeProvider } from 'src/contexts/ThemeContext';

describe('InputField', () => {
  it('renders with label and error', () => {
    render(
      <ThemeProvider>
        <InputField label="Name" error="Required" />
      </ThemeProvider>
    );
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByText('Required')).toBeInTheDocument();
    expect(screen.getByLabelText('Name')).toHaveAttribute('aria-invalid', 'true');
  });
});
