import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorMessage from './ErrorMessage';

describe('ErrorMessage Component', () => {
  it('renders the error message when provided', () => {
    render(<ErrorMessage message="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not render anything when no message is provided', () => {
    const { container } = render(<ErrorMessage />);
    expect(container).toBeEmptyDOMElement();
  });

  it('applies the correct styles', () => {
    render(<ErrorMessage message="Invalid input" />);
    const msg = screen.getByText('Invalid input');
    expect(msg).toHaveClass('text-red-500', 'text-xs', 'mt-1');
  });
});
