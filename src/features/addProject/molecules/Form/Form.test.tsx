import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

describe('Form Component', () => {
  it('renders input fields and button', () => {
    const mockSubmit = jest.fn();
    const mockSetTitle = jest.fn();
    const mockSetBody = jest.fn();

    render(
      <Form
        title=""
        setTitle={mockSetTitle}
        body=""
        setBody={mockSetBody}
        onSubmit={mockSubmit}
        buttonText="Create Project"
      />
    );

    // Check placeholders
    expect(
      screen.getByPlaceholderText('Enter project name')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Enter team lead name')
    ).toBeInTheDocument();

    // Check button
    expect(screen.getByRole('button', { name: /Project/ })).toBeInTheDocument();
  });

  it('calls setTitle and setBody on input change', () => {
    const mockSubmit = jest.fn();
    const mockSetTitle = jest.fn();
    const mockSetBody = jest.fn();

    render(
      <Form
        title=""
        setTitle={mockSetTitle}
        body=""
        setBody={mockSetBody}
        onSubmit={mockSubmit}
        buttonText="Save"
      />
    );

    fireEvent.change(screen.getByPlaceholderText('Enter project name'), {
      target: { value: 'adarsh' },
    });
    fireEvent.change(screen.getByPlaceholderText('Enter team lead name'), {
      target: { value: 'demo' },
    });

    expect(mockSetTitle).toHaveBeenCalledWith('adarsh');
    expect(mockSetBody).toHaveBeenCalledWith('demo');
  });

  it('triggers onSubmit when form is submitted', () => {
    const mockSubmit = jest.fn((e) => e.preventDefault());
    const mockSetTitle = jest.fn();
    const mockSetBody = jest.fn();

    render(
      <Form
        title="Project"
        setTitle={mockSetTitle}
        body=""
        setBody={mockSetBody}
        onSubmit={mockSubmit}
        buttonText="Add"
      />
    );

    fireEvent.submit(screen.getByTestId('form'));

    expect(mockSubmit).toHaveBeenCalled();
  });
});
