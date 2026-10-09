import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/site";
import "./globals.css";

// Kept out of search indexes until the site is ready to share.
export const metadata: Metadata = {
  title: { default: site.name, template: `%s · ${site.name}` },
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-5 sm:px-8">
          <header className="py-8">
            <Link href="/" className="font-medium hover:text-accent">
              {site.name}
            </Link>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="py-10 font-mono text-xs text-muted">Work in progress</footer>
        </div>
      </body>
    </html>
  );
}
