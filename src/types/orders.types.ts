export interface Orders {
  address: string;
  city: string;
  created_at: Date;
  full_name: string;
  id: string;
  notes: Notes | null;
  phone: string;
  status: Status;
  total_price: number;
  updated_at: Date;
}

export const Notes = {
  CallOnArrival: 'Call on arrival',
  FragileItems: 'Fragile items',
  LeaveAtDoor: 'Leave at door',
  NoDoorbell: 'No doorbell',
} as const;

export const Status = {
  Cancelled: 'cancelled',
  Confirmed: 'confirmed',
  Delivered: 'delivered',
  Pending: 'pending',
  Processing: 'processing',
  Shipped: 'shipped',
} as const;

export type Notes = (typeof Notes)[keyof typeof Notes];
export type Status = (typeof Status)[keyof typeof Status];

export interface SingleOrder {
  address: string;
  city: string;
  created_at: Date;
  customer_id: string | null;
  driver_id: string | null;
  full_name: string;
  id: string;
  notes: string;
  phone: string;
  status: string;
  total_price: number;
  updated_at: Date;
}
