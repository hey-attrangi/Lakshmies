// All names, hospitals and records below are invented for demo purposes.

export const caregiver = { name: "Kavya Reddy", relation: "daughter" };
export const patient = { name: "Venkata Ramana Reddy", age: 71, abhaId: "91-4417-2093-XXXX" };

export type Hospital = { id: string; name: string; city: string; responds: boolean };

export const hospitals: Hospital[] = [
  { id: "h1", name: "Charminar Heart & Diabetes Centre", city: "Hyderabad", responds: true },
  { id: "h2", name: "Kakatiya Multispeciality Hospital", city: "Warangal", responds: true },
  { id: "h3", name: "Godavari Care Hospital", city: "Karimnagar", responds: false },
  { id: "h4", name: "Indur General Hospital", city: "Nizamabad", responds: true },
];

export type RequestStatus = "Sent" | "Waiting" | "Delivered" | "No response";
export type RecordRequest = { id: string; hospitalId: string; sentAt: string; status: RequestStatus };

export const seedRequests: RecordRequest[] = [
  { id: "r1", hospitalId: "h1", sentAt: "2026-09-28", status: "Delivered" },
  { id: "r2", hospitalId: "h3", sentAt: "2026-10-02", status: "No response" },
];

export type Provenance = "verified" | "uploaded" | "check";
export type Kind = "Condition" | "Medicine" | "Test" | "Visit";
export type TimelineItem = {
  id: string;
  date: string; // ISO yyyy-mm-dd
  kind: Kind;
  title: string;
  detail: string;
  provenance: Provenance;
};

export const seedTimeline: TimelineItem[] = [
  { id: "t1", date: "2019-06-14", kind: "Condition", title: "Type 2 diabetes", detail: "Diagnosed at Charminar Heart & Diabetes Centre", provenance: "verified" },
  { id: "t2", date: "2021-11-03", kind: "Condition", title: "Hypertension", detail: "Stage 1, on medication", provenance: "verified" },
  { id: "t3", date: "2025-12-18", kind: "Test", title: "HbA1c", detail: "7.4% — Kakatiya Multispeciality Hospital", provenance: "verified" },
  { id: "t4", date: "2026-03-12", kind: "Visit", title: "Cardiology follow-up", detail: "Dr. Srinivas Rao, Charminar Heart & Diabetes Centre", provenance: "verified" },
  { id: "t5", date: "2026-03-12", kind: "Medicine", title: "Amlodipine 5 mg", detail: "Once daily, morning", provenance: "verified" },
  { id: "t6", date: "2026-03-12", kind: "Medicine", title: "Metformin 500 mg", detail: "Twice daily, after meals", provenance: "verified" },
  { id: "t7", date: "2026-07-21", kind: "Test", title: "Lipid profile", detail: "LDL 118 mg/dL — photo of lab report", provenance: "uploaded" },
  { id: "t8", date: "2026-09-04", kind: "Medicine", title: "Amlodipine 10 mg", detail: "Read from prescription scan — dosage differs from hospital record", provenance: "check" },
];

export type MedicineClaim = {
  id: string;
  medicine: string;
  dosage: string;
  frequency: string;
  source: string;
  sourceType: "ABDM" | "Uploaded scan";
  date: string;
  confidence: number; // 0–100
};

// One conflict: hospital record is older; the uploaded scan is more recent.
export const seedConflict: { id: string; claims: [MedicineClaim, MedicineClaim] } = {
  id: "c1",
  claims: [
    { id: "m1", medicine: "Amlodipine", dosage: "5 mg", frequency: "Once daily", source: "Charminar Heart & Diabetes Centre", sourceType: "ABDM", date: "2026-03-12", confidence: 98 },
    { id: "m2", medicine: "Amlodipine", dosage: "10 mg", frequency: "Once daily", source: "Prescription scan uploaded by you", sourceType: "Uploaded scan", date: "2026-09-04", confidence: 78 },
  ],
};

export function formatDate(iso: string) {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}
