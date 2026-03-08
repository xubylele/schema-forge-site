import type { RoadmapItemStatus } from "@/lib/roadmap";
import { ROADMAP_SECTIONS } from "@/lib/roadmap";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roadmap | Schema Forge",
  description:
    "Schema Forge roadmap: current progress, upcoming features, and long-term vision.",
};

const INTRO
  = "See what exists today, what we're building next, and where the project is headed.";

function StatusBadge({ status }: { status: RoadmapItemStatus }) {
  const config = {
    "complete": {
      label: "Complete",
      className:
        "inline-flex items-center gap-1.5 rounded-full bg-forge-dark/10 px-2.5 py-0.5 text-xs font-medium text-forge-dark",
      icon: (
        <svg
          className="size-3.5 shrink-0"
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M13 4L6 11L3 8" />
        </svg>
      ),
    },
    "in-progress": {
      label: "In progress",
      className:
        "inline-flex items-center gap-1.5 rounded-full bg-forge-accent/15 px-2.5 py-0.5 text-xs font-medium text-forge-accent",
      icon: (
        <span
          className="size-2 shrink-0 rounded-full bg-forge-accent"
          aria-hidden
        />
      ),
    },
    "planned": {
      label: "Planned",
      className:
        "inline-flex items-center gap-1.5 rounded-full bg-forge-light/80 px-2.5 py-0.5 text-xs font-medium text-forge-dark/80",
      icon: (
        <span
          className="size-2 shrink-0 rounded-full border border-forge-dark/40"
          aria-hidden
        />
      ),
    },
  };
  const { label, className, icon } = config[status];
  return (
    <span className={className} title={label}>
      {icon}
      <span>{label}</span>
    </span>
  );
}

export default function RoadmapPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight text-forge-dark">
          Roadmap
        </h1>
        <p className="mt-4 text-forge-dark/80">{INTRO}</p>

        <div className="mt-10 space-y-10">
          {ROADMAP_SECTIONS.map(section => (
            <section
              key={section.title}
              className="rounded-lg border border-forge-light bg-white p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-forge-dark">
                {section.title}
              </h2>
              {section.description && (
                <p className="mt-2 text-sm text-forge-dark/80">
                  {section.description}
                </p>
              )}
              <ul className="mt-4 space-y-3" aria-label={`${section.title} items`}>
                {section.items.map(item => (
                  <li
                    key={item.title}
                    className="flex flex-wrap items-center gap-2 sm:gap-3"
                  >
                    <span className="font-medium text-forge-dark">
                      {item.title}
                    </span>
                    <StatusBadge status={item.status} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
