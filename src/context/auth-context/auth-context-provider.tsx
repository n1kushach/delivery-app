import { AuthContext } from '@/context/auth-context/auth-context';
import {
  signIn,
  signOut,
  signUpNewUser,
} from '@/context/auth-context/auth-context-utils';
import { supabase } from '@/utils/supabase';
import type { Session } from '@supabase/supabase-js';
import React, { useEffect, useState } from 'react';

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ session, setSession, signUpNewUser, signOut, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
