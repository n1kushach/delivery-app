import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Package,
  LayoutDashboard,
  Truck,
  ChevronUp,
  LogOut,
  User,
  Sun,
  Moon,
} from 'lucide-react';
import { useAuth } from '@/context/auth-context/use-auth';
import { Link, useLocation } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';

const adminNav = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Orders', icon: Package, to: '/dashboard/orders' },
];

export function AppSidebar() {
  const { signOut, session } = useAuth();
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex h-18 items-start justify-start border-b px-4 py-5">
        <div className="flex items-center gap-2">
          <div className="bg-foreground flex h-8 w-8 items-center justify-center rounded-lg">
            <Truck className="text-background h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">
            Delivery System
          </span>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {adminNav.map(({ label, icon: Icon, to }) => {
              const isActive = location.pathname === to;
              return (
                <SidebarMenuItem key={to}>
                  <SidebarMenuButton asChild isActive={isActive}>
                    <Link to={to}>
                      <Icon className="h-4 w-4" />
                      <span>{label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="h-auto py-2">
                  <div className="bg-muted flex h-7 w-7 items-center justify-center rounded-full">
                    <User className="text-muted-foreground h-4 w-4" />
                  </div>
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm leading-tight font-medium whitespace-nowrap">
                      {session?.user?.user_metadata?.name}
                    </span>
                  </div>
                  <ChevronUp className="text-muted-foreground ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" align="start" className="w-52">
                <DropdownMenuItem
                  onClick={() => {
                    setTheme(theme == 'dark' ? 'light' : 'dark');
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
