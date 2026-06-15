import DashboardPagination from '@/components/dashboard/dashboard-pagination';
import DashboardError from '@/components/dashboard/error';
import OrdersModal from '@/components/dashboard/orders/orders.modal';
import OrdersSkeleton from '@/components/dashboard/orders/orders.skeleton';
import OrdersTable from '@/components/dashboard/orders/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  fetchOrders,
  fetchOrdersCount,
} from '@/services/orders/orders.service';
import { Status, type Orders } from '@/types/orders.types';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

const OrdersPage = () => {
  const postsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<{ data: Orders[]; count: number }, Error>({
    queryKey: ['orders', currentPage, postsPerPage],
    queryFn: () => fetchOrders(currentPage, postsPerPage),
  });
  const { data: total } = useQuery({
    queryKey: ['orders-count'],
    queryFn: fetchOrdersCount,
  });
  const totalPages = total ? Math.ceil(total / postsPerPage) : 0;
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<Status | 'all'>('all');
  const filteredOrders = useMemo(() => {
    if (!data) return [];

    return data?.data?.filter(order => {
      const matchesSearch =
        !search.trim() ||
        [order.full_name, order.address, order.city, order.phone].some(field =>
          field?.toLowerCase().includes(search.toLowerCase())
        );

      const matchesStatus = status === 'all' || order.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [data, search, status]);

  if (loading) return <OrdersSkeleton />;
  if (error) return <DashboardError message={error.message} variant="page" />;
  return (
    <div className="flex flex-col gap-4">
      <OrdersModal open={modal} setOpen={setModal} />
      <div className="flex items-center justify-between">
        <h1 className="font-mono">Orders</h1>
        <div className="flex items-center gap-4">
          <Input
            onChange={e => setSearch(e.target.value)}
            className="w-100 shrink-0"
            id="search"
            type="search"
            placeholder="Search by full name, address, city or phone..."
          />
          <Select
            value={status}
            onValueChange={value => setStatus(value as Status)}
          >
            <SelectTrigger className="w-48 shrink-0">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
      <DashboardPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default OrdersPage;
