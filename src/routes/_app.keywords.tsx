import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUp, ArrowDown, TrendingUp, Flame } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CompanyAvatar } from "@/components/intel-badges";
import { COMPANIES, KEYWORDS, companyById } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/keywords")({
  head: () => ({
    meta: [
      { title: "Keyword Trends — PulseIntel" },
      { name: "description", content: "Rising and trending keywords across competitors." },
    ],
  }),
  component: KeywordsPage,
});

function KeywordsPage() {
  const [companyFilter, setCompanyFilter] = useState("all");
  const [range, setRange] = useState("8w");
  const [selected, setSelected] = useState(KEYWORDS[0].keyword);

  const filtered = useMemo(() => {
    return KEYWORDS.filter(
      (k) => companyFilter === "all" || k.companyId === companyFilter,
    ).sort((a, b) => b.count - a.count);
  }, [companyFilter]);

  const maxCount = Math.max(...filtered.map((f) => f.count), 1);
  const rising = KEYWORDS.filter((k) => k.changePct >= 25).slice(0, 5);

  // chart for selected keyword across companies
  const chartData = useMemo(() => {
    const series = KEYWORDS.filter((k) => k.keyword === selected);
    if (series.length === 0) return [];
    const length = series[0].weekly.length;
    return Array.from({ length }, (_, i) => {
      const row: Record<string, number | string> = { week: `W${i + 1}` };
      series.forEach((s) => {
        row[companyById(s.companyId).name] = s.weekly[i];
      });
      return row;
    });
  }, [selected]);

  const chartCompanies = KEYWORDS.filter((k) => k.keyword === selected).map((s) =>
    companyById(s.companyId),
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Keyword trends</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            What competitors are writing, ranking, and talking about.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
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
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="h-8 w-[120px] text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="4w">Last 4 weeks</SelectItem>
              <SelectItem value="8w">Last 8 weeks</SelectItem>
              <SelectItem value="12w">Last 12 weeks</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Rising callout */}
      <Card className="gap-2 p-4">
        <div className="flex items-center gap-2">
          <Flame className="h-4 w-4 text-destructive" />
          <h3 className="text-sm font-semibold">Rising this week</h3>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {rising.map((r) => {
            const c = companyById(r.companyId);
            return (
              <button
                key={r.keyword + r.companyId}
                onClick={() => setSelected(r.keyword)}
                className="flex items-center gap-2 rounded-md border bg-background px-2.5 py-1.5 text-xs hover:border-primary/40"
              >
                <span className="font-medium">{r.keyword}</span>
                <span className="text-muted-foreground">· {c.name}</span>
                <Badge className="bg-success/15 text-success hover:bg-success/15">
                  <ArrowUp className="mr-0.5 h-3 w-3" />
                  {r.changePct}%
                </Badge>
              </button>
            );
          })}
        </div>
      </Card>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        {/* Ranked list */}
        <Card className="gap-0 p-0">
          <div className="border-b px-4 py-3">
            <h3 className="text-sm font-semibold">Top keywords</h3>
            <p className="text-xs text-muted-foreground">{filtered.length} tracked</p>
          </div>
          <ul className="divide-y">
            {filtered.map((k) => {
              const c = companyById(k.companyId);
              const isSelected = k.keyword === selected;
              const positive = k.changePct >= 0;
              return (
                <li key={k.keyword + k.companyId}>
                  <button
                    onClick={() => setSelected(k.keyword)}
                    className={cn(
                      "flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/40",
                      isSelected && "bg-primary/5",
                    )}
                  >
                    <CompanyAvatar name={c.name} color={c.color} size={24} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate text-sm font-medium">{k.keyword}</p>
                        <span
                          className={cn(
                            "flex items-center gap-0.5 text-xs font-medium",
                            positive ? "text-success" : "text-destructive",
                          )}
                        >
                          {positive ? (
                            <ArrowUp className="h-3 w-3" />
                          ) : (
                            <ArrowDown className="h-3 w-3" />
                          )}
                          {Math.abs(k.changePct)}%
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-2">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${(k.count / maxCount) * 100}%` }}
                          />
                        </div>
                        <span className="text-[11px] text-muted-foreground">
                          {k.count} · {c.name}
                        </span>
                      </div>
                    </div>
                    {k.changePct >= 25 && (
                      <Badge className="bg-destructive/10 text-destructive hover:bg-destructive/10">
                        Rising
                      </Badge>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Chart */}
        <Card className="gap-0 p-0">
          <div className="border-b px-4 py-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">"{selected}" — mentions over time</h3>
            </div>
            <p className="text-xs text-muted-foreground">
              Compared across {chartCompanies.length} {chartCompanies.length === 1 ? "company" : "companies"}
            </p>
          </div>
          <div className="h-72 p-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="week" tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                <YAxis tickLine={false} axisLine={false} fontSize={11} stroke="var(--color-muted-foreground)" />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-popover)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                {chartCompanies.map((c) => (
                  <Line
                    key={c.id}
                    type="monotone"
                    dataKey={c.name}
                    stroke={c.color}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 border-t px-4 py-2.5 text-xs">
            {chartCompanies.map((c) => (
              <div key={c.id} className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
