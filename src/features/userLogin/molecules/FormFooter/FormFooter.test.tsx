import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FormFooter from './FormFooter';

describe('FormFooter Component', () => {
  it('renders Forgot Password link', () => {
    render(
      <MemoryRouter>
        <FormFooter />
      </MemoryRouter>
    );
    const forgotLink = screen.getByRole('link', { name: /forgot password\?/i });
    expect(forgotLink).toBeInTheDocument();
    expect(forgotLink).toHaveAttribute('href', '/forgot-password');
    expect(forgotLink).toHaveClass('text-blue-500', 'hover:underline');
  });

  it('renders Create Account link', () => {
    render(
      <MemoryRouter>
        <FormFooter />
      </MemoryRouter>
    );
    const createLink = screen.getByRole('link', { name: /create account/i });
    expect(createLink).toBeInTheDocument();
    expect(createLink).toHaveAttribute('href', '/register');
    expect(createLink).toHaveClass('text-blue-500', 'hover:underline');
  });
});
