import { AuthContext } from '@/context/auth-context/auth-context';
import type { Profile } from '@/context/auth-context/auth-context-types';
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
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session?.user.id, 'Session');
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    if (!session?.user.id) return;
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error.message);
        setProfile(null);
        return;
      }

      setProfile(data as Profile);
    };

    fetchProfile();
  }, [session]);

  return (
    <AuthContext.Provider
      value={{ session, setSession, profile, signUpNewUser, signOut, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
