import { supabase } from '@/utils/supabase';
import type { AuthError, Session, User } from '@supabase/supabase-js';

export type Role = 'customer' | 'driver';

export type SignUpResult =
  | { success: false; error: AuthError; message: string }
  | { success: true; data: { user: User | null; session: Session | null } };

export type SignInResult =
  | { success: false; error: AuthError }
  | { success: true; data: { user: User; session: Session } };

//sign-up
export const signUpNewUser = async (
  email: string,
  password: string,
  name: string,
  phone: string
): Promise<SignUpResult> => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
        phone: phone,
      },
    },
  });
  if (error) {
    console.error('There was an error signing up: ', error.message);
    return { success: false, error: error, message: error.message };
  }
  return { success: true, data };
};

//sign-in
export const signIn = async (
  email: string,
  password: string
): Promise<SignInResult> => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    console.error('There was an error signing up: ', error);
    return { success: false, error };
  }
  return { success: true, data };
};

//sign-out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
  }
};
