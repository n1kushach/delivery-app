import { AuthContext } from "@/context/auth-context/auth-context";
import {
  signIn,
  signOut,
  signUpNewUser,
} from "@/context/auth-context/auth-context-utils";
import type { Session } from "@supabase/supabase-js";
import React, { useState } from "react";

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);

  return (
    <AuthContext.Provider
      value={{ session, setSession, signUpNewUser, signOut, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
