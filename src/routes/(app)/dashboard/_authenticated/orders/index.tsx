import Orders from '@/components/dashboard/orders/orders';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/dashboard/_authenticated/orders/')(
  {
    component: Orders,
  }
);
