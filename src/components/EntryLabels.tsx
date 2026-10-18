import { entryStatuses, entryTypes, type Entry } from "@/lib/work";

// The muted line above each entry: its period if set, otherwise its type.
export function Dateline({ entry }: { entry: Entry }) {
  return <p className="text-2xl text-muted">{entry.period ?? entryTypes[entry.type]}</p>;
}

// Shown on anything that isn't finished, so placeholders never read as real work.
export function StatusTag({ entry }: { entry: Entry }) {
  if (entry.status === "ready") return null;
  const dashed = entry.status === "placeholder" ? "border-dashed" : "";
  return (
    <span
      className={`ml-3 inline-block translate-y-[-0.2em] rounded border border-line px-1.5 py-0.5 align-middle font-mono text-[11px] leading-none text-muted ${dashed}`}
    >
      {entryStatuses[entry.status]}
    </span>
  );
}
