import { MedicineClaim, caregiver, formatDate, seedConflict } from "../data";

export type Decision = { by: string; chosen: MedicineClaim; at: Date };

type Props = {
  conflict: typeof seedConflict;
  decision: Decision | null;
  onDecide: (d: Decision) => void;
};

// >=95 confirmed · 50–95 needs check · <50 unknown (no value is shown, never guessed).
// The 50–70 band is not separately defined, so it is treated as "Needs check".
function band(c: number) {
  if (c >= 95) return { label: "Confirmed", cls: "bg-green-50 text-green-700", known: true };
  if (c >= 50) return { label: "Needs check", cls: "bg-amber-50 text-amber-800", known: true };
  return { label: "Unknown", cls: "bg-slate-100 text-slate-600", known: false };
}

function ClaimCard({ claim, chosen, onPick }: { claim: MedicineClaim; chosen: boolean; onPick?: () => void }) {
  const b = band(claim.confidence);
  return (
    <div className={`flex flex-col rounded-xl border p-3 ${chosen ? "border-blue-600 ring-2 ring-blue-600" : "border-slate-200"}`}>
      <span className={`self-start rounded-full px-2 py-0.5 text-xs font-medium ${claim.sourceType === "ABDM" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-600"}`}>
        {claim.sourceType === "ABDM" ? "Verified - ABDM" : "Uploaded by you"}
      </span>
      <p className="mt-3 text-2xl font-semibold">{b.known ? claim.dosage : "Unknown"}</p>
      <p className="text-sm text-slate-600">{claim.frequency}</p>
      <dl className="mt-3 space-y-1 text-xs text-slate-500">
        <div><dt className="inline">Source: </dt><dd className="inline text-slate-700">{claim.source}</dd></div>
        <div><dt className="inline">Date: </dt><dd className="inline text-slate-700">{formatDate(claim.date)}</dd></div>
        <div>
          <dt className="inline">Confidence: </dt>
          <dd className="inline font-medium text-slate-700">{b.known ? `${claim.confidence}%` : "Unknown"}</dd>
        </div>
      </dl>
      <span className={`mt-2 self-start rounded-full px-2 py-0.5 text-xs font-medium ${b.cls}`}>{b.label}</span>
      <div className="flex-1" />
      {onPick && (
        <button onClick={onPick} disabled={!b.known} className="mt-4 h-12 w-full rounded-lg bg-blue-600 text-sm font-semibold text-white disabled:bg-slate-300">
          Trust this
        </button>
      )}
    </div>
  );
}

export default function ConflictScreen({ conflict, decision, onDecide }: Props) {
  const [a, b] = conflict.claims;
  const pick = (chosen: MedicineClaim) => onDecide({ by: `${caregiver.name} (${caregiver.relation})`, chosen, at: new Date() });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Dosage conflict</h1>
        <p className="mt-1 text-sm text-slate-600">
          Two records list {a.medicine} at different doses. Neither has been changed. Choose which source to trust.
        </p>
      </header>

      <div className="grid grid-cols-2 gap-3">
        {[a, b].map((c) => (
          <ClaimCard key={c.id} claim={c} chosen={decision?.chosen.id === c.id} onPick={decision ? undefined : () => pick(c)} />
        ))}
      </div>

      {decision && (
        <p className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-slate-800">
          <span className="font-semibold">Decision recorded:</span> {decision.by} chose {decision.chosen.medicine}{" "}
          {decision.chosen.dosage} {decision.chosen.frequency.toLowerCase()} from {decision.chosen.source} on{" "}
          {decision.at.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Kolkata" })} IST.
        </p>
      )}
      <p className="text-xs text-slate-500">Please confirm any dosage change with his doctor.</p>
    </div>
  );
}
