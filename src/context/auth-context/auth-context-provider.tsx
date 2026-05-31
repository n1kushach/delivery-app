import { AuthContext } from "@/context/auth-context/auth-context";
import { supabase } from "@/utils/supabase";
import type { AuthError, Session, User } from "@supabase/supabase-js";
import React, { useState } from "react";

export type SignUpResult =
  | { success: false; error: AuthError }
  | { success: true; data: { user: User | null; session: Session | null } };

export type SignInResult =
  | { success: false; error: AuthError }
  | { success: true; data: { user: User; session: Session } };

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);

  //sign-up
  const signUpNewUser = async (
    email: string,
    password: string,
  ): Promise<SignUpResult> => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.error("There was an error signing up: ", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  //sign-in
  const signIn = async (
    email: string,
    password: string,
  ): Promise<SignInResult> => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) {
      console.error("There was an error signing up: ", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  //sign-out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, setSession, signUpNewUser, signOut, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
