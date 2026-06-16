import type {
  Profile,
  Role,
  SignInResult,
  SignUpResult,
} from '@/context/auth-context/auth-context-types';
import type { Session } from '@supabase/supabase-js';
import { createContext } from 'react';

export type AuthContextType = {
  profile: Profile | null;
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  signUpNewUser: (
    email: string,
    password: string,
    name: string,
    phone: string,
    role: Role
  ) => Promise<SignUpResult>;
  signIn: (email: string, password: string) => Promise<SignInResult>;
  signOut: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);
