import Link from "next/link";
import { Dateline, StatusTag } from "@/components/EntryLabels";
import { Media } from "@/components/Media";
import { getEntries } from "@/lib/work";
import { site } from "@/site";

export default async function Home() {
  const entries = await getEntries();

  return (
    <>
      <p className="max-w-2xl pt-6 pb-24 text-2xl leading-snug text-muted">{site.intro}</p>

      <ol className="space-y-36 pb-24">
        {entries.map((entry, i) => (
          <li key={entry.slug}>
            <Dateline entry={entry} />
            <p className="mt-10 max-w-2xl text-[1.75rem] leading-[1.45] tracking-[-0.01em]">
              <Link
                href={`/work/${entry.slug}`}
                className="underline decoration-2 underline-offset-[6px] hover:decoration-accent"
              >
                {entry.title}
              </Link>
              {" — "}
              {entry.summary}
              <StatusTag entry={entry} />
            </p>
            <Link href={`/work/${entry.slug}`} className="mt-14 block" tabIndex={-1} aria-hidden>
              <Media entry={entry} priority={i === 0} />
            </Link>
          </li>
        ))}
      </ol>
    </>
  );
}
