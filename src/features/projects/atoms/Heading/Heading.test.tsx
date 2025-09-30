import { render, screen } from '@testing-library/react';
import Heading from './Heading';

describe('Heading component', () => {
  it('renders children text correctly', () => {
    render(<Heading>Intracis</Heading>);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Intracis'
    );
  });

  it('supports rendering React elements as children', () => {
    render(
      <Heading>
        <span>Text</span>
      </Heading>
    );
    expect(screen.getByText('Text')).toBeInTheDocument();
  });
});
