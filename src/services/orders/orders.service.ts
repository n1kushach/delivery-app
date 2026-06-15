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

export const fetchOrdersCount = async (): Promise<number> => {
  const { count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true });

  if (error) throw new Error(error.message);
  return count ?? 0;
};

export const fetchOrders = async (
  currentPage: number,
  orderPerPage: number
) => {
  const { data, count, error } = await supabase
    .from('orders')
    .select('*', { count: 'exact' })
    .range((currentPage - 1) * orderPerPage, currentPage * orderPerPage - 1)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return { data: data ?? [], count: count ?? 0 };
};

export const deleteOrder = async (id: string) => {
  const { error } = await supabase.from('orders').delete().eq('id', id);

  if (error) throw new Error(error.message);
};

export const fetchOrderById = async (id: string) => {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const addOrder = async (order: TOrder) => {
  const { data, error } = await supabase.from('orders').insert([order]);
  if (error) {
    console.error('There was an error adding order,', error.message);
    throw new Error(error.message);
  }
  return { success: true, data: data };
};

export const updateOrder = async (id: string, updates: Partial<TOrder>) => {
  const { data, error } = await supabase
    .from('orders')
    .update(updates)
    .eq('id', id);

  if (error) {
    console.error('There was an error updating order,', error.message);
    throw new Error(error.message);
  }

  return { success: true, data: data };
};
