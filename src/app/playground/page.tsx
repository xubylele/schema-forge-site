import { PlaygroundClient } from "@/components/playground/PlaygroundClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground | Schema Forge",
  description: "Edit .sf schema in the browser",
};

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-2xl font-semibold text-forge-dark">
          Schema Playground
        </h1>
        <p className="mb-4 text-forge-dark/80">
          Edit the .sf schema below (tables, indexes, and views). Syntax
          highlighting and basic editor features are enabled. Set a baseline
          to simulate changes and see migration SQL from that version.
        </p>
        <PlaygroundClient />
      </div>
    </main>
  );
}
