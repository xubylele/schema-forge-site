"use client";

import dynamic from "next/dynamic";
import { PlaygroundErrorBoundary } from "./PlaygroundErrorBoundary";

const SchemaEditor = dynamic(
  () =>
    import("./SchemaEditor")
      .then(m => ({ default: m.SchemaEditor }))
      .catch((err) => {
        const message
          = err instanceof Error
            ? err.message
            : typeof err === "object" && err !== null && "message" in err
              ? String((err as { message: unknown }).message)
              : String(err);
        throw new Error(`Failed to load editor: ${message}`);
      }),
  { ssr: false },
);

export function PlaygroundClient() {
  return (
    <PlaygroundErrorBoundary>
      <div className="overflow-hidden rounded-lg border border-forge-dark/10">
        <SchemaEditor />
      </div>
    </PlaygroundErrorBoundary>
  );
}
