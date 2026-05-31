import { supabase } from "@/utils/supabase";
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/_authenticated")({
  beforeLoad: async ({ location }) => {
    console.log("TEST");
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      console.log(user, "user");

      if (error || !user) {
        throw redirect({
          to: "/",
          search: { redirect: location.href },
        });
      }

      return { user };
    } catch (error) {
      if (isRedirect(error)) throw error;

      throw redirect({
        to: "/",
        search: { redirect: location.href },
      });
    }
  },
  component: () => <Outlet />,
});
