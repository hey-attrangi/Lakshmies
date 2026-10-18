import Image from "next/image";
import type { Entry } from "@/lib/work";

// Soft frame colours for entries without a `tint`. Provisional.
const tints = ["#f6e4dc", "#e2e8f4", "#e4efe4", "#efe6f4", "#f3eedc"];

function defaultTint(slug: string) {
  let sum = 0;
  for (const char of slug) sum += char.charCodeAt(0);
  return tints[sum % tints.length];
}

// Wide media frame. Shows the entry's cover image, or a labelled empty frame.
export function Media({ entry, priority = false }: { entry: Entry; priority?: boolean }) {
  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden"
      style={{ backgroundColor: entry.tint ?? defaultTint(entry.slug) }}
    >
      {entry.cover ? (
        <Image
          src={entry.cover}
          alt={entry.coverAlt ?? ""}
          fill
          priority={priority}
          sizes="(min-width: 1100px) 1000px, 100vw"
          className="object-cover"
        />
      ) : (
        <p className="absolute inset-0 flex items-center justify-center font-mono text-xs text-black/40">
          No image yet
        </p>
      )}
    </div>
  );
}
