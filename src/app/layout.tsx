import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Schema Forge",
  description: "Official website for Schema Forge",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-forge-light text-forge-dark antialiased">
      {children}
    </body>
    </html>
  );
}
