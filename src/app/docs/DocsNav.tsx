"use client";

import { LINKS } from "@/lib/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: LINKS.docs, label: "Overview" },
  { href: LINKS.docsDsl, label: "DSL syntax" },
  { href: LINKS.docsCli, label: "CLI commands" },
  { href: LINKS.docsMigration, label: "Migration workflow" },
] as const;

export function DocsNav() {
  const pathname = usePathname();

  return (
    <nav
      className="w-48 shrink-0"
      aria-label="Documentation"
    >
      <ul className="space-y-1">
        {ITEMS.map(({ href, label }) => {
          const isActive
            = href === LINKS.docs
              ? pathname === "/docs" || pathname === "/docs/"
              : pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={`block rounded px-3 py-2 text-sm transition ${
                  isActive
                    ? "font-medium text-forge-dark bg-forge-light/60"
                    : "text-forge-dark/80 hover:bg-forge-light/40 hover:text-forge-dark"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
