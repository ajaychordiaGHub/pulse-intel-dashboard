import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Bell, Search, RefreshCw } from "lucide-react";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { useMonitorStore } from "@/lib/store";
import { format } from "date-fns";
import { toast } from "sonner";

export const Route = createFileRoute("/_app")({
  component: AppLayout,
});

const TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/digest": "Daily Digest",
  "/comparison": "Competitor Comparison",
  "/keywords": "Keyword Trends",
};

function AppLayout() {
  const monitor = useMonitorStore((s) => s.monitor);
  const path = useRouterState({ select: (r) => r.location.pathname });
  const title = TITLES[path] ?? "PulseIntel";

  return (
    <SidebarProvider>
      <div className="flex min-h-svh w-full bg-background">
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/95 px-4 backdrop-blur">
            <SidebarTrigger className="-ml-1" />
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-semibold">{title}</h1>
              <span className="hidden text-xs text-muted-foreground sm:inline">·</span>
              <span className="hidden text-xs text-muted-foreground sm:inline">
                {monitor?.hostName ?? "PulseIntel"} workspace
              </span>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search findings…"
                  className="h-8 w-64 pl-8 text-sm"
                />
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toast.success(`Last sync ${format(new Date(), "p")}`)}
              >
                <RefreshCw className="mr-1.5 h-3.5 w-3.5" /> Run scan
              </Button>
              <Button size="icon" variant="ghost" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-destructive" />
              </Button>
            </div>
          </header>
          <div className="flex-1 p-4 sm:p-6">
            <Outlet />
          </div>
        </SidebarInset>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
