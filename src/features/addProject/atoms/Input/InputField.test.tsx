import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField Component', () => {
  const setup = () => {
    const handleChange = jest.fn();
    const props = {
      value: 'test',
      onChange: handleChange,
      placeholder: 'Enter text',
    };

    render(<InputField {...props} />);
    const input = screen.getByPlaceholderText(
      props.placeholder
    ) as HTMLInputElement;

    return {
      input,
      handleChange,
    };
  };

  it('renders with correct placeholder and value', () => {
    const { input } = setup();

    expect(input).toBeInTheDocument();
    expect(input.value).toBe('test');
    expect(input.placeholder).toBe('Enter text');
  });

  it('calls onChange when value changes', () => {
    const { input, handleChange } = setup();

    fireEvent.change(input, { target: { value: 'new value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
