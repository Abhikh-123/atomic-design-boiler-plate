import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from './LoginPage';

jest.mock('../../../userLogin/templates/AuthTemplate/AuthTemplate', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-template">{children}</div>
  ),
}));

jest.mock('../../../userLogin/organisms/LoginForm/LoginForm', () => ({
  __esModule: true,
  default: () => <div data-testid="login-form" />,
}));

describe('LoginPage', () => {
  it('renders heading and LoginForm inside AuthTemplate', () => {
    render(<LoginPage />);

    // Heading
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();

    // AuthTemplate
    expect(screen.getByTestId('auth-template')).toBeInTheDocument();

    // LoginForm
    expect(screen.getByTestId('login-form')).toBeInTheDocument();
  });
});
