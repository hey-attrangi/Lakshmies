import type { Metadata } from "next";
import "./globals.css";

// Placeholder metadata. Kept out of search indexes until the site is ready to share.
export const metadata: Metadata = {
  title: "Portfolio (work in progress)",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
