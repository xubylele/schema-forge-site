import { LINKS } from "@/lib/constants";
import Link from "next/link";

type NavItem = { href: string; label: string; external?: boolean };

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  { href: LINKS.docs, label: "Docs" },
  { href: LINKS.playground, label: "Playground" },
  { href: LINKS.roadmap, label: "Roadmap" },
  { href: LINKS.github, label: "GitHub", external: true },
];

export function SiteHeader() {
  return (
    <header
      className="sticky top-0 z-10 border-b border-forge-dark/10 bg-white/80 backdrop-blur-sm"
      aria-label="Site navigation"
    >
      <nav className="mx-auto flex max-w-4xl flex-wrap items-center gap-x-6 gap-y-2 px-6 py-4">
        <Link
          href="/"
          className="text-lg font-semibold text-forge-dark transition hover:text-forge-accent"
        >
          Schema Forge
        </Link>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
          {NAV_ITEMS.map(({ href, label, external }) => (
            <li key={href}>
              {external
                ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-forge-dark/80 underline decoration-forge-dark/30 underline-offset-2 transition hover:text-forge-dark hover:decoration-forge-dark"
                    >
                      {label}
                    </a>
                  )
                : (
                    <Link
                      href={href}
                      className="text-sm font-medium text-forge-dark/80 underline decoration-forge-dark/30 underline-offset-2 transition hover:text-forge-dark hover:decoration-forge-dark"
                    >
                      {label}
                    </Link>
                  )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
