import DashboardError from '@/components/dashboard/error';
import OrdersModal from '@/components/dashboard/orders/orders.modal';
import OrdersSkeleton from '@/components/dashboard/orders/orders.skeleton';
import OrdersTable from '@/components/dashboard/orders/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { fetchOrders } from '@/services/orders/orders.service';
import type { Orders } from '@/types/orders.types';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const OrdersPage = () => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Orders[], Error>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const filteredOrders = useMemo(() => {
    if (!data) return [];
    if (!search.trim()) return data;

    const query = search.toLowerCase();

    return data.filter(order =>
      [order.full_name, order.address, order.city, order.phone].some(field =>
        field?.toLowerCase().includes(query)
      )
    );
  }, [data, search]);

  if (loading) return <OrdersSkeleton />;
  if (error) return <DashboardError message={error.message} variant="page" />;
  return (
    <div className="flex flex-col gap-4">
      <OrdersModal open={modal} setOpen={setModal} />
      <div className="flex justify-between">
        <h1 className="font-mono">Orders</h1>
        <div className="flex items-center gap-4">
          <Input
            onChange={e => setSearch(e.target.value)}
            className="w-100"
            id="search"
            type="search"
            placeholder="Search by full name, address, city or phone..."
          />

          <Button
            className="cursor-pointer rounded-sm uppercase"
            type="button"
            onClick={() => setModal(true)}
            size="lg"
          >
            New Delivery
          </Button>
        </div>
      </div>
      <OrdersTable data={filteredOrders} />
    </div>
  );
};

export default OrdersPage;
