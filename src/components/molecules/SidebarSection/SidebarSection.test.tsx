import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SidebarSection from './SidebarSection';

// Mock react-i18next to control translations
jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key, // return key as-is for easier testing
  }),
}));

describe('SidebarSection', () => {
  it('renders navigation links with correct labels and hrefs', () => {
    render(
      <MemoryRouter>
        <SidebarSection />
      </MemoryRouter>
    );

    // Check presence of navigation links
    const homeLink = screen.getByRole('link', { name: 'home' });
    const projectLink = screen.getByRole('link', { name: 'project' });
    const logoutLink = screen.getByRole('link', { name: 'logout' });

    // ✅ Verify they exist
    expect(homeLink).toBeInTheDocument();
    expect(projectLink).toBeInTheDocument();
    expect(logoutLink).toBeInTheDocument();

    // ✅ Verify correct href attributes
    expect(homeLink).toHaveAttribute('href', '/home');
    expect(projectLink).toHaveAttribute('href', '/project');
    expect(logoutLink).toHaveAttribute('href', '/');
  });
});
