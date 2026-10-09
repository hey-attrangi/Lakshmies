"use client";

import { useState } from "react";

// Stand-in to prove interactive components work inside content. Delete once a real experiment exists.
export function PlaceholderToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      aria-pressed={on}
      className="rounded border border-line px-3 py-1.5 font-mono text-sm hover:border-fg"
    >
      {on ? "On" : "Off"}
    </button>
  );
}
