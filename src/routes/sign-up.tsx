import { SignUpForm } from "@/components/sign-up/sign-up";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-up")({
  component: SignUpForm,
});
