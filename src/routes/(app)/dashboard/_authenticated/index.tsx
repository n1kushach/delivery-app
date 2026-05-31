// src/routes/dashboard/_authenticated/index.tsx
import { DashboardMainPage } from "@/components/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/dashboard/_authenticated/")({
  component: DashboardMainPage,
});
