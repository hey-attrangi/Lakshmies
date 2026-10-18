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
        <div className="flex min-h-screen max-w-[66rem] flex-col px-5 sm:px-11">
          <header className="py-8">
            <Link href="/" className="text-lg hover:underline">
              {site.name}
            </Link>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-line py-10 text-sm text-muted">Work in progress</footer>
        </div>
      </body>
    </html>
  );
}
