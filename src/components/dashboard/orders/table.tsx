import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ORDER_COLUMNS } from '@/components/dashboard/orders/table.util';
import type { Orders } from '@/types/orders.types';
import { PackageOpen } from 'lucide-react';

interface IOrdersTable {
  data: NoInfer<Orders[]> | undefined;
}

const EmptyOrders = () => (
  <div className="flex flex-col items-center justify-center gap-3 py-16 text-gray-400 dark:text-slate-500">
    <PackageOpen className="h-10 w-10" strokeWidth={1.5} />
    <p className="text-sm font-medium">No orders found</p>
    <p className="text-xs">
      Try adjusting your search or create a new delivery
    </p>
  </div>
);

const OrdersTable = (props: IOrdersTable) => {
  const { data } = props;
  const table = useReactTable({
    data: data ?? [],
    columns: ORDER_COLUMNS,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative rounded-xl  border border-gray-200 shadow-sm dark:border-slate-800 dark:shadow-none">
      <table className="min-w-full divide-y divide-gray-200 text-sm dark:divide-slate-800">
        <thead className="bg-gray-50 dark:bg-slate-900/60">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  className={`${index == 0 && 'rounded-tl-xl!'} ${index + 1 == headerGroup.headers.length && 'rounded-tr-xl!'} px-4 py-3 text-left text-xs font-semibold tracking-wider text-gray-500 uppercase dark:text-slate-400`}
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
          {table.getRowModel().rows.length === 0 ? (
            <tr>
              <td colSpan={ORDER_COLUMNS.length}>
                <EmptyOrders />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map(row => (
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
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersTable;
