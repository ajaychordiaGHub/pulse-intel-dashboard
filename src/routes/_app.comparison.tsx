import { createFileRoute } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChangeBadge, CompanyAvatar } from "@/components/intel-badges";
import { FindingCard } from "@/components/finding-card";
import { SourceDrawer } from "@/components/source-drawer";
import {
  COMPANIES,
  FINDINGS,
  ROLLUP,
  companyById,
  type Finding,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/comparison")({
  head: () => ({
    meta: [
      { title: "Competitor Comparison — PulseIntel" },
      { name: "description", content: "Side-by-side view of competitor activity." },
    ],
  }),
  component: Comparison,
});

function MiniBars({ data }: { data: number[] }) {
  const max = Math.max(...data, 1);
  return (
    <div className="flex h-6 items-end gap-0.5">
      {data.map((v, i) => (
        <div
          key={i}
          className="w-1 rounded-sm bg-primary/70"
          style={{ height: `${(v / max) * 100}%` }}
        />
      ))}
    </div>
  );
}

function Comparison() {
  const [drawerCompany, setDrawerCompany] = useState<string | null>(null);
  const [finding, setFinding] = useState<Finding | null>(null);

  const companyFindings = drawerCompany
    ? FINDINGS.filter((f) => f.companyId === drawerCompany).slice(0, 6)
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold tracking-tight">Competitor comparison</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Click any row to inspect the latest activity for that competitor.
        </p>
      </div>

      <Card className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Company</th>
                <th className="px-4 py-3 text-left font-medium">Latest product</th>
                <th className="px-4 py-3 text-left font-medium">Pricing</th>
                <th className="px-4 py-3 text-left font-medium">Blog activity</th>
                <th className="px-4 py-3 text-left font-medium">News</th>
                <th className="px-4 py-3 text-left font-medium">Top keywords</th>
                <th className="px-4 py-3 text-left font-medium">Last scraped</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {ROLLUP.map((r) => {
                const c = companyById(r.companyId);
                return (
                  <tr
                    key={r.companyId}
                    onClick={() => setDrawerCompany(r.companyId)}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-muted/40",
                      c.isHost && "bg-primary/[0.04]",
                    )}
                  >
                    <td className="whitespace-nowrap px-4 py-3">
                      <div className="flex items-center gap-2">
                        <CompanyAvatar name={c.name} color={c.color} size={26} />
                        <div>
                          <p className="font-medium">{c.name}</p>
                          {c.isHost && (
                            <span className="text-[10px] font-medium text-primary">
                              Your company
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs">{r.latestProduct.label}</span>
                        <ChangeBadge type={r.latestProduct.type} className="w-fit" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <span className="text-xs">{r.pricing.label}</span>
                        <ChangeBadge type={r.pricing.type} className="w-fit" />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <MiniBars data={r.blogActivity.trend} />
                        <span className="text-xs font-medium">{r.blogActivity.count}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs font-medium">{r.newsMentions}</td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {r.topKeywords.map((k) => (
                          <Badge key={k} variant="secondary" className="text-[10px]">
                            {k}
                          </Badge>
                        ))}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(r.lastScraped), { addSuffix: true })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="text-xs text-muted-foreground">
        Tracking {ROLLUP.length} of {COMPANIES.length} companies in this monitor
      </div>

      <Sheet open={!!drawerCompany} onOpenChange={(o) => !o && setDrawerCompany(null)}>
        <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
          {drawerCompany && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <CompanyAvatar
                    name={companyById(drawerCompany).name}
                    color={companyById(drawerCompany).color}
                  />
                  {companyById(drawerCompany).name} — recent activity
                </SheetTitle>
              </SheetHeader>
              <div className="space-y-3 px-4 py-4">
                {companyFindings.map((f) => (
                  <FindingCard key={f.id} finding={f} onClick={() => setFinding(f)} />
                ))}
                {companyFindings.length === 0 && (
                  <p className="text-sm text-muted-foreground">No recent findings.</p>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <SourceDrawer finding={finding} onClose={() => setFinding(null)} />
    </div>
  );
}
