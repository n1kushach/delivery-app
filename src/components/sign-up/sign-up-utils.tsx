import type { SignUpResult } from "@/context/auth-context/auth-context-utils";
import type { UseNavigateResult } from "@tanstack/react-router";

export type SignUp = {
  email: string;
  password: string;
  loading: boolean;
  error: boolean;
};

export const handleSignUp = async (
  e: React.SubmitEvent<HTMLFormElement>,
  signUpFn: (email: string, password: string) => Promise<SignUpResult>,
  email: string,
  password: string,
  setSignUp: React.Dispatch<React.SetStateAction<SignUp>>,
  navigate: UseNavigateResult<string>,
) => {
  e.preventDefault();
  setSignUp((prev) => ({
    ...prev,
    loading: true,
  }));
  const { success } = await signUpFn(email, password);
  if (success) {
    navigate({ to: "/dashboard" });
  }
  if (!success) {
    setSignUp((prev) => ({
      ...prev,
      error: true,
      errorMessage: "There is an error",
    }));
  }
  setSignUp((prev) => ({
    ...prev,
    loading: false,
  }));
};
