import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Newspaper,
  GitCompareArrows,
  TrendingUp,
  Settings,
  Activity,
  ChevronDown,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useMonitorStore } from "@/lib/store";

const items = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Daily Digest", url: "/digest", icon: Newspaper },
  { title: "Comparison", url: "/comparison", icon: GitCompareArrows },
  { title: "Keyword Trends", url: "/keywords", icon: TrendingUp },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const path = useRouterState({ select: (r) => r.location.pathname });
  const monitor = useMonitorStore((s) => s.monitor);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Activity className="h-4 w-4" />
          </div>
          {!collapsed && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold">PulseIntel</span>
              <span className="text-[10px] text-muted-foreground">Competitive intel</span>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild isActive={path === item.url} tooltip={item.title}>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Settings">
                  <Link to="/onboarding">
                    <Settings className="h-4 w-4" />
                    <span>Edit monitor</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="flex items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent/40 px-2 py-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-medium text-primary">
            {(monitor?.hostName ?? "PI").slice(0, 2).toUpperCase()}
          </div>
          {!collapsed && (
            <div className="flex min-w-0 flex-1 items-center justify-between">
              <div className="min-w-0">
                <p className="truncate text-xs font-medium">{monitor?.hostName ?? "No monitor"}</p>
                <p className="truncate text-[10px] text-muted-foreground">
                  {monitor?.competitors.length ?? 0} competitors
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
