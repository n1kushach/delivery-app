import OrdersView from '@/components/dashboard/orders/view/orders.view';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute(
  '/(app)/dashboard/_authenticated/orders/$orderId/'
)({
  loader: ({ params }) => {
    return { orderId: params.orderId };
  },
  component: OrdersView,
});
