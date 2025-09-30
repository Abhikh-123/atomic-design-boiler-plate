import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input component', () => {
  it("renders with default type 'text'", () => {
    render(<Input value="" onChange={() => {}} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with provided props (type, placeholder, className)', () => {
    render(
      <Input
        type="email"
        placeholder="Enter email"
        value=""
        onChange={() => {}}
        className="custom-class"
      />
    );

    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveClass('custom-class');
  });

  it('calls onChange handler when typing', () => {
    const handleChange = jest.fn();
    render(<Input value="" onChange={handleChange} placeholder="Type here" />);

    const input = screen.getByPlaceholderText('Type here');
    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect((input as HTMLInputElement).value).toBe('');
  });

  it('renders with a controlled value', () => {
    render(<Input value="Test value" onChange={() => {}} />);
    const input = screen.getByDisplayValue('Test value');
    expect(input).toBeInTheDocument();
  });
});
