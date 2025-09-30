import React from 'react';
import { render, screen } from '@testing-library/react';
import AuthTemplate from './AuthTemplate';

describe('AuthTemplate', () => {
  test('renders children inside styled container', () => {
    render(
      <AuthTemplate>
        <p>Test Child</p>
      </AuthTemplate>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();

    const outer = screen.getByText('Test Child').parentElement?.parentElement;
    expect(outer).toHaveClass(
      'flex',
      'items-center',
      'justify-center',
      'min-h-screen',
      'bg-gray-100'
    );

    const inner = screen.getByText('Test Child').parentElement;
    expect(inner).toHaveClass(
      'bg-white',
      'shadow-md',
      'rounded-lg',
      'p-8',
      'w-full',
      'max-w-md'
    );
  });
});
