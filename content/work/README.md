# Work entries

Each `.mdx` file in this folder is one piece of work. The filename becomes the URL: `attrangi.mdx` → `/work/attrangi`.

## Add an entry

Create `your-slug.mdx`:

```mdx
export const meta = {
  title: "Title",
  type: "case-study",   // case-study | decision | experiment | exploration | note
  status: "draft",      // placeholder | draft | ready
  order: 10,            // position on the homepage, lowest first
  summary: "One line shown on the homepage.",
  role: "Optional",
  period: "Optional, e.g. 2025–26",
  hidden: false,        // true removes it from the site without deleting the file
};

Body in Markdown. Use ## for sections.
```

The build stops with a message naming the file if a required field is missing or misspelled.

Anything not marked `ready` shows its status on the site.

## Inside an entry

- **Images:** put them in `public/` and use `![alt text](/your-image.png)`.
- **Components:** `<Frame caption="...">…</Frame>` draws a bordered area around a prototype or image. To make a new component available in every entry, register it in `src/mdx-components.tsx`.
- **Rules:** the types, statuses and their labels live in `src/lib/work.ts`.
