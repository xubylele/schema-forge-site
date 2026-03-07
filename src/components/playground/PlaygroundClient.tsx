"use client";

import dynamic from "next/dynamic";

const SchemaEditor = dynamic(
  () =>
    import("./SchemaEditor").then(m => ({ default: m.SchemaEditor })),
  { ssr: false },
);

export function PlaygroundClient() {
  return (
    <div className="overflow-hidden rounded-lg border border-forge-dark/10">
      <SchemaEditor />
    </div>
  );
}
