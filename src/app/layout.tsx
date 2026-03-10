import { Footer } from "@/components/Footer";
import { SiteHeader } from "@/components/SiteHeader";
import { WhatsNewModal } from "@/components/WhatsNewModal";
import { getLatestRelease } from "@/lib/changelog";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://schemaforge.xuby.cl";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Schema Forge — Database schema migrations and tooling",
    template: "%s | Schema Forge",
  },
  description:
    "Schema Forge: database schema migrations and tooling for your stack. CLI, VS Code extension, GitHub Action. Define schemas in .sf DSL, generate SQL migrations, and keep databases in sync.",
  keywords: [
    "schema migrations",
    "database migrations",
    "SQL migrations",
    "schema forge",
    "database tooling",
    "CLI",
    "VS Code",
  ],
  authors: [{ name: "Schema Forge", url: "https://github.com/xubylele/schema-forge" }],
  creator: "Schema Forge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Schema Forge",
    title: "Schema Forge — Database schema migrations and tooling",
    description:
      "Database schema migrations and tooling for your stack. CLI, VS Code, GitHub Action.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Schema Forge — Database schema migrations and tooling",
    description: "Database schema migrations and tooling for your stack.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  icons: {
    icon: "/icon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const release = getLatestRelease();
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-forge-light text-forge-dark antialiased">
        <Analytics />
        <SiteHeader />
        {children}
        <Footer />
        <WhatsNewModal release={release} />
      </body>
    </html>
  );
}
