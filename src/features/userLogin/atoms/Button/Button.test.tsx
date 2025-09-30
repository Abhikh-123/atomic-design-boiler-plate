import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders with label', () => {
    render(<Button label="Click Me" />);
    expect(
      screen.getByRole('button', { name: 'Click Me' })
    ).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button label="Click Me" onClick={handleClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Click Me' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('respects disabled state', () => {
    const handleClick = jest.fn();
    render(<Button label="Disabled" disabled onClick={handleClick} />);

    const btn = screen.getByRole('button', { name: 'Disabled' });
    expect(btn).toBeDisabled();

    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
