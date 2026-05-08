import { createFileRoute, redirect } from "@tanstack/react-router";
import { useMonitorStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  component: IndexRedirect,
});

function IndexRedirect() {
  const monitor = useMonitorStore((s) => s.monitor);
  if (typeof window !== "undefined") {
    throw redirect({ to: monitor ? "/dashboard" : "/onboarding" });
  }
  return null;
}
