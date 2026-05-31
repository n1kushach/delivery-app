import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { LoginForm } from '@/components/login/login';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';

const mockNavigate = vi.fn();
const mockSignIn = vi.fn();

vi.mock('@/context/auth-context/use-auth.tsx', () => ({
  useAuth: () => ({ signIn: mockSignIn }),
}));

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('sonner', () => ({
  toast: { error: vi.fn() },
}));

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('Renders a login page', () => {
    render(<LoginForm />);
    expect(screen.getByText('Login to your account')).toBeInTheDocument();
    expect(
      screen.getByText('Enter your email below to login to your account')
    ).toBeInTheDocument();
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
  });

  it('Renders the sign up button and points to /sign-up', async () => {
    render(<LoginForm />);
    const signUpButton = screen.getByRole('button', { name: /Sign up/i });
    expect(signUpButton).toBeInTheDocument();

    const signUpLink = screen.getByRole('link', { name: /Sign up/i });
    expect(signUpLink).toBeInTheDocument();
  });

  it('Renders login button', async () => {
    render(<LoginForm />);
    expect(screen.getByRole('button', { name: /Log in/i }));
  });

  it("Navigates to '/dashboard on succesful login", async () => {
    mockSignIn.mockResolvedValue({ success: true });
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(
      screen.getByLabelText(/email/i),
      'nikolozi.chavchavadze@gmail.com'
    );
    await user.type(screen.getByLabelText(/password/i), 'Klezemisune@123');
    await user.click(screen.getByRole('button', { name: /Log in/i }));
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith({ to: '/dashboard' });
    });
  });

  it('Shows error toast on failed login', async () => {
    mockSignIn.mockResolvedValue({ success: false });
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    await user.type(screen.getByLabelText(/password/i), 'Test1234@123');
    await user.click(screen.getByRole('button', { name: /Log in/i }));
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Invalid login credentials', {
        position: 'top-right',
      });
    });
    expect(mockNavigate).not.toHaveBeenCalled();
  });
  it('Shows loading state while submitting', async () => {
    mockSignIn.mockImplementation(
      () =>
        new Promise(resolve =>
          setTimeout(() => resolve({ success: true }), 100)
        )
    );
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    await user.type(screen.getByLabelText(/password/i), 'Test1234@123');
    await user.click(screen.getByRole('button', { name: /Log in/i }));
    expect(
      screen.getByRole('button', { name: /logging in/i })
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/password/i)).toBeDisabled();
  });
  it('Shows validation error when email is empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    await user.click(screen.getByRole('button', { name: /log in/i }));

    await waitFor(() => {
      expect(screen.getByText(/Invalid email address/i)).toBeInTheDocument();
    });
    expect(mockSignIn).not.toHaveBeenCalled();
  });
  it('Shows validation error when password is empty', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);
    await user.type(screen.getByLabelText(/email/i), 'test@gmail.com');
    await user.click(screen.getByRole('button', { name: /log in/i }));
    await waitFor(() => {
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
    expect(mockSignIn).not.toHaveBeenCalled();
  });
});
