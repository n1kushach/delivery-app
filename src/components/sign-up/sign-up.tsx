import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/context/auth-context/use-auth';
import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useForm } from '@tanstack/react-form';
import { SignUpSchema } from '@/schemas/sign-up/sign-up.schema';
import { toast } from 'sonner';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Role } from '@/context/auth-context/auth-context-types';

interface SignUpFormValues {
  email: string;
  name: string;
  phone: string;
  role: Role;
  password: string;
  confirmPassword: string;
}

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signUpNewUser } = useAuth();

  const defaultValues: SignUpFormValues = {
    email: '',
    name: '',
    phone: '',
    role: 'customer',
    password: '',
    confirmPassword: '',
  };

  const form = useForm({
    defaultValues: defaultValues,
    validators: {
      onSubmitAsync: SignUpSchema,
    },
    onSubmit: async ({ value }) => {
      setLoading(true);
      const result = await signUpNewUser(
        value.email,
        value.password,
        value.name,
        value.phone,
        value.role
      );
      if (result.success) {
        navigate({ to: '/dashboard' });
      }
      if (!result.success) {
        toast.error(result.message, {
          position: 'top-right',
        });
      }
      setLoading(false);
    },
  });

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn('flex flex-col gap-6', className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Create a new account</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={e => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <FieldGroup>
                  <form.Field
                    name="email"
                    children={field => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
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
                            placeholder="sample@email.com"
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
                    name="name"
                    children={field => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
                            placeholder="John Doe"
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
                    name="role"
                    children={field => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                          <Select
                            value={field.state.value}
                            disabled={loading}
                            name={field.name}
                            autoComplete="off"
                            onValueChange={value => {
                              field.handleChange(value as Role);
                            }}
                          >
                            <SelectTrigger
                              onBlur={field.handleBlur}
                              aria-invalid={isInvalid}
                              className="w-full max-w-full"
                            >
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectItem value="customer">
                                  Customer
                                </SelectItem>
                                <SelectItem value="driver">Driver</SelectItem>
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

                  <Field>
                    <form.Field
                      name="password"
                      children={field => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Password
                            </FieldLabel>
                            <Input
                              disabled={loading}
                              id={field.name}
                              type="password"
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={e => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder=""
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </Field>
                  <Field>
                    <form.Field
                      name="confirmPassword"
                      children={field => {
                        const isInvalid =
                          field.state.meta.isTouched &&
                          !field.state.meta.isValid;
                        return (
                          <Field data-invalid={isInvalid}>
                            <FieldLabel htmlFor={field.name}>
                              Confirm password
                            </FieldLabel>
                            <Input
                              disabled={loading}
                              id={field.name}
                              type="password"
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={e => field.handleChange(e.target.value)}
                              aria-invalid={isInvalid}
                              placeholder=""
                              autoComplete="off"
                            />
                            {isInvalid && (
                              <FieldError errors={field.state.meta.errors} />
                            )}
                          </Field>
                        );
                      }}
                    />
                  </Field>
                  <Field>
                    <Button role="button" type="submit">
                      {loading ? 'Signing up' : 'Sign up'}
                    </Button>
                    <Button
                      role="button"
                      onClick={() => {
                        navigate({ to: '/' });
                      }}
                      variant="outline"
                      type="button"
                    >
                      Back to login
                    </Button>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
