// src/features/userLogin/organisms/LoginForm/LoginForm.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from './LoginForm';

// Mock useLogin hook
const mockLogin = jest.fn();
jest.mock('../../../../hooks/useLogin', () => ({
  useLogin: () => ({
    login: mockLogin,
    loading: false,
    error: null,
  }),
}));

// Mock navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

// Mock validators
jest.mock('../../../../utils/validators', () => ({
  validateEmail: jest.fn((email) => /\S+@\S+\.\S+/.test(email)),
  validatePassword: jest.fn((password) => password.length >= 6),
}));

describe('LoginForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form fields and button', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  //   it("shows validation errors for invalid input", async () => {
  //     render(
  //       <MemoryRouter>
  //         <LoginForm />
  //       </MemoryRouter>
  //     );

  //     fireEvent.change(screen.getByLabelText(/email/i), {
  //       target: { value: "invalid-email" },
  //     });
  //     fireEvent.change(screen.getByLabelText(/password/i), {
  //       target: { value: "" },
  //     });
  //     fireEvent.click(screen.getByRole("button", { name: /login/i }));

  //     expect(await screen.findByText(/Invalid email address/)).toBeInTheDocument();
  //     expect(await screen.findByText(/enter password/i)).toBeInTheDocument();
  //     expect(mockLogin).not.toHaveBeenCalled();
  //   });

  it('calls login and navigates on successful submit', async () => {
    mockLogin.mockResolvedValueOnce(true);

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', '123456');
      expect(mockNavigate).toHaveBeenCalledWith('./home');
    });
  });

  //   it("displays login error from useLogin hook", () => {
  //     jest.mock("../../../../hooks/useLogin", () => ({
  //       useLogin: () => ({
  //         login: mockLogin,
  //         loading: false,
  //         error: "Login failed",
  //       }),
  //     }));

  //     render(
  //       <MemoryRouter>
  //         <LoginForm />
  //       </MemoryRouter>
  //     );

  //     expect(screen.getByText(/Login failed/)).toBeInTheDocument();
  //   });
});
