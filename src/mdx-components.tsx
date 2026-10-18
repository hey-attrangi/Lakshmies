import type { MDXComponents } from "mdx/types";
import { Frame } from "@/components/mdx/Frame";
import { PlaceholderToggle } from "@/components/mdx/PlaceholderToggle";

// Components available inside every .mdx file without importing them.
const components: MDXComponents = {
  Frame,
  PlaceholderToggle,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
