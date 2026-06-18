import type { Profile } from '@/context/auth-context/auth-context-types';
import { supabase } from '@/utils/supabase';

export const getAllDrivers = async (): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'driver');

  if (error) {
    console.error('Error fetching drivers:', error.message);
    return [];
  }

  return data as Profile[];
};
