import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input Component', () => {
  it('renders input with default border', () => {
    render(<Input placeholder="Enter name" />);
    const input = screen.getByPlaceholderText('Enter name');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-gray-300');
  });

  it('renders with red border when error is present', () => {
    render(<Input placeholder="Email" error="Invalid email" />);
    const input = screen.getByPlaceholderText('Email');
    expect(input).toHaveClass('border-red-500');
  });

  it('calls onChange handler when typing', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Type here" onChange={handleChange} />);

    fireEvent.change(screen.getByPlaceholderText('Type here'), {
      target: { value: 'hello' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });
});
