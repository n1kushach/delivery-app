import { DashboardChart } from '@/components/dashboard/bar-chart';
import DashboardInfoCard from '@/components/dashboard/dashboard-info-card';
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
    queryFn: () => fetchOrders(1, 100),
    retry: false,
    select: (orders: { data: Orders[]; count: number }) => {
      const totals: Record<string, number> = {};
      const deliveryCounts = orders?.data?.reduce(
        (acc: Record<string, number>, order) => {
          acc[order.full_name] = (acc[order.full_name] || 0) + 1;
          return acc;
        },
        {}
      );
      const totalRevenue = orders?.data.reduce(
        (acc, order) => acc + order.total_price,
        0
      );
      const cityCounts = orders?.data.reduce(
        (acc: Record<string, number>, order) => {
          acc[order.city] = (acc[order.city] || 0) + 1;
          return acc;
        },
        {}
      );
      const topUser = Object.entries(deliveryCounts).sort(
        ([, a], [, b]) => b - a
      )[0];
      for (const order of orders.data) {
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
        <DashboardInfoCard
          top="Top customer"
          mid={data?.topUser.name as string}
          bottom={`${data?.topUser.numberOfDeliveries} orders`}
        />
        <DashboardInfoCard
          top="Top city"
          mid={data?.topCity.name as string}
          bottom={`${data?.topCity.numberOfOrders} orders`}
        />
        <DashboardInfoCard
          top="Total revenue"
          mid={`$${data?.totalRevenue.toLocaleString()}`}
          bottom={`All orders completed`}
        />

        <div className="border-border bg-card rounded-xl border p-5">
          <DashboardChart data={data?.barChart} />
        </div>
      </div>
    </div>
  );
}
