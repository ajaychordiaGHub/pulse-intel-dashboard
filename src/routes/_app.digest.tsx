import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { format } from "date-fns";
import { ChevronDown, ChevronRight, Download, Share2, Copy, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CategoryBadge, ChangeBadge, CompanyAvatar } from "@/components/intel-badges";
import { CATEGORIES, FINDINGS, companyById, type Category } from "@/lib/mock-data";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/digest")({
  head: () => ({
    meta: [
      { title: "Daily Digest — PulseIntel" },
      { name: "description", content: "AI-summarized digest of today's competitive intelligence." },
    ],
  }),
  component: Digest,
});

function Digest() {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const today = new Date();

  const grouped = useMemo(() => {
    const byCat: Record<string, typeof FINDINGS> = {};
    FINDINGS.slice(0, 10).forEach((f) => {
      byCat[f.category] = byCat[f.category] ?? [];
      byCat[f.category].push(f);
    });
    return byCat;
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {format(today, "EEEE, MMMM d, yyyy")}
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight">Today's intelligence digest</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            10 notable changes across {Object.keys(grouped).length} categories
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => toast.success("Digest copied to clipboard")}>
            <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
          </Button>
          <Button variant="outline" size="sm" onClick={() => toast.success("Share link generated")}>
            <Share2 className="mr-1.5 h-3.5 w-3.5" /> Share
          </Button>
          <Button size="sm" onClick={() => toast.success("Exporting digest as PDF…")}>
            <Download className="mr-1.5 h-3.5 w-3.5" /> Export
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {CATEGORIES.map((cat) => {
          const items = grouped[cat.id];
          if (!items?.length) return null;
          const isCollapsed = collapsed[cat.id];
          return (
            <Card key={cat.id} className="gap-0 p-0">
              <button
                onClick={() => setCollapsed({ ...collapsed, [cat.id]: !isCollapsed })}
                className="flex w-full items-center justify-between border-b px-4 py-3 hover:bg-muted/40"
              >
                <div className="flex items-center gap-2">
                  {isCollapsed ? (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  )}
                  <CategoryBadge category={cat.id as Category} />
                  <span className="text-xs text-muted-foreground">{items.length} updates</span>
                </div>
                <Badge variant="secondary" className="text-[10px]">
                  AI summarized
                </Badge>
              </button>

              {!isCollapsed && (
                <div className="divide-y">
                  {items.map((f) => {
                    const company = companyById(f.companyId);
                    return (
                      <div key={f.id} className="flex gap-3 p-4">
                        <CompanyAvatar name={company.name} color={company.color} />
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-sm font-semibold">{company.name}</span>
                            <ChangeBadge type={f.changeType} />
                          </div>
                          <p className="mt-1 text-sm font-medium leading-snug text-foreground">
                            {f.title}
                          </p>
                          <p className="mt-1 text-sm text-muted-foreground">{f.summary}</p>
                          <a
                            href={f.sourceUrl}
                            target="_blank"
                            rel="noreferrer"
                            className={cn(
                              "mt-2 inline-flex items-center gap-1 text-xs text-primary hover:underline",
                            )}
                          >
                            <ExternalLink className="h-3 w-3" /> {company.domain}
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
