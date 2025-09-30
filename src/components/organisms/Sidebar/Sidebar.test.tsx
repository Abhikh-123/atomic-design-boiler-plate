import { render, screen } from '@testing-library/react';
import Sidebar from './Sidebar';

jest.mock('../../molecules/SidebarSection/SidebarSection', () =>
  jest.fn(() => <div>Mocked SidebarSection</div>)
);

describe('Sidebar', () => {
  it('renders SidebarSection inside an aside container', () => {
    render(<Sidebar />);

    const asideElement = screen.getByRole('complementary'); // aside has 'complementary' role
    expect(asideElement).toHaveClass('sidebar-container');

    // Verify  is rendered
    expect(screen.getByText('Mocked SidebarSection')).toBeInTheDocument();
  });
});
