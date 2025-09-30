import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InputField from './InputField';

describe('InputField Component', () => {
  it('renders label and input', () => {
    render(
      <InputField
        id="username"
        label="Username"
        value=""
        onChange={jest.fn()}
      />
    );

    const label = screen.getByText('Username');
    const input = screen.getByLabelText('Username');

    expect(label).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  it('renders with a default text type', () => {
    render(
      <InputField id="email" label="Email" value="" onChange={jest.fn()} />
    );

    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('renders with a custom type', () => {
    render(
      <InputField
        id="password"
        label="Password"
        type="password"
        value=""
        onChange={jest.fn()}
      />
    );

    const input = screen.getByLabelText('Password');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('calls onChange when input value changes', () => {
    const handleChange = jest.fn();
    render(
      <InputField
        id="username"
        label="Username"
        value=""
        onChange={handleChange}
      />
    );

    fireEvent.change(screen.getByLabelText('Username'), {
      target: { value: 'adarsh' },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it('displays error message when error is passed', () => {
    render(
      <InputField
        id="username"
        label="Username"
        value=""
        onChange={jest.fn()}
        error="Required field"
      />
    );

    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('does not display error message when no error is passed', () => {
    render(
      <InputField
        id="username"
        label="Username"
        value=""
        onChange={jest.fn()}
      />
    );

    expect(screen.queryByText('Required field')).not.toBeInTheDocument();
  });
});
