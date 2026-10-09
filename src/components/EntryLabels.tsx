import { entryStatuses, entryTypes, type Entry } from "@/lib/work";

export function TypeAndPeriod({ entry }: { entry: Entry }) {
  return (
    <p className="font-mono text-xs uppercase tracking-wide text-muted">
      {entryTypes[entry.type]}
      {entry.period && <> · {entry.period}</>}
    </p>
  );
}

// Shown on anything that isn't finished, so placeholders never read as real work.
export function StatusTag({ entry }: { entry: Entry }) {
  if (entry.status === "ready") return null;
  const dashed = entry.status === "placeholder" ? "border-dashed" : "";
  return (
    <span className={`inline-block rounded border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted ${dashed}`}>
      {entryStatuses[entry.status]}
    </span>
  );
}
