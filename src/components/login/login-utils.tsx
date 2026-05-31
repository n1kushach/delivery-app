import type { SignInResult } from "@/context/auth-context/auth-context-utils";
import type { UseNavigateResult } from "@tanstack/react-router";

export type Login = {
  email: string;
  password: string;
  loading: boolean;
  error: boolean;
  errorMessage: string;
};

export const handleSignIn = async (
  e: React.SubmitEvent<HTMLFormElement>,
  setLogin: React.Dispatch<React.SetStateAction<Login>>,
  email: string,
  password: string,
  signInFn: (email: string, password: string) => Promise<SignInResult>,
  navigate: UseNavigateResult<string>,
) => {
  e.preventDefault();
  setLogin((prev) => ({
    ...prev,
    loading: true,
  }));
  const { success } = await signInFn(email, password);
  if (success) {
    navigate({ to: "/dashboard" });
  }
  if (!success) {
    setLogin((prev) => ({
      ...prev,
      error: true,
      errorMessage: "Invalid login credentials",
    }));
  }
  setLogin((prev) => ({
    ...prev,
    loading: false,
  }));
};
