import { supabase } from '@/utils/supabase';

export type TOrder = {
  full_name: string;
  phone: string;
  address: string;
  city: string;
  status: string;
  notes: string;
  total_price: string;
};

export const getOrders = async () => {
  const { data, error } = await supabase.from('orders').select('*');
  if (error) {
    console.error('There was an error getting orders', error.message);
    return { success: false, error: error };
  }
  return { success: true, data: data };
};

export const addOrder = async (order: TOrder) => {
  const { data, error } = await supabase.from('orders').insert([order]);
  if (error) {
    console.error('There was an error adding order,', error.message);
    return { success: false, error: error, message: error.message };
  }
  return { success: true, data: data };
};
