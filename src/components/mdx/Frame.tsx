import type { ReactNode } from "react";

// Bordered area for embedding a prototype, image or experiment inside an entry.
export function Frame({ caption, children }: { caption?: string; children: ReactNode }) {
  return (
    <figure className="my-8">
      <div className="rounded-md border border-line p-6">{children}</div>
      {caption && <figcaption className="mt-2 font-mono text-xs text-muted">{caption}</figcaption>}
    </figure>
  );
}
