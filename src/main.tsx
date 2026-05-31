import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import "./index.css";
import { routeTree } from "./routeTree.gen";
import { AuthContextProvider } from "@/context/auth-context/auth-context-provider";
import { Toaster } from "@/components/ui/sonner";

export const router = createRouter({
  routeTree,
  context: { session: undefined },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
    <Toaster />
  </StrictMode>,
);
