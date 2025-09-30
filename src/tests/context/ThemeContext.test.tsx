import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../provider/ThemeProvider';
import { useTheme } from '../../hooks/useTheme';
import userEvent from '@testing-library/user-event';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <p data-testid="theme-value">{theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('renders children correctly', () => {
    render(
      <ThemeProvider>
        <div data-testid="child">Hello</div>
      </ThemeProvider>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Hello');
  });

  it('provides default theme as light', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('toggles theme from light to dark', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByTestId('theme-value')).toHaveTextContent('light');

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));

    expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('throws error when useTheme is used outside ThemeProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const BrokenComponent = () => {
      useTheme();
      return null;
    };

    expect(() => render(<BrokenComponent />)).toThrow(
      'useTheme must be used within a ThemeProvider'
    );

    spy.mockRestore();
  });
});
