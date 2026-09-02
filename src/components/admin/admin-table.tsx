import Link from "next/link";
import type { ReactNode } from "react";

export type AdminTableColumn<T> = {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
};

export function AdminTable<T>({
  columns,
  rows,
  rowKey,
  rowHref,
  emptyMessage = "Nothing here yet.",
}: {
  columns: AdminTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  rowHref?: (row: T) => string;
  emptyMessage?: string;
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-[2px] border border-border-primary p-12 text-center text-sm text-text-tertiary">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[2px] border border-border-primary">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-border-primary">
            {columns.map((col) => (
              <th
                key={col.key}
                className="px-4 py-3 text-xs font-semibold uppercase tracking-widest text-text-tertiary"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-primary">
          {rows.map((row) => {
            const href = rowHref?.(row);
            return (
              <tr key={rowKey(row)} className="transition-colors hover:bg-neutral-900/[0.03]">
                {columns.map((col, i) => (
                  <td key={col.key} className={col.className ?? "px-4 py-3 align-middle"}>
                    {href && i === 0 ? (
                      <Link href={href} className="font-semibold text-text-primary hover:text-green-700">
                        {col.cell(row)}
                      </Link>
                    ) : (
                      col.cell(row)
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
