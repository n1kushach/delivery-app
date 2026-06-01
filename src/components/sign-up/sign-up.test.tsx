import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import { clearAllMocks } from '@vitest/spy';
import { SignUpForm } from '@/components/sign-up/sign-up';

const mockNavigate = vi.fn();
const mockSignUp = vi.fn();

vi.mock('@/context/auth-context/use-auth.tsx', () => ({
  useAuth: () => ({ signUpNewUser: mockSignUp }),
}));

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

describe('Signup', () => {
  beforeEach(() => {
    clearAllMocks();
  });

  it('Renders a signup page', () => {
    render(<SignUpForm />);
    expect(screen.getByText('Create a new account')).toBeInTheDocument();
  });
  it('Inputs and labels are in the document', () => {
    render(<SignUpForm />);
    expect(screen.getByText(/email/i)).toBeInTheDocument();
    expect(screen.getByText(/^password*/i)).toBeInTheDocument();
    expect(screen.getByText(/^confirm password*/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password*/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^confirm password*/i)).toBeInTheDocument();
  });
  it('Sign up and back to login button', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('button', { name: /Sign up/i }));
    expect(screen.getByRole('button', { name: /Back to login/i }));
  });
  it("Back to login href is '/'", async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    await user.click(screen.getByRole('button', { name: /Back to login/i }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: '/' });
    });
  });
  it('When user is already registered, shows error toast', async () => {
    mockSignUp.mockResolvedValue({
      success: false,
      message: 'User already registered',
    });
    const user = userEvent.setup();
    render(<SignUpForm />);
    await user.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    await user.type(screen.getByLabelText(/^password*/i), 'Testuser@1234!');
    await user.type(
      screen.getByLabelText(/^confirm password*/i),
      'Testuser@1234!'
    );
    await user.click(screen.getByRole('button', { name: /Sign up/i }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('User already registered', {
        position: 'top-right',
      });
    });
  });
  it('Shows loading state while submitting', async () => {
    mockSignUp.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ success: true }), 100)
        )
    );
    const user = userEvent.setup();
    render(<SignUpForm />);
    await user.type(screen.getByLabelText(/email/i), 'asdf@gmail.com');
    await user.type(screen.getByLabelText(/^password*/i), 'Testuser@1234!');
    await user.type(
      screen.getByLabelText(/^confirm password*/i),
      'Testuser@1234!'
    );
    await user.click(screen.getByRole('button', { name: /Sign up/i }));
    expect(
      screen.getByRole('button', { name: /signing up/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/^password*/i)).toBeDisabled();
    expect(screen.getByLabelText(/^confirm password*/i)).toBeDisabled();
  });
  it('Shows validation error when email is empty', async () => {
    const user = userEvent.setup();
    render(<SignUpForm />);
    await user.type(screen.getByLabelText(/^password*/i), 'Testuser@1234!');
    await user.type(
      screen.getByLabelText(/^confirm password*/i),
      'Testuser@1234!'
    );
    await user.click(screen.getByRole('button', { name: /Sign up/i }));
    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
    expect(mockSignUp).not.toHaveBeenCalled();
  });
});
