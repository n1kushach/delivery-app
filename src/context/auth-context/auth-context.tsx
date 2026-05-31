import type {
  SignInResult,
  SignUpResult,
} from "@/context/auth-context/auth-context-utils";
import type { Session } from "@supabase/supabase-js";
import { createContext } from "react";

export type AuthContextType = {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  signUpNewUser: (email: string, password: string) => Promise<SignUpResult>;
  signIn: (email: string, password: string) => Promise<SignInResult>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
