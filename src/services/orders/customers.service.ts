import type { Profile } from '@/context/auth-context/auth-context-types';
import { supabase } from '@/utils/supabase';

export const getAllCustomers = async (): Promise<Profile[]> => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('role', 'customer');

  if (error) {
    console.error('Error fetching customers:', error.message);
    return [];
  }

  return data as Profile[];
};
