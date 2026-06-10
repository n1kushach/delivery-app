import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
import { CreateOrderSchema } from '@/schemas/create-order/create-order.schema';
import { addOrder, type TOrder } from '@/services/orders/orders.service';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IOrdersModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrdersModal = (props: IOrdersModal) => {
  const { open, setOpen } = props;
  const queryClient = useQueryClient();
  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (newOrder: TOrder) => {
      await addOrder(newOrder);
    },
    onMutate: async newOrder => {
      setOpen(false);
      await queryClient.cancelQueries({ queryKey: ['orders'] });

      const previousOrders = queryClient.getQueryData<TOrder[]>(['orders']);

      queryClient.setQueryData<TOrder[]>(['orders'], old => [
        newOrder,
        ...(old ?? []),
      ]);

      return { previousOrders };
    },
    onError: (_err, _newOrder, context) => {
      queryClient.setQueryData(['orders'], context?.previousOrders);
    },

    // Uncomment if refetch needed onSuccess
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ['orders'] });
    // },
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

  return (
    <Dialog open={open}>
      <DialogContent className="rounded-lg" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-center">Add new order</DialogTitle>
          <DialogDescription>
            <form
              className="py-4"
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
                              <SelectItem value="confirmed">
                                Confirmed
                              </SelectItem>
                              <SelectItem value="processing">
                                Processing
                              </SelectItem>
                              <SelectItem value="delivered">
                                Delivered
                              </SelectItem>
                              <SelectItem value="canceled">Canceled</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
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
                        <FieldLabel htmlFor={field.name}>
                          Total Price
                        </FieldLabel>
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
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex w-full items-center justify-between">
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
            <DialogClose asChild>
              <Button
                className="rounded-sm"
                variant={'secondary'}
                onClick={() => setOpen(false)}
                type="button"
              >
                Close
              </Button>
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrdersModal;
