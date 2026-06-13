import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { routeTree } from './routeTree.gen';
import { AuthContextProvider } from '@/context/auth-context/auth-context-provider';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';

export const router = createRouter({
  routeTree,
  context: { session: undefined },
});

const queryClient = new QueryClient();

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="ui-theme">
        <AuthContextProvider>
          <RouterProvider router={router} />
        </AuthContextProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
