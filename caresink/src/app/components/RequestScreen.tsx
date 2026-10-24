import { useState } from "react";
import { RecordRequest, RequestStatus, caregiver, formatDate, hospitals, patient } from "../data";

type Props = {
  requests: RecordRequest[];
  setRequests: React.Dispatch<React.SetStateAction<RecordRequest[]>>;
};

const statusStyle: Record<RequestStatus, string> = {
  Sent: "bg-blue-50 text-blue-700",
  Waiting: "bg-slate-100 text-slate-700",
  Delivered: "bg-green-50 text-green-700",
  "No response": "bg-amber-50 text-amber-800",
};

export default function RequestScreen({ requests, setRequests }: Props) {
  const [picked, setPicked] = useState<string | null>(null);
  const [authorised, setAuthorised] = useState(false);

  function send() {
    const hospital = hospitals.find((h) => h.id === picked);
    if (!hospital || !authorised) return;
    const id = `r${Date.now()}`;
    const update = (status: RequestStatus) =>
      setRequests((rs) => rs.map((r) => (r.id === id ? { ...r, status } : r)));
    setRequests((rs) => [{ id, hospitalId: hospital.id, sentAt: new Date().toISOString().slice(0, 10), status: "Sent" }, ...rs]);
    setTimeout(() => update("Waiting"), 1500);
    setTimeout(() => update(hospital.responds ? "Delivered" : "No response"), 4500);
    setPicked(null);
    setAuthorised(false);
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold">Request records</h1>
        <p className="mt-1 text-sm text-slate-600">For {patient.name}, {patient.age} · ABHA {patient.abhaId}</p>
      </header>

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-slate-500">ABDM-linked hospitals</h2>
        {hospitals.map((h) => (
          <button
            key={h.id}
            onClick={() => setPicked(h.id)}
            className={`flex min-h-16 w-full items-center justify-between rounded-xl border px-4 py-3 text-left ${picked === h.id ? "border-blue-600 ring-2 ring-blue-600" : "border-slate-200"}`}
          >
            <span>
              <span className="block font-medium">{h.name}</span>
              <span className="block text-sm text-slate-500">{h.city}, Telangana</span>
            </span>
            <span className="shrink-0 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">✓ Verified</span>
          </button>
        ))}
      </section>

      {picked && (
        <section className="space-y-4 rounded-xl bg-slate-50 p-4">
          <label className="flex min-h-12 cursor-pointer items-start gap-3">
            <input type="checkbox" checked={authorised} onChange={(e) => setAuthorised(e.target.checked)} className="mt-1 h-6 w-6 shrink-0 accent-blue-600" />
            <span className="text-sm">
              I, {caregiver.name}, confirm I am authorised to act for my father, {patient.name}, and request his records.
            </span>
          </label>
          <button
            onClick={send}
            disabled={!authorised}
            className="h-14 w-full rounded-xl bg-blue-600 font-semibold text-white disabled:bg-slate-300"
          >
            Send request
          </button>
        </section>
      )}

      <section className="space-y-2">
        <h2 className="text-sm font-medium text-slate-500">Your requests</h2>
        {requests.map((r) => (
          <div key={r.id} className="flex items-center justify-between rounded-xl border border-slate-200 px-4 py-3">
            <span>
              <span className="block text-sm font-medium">{hospitals.find((h) => h.id === r.hospitalId)?.name}</span>
              <span className="block text-xs text-slate-500">Sent {formatDate(r.sentAt)}</span>
            </span>
            <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[r.status]}`}>{r.status}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
