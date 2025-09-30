import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
  test('renders the children correctly', () => {
    const { getByText } = render(<Button>Click Me</Button>);
    expect(getByText('Click Me')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click Me</Button>
    );
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('has default type="button" when type is not provided', () => {
    const { getByRole } = render(<Button>Default Button</Button>);
    const button = getByRole('button');
    expect(button).toHaveAttribute('type', 'button');
  });

  test('sets the correct type attribute when provided', () => {
    const { getByRole } = render(<Button type="submit">Submit</Button>);
    const button = getByRole('button');
    expect(button).toHaveAttribute('type', 'submit');
  });

  test('applies custom className', () => {
    const { getByRole } = render(
      <Button className="custom-class">Styled Button</Button>
    );
    const button = getByRole('button');
    expect(button).toHaveClass('custom-class');
  });
});
