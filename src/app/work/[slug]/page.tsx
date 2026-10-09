import type { Metadata } from "next";
import Link from "next/link";
import { StatusTag, TypeAndPeriod } from "@/components/EntryLabels";
import { getEntries, getEntry } from "@/lib/work";

export async function generateStaticParams() {
  const entries = await getEntries();
  return entries.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { entry } = await getEntry(slug);
  return { title: entry.title, description: entry.summary };
}

export default async function EntryPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const { entry, Body } = await getEntry(slug);

  const entries = await getEntries();
  const index = entries.findIndex((e) => e.slug === slug);
  const prev = entries[index - 1];
  const next = entries[index + 1];

  return (
    <article>
      <header className="border-b border-line pt-8 pb-10">
        <TypeAndPeriod entry={entry} />
        <h1 className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-3xl font-semibold tracking-tight">
          {entry.title}
          <StatusTag entry={entry} />
        </h1>
        <p className="mt-3 text-lg text-muted">{entry.summary}</p>
        {entry.role && (
          <p className="mt-4 text-sm">
            <span className="text-muted">Role </span>
            {entry.role}
          </p>
        )}
      </header>

      <div className="prose py-10">
        <Body />
      </div>

      <nav aria-label="More work" className="grid grid-cols-2 gap-6 border-t border-line py-8 text-sm">
        <div>
          {prev && (
            <Link href={`/work/${prev.slug}`} className="group block">
              <span className="font-mono text-xs text-muted">← Previous</span>
              <span className="mt-1 block group-hover:text-accent">{prev.title}</span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next ? (
            <Link href={`/work/${next.slug}`} className="group block">
              <span className="font-mono text-xs text-muted">Next →</span>
              <span className="mt-1 block group-hover:text-accent">{next.title}</span>
            </Link>
          ) : (
            <Link href="/" className="group block">
              <span className="font-mono text-xs text-muted">Back</span>
              <span className="mt-1 block group-hover:text-accent">All work</span>
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}
