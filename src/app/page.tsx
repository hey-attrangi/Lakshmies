import Link from "next/link";
import { StatusTag, TypeAndPeriod } from "@/components/EntryLabels";
import { getEntries } from "@/lib/work";
import { site } from "@/site";

export default async function Home() {
  const entries = await getEntries();

  return (
    <>
      <p className="max-w-prose pt-8 pb-16 text-lg text-muted">{site.intro}</p>

      <ul className="border-t border-line">
        {entries.map((entry) => (
          <li key={entry.slug} className="border-b border-line">
            <Link href={`/work/${entry.slug}`} className="group block py-6">
              <TypeAndPeriod entry={entry} />
              <h2 className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xl font-medium group-hover:text-accent">
                {entry.title}
                <StatusTag entry={entry} />
              </h2>
              <p className="mt-1.5 text-muted">{entry.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
