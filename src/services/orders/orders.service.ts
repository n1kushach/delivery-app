import { supabase } from '@/utils/supabase';

export const getOrders = async () => {
  const { data, error } = await supabase.from('orders').select();
  if (error) {
    console.error('There was an error getting orders', error.message);
    return { success: false, error: error };
  }
  return { success: true, data: data };
};
