import { useState } from "react";
import { RecordRequest, TimelineItem, seedConflict, seedRequests, seedTimeline } from "./data";
import RequestScreen from "./components/RequestScreen";
import TimelineScreen from "./components/TimelineScreen";
import ConflictScreen, { Decision } from "./components/ConflictScreen";

type Screen = "request" | "timeline" | "conflict";
const tabs: { id: Screen; label: string }[] = [
  { id: "request", label: "Request" },
  { id: "timeline", label: "Timeline" },
  { id: "conflict", label: "Conflicts" },
];

export default function App() {
  const [screen, setScreen] = useState<Screen>("request");
  const [requests, setRequests] = useState<RecordRequest[]>(seedRequests);
  const [timeline, setTimeline] = useState<TimelineItem[]>(seedTimeline);
  const [decision, setDecision] = useState<Decision | null>(null);

  return (
    <div className="mx-auto flex min-h-screen max-w-[390px] flex-col bg-white text-slate-900">
      <main className="flex-1 px-4 pb-24 pt-6">
        {screen === "request" && <RequestScreen requests={requests} setRequests={setRequests} />}
        {screen === "timeline" && <TimelineScreen items={timeline} setItems={setTimeline} onOpenConflict={() => setScreen("conflict")} />}
        {screen === "conflict" && <ConflictScreen conflict={seedConflict} decision={decision} onDecide={setDecision} />}
      </main>
      <nav className="fixed inset-x-0 bottom-0 mx-auto flex max-w-[390px] border-t border-slate-200 bg-white">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setScreen(t.id)}
            className={`h-16 flex-1 text-sm font-medium ${screen === t.id ? "text-blue-600" : "text-slate-500"}`}
          >
            {t.label}
            {t.id === "conflict" && !decision && <span className="ml-1 inline-block h-2 w-2 rounded-full bg-amber-500 align-middle" />}
          </button>
        ))}
      </nav>
    </div>
  );
}
