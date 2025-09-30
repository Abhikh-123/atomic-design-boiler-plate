import React from 'react';
import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../../provider/AuthProvider';
import { useAuth } from '../../hooks/useAuth';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { user, setUser } = useAuth();

  return (
    <div>
      <p data-testid="user-email">{user?.email || 'no-user'}</p>
      <button onClick={() => setUser({ id: '1', email: 'test@example.com' })}>
        Set User
      </button>
    </div>
  );
};

describe('AuthContext', () => {
  it('renders children correctly', () => {
    render(
      <AuthProvider>
        <div data-testid="child">Hello</div>
      </AuthProvider>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('provides user and setUser to children', async () => {
    const user = userEvent.setup();

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    // Initially no user
    expect(screen.getByTestId('user-email')).toHaveTextContent('no-user');

    // Click to set user
    await user.click(screen.getByRole('button', { name: /set user/i }));

    // Verify updated context
    expect(screen.getByTestId('user-email')).toHaveTextContent(
      'test@example.com'
    );
  });
  it('throws error when useAuth is used outside AuthProvider', () => {
    // Silence expected error logs
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const BrokenComponent = () => {
      useAuth(); // this will throw
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      'useAuth must be used within AuthProvider'
    );

    spy.mockRestore();
  });
  // it('throws error when useAuth is used outside AuthProvider', () => {
  //   const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

  //   const BrokenComponent = () => {
  //     useAuth();
  //     return null;
  //   };

  //   render(<BrokenComponent />);
  //   spy.mockRestore();
  // });
});
