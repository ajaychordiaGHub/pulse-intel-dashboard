import { formatDistanceToNow } from "date-fns";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CategoryBadge,
  ChangeBadge,
  CompanyAvatar,
  ImportanceDots,
} from "./intel-badges";
import { companyById, type Finding } from "@/lib/mock-data";

export function SourceDrawer({
  finding,
  onClose,
}: {
  finding: Finding | null;
  onClose: () => void;
}) {
  const open = !!finding;
  const company = finding ? companyById(finding.companyId) : null;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        {finding && company && (
          <>
            <SheetHeader className="space-y-3 text-left">
              <div className="flex items-center gap-2">
                <CompanyAvatar name={company.name} color={company.color} />
                <div className="min-w-0">
                  <p className="text-sm font-medium">{company.name}</p>
                  <p className="text-xs text-muted-foreground">{company.domain}</p>
                </div>
              </div>
              <SheetTitle className="text-base leading-snug">{finding.title}</SheetTitle>
              <SheetDescription className="text-sm leading-relaxed text-foreground/80">
                {finding.summary}
              </SheetDescription>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <CategoryBadge category={finding.category} />
                <ChangeBadge type={finding.changeType} />
              </div>
            </SheetHeader>

            <Separator className="my-5" />

            <div className="space-y-5 px-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-md border bg-muted/40 p-3">
                  <p className="text-muted-foreground">Importance</p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <ImportanceDots value={finding.importance} />
                    <span className="font-medium">{finding.importance}/5</span>
                  </div>
                </div>
                <div className="rounded-md border bg-muted/40 p-3">
                  <p className="text-muted-foreground">Confidence</p>
                  <p className="mt-1.5 text-base font-semibold">
                    {Math.round(finding.confidence * 100)}%
                  </p>
                </div>
                <div className="rounded-md border bg-muted/40 p-3">
                  <p className="text-muted-foreground">Detected</p>
                  <p className="mt-1.5 text-sm font-medium">
                    {formatDistanceToNow(new Date(finding.date), { addSuffix: true })}
                  </p>
                </div>
                <div className="rounded-md border bg-muted/40 p-3">
                  <p className="text-muted-foreground">Source</p>
                  <p className="mt-1.5 truncate text-sm font-medium">{company.domain}</p>
                </div>
              </div>

              {finding.excerpt && (
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Source excerpt
                  </p>
                  <blockquote className="rounded-md border-l-2 border-primary bg-secondary/60 px-3 py-2 text-sm italic text-foreground/80">
                    {finding.excerpt}
                  </blockquote>
                </div>
              )}

              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Page preview
                </p>
                <div className="flex h-40 items-center justify-center rounded-md border bg-gradient-to-br from-muted to-secondary text-xs text-muted-foreground">
                  Screenshot preview unavailable in prototype
                </div>
              </div>

              <div className="flex gap-2">
                <Button asChild className="flex-1">
                  <a href={finding.sourceUrl} target="_blank" rel="noreferrer">
                    Open source <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                </Button>
                <Button variant="outline" className="flex-1">
                  Save to report <ArrowUpRight className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
