import { render, screen } from '@testing-library/react';
import LanguageChange from './LanguageChange';
import { useTranslation } from 'react-i18next';
interface TransProps {
  i18nKey: string;
  values: {
    channel: string;
  };
}
interface TranslationOptions {
  channel?: string; // channel is optional
}

jest.mock('react-i18next', () => ({
  useTranslation: jest.fn(),
  Trans: ({ i18nKey, values }: TransProps) => (
    <span>{`${i18nKey} - ${values.channel}`}</span>
  ),
}));

describe('LanguageChange', () => {
  beforeEach(() => {
    (useTranslation as jest.Mock).mockReturnValue({
      t: (key: string, opts?: TranslationOptions) =>
        opts?.channel ? `${key} - ${opts.channel}` : key,
    });
  });

  it('renders greeting and description lines', () => {
    render(<LanguageChange />);

    expect(screen.getByText('greeting')).toBeInTheDocument();
    expect(
      screen.getByText('description.line2 - Intracis')
    ).toBeInTheDocument();
  });
});
