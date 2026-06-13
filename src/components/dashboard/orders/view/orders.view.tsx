import { CreateOrderSchema } from '@/schemas/create-order/create-order.schema';
import { useForm } from '@tanstack/react-form';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  fetchOrderById,
  updateOrder,
  type TOrder,
} from '@/services/orders/orders.service';
import { useLoaderData, useRouter } from '@tanstack/react-router';
import { useEffect } from 'react';
import DashboardError from '@/components/dashboard/error';
import { OrdersViewSkeleton } from '@/components/dashboard/orders/view/orders.view.skeleton';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const OrdersView = () => {
  const router = useRouter();
  const { orderId } = useLoaderData({
    from: '/(app)/dashboard/_authenticated/orders/$orderId/',
  });

  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (newOrder: TOrder) => {
      await updateOrder(orderId, newOrder);
      toast.success('Success', { position: 'top-right' });
      router.history.back();
    },
    onError: _err => {
      toast.error(_err.message, { position: 'top-right' });
    },
  });

  const {
    data,
    isLoading: isQueryLoading,
    error,
  } = useQuery({
    queryKey: ['orders', orderId],
    queryFn: () => fetchOrderById(orderId),
    enabled: !!orderId,
    retry: 0,
    refetchOnMount: 'always',
    staleTime: 0,
  });

  const form = useForm({
    defaultValues: {
      full_name: '',
      phone: '',
      address: '',
      city: '',
      status: '',
      notes: '',
      total_price: '',
    },
    validators: {
      onSubmitAsync: CreateOrderSchema,
    },
    onSubmit: async ({ value }) => {
      mutate({
        full_name: value.full_name,
        phone: value.phone,
        address: value.address,
        city: value.city,
        status: value.status,
        notes: value.notes,
        total_price: value.total_price,
      });
    },
  });

  useEffect(() => {
    if (!data) return;
    form.reset({
      full_name: data?.full_name,
      phone: data?.phone,
      address: data?.address,
      city: data?.city,
      status: data?.status,
      notes: data?.notes,
      total_price: data?.total_price.toString(),
    });
  }, [data, form]);

  if (isQueryLoading) return <OrdersViewSkeleton />;
  if (error) return <DashboardError message={error.message} variant="page" />;

  return (
    <div className="flex flex-col">
      <h1>Order - {orderId}</h1>
      <form
        className="max-w-125 py-4"
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <FieldGroup>
          <form.Field
            name="full_name"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                  <Input
                    disabled={loading}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => {
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="address"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Address</FieldLabel>
                  <Input
                    disabled={loading}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => {
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="city"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>City</FieldLabel>
                  <Input
                    disabled={loading}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => {
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="phone"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Phone</FieldLabel>
                  <Input
                    disabled={loading}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => {
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    placeholder="+995XXXXXXXXX"
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="status"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Status</FieldLabel>
                  <Select
                    key={field.state.value}
                    disabled={loading}
                    name={field.name}
                    value={field.state.value}
                    onValueChange={value => {
                      field.handleChange(value);
                      field.handleBlur();
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue id={field.name} />
                    </SelectTrigger>
                    <SelectContent aria-invalid={isInvalid}>
                      <SelectGroup>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="shipped">Shipped</SelectItem>
                        <SelectItem value="confirmed">Confirmed</SelectItem>
                        <SelectItem value="processing">Processing</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="notes"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Notes</FieldLabel>
                  <Input
                    disabled={loading}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => {
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="total_price"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Total Price</FieldLabel>
                  <Input
                    disabled={loading}
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={e => {
                      field.handleChange(e.target.value);
                    }}
                    aria-invalid={isInvalid}
                    autoComplete="off"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
        </FieldGroup>
        <div className="flex w-full items-center justify-between pt-4">
          <Button
            disabled={loading}
            className="rounded-sm"
            onClick={() => {
              form.handleSubmit();
            }}
            type="submit"
          >
            Submit
          </Button>
          <Button
            className="rounded-sm"
            variant={'secondary'}
            onClick={() => router.history.back()}
            type="button"
          >
            Close
          </Button>
        </div>
      </form>
    </div>
  );
};

export default OrdersView;
