import OrdersModal from '@/components/dashboard/orders/orders.modal';
import OrdersTable from '@/components/dashboard/orders/table';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const OrdersPage = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <OrdersModal open={modal} setOpen={setModal} />
      <div className="flex justify-between">
        <h1 className="font-mono">Orders</h1>
        <div>
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
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
