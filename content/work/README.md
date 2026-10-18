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
  period: "Optional, e.g. March 2026. Shown above the entry; falls back to the type",
  cover: "/work/your-slug.png",  // optional: image in public/work/, shown in the wide frame
  coverAlt: "What the image shows",
  tint: "#f6e4dc",      // optional: frame background behind the image
  hidden: false,        // true removes it from the site without deleting the file
};

Body in Markdown. Use ## for sections.
```

The build stops with a message naming the file if a required field is missing or misspelled.

Anything not marked `ready` shows its status on the site.

## Inside an entry

- **Images:** put them in `public/work/` and use `![alt text](/work/your-image.png)`. Without a `cover`, the homepage shows an empty frame labelled "No image yet".
- **Components:** `<Frame caption="...">…</Frame>` draws a bordered area around a prototype or image. To make a new component available in every entry, register it in `src/mdx-components.tsx`.
- **Rules:** the types, statuses and their labels live in `src/lib/work.ts`.
