import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import OrdersSkeleton from '@/components/dashboard/orders/orders.skeleton';
import DashboardError from '@/components/dashboard/error';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders } from '@/services/orders/orders.service';
import { ORDER_COLUMNS } from '@/components/dashboard/orders/table.util';
import type { Orders } from '@/types/orders.types';

const OrdersTable = () => {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery<Orders[], Error>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });
  const table = useReactTable({
    data: data ?? [],
    columns: ORDER_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) return <OrdersSkeleton />;
  if (error) return <DashboardError message={error.message} variant="page" />;

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm dark:border-slate-800 dark:shadow-none">
      <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-slate-800">
        <thead className="bg-gray-50 dark:bg-slate-900/60">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-slate-400"
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
        <tbody className="divide-y divide-gray-100 bg-white dark:divide-slate-800/60 dark:bg-slate-950/40">
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/40"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-gray-700 dark:text-slate-300"
                >
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
