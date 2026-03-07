"use client";

import { QUICKSTART_STEPS } from "@/lib/constants";
import { useCallback, useState } from "react";

const INTRO =
  "Run without installing globally via npx, or install globally and use the same commands.";

export function InstallQuickstart() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyCommand = useCallback(async (command: string, id: string) => {
    await navigator.clipboard.writeText(command);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  }, []);

  return (
    <section
      id="quickstart"
      className="mx-auto max-w-3xl px-4 pb-24 pt-12"
      aria-label="Install and quickstart"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-forge-dark">
        Install & Quickstart
      </h2>
      <p className="mt-2 text-sm text-forge-dark/80">{INTRO}</p>

      <ol className="mt-8 list-decimal space-y-6 pl-5">
        {QUICKSTART_STEPS.map(({ id, label, command, description }) => (
          <li key={id} className="space-y-2">
            <span className="font-medium text-forge-dark">{label}</span>
            <span className="text-forge-dark/80"> — {description}</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-forge-light bg-white px-4 py-3 shadow-sm sm:w-auto mt-5">
                <code className="flex-1 font-mono text-sm text-forge-dark">
                  {command}
                </code>
                <button
                  type="button"
                  onClick={() => copyCommand(command, id)}
                  className="shrink-0 rounded border border-forge-light bg-white px-3 py-1.5 text-sm font-medium text-forge-dark shadow-sm transition hover:bg-forge-light-hover focus:outline-none focus:ring-2 focus:ring-forge-dark focus:ring-offset-2"
                  aria-label={`Copy ${label} command`}
                >
                  {copiedId === id ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
