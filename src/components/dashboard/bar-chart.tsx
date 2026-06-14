'use client';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

export const description = 'A bar chart';

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

interface IDashboardChart {
  data:
    | NoInfer<
        {
          city: string;
          total: number;
        }[]
      >
    | undefined;
}

export function DashboardChart(props: IDashboardChart) {
  const { data } = props;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Total price by cities</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart margin={{ bottom: 0 }} accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="city"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={value => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="total" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
