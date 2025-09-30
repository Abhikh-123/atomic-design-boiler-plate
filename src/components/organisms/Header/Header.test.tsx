import { render, screen } from '@testing-library/react';
import Header from './Header';
import { useTranslation } from 'react-i18next';
// import { ThemeToggle } from "../../../components/molecules/Theme/ThemeToggle";

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

jest.mock('../../../components/molecules/Theme/ThemeToggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle" />,
}));

jest.mock(
  '../../../components/molecules/LanguageSelector/LanguageSelector',
  () => () => <div data-testid="language-selector" />
);

describe('Header', () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string) => key, // simple mock translation
    });
  });

  it('renders the header with title, ThemeToggle, and LanguageSelector', () => {
    render(<Header />);

    // Title should render with mock translation
    expect(screen.getByText('Intracis')).toBeInTheDocument();

    // ThemeToggle should be present
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();

    // LanguageSelector should be present
    expect(screen.getByTestId('language-selector')).toBeInTheDocument();
  });
});
