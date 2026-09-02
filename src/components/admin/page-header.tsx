import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-wrap items-start justify-between gap-4 border-b border-border-primary pb-6">
      <div>
        <h1 className="text-3xl font-bold uppercase tracking-tight text-text-primary">{title}</h1>
        {description && <p className="mt-2 max-w-xl text-sm text-text-secondary">{description}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
