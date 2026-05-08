import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { Category, ChangeType } from "@/lib/mock-data";
import { categoryLabel } from "@/lib/mock-data";
import {
  Boxes,
  Tag,
  FileText,
  Newspaper,
  Globe,
  TrendingUp,
} from "lucide-react";

const categoryIcons: Record<Category, React.ComponentType<{ className?: string }>> = {
  product: Boxes,
  pricing: Tag,
  blog: FileText,
  news: Newspaper,
  website: Globe,
  keyword: TrendingUp,
};

export function CategoryBadge({ category, className }: { category: Category; className?: string }) {
  const Icon = categoryIcons[category];
  return (
    <Badge variant="outline" className={cn("gap-1 border-border bg-secondary text-secondary-foreground", className)}>
      <Icon className="h-3 w-3" />
      {categoryLabel(category)}
    </Badge>
  );
}

const changeStyles: Record<ChangeType, string> = {
  new: "bg-info/10 text-info border-info/30",
  changed: "bg-warning/15 text-warning-foreground border-warning/40",
  stable: "bg-muted text-muted-foreground border-border",
  "high-impact": "bg-destructive/10 text-destructive border-destructive/30",
};

const changeLabels: Record<ChangeType, string> = {
  new: "New",
  changed: "Changed",
  stable: "Stable",
  "high-impact": "High impact",
};

export function ChangeBadge({ type, className }: { type: ChangeType; className?: string }) {
  return (
    <Badge variant="outline" className={cn("font-medium", changeStyles[type], className)}>
      {changeLabels[type]}
    </Badge>
  );
}

export function ImportanceDots({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`Importance ${value} of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            i <= value
              ? value >= 4
                ? "bg-destructive"
                : value === 3
                  ? "bg-warning"
                  : "bg-primary"
              : "bg-border",
          )}
        />
      ))}
    </div>
  );
}

export function CompanyAvatar({ name, color, size = 28 }: { name: string; color?: string; size?: number }) {
  return (
    <div
      className="flex shrink-0 items-center justify-center rounded-md text-[11px] font-semibold text-white"
      style={{ width: size, height: size, backgroundColor: color ?? "var(--color-primary)" }}
      aria-hidden
    >
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}
