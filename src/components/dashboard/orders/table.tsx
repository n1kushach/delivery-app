import { useEffect, useState } from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Orders } from '@/types/orders.types';
import { supabase } from '@/utils/supabase';
import OrdersSkeleton from '@/components/dashboard/orders/orders.skeleton';
import StatusBadge from '@/components/dashboard/status-badge';
import DashboardError from '@/components/dashboard/error';

const columnHelper = createColumnHelper<Orders>();

const columns = [
  columnHelper.accessor('address', {
    id: 'address',
    size: 180,
    header: 'Address',
    cell: i => i.getValue(),
  }),
  columnHelper.accessor('city', {
    id: 'city',
    size: 120,
    header: 'City',
    cell: i => i.getValue(),
  }),
  columnHelper.accessor('full_name', {
    id: 'full_name',
    size: 160,
    header: 'Full Name',
    cell: i => i.getValue(),
  }),
  columnHelper.accessor('notes', {
    id: 'notes',
    size: 200,
    header: 'Notes',
    cell: i => i.getValue(),
  }),
  columnHelper.accessor('phone', {
    id: 'phone',
    size: 140,
    header: 'Phone',
    cell: i => i.getValue(),
  }),
  columnHelper.accessor('status', {
    id: 'status',
    size: 120,
    header: 'Status',
    cell: i => <StatusBadge value={i.getValue()} />,
  }),
  columnHelper.accessor('total_price', {
    id: 'total_price',
    size: 100,
    header: 'Total',
    cell: i => `$${i.getValue()}`,
  }),
];

const OrdersTable = () => {
  const [orders, setOrders] = useState<Orders[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) {
        setError(error.message);
      }
      if (!error) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);
  const table = useReactTable({
    data: orders,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <OrdersSkeleton />;
  if (error) return <DashboardError message={error} variant="page" />;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100 bg-white">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="transition-colors hover:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="px-4 py-3 text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
