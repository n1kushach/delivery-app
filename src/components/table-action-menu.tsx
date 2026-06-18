import { useRef, useState, useEffect } from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import type { Orders } from '@/types/orders.types';
import { useNavigate } from '@tanstack/react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteOrder } from '@/services/orders/orders.service';
import { toast } from 'sonner';
import ConfirmModal from '@/components/confirm-modal';
import { useAuth } from '@/context/auth-context/use-auth';

interface TableActionMenuProps {
  order: Orders;
}

export const TableActionMenu = ({ order }: TableActionMenuProps) => {
  const queryClient = useQueryClient();
  const { profile } = useAuth();
  const role = profile?.role;
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (id: string) => {
      await deleteOrder(id);
      toast.success('Success', {
        position: 'top-right',
      });
      setOpen(false);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: _err => {
      toast.error(_err.message, { position: 'top-right' });
    },
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEdit = () => {
    navigate({
      to: '/dashboard/orders/$orderId',
      params: { orderId: order.id },
    });
  };

  return (
    <div ref={ref} className="relative flex justify-end">
      <ConfirmModal
        open={modal}
        setOpen={setModal}
        mutate={() => {
          mutate(order.id);
        }}
      />
      <button
        onClick={e => {
          e.stopPropagation();
          setOpen(prev => !prev);
        }}
        className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 dark:text-slate-400 dark:hover:bg-slate-700 dark:hover:text-slate-200"
      >
        <MoreHorizontal size={16} />
      </button>

      {open && (
        <div className="absolute top-full right-0 z-50 min-w-32.5 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:shadow-slate-900/50">
          <button
            type="button"
            onClick={handleEdit}
            className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50 dark:text-slate-300 dark:hover:bg-slate-700/60"
          >
            <Pencil size={14} className="text-gray-400 dark:text-slate-400" />
            Edit
          </button>
          {role == 'admin' && (
            <button
              disabled={loading}
              type="button"
              onClick={() => {
                setModal(true);
              }}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-sm text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
            >
              <Trash2 size={14} />
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
};
