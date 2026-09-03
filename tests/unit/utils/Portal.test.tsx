import React from 'react';
import { render, screen } from '@testing-library/react';
import { Portal } from 'src/utils/Portal';

describe('Portal', () => {
  it('renders children in portal', () => {
    render(
      <Portal>
        <div>Portal content</div>
      </Portal>,
    );
    expect(screen.getByText('Portal content')).toBeInTheDocument();
    expect(document.getElementById('play-dev-portal')).toContainElement(
      screen.getByText('Portal content'),
    );
  });
});
