import { DashboardChart } from '@/components/dashboard/bar-chart';
import DashboardError from '@/components/dashboard/error';
import PageLoader from '@/components/page-loader';
import { fetchOrders } from '@/services/orders/orders.service';
import type { Orders } from '@/types/orders.types';
import { useQuery } from '@tanstack/react-query';

export function DashboardMainPage() {
  const {
    data,
    isLoading: loading,
    error,
  } = useQuery({
    queryKey: ['orders-chart'],
    queryFn: fetchOrders,
    retry: false,
    select: (orders: Orders[]) => {
      const totals: Record<string, number> = {};

      const deliveryCounts = orders.reduce(
        (acc: Record<string, number>, order) => {
          acc[order.full_name] = (acc[order.full_name] || 0) + 1;
          return acc;
        },
        {}
      );
      const totalRevenue = orders.reduce(
        (acc, order) => acc + order.total_price,
        0
      );

      const cityCounts = orders.reduce((acc: Record<string, number>, order) => {
        acc[order.city] = (acc[order.city] || 0) + 1;
        return acc;
      }, {});

      const topUser = Object.entries(deliveryCounts).sort(
        ([, a], [, b]) => b - a
      )[0];
      for (const order of orders) {
        totals[order.city] = (totals[order.city] || 0) + order.total_price;
      }
      const topCity = Object.entries(cityCounts).sort(
        ([, a], [, b]) => b - a
      )[0];

      return {
        barChart: Object.entries(totals).map(([city, total]) => ({
          city,
          total,
        })),
        topUser: {
          name: topUser[0],
          numberOfDeliveries: topUser[1],
        },
        topCity: { name: topCity[0], numberOfOrders: topCity[1] },
        totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      };
    },
  });

  console.log(data, 'DATA');

  if (loading) return <PageLoader />;
  if (error) return <DashboardError message={error.message} variant="page" />;

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <PageLoader />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-3">
        <div className="border-border bg-card rounded-xl border p-5">
          <p className="text-muted-foreground text-sm">Top customer</p>
          <p className="mt-1 truncate text-xl font-medium">
            {data?.topUser.name}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            {data?.topUser.numberOfDeliveries} orders
          </p>
        </div>

        <div className="border-border bg-card rounded-xl border p-5">
          <p className="text-muted-foreground text-sm">Top city</p>
          <p className="mt-1 text-xl font-medium">{data?.topCity.name}</p>
          <p className="text-muted-foreground mt-1 text-sm">
            {data?.topCity.numberOfOrders} orders
          </p>
        </div>

        <div className="border-border bg-card rounded-xl border p-5">
          <p className="text-muted-foreground text-sm">Total revenue</p>
          <p className="mt-1 text-xl font-medium">
            ${data?.totalRevenue.toLocaleString()}
          </p>
          <p className="text-muted-foreground mt-1 text-sm">
            All orders combined
          </p>
        </div>
        <div className="border-border bg-card rounded-xl border p-5">
          <DashboardChart data={data?.barChart} />
        </div>
      </div>
    </div>
  );
}
