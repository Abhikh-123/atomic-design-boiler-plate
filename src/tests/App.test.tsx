import { render, screen } from '@testing-library/react';
import App from '../App';
jest.mock('../routes/AppRoutes', () => ({
  AppRoutes: () => <div>Main Content Mock</div>,
}));

describe('App', () => {
  it('renders MainContent inside providers', () => {
    render(<App />);
    expect(screen.getByText('Main Content Mock')).toBeInTheDocument();
  });
});
