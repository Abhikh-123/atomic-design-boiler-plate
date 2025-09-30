import { render, screen, fireEvent } from '@testing-library/react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';

// Mock useTranslation to control language + spy on changeLanguage
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
}));

describe('LanguageSelector', () => {
  const mockChangeLanguage = jest.fn();

  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: {
        language: 'en',
        changeLanguage: mockChangeLanguage,
      },
    });
    jest.clearAllMocks();
  });

  it('renders dropdown with available languages', () => {
    render(<LanguageSelector />);

    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'English' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'हिन्दी' })).toBeInTheDocument();
  });

  it('calls i18n.changeLanguage when a new language is selected', () => {
    render(<LanguageSelector />);
    const select = screen.getByRole('combobox');

    fireEvent.change(select, { target: { value: 'hi' } });

    expect(mockChangeLanguage).toHaveBeenCalledWith('hi');
  });

  it('shows the currently selected language', () => {
    (useTranslation as jest.Mock).mockReturnValue({
      i18n: { language: 'hi', changeLanguage: mockChangeLanguage },
    });

    render(<LanguageSelector />);
    expect(screen.getByRole<HTMLSelectElement>('combobox').value).toBe('hi');
  });
});
