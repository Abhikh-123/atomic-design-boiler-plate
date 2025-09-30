import { render, screen } from '@testing-library/react';
import DefaultLayout from './DefaultLayout';

// Mock MainContent (to isolate layout tests)
jest.mock('../../../dashBoard/organisms/MainContent/MainContent', () => () => (
  <div data-testid="main-content">Mocked MainContent</div>
));

describe('DefaultLayout', () => {
  it('renders without crashing', () => {
    render(<DefaultLayout />);
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
  });

  it('applies inline style paddingLeft: 90px', () => {
    render(<DefaultLayout />);

    const wrapper = document.querySelector(
      '.page.app-layout'
    ) as HTMLDivElement;
    expect(wrapper).toHaveStyle('padding-left: 90px');
  });

  it('contains main section div', () => {
    render(<DefaultLayout />);

    const mainSection = document.querySelector('.main-section');
    expect(mainSection).toBeInTheDocument();
  });
});
