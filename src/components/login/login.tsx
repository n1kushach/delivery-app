import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useNavigate } from "@tanstack/react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
    loading: false,
    error: false,
  });
  const { signIn, setSession } = useAuth();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  const handleSignIn = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLogin((prev) => ({
      ...prev,
      loading: true,
    }));
    try {
      const result = await signIn(login.email, login.password);
      if (result.success) {
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      console.error(err);
      setLogin((prev) => ({
        ...prev,
        error: true,
      }));
    } finally {
      setLogin((prev) => ({
        ...prev,
        loading: false,
      }));
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => handleSignIn(e)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  onChange={(e) => {
                    setLogin((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }));
                  }}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  onChange={(e) => {
                    setLogin((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                  id="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/sign-up">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
            {login.error && (
              <p className="text-red-500 text-center">{login.error}</p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
