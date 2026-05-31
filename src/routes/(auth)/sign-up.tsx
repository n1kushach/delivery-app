import { SignUpForm } from "@/components/sign-up/sign-up";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/sign-up")({
  component: SignUpForm,
});
