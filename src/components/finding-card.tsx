import { formatDistanceToNow } from "date-fns";
import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  CategoryBadge,
  ChangeBadge,
  CompanyAvatar,
  ImportanceDots,
} from "./intel-badges";
import { companyById, type Finding } from "@/lib/mock-data";

export function FindingCard({
  finding,
  onClick,
  className,
}: {
  finding: Finding;
  onClick?: () => void;
  className?: string;
}) {
  const company = companyById(finding.companyId);
  return (
    <Card
      onClick={onClick}
      className={cn(
        "group cursor-pointer gap-0 p-4 transition-all hover:border-primary/40 hover:shadow-sm",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <CompanyAvatar name={company.name} color={company.color} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{company.name}</span>
            <span>·</span>
            <CategoryBadge category={finding.category} />
            <ChangeBadge type={finding.changeType} />
            <span className="ml-auto whitespace-nowrap">
              {formatDistanceToNow(new Date(finding.date), { addSuffix: true })}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground">
            {finding.title}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{finding.summary}</p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs">
            <a
              href={finding.sourceUrl}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="h-3 w-3" />
              {company.domain}
            </a>
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <span>Importance</span>
              <ImportanceDots value={finding.importance} />
            </div>
            <span className="text-muted-foreground">
              Confidence{" "}
              <span className="font-medium text-foreground">
                {Math.round(finding.confidence * 100)}%
              </span>
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
