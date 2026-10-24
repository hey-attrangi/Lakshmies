import { useRef } from "react";
import { Provenance, TimelineItem, formatDate } from "../data";

type Props = {
  items: TimelineItem[];
  setItems: React.Dispatch<React.SetStateAction<TimelineItem[]>>;
  onOpenConflict: () => void;
};

const chip: Record<Provenance, { label: string; cls: string }> = {
  verified: { label: "Verified - ABDM", cls: "bg-green-50 text-green-700" },
  uploaded: { label: "Uploaded by you", cls: "bg-slate-100 text-slate-600" },
  check: { label: "Needs check", cls: "bg-amber-50 text-amber-800" },
};

export default function TimelineScreen({ items, setItems, onOpenConflict }: Props) {
  const fileInput = useRef<HTMLInputElement>(null);
  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));

  function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const item: TimelineItem = {
      id: `u${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      kind: "Test",
      title: "Uploaded document",
      detail: file.name,
      provenance: "uploaded",
    };
    setItems((xs) => [...xs, item]);
    e.target.value = "";
  }

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Health timeline</h1>
          <p className="mt-1 text-sm text-slate-600">Oldest to newest</p>
        </div>
        <button onClick={() => fileInput.current?.click()} className="h-12 shrink-0 rounded-xl bg-blue-600 px-4 font-semibold text-white">
          + Upload
        </button>
        <input ref={fileInput} type="file" accept="image/*,application/pdf" className="hidden" onChange={onFile} />
      </header>

      <ol className="space-y-3 border-l-2 border-slate-200 pl-4">
        {sorted.map((it) => (
          <li key={it.id} className="relative rounded-xl border border-slate-200 p-4">
            <span className="absolute -left-[23px] top-5 h-3 w-3 rounded-full bg-slate-300" />
            <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
              <span>{it.kind} · {formatDate(it.date)}</span>
              <span className={`rounded-full px-2.5 py-1 font-medium ${chip[it.provenance].cls}`}>{chip[it.provenance].label}</span>
            </div>
            <p className="mt-2 font-medium">{it.title}</p>
            <p className="text-sm text-slate-600">{it.detail}</p>
            {it.provenance === "check" && (
              <button onClick={onOpenConflict} className="mt-3 h-11 w-full rounded-lg border border-amber-300 text-sm font-medium text-amber-800">
                Review conflict
              </button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
