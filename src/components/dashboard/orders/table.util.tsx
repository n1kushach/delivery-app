import StatusBadge from "@/components/dashboard/status-badge";
import type { Orders } from "@/types/orders.types";
import { createColumnHelper } from "@tanstack/react-table";

const columnHelper = createColumnHelper<Orders>();

export const ORDER_COLUMNS = [
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
