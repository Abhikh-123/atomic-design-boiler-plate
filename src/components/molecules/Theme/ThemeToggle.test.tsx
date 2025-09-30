import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../../../hooks/useTheme';

jest.mock('../../../hooks/useTheme', () => ({
  useTheme: jest.fn(),
}));

describe('ThemeToggle', () => {
  const mockToggleTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Sun icon when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    // Verify that Sun icon is shown
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('renders Moon icon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    // Verify that Moon icon is shown
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('calls toggleTheme when checkbox is clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ThemeToggle />);

    const checkbox = screen.getByLabelText('Toggle theme', {
      selector: 'input[type=checkbox]',
    });

    fireEvent.click(checkbox);

    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });
});
