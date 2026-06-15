import { AppSidebar } from '@/components/dashboard/sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { supabase } from '@/utils/supabase';
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from '@tanstack/react-router';

export const Route = createFileRoute('/(app)/dashboard/_authenticated')({
  beforeLoad: async ({ location }) => {
    try {
      // getSession() reads from localStorage instantly (sync-like)
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        throw redirect({
          to: '/',
          search: { redirect: location.href },
        });
      }

      // Optionally verify with server (slower but more secure)
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        throw redirect({
          to: '/',
          search: { redirect: location.href },
        });
      }

      return { user };
    } catch (error) {
      if (isRedirect(error)) throw error;
      throw redirect({ to: '/', search: { redirect: location.href } });
    }
  },
  component: () => (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <main className="flex flex-1 flex-col">
          <div className="flex h-18 items-center border-b px-4">
            <SidebarTrigger />
          </div>
          <div className="relative flex-1 p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  ),
});
