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
import { handleSignIn, type Login } from "@/components/login/login-utils";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [login, setLogin] = useState<Login>({
    email: "",
    password: "",
    loading: false,
    error: false,
    errorMessage: "",
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
          <form
            onSubmit={(e) =>
              handleSignIn(
                e,
                setLogin,
                login.email,
                login.password,
                signIn,
                navigate,
              )
            }
          >
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  onChange={(e) => {
                    setLogin((prev) => ({
                      ...prev,
                      email: e.target.value,
                      error: false,
                      errorMessage: "",
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
                      error: false,
                      errorMessage: "",
                    }));
                  }}
                  id="password"
                  type="password"
                  required
                />
              </Field>
              <Field>
                <Button type="submit">Login</Button>
                {login.error && (
                  <p className="text-red-500 text-center">
                    {login.errorMessage}
                  </p>
                )}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/sign-up">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
