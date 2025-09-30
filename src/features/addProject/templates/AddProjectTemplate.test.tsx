import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddProjectTemplate from './AddProjectTemplate';

//useTranslation
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

//useTheme
jest.mock('../../../hooks/useTheme', () => ({
  useTheme: () => ({ theme: 'light' }),
}));

// Mock ProjectForm to avoid deep rendering
jest.mock('../organisms/ProjectForm', () => () => (
  <div data-testid="project-form">ProjectForm</div>
));

describe('AddProjectTemplate Component', () => {
  it('renders heading and back button', () => {
    const mockBack = jest.fn();

    render(<AddProjectTemplate onBackClick={mockBack} />);

    // Heading should use translation key
    expect(
      screen.getByRole('heading', { name: 'add-project' })
    ).toBeInTheDocument();

    // Back button should render and be clickable
    const backButton = screen.getByRole('button', { name: 'back' });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });

  it('applies theme class', () => {
    const { container } = render(
      <AddProjectTemplate onBackClick={jest.fn()} />
    );
    expect(container.firstChild).toHaveClass('page light'); // light comes from mocked useTheme
  });

  it('renders ProjectForm', () => {
    render(<AddProjectTemplate onBackClick={jest.fn()} />);
    expect(screen.getByTestId('project-form')).toBeInTheDocument();
  });
});
