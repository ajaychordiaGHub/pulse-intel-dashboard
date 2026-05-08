import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  Plus,
  X,
  Boxes,
  Tag,
  FileText,
  Newspaper,
  Globe,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMonitorStore, type Frequency } from "@/lib/store";
import type { Category } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up monitor — PulseIntel" },
      { name: "description", content: "Create a competitive intelligence monitor in PulseIntel." },
    ],
  }),
  component: Onboarding,
});

const CATEGORY_OPTIONS: { id: Category; label: string; description: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: "product", label: "Product Changes", description: "New features, releases, deprecations", icon: Boxes },
  { id: "pricing", label: "Pricing Changes", description: "Plan, tier, and price updates", icon: Tag },
  { id: "blog", label: "Blogs", description: "Official blog and content posts", icon: FileText },
  { id: "news", label: "Market News", description: "Press, funding, partnerships", icon: Newspaper },
  { id: "website", label: "Website Changes", description: "Landing page and copy diffs", icon: Globe },
  { id: "keyword", label: "Keyword Trends", description: "Rising terms across competitors", icon: TrendingUp },
];

function Onboarding() {
  const navigate = useNavigate();
  const existing = useMonitorStore((s) => s.monitor);
  const setMonitor = useMonitorStore((s) => s.setMonitor);

  const [hostName, setHostName] = useState(existing?.hostName ?? "HubSpot");
  const [hostUrl, setHostUrl] = useState(existing?.hostUrl ?? "https://hubspot.com");
  const [competitors, setCompetitors] = useState(
    existing?.competitors ?? [
      { name: "Salesforce", url: "https://salesforce.com" },
      { name: "Zoho", url: "https://zoho.com" },
      { name: "Freshworks", url: "https://freshworks.com" },
      { name: "Intercom", url: "https://intercom.com" },
    ],
  );
  const [compName, setCompName] = useState("");
  const [compUrl, setCompUrl] = useState("");
  const [targets, setTargets] = useState<string[]>(existing?.targets ?? ["AI agents", "pricing changes", "Agentforce"]);
  const [targetInput, setTargetInput] = useState("");
  const [categories, setCategories] = useState<Category[]>(
    existing?.categories ?? ["product", "pricing", "blog", "news", "website", "keyword"],
  );
  const [frequency, setFrequency] = useState<Frequency>(existing?.frequency ?? "daily");

  const addCompetitor = () => {
    if (!compName.trim() || competitors.length >= 5) return;
    setCompetitors([...competitors, { name: compName.trim(), url: compUrl.trim() || `https://${compName.trim().toLowerCase()}.com` }]);
    setCompName("");
    setCompUrl("");
  };

  const addTarget = () => {
    if (!targetInput.trim()) return;
    setTargets([...targets, targetInput.trim()]);
    setTargetInput("");
  };

  const toggleCategory = (c: Category) => {
    setCategories((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]));
  };

  const submit = () => {
    if (!hostName.trim() || !hostUrl.trim()) {
      toast.error("Host company name and URL are required");
      return;
    }
    if (categories.length === 0) {
      toast.error("Select at least one category");
      return;
    }
    setMonitor({
      hostName: hostName.trim(),
      hostUrl: hostUrl.trim(),
      competitors,
      targets,
      categories,
      frequency,
      createdAt: new Date().toISOString(),
    });
    toast.success("Monitor created");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-svh bg-muted/30 pb-32">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-3xl items-center gap-2 px-6 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Activity className="h-4 w-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">PulseIntel</p>
            <p className="text-xs text-muted-foreground">Set up a new monitor</p>
          </div>
        </div>
      </header>

      <main className="mx-auto mt-8 max-w-3xl space-y-6 px-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Create a monitor</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Tell PulseIntel what to track. You can edit any of this later from Settings.
          </p>
        </div>

        {/* Host */}
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold">Your company</h2>
            <p className="text-xs text-muted-foreground">The host you want to benchmark against competitors.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="hn">Company name</Label>
              <Input id="hn" value={hostName} onChange={(e) => setHostName(e.target.value)} placeholder="Acme Inc." />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hu">Website URL</Label>
              <Input id="hu" value={hostUrl} onChange={(e) => setHostUrl(e.target.value)} placeholder="https://acme.com" />
            </div>
          </div>
        </Card>

        {/* Competitors */}
        <Card className="p-5">
          <div className="mb-4 flex items-baseline justify-between">
            <div>
              <h2 className="text-sm font-semibold">Competitors</h2>
              <p className="text-xs text-muted-foreground">Add up to 5 companies to track.</p>
            </div>
            <span className="text-xs text-muted-foreground">{competitors.length}/5</span>
          </div>

          <div className="space-y-2">
            {competitors.map((c, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md border bg-secondary/40 px-3 py-2">
                <div className="flex h-7 w-7 items-center justify-center rounded bg-primary/15 text-[11px] font-semibold text-primary">
                  {c.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{c.url}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCompetitors(competitors.filter((_, j) => j !== i))}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {competitors.length < 5 && (
            <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
              <Input
                value={compName}
                onChange={(e) => setCompName(e.target.value)}
                placeholder="Competitor name"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCompetitor())}
              />
              <Input
                value={compUrl}
                onChange={(e) => setCompUrl(e.target.value)}
                placeholder="https://example.com"
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCompetitor())}
              />
              <Button variant="outline" onClick={addCompetitor}>
                <Plus className="mr-1 h-4 w-4" /> Add
              </Button>
            </div>
          )}
        </Card>

        {/* Targets / keywords */}
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold">Target companies & keywords</h2>
            <p className="text-xs text-muted-foreground">Topics or accounts PulseIntel should watch across the web.</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {targets.map((t, i) => (
              <Badge key={i} variant="secondary" className="gap-1 px-2 py-1">
                {t}
                <button
                  onClick={() => setTargets(targets.filter((_, j) => j !== i))}
                  className="ml-0.5 rounded-sm opacity-60 hover:opacity-100"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            <Input
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTarget())}
              placeholder="e.g. agentic AI, pricing tier change…"
            />
            <Button variant="outline" onClick={addTarget}>
              <Plus className="mr-1 h-4 w-4" /> Add
            </Button>
          </div>
        </Card>

        {/* Categories */}
        <Card className="p-5">
          <div className="mb-4">
            <h2 className="text-sm font-semibold">What to monitor</h2>
            <p className="text-xs text-muted-foreground">Pick the signals you want to receive.</p>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            {CATEGORY_OPTIONS.map((opt) => {
              const active = categories.includes(opt.id);
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => toggleCategory(opt.id)}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border bg-card p-3 text-left transition-all",
                    active
                      ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                      : "hover:border-foreground/20 hover:bg-muted/40",
                  )}
                >
                  <div
                    className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-md",
                      active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{opt.label}</p>
                    <p className="text-xs text-muted-foreground">{opt.description}</p>
                  </div>
                  <div
                    className={cn(
                      "mt-0.5 h-4 w-4 shrink-0 rounded border",
                      active ? "border-primary bg-primary" : "border-border bg-background",
                    )}
                  >
                    {active && (
                      <svg viewBox="0 0 16 16" className="h-full w-full text-primary-foreground" fill="none">
                        <path d="M3.5 8.5l3 3 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </Card>

        {/* Frequency */}
        <Card className="p-5">
          <div className="mb-3">
            <h2 className="text-sm font-semibold">Crawl frequency</h2>
            <p className="text-xs text-muted-foreground">How often PulseIntel scans your selected sources.</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {(["manual", "daily", "weekly"] as Frequency[]).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFrequency(f)}
                className={cn(
                  "rounded-md border px-3 py-2 text-sm font-medium capitalize transition-all",
                  frequency === f
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:border-foreground/20 hover:bg-muted/40",
                )}
              >
                {f}
              </button>
            ))}
          </div>
        </Card>
      </main>

      {/* Sticky footer */}
      <div className="fixed inset-x-0 bottom-0 border-t bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-6 py-3">
          <p className="text-xs text-muted-foreground">
            Tracking {competitors.length} competitors across {categories.length} categories
          </p>
          <Button onClick={submit} size="lg">
            Start Monitoring <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
