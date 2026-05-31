import { useAuth } from "@/context/auth-context/use-auth";
import { useNavigate } from "@tanstack/react-router";

export function DashboardMainPage() {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      Hello "/dashboard/"!
      <button
        className="bg-blue-500 cursor-pointer"
        onClick={async () => {
          await signOut();
          navigate({ to: "/" });
        }}
      >
        Sign Out
      </button>
    </div>
  );
}
