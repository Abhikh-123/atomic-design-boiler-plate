import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

// Mock DefaultLayout so we don't depend on its full implementation
jest.mock(
  '../../../features/dashBoard/templates/DefaultLayout/DefaultLayout',
  () => () => <div data-testid="default-layout">DefaultLayout</div>
);

describe('Home Component', () => {
  it('renders DefaultLayout', () => {
    render(<Home />);
    expect(screen.getByTestId('default-layout')).toBeInTheDocument();
  });
});
