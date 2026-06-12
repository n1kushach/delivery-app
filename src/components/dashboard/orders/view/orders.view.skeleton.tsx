import { Field, FieldGroup } from '@/components/ui/field';
import { Skeleton } from '@/components/ui/skeleton';

export const OrdersViewSkeleton = () => {
  return (
    <div>
      <Skeleton className="mb-6 h-7 w-40" /> {/* Order - {orderId} title */}
      <div className="max-w-125 py-4">
        <FieldGroup>
          <Field>
            <Skeleton className="mb-1.5 h-3.5 w-16" />
            <Skeleton className="h-9 w-full" />
          </Field>
          <Field>
            <Skeleton className="mb-1.5 h-3.5 w-14" />
            <Skeleton className="h-9 w-full" />
          </Field>
          <Field>
            <Skeleton className="mb-1.5 h-3.5 w-8" />
            <Skeleton className="h-9 w-full" />
          </Field>
          <Field>
            <Skeleton className="mb-1.5 h-3.5 w-12" />
            <Skeleton className="h-9 w-full" />
          </Field>
          <Field>
            <Skeleton className="mb-1.5 h-3.5 w-12" />
            <Skeleton className="h-9 w-full" />
          </Field>
          <Field>
            <Skeleton className="mb-1.5 h-3.5 w-10" />
            <Skeleton className="h-9 w-full" />
          </Field>
          <Field>
            <Skeleton className="mb-1.5 h-3.5 w-20" />
            <Skeleton className="h-9 w-full" />
          </Field>
        </FieldGroup>
      </div>
    </div>
  );
};
