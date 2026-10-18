import type { Metadata } from "next";
import Link from "next/link";
import { Dateline, StatusTag } from "@/components/EntryLabels";
import { Media } from "@/components/Media";
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
      <header className="pt-6">
        <Dateline entry={entry} />
        <h1 className="mt-10 max-w-2xl text-[1.75rem] leading-[1.45] tracking-[-0.01em]">
          <span className="underline decoration-2 underline-offset-[6px]">{entry.title}</span>
          {" — "}
          {entry.summary}
          <StatusTag entry={entry} />
        </h1>
        {entry.role && (
          <p className="mt-6 text-muted">
            Role <span className="text-fg">{entry.role}</span>
          </p>
        )}
        <div className="mt-14">
          <Media entry={entry} priority />
        </div>
      </header>

      <div className="prose max-w-2xl py-16">
        <Body />
      </div>

      <nav aria-label="More work" className="grid max-w-2xl grid-cols-2 gap-6 border-t border-line py-10">
        <div>
          {prev && (
            <Link href={`/work/${prev.slug}`} className="group block">
              <span className="text-sm text-muted">← Previous</span>
              <span className="mt-1 block text-lg group-hover:underline">{prev.title}</span>
            </Link>
          )}
        </div>
        <div className="text-right">
          <Link href={next ? `/work/${next.slug}` : "/"} className="group block">
            <span className="text-sm text-muted">{next ? "Next →" : "Back"}</span>
            <span className="mt-1 block text-lg group-hover:underline">{next ? next.title : "All work"}</span>
          </Link>
        </div>
      </nav>
    </article>
  );
}
