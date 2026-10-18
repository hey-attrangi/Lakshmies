import fs from "node:fs";
import path from "node:path";
import type { ComponentType } from "react";

// Provisional content model. Rename, add or remove types and statuses here.
export const entryTypes = {
  "case-study": "Case study",
  decision: "Decision",
  experiment: "Experiment",
  exploration: "Exploration",
  note: "Note",
} as const;

export const entryStatuses = {
  placeholder: "Placeholder",
  draft: "Draft",
  ready: "Ready",
} as const;

export type EntryType = keyof typeof entryTypes;
export type EntryStatus = keyof typeof entryStatuses;

export type EntryMeta = {
  title: string;
  type: EntryType;
  summary: string;
  status: EntryStatus;
  order: number;
  role?: string;
  period?: string;
  cover?: string;
  coverAlt?: string;
  tint?: string;
  hidden?: boolean;
};

export type Entry = EntryMeta & { slug: string };

type MdxModule = { default: ComponentType; meta?: unknown };

const contentDir = path.join(process.cwd(), "content/work");

export function getSlugs(): string[] {
  return fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

async function load(slug: string) {
  const mod: MdxModule = await import(`../../content/work/${slug}.mdx`);
  return { Body: mod.default, entry: { ...validate(slug, mod.meta), slug } };
}

// Fails the build with a readable message instead of rendering a broken entry.
function validate(slug: string, meta: unknown): EntryMeta {
  const fail = (problem: string): never => {
    throw new Error(`content/work/${slug}.mdx: ${problem}`);
  };
  if (!meta || typeof meta !== "object") fail("missing `export const meta = { ... }`");
  const m = meta as Record<string, unknown>;
  for (const field of ["title", "summary"]) {
    if (typeof m[field] !== "string" || !m[field]) fail(`meta.${field} must be a non-empty string`);
  }
  if (!(String(m.type) in entryTypes)) {
    fail(`meta.type must be one of: ${Object.keys(entryTypes).join(", ")}`);
  }
  if (!(String(m.status) in entryStatuses)) {
    fail(`meta.status must be one of: ${Object.keys(entryStatuses).join(", ")}`);
  }
  if (typeof m.order !== "number") fail("meta.order must be a number");
  return m as EntryMeta;
}

// Visible entries, in display order.
export async function getEntries(): Promise<Entry[]> {
  const loaded = await Promise.all(getSlugs().map(load));
  return loaded
    .map(({ entry }) => entry)
    .filter((entry) => !entry.hidden)
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export async function getEntry(slug: string) {
  return load(slug);
}
