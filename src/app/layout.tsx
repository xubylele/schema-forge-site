import { WhatsNewModal } from "@/components/WhatsNewModal";
import { getLatestRelease } from "@/lib/changelog";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schema Forge",
  description: "Official website for Schema Forge",
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
      <body className="bg-forge-light text-forge-dark antialiased">
        {children}
        <WhatsNewModal release={release} />
      </body>
    </html>
  );
}
