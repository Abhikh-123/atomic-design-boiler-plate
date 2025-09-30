import React from 'react';
import { render, screen } from '@testing-library/react';
import Label from './Label';

describe('Label Component', () => {
  it('renders label with text', () => {
    render(<Label htmlFor="username" text="Username" />);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('sets the correct htmlFor attribute', () => {
    render(<Label htmlFor="email" text="Email Address" />);
    const label = screen.getByText('Email Address');
    expect(label).toHaveAttribute('for', 'email');
  });

  it('applies the correct styles', () => {
    render(<Label htmlFor="password" text="Password" />);
    const label = screen.getByText('Password');
    expect(label).toHaveClass('text-sm', 'font-medium', 'mb-1');
  });
});
