import React from 'react';
import { render, screen } from '@testing-library/react';
import MainContent from './MainContent';

// Mock react-i18next so it doesn’t depend on real i18n setup
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // just return the key as text
  }),
}));

describe('MainContent Component', () => {
  it('renders heading, title and paragraph with translation keys', () => {
    render(<MainContent />);

    // h2 greeting
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'greeting'
    );

    // h1 Intracis - project_for
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Intracis - project_for'
    );

    // paragraph maincontent
    expect(screen.getByText('maincontent')).toBeInTheDocument();
  });
});
