import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Boxes,
  Tag,
  FileText,
  Newspaper,
  Globe,
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Filter,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FindingCard } from "@/components/finding-card";
import { SourceDrawer } from "@/components/source-drawer";
import {
  CATEGORIES,
  COMPANIES,
  FINDINGS,
  type Category,
  type Finding,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — PulseIntel" },
      { name: "description", content: "Track competitor product, pricing, news, and website changes." },
    ],
  }),
  component: Dashboard,
});

const KPI = [
  { id: "product" as Category, label: "Product Updates", icon: Boxes, value: 14, delta: +4, color: "text-info" },
  { id: "pricing" as Category, label: "Pricing Changes", icon: Tag, value: 3, delta: +2, color: "text-destructive" },
  { id: "news" as Category, label: "News Mentions", icon: Newspaper, value: 28, delta: +9, color: "text-foreground" },
  { id: "website" as Category, label: "Website Changes", icon: Globe, value: 7, delta: -1, color: "text-warning" },
  { id: "keyword" as Category, label: "Rising Keywords", icon: TrendingUp, value: 11, delta: +5, color: "text-success" },
];

function Sparkline({ data, color = "currentColor" }: { data: number[]; color?: string }) {
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 60;
      const y = 18 - ((v - min) / range) * 16;
      return `${x},${y}`;
    })
    .join(" ");
  return (
    <svg viewBox="0 0 60 20" className="h-5 w-16" fill="none">
      <polyline points={points} stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Dashboard() {
  const [active, setActive] = useState<Category | "all">("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");
  const [importance, setImportance] = useState<string>("0");
  const [drawer, setDrawer] = useState<Finding | null>(null);

  const filtered = useMemo(() => {
    return FINDINGS.filter(
      (f) =>
        (active === "all" || f.category === active) &&
        (companyFilter === "all" || f.companyId === companyFilter) &&
        f.importance >= Number(importance),
    ).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [active, companyFilter, importance]);

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        {KPI.map((k) => {
          const Icon = k.icon;
          const positive = k.delta >= 0;
          return (
            <Card key={k.id} className="gap-0 p-4">
              <div className="flex items-center justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-muted text-muted-foreground">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <Sparkline
                  data={[2, 4, 3, 6, 5, 7, 9, k.value]}
                  color="var(--color-primary)"
                />
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{k.label}</p>
              <div className="mt-1 flex items-baseline gap-2">
                <p className="text-2xl font-semibold tracking-tight">{k.value}</p>
                <span
                  className={cn(
                    "flex items-center gap-0.5 text-xs font-medium",
                    positive ? "text-success" : "text-destructive",
                  )}
                >
                  {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                  {Math.abs(k.delta)}
                </span>
                <span className="text-[10px] text-muted-foreground">vs last week</span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tabs + filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <Tabs value={active} onValueChange={(v) => setActive(v as Category | "all")}>
          <TabsList className="h-9 overflow-x-auto">
            <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
            {CATEGORIES.map((c) => (
              <TabsTrigger key={c.id} value={c.id} className="text-xs">
                {c.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-wrap items-center gap-2">
          <Filter className="h-3.5 w-3.5 text-muted-foreground" />
          <Select value={companyFilter} onValueChange={setCompanyFilter}>
            <SelectTrigger className="h-8 w-[150px] text-xs">
              <SelectValue placeholder="Company" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All companies</SelectItem>
              {COMPANIES.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={importance} onValueChange={setImportance}>
            <SelectTrigger className="h-8 w-[140px] text-xs">
              <SelectValue placeholder="Importance" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">Any importance</SelectItem>
              <SelectItem value="3">Importance ≥ 3</SelectItem>
              <SelectItem value="4">Importance ≥ 4</SelectItem>
              <SelectItem value="5">High impact only</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="7d">
            <SelectTrigger className="h-8 w-[120px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            Save view
          </Button>
        </div>
      </div>

      {/* Findings */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Latest findings</h2>
        <Badge variant="secondary">{filtered.length} results</Badge>
      </div>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center gap-2 p-12 text-center">
          <FileText className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm font-medium">No findings match your filters</p>
          <p className="text-xs text-muted-foreground">Try widening the category, company, or importance.</p>
        </Card>
      ) : (
        <div className="grid gap-3">
          {filtered.map((f) => (
            <FindingCard key={f.id} finding={f} onClick={() => setDrawer(f)} />
          ))}
        </div>
      )}

      <SourceDrawer finding={drawer} onClose={() => setDrawer(null)} />
    </div>
  );
}
