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
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
        Install & Quickstart
      </h2>
      <p className="mt-2 text-sm text-neutral-600">{INTRO}</p>

      <ol className="mt-8 list-decimal space-y-6 pl-5">
        {QUICKSTART_STEPS.map(({ id, label, command, description }) => (
          <li key={id} className="space-y-2">
            <span className="font-medium text-neutral-800">{label}</span>
            <span className="text-neutral-600"> — {description}</span>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 sm:w-auto">
                <code className="flex-1 font-mono text-sm text-neutral-800">
                  {command}
                </code>
                <button
                  type="button"
                  onClick={() => copyCommand(command, id)}
                  className="shrink-0 rounded border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 shadow-sm transition hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-neutral-400 focus:ring-offset-2"
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
