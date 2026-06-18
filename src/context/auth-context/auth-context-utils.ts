import type {
  Profile,
  Role,
  SignInResult,
  SignUpResult,
} from '@/context/auth-context/auth-context-types';
import { supabase } from '@/utils/supabase';

export const getProfile = async (userId: string): Promise<Profile | null> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    console.error('Error fetching profile: ', error.message);
    return null;
  }

  return data as Profile;
};

//sign-up
export const signUpNewUser = async (
  email: string,
  password: string,
  name: string,
  phone: string,
  role: Exclude<Role, 'admin>'>
): Promise<SignUpResult> => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        name: name,
        phone: phone,
        user_role: role,
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
