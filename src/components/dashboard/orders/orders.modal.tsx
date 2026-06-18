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
import { getAllCustomers } from '@/services/orders/customers.service';
import { getAllDrivers } from '@/services/orders/drivers.service';
import { addOrder, type TOrder } from '@/services/orders/orders.service';
import { useForm } from '@tanstack/react-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface IOrdersModal {
  currentPage: number;
  postsPerPage: number;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const OrdersModal = (props: IOrdersModal) => {
  const { currentPage, postsPerPage, open, setOpen } = props;
  const queryClient = useQueryClient();
  const {
    data: customers,
    // isLoading: customersLoading,
    // error: customersError,
  } = useQuery({
    queryKey: ['customers'],
    queryFn: () => getAllCustomers(),
    enabled: open == true,
  });
  const {
    data: drivers,
    // isLoading: driversLoading,
    // error: driversError,
  } = useQuery({
    queryKey: ['drivers'],
    queryFn: () => getAllDrivers(),
    enabled: open == true,
  });
  const { mutate, isPending: loading } = useMutation({
    mutationFn: async (newOrder: TOrder) => {
      await addOrder(newOrder);
    },
    onMutate: async newOrder => {
      setOpen(false);
      await queryClient.cancelQueries({
        queryKey: ['orders', currentPage, postsPerPage],
      });

      const previousOrders = queryClient.getQueryData<{
        data: TOrder[];
        count: number;
      }>(['orders', currentPage, postsPerPage]);

      queryClient.setQueryData<{ data: TOrder[]; count: number }>(
        ['orders', currentPage, postsPerPage],
        old => ({
          data: [newOrder, ...(old?.data ?? [])],
          count: (old?.count ?? 0) + 1,
        })
      );
      return { previousOrders };
    },

    onError: (_err, _newOrder, context) => {
      queryClient.setQueryData(
        ['orders', currentPage, postsPerPage],
        context?.previousOrders
      );
      toast.error(_err.message, { position: 'top-right' });
    },
    onSuccess: () => {
      toast.success('Order added successfully', { position: 'top-right' });
      form.reset();
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
      driver: '',
      customer: '',
    },
    validators: {
      onSubmitAsync: CreateOrderSchema,
      onChangeAsync: CreateOrderSchema,
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
        driver_id: value.driver || null,
        customer_id: value.customer || null,
      });
    },
  });

  return (
    <Dialog open={open}>
      <DialogContent
        className="rounded-lg"
        style={{ maxWidth: '600px' }}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle className="text-center">Add new order</DialogTitle>
          <DialogDescription asChild>
            <div>
              <form className="py-4" onSubmit={e => e.preventDefault()}>
                <FieldGroup>
                  <div className="grid grid-cols-2 gap-x-4">
                    {/* LEFT COLUMN */}
                    <div className="flex flex-col gap-3">
                      <form.Field
                        name="full_name"
                        children={field => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Full name
                              </FieldLabel>
                              <Input
                                disabled={loading}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e =>
                                  field.handleChange(e.target.value)
                                }
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
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Phone
                              </FieldLabel>
                              <Input
                                disabled={loading}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e =>
                                  field.handleChange(e.target.value)
                                }
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
                        name="address"
                        children={field => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Address
                              </FieldLabel>
                              <Input
                                disabled={loading}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e =>
                                  field.handleChange(e.target.value)
                                }
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
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>City</FieldLabel>
                              <Input
                                disabled={loading}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e =>
                                  field.handleChange(e.target.value)
                                }
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
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Total price
                              </FieldLabel>
                              <Input
                                disabled={loading}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e =>
                                  field.handleChange(e.target.value)
                                }
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
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="flex flex-col gap-3">
                      <form.Field
                        name="status"
                        children={field => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Status
                              </FieldLabel>
                              <Select
                                disabled={loading}
                                name={field.name}
                                value={field.state.value}
                                onValueChange={value => {
                                  field.handleChange(value);
                                  field.handleBlur();
                                }}
                              >
                                <SelectTrigger
                                  onBlur={field.handleBlur}
                                  aria-invalid={isInvalid}
                                >
                                  <SelectValue
                                    id={field.name}
                                    placeholder="Select status"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="pending">
                                      Pending
                                    </SelectItem>
                                    <SelectItem value="shipped">
                                      Shipped
                                    </SelectItem>
                                    <SelectItem value="confirmed">
                                      Confirmed
                                    </SelectItem>
                                    <SelectItem value="processing">
                                      Processing
                                    </SelectItem>
                                    <SelectItem value="delivered">
                                      Delivered
                                    </SelectItem>
                                    <SelectItem value="canceled">
                                      Canceled
                                    </SelectItem>
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
                        name="customer"
                        children={field => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Customer
                              </FieldLabel>
                              <Select
                                disabled={loading}
                                name={field.name}
                                value={field.state.value}
                                onValueChange={value => {
                                  field.handleChange(
                                    value === 'none' ? '' : value
                                  );
                                  field.handleBlur();
                                }}
                              >
                                <SelectTrigger
                                  onBlur={field.handleBlur}
                                  aria-invalid={isInvalid}
                                >
                                  <SelectValue
                                    id={field.name}
                                    placeholder="Select customer"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="none">None</SelectItem>
                                    {customers?.map(item => (
                                      <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                      </SelectItem>
                                    ))}
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
                        name="driver"
                        children={field => {
                          const isInvalid =
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Driver
                              </FieldLabel>
                              <Select
                                disabled={loading}
                                name={field.name}
                                value={field.state.value}
                                onValueChange={value => {
                                  field.handleChange(
                                    value === 'none' ? '' : value
                                  );
                                  field.handleBlur();
                                }}
                              >
                                <SelectTrigger
                                  onBlur={field.handleBlur}
                                  aria-invalid={isInvalid}
                                >
                                  <SelectValue
                                    id={field.name}
                                    placeholder="Select driver"
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="none">None</SelectItem>
                                    {drivers?.map(item => (
                                      <SelectItem key={item.id} value={item.id}>
                                        {item.name}
                                      </SelectItem>
                                    ))}
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
                            field.state.meta.isTouched &&
                            !field.state.meta.isValid;
                          return (
                            <Field data-invalid={isInvalid}>
                              <FieldLabel htmlFor={field.name}>
                                Notes
                              </FieldLabel>
                              <Input
                                disabled={loading}
                                id={field.name}
                                name={field.name}
                                value={field.state.value}
                                onBlur={field.handleBlur}
                                onChange={e =>
                                  field.handleChange(e.target.value)
                                }
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
                    </div>
                  </div>
                </FieldGroup>
              </form>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex w-full items-center justify-between">
            <Button
              disabled={loading}
              className="rounded-sm"
              onClick={() => form.handleSubmit()}
              type="submit"
            >
              Submit
            </Button>
            <DialogClose asChild>
              <Button
                className="rounded-sm"
                variant="secondary"
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
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
