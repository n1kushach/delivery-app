import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/auth-context/use-auth";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import { useNavigate } from "@tanstack/react-router";
import { handleSignUp, type SignUp } from "@/components/sign-up/sign-up-utils";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState<SignUp>({
    email: "",
    password: "",
    loading: false,
    error: false,
  });
  const { signUpNewUser, setSession } = useAuth();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6", className)} {...props}>
          <Card>
            <CardHeader>
              <CardTitle>Create a new account</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) =>
                  handleSignUp(
                    e,
                    signUpNewUser,
                    signUp.email,
                    signUp.password,
                    setSignUp,
                    navigate,
                  )
                }
              >
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      onChange={(e) => {
                        setSignUp((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }));
                      }}
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                    />
                  </Field>
                  <Field>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                    </div>
                    <Input
                      onChange={(e) => {
                        setSignUp((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }));
                      }}
                      id="password"
                      type="password"
                    />
                  </Field>
                  <Field>
                    <Button type="submit">Sign up</Button>
                    <Button
                      onClick={() => {
                        navigate({ to: "/" });
                      }}
                      variant="outline"
                      type="button"
                    >
                      Back to login
                    </Button>
                  </Field>
                </FieldGroup>
                {signUp.error && (
                  <p className="text-red-500 text-center">{signUp.error}</p>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
