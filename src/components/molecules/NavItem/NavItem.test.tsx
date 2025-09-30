import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import NavItem from './NavItem';

describe('NavItem', () => {
  it('renders the link with correct label and href', () => {
    render(
      <MemoryRouter>
        <NavItem label="Home" href="/home" />
      </MemoryRouter>
    );

    const link = screen.getByRole('link', { name: 'Home' });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/home');
    expect(link).toHaveClass('nav-item');
  });
});
