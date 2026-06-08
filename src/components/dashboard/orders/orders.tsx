import OrdersModal from '@/components/dashboard/orders/orders.modal';
import OrdersTable from '@/components/dashboard/orders/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const OrdersPage = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <OrdersModal open={modal} setOpen={setModal} />
      <div className="flex justify-end">
        <Button
          className="cursor-pointer rounded-sm"
          type="button"
          onClick={() => setModal(true)}
          size="lg"
        >
          New
        </Button>
      </div>
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
