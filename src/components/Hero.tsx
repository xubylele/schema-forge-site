"use client";

import Link from "next/link";
import { LINKS, INSTALL_COMMAND } from "@/lib/constants";
import { useState, useCallback } from "react";

const TAGLINE =
  "Database schema migrations and tooling for your stack.";

const PLAYGROUND_MODAL_TITLE = "Playground";
const PLAYGROUND_MODAL_MESSAGE =
  "The interactive playground is in development. Stay tuned!";

export function Hero() {
  const [copied, setCopied] = useState(false);
  const [showPlaygroundModal, setShowPlaygroundModal] = useState(false);

  const copyInstall = useCallback(async () => {
    await navigator.clipboard.writeText(INSTALL_COMMAND);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section
      className="mx-auto max-w-3xl px-4 py-24 text-center"
      aria-label="Hero"
    >
      <h1 className="text-4xl font-bold tracking-tight text-forge-dark sm:text-5xl">
        Schema Forge
      </h1>
      <p className="mt-4 text-lg text-forge-dark/80">
        {TAGLINE}
      </p>

      <div
        id="install"
        className="mt-8 flex flex-col items-center gap-2 sm:flex-row sm:justify-center"
      >
        <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-forge-light bg-white px-4 py-3 shadow-sm sm:w-auto">
          <code className="flex-1 font-mono text-sm text-forge-dark">
            {INSTALL_COMMAND}
          </code>
          <button
            type="button"
            onClick={copyInstall}
            className="shrink-0 rounded border border-forge-light bg-white px-3 py-1.5 text-sm font-medium text-forge-dark shadow-sm transition hover:bg-forge-light-hover focus:outline-none focus:ring-2 focus:ring-forge-dark focus:ring-offset-2"
            aria-label="Copy install command"
          >
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => setShowPlaygroundModal(true)}
          className="rounded-md bg-forge-accent px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-forge-accent-hover focus:outline-none focus:ring-2 focus:ring-forge-accent focus:ring-offset-2"
        >
          Try Playground
        </button>
        <Link
          href={LINKS.npm}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-forge-light bg-white px-5 py-2.5 text-sm font-medium text-forge-dark shadow-sm transition hover:bg-forge-light-hover focus:outline-none focus:ring-2 focus:ring-forge-dark focus:ring-offset-2"
        >
          Install CLI
        </Link>
        <Link
          href={LINKS.vscode}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-forge-light bg-white px-5 py-2.5 text-sm font-medium text-forge-dark shadow-sm transition hover:bg-forge-light-hover focus:outline-none focus:ring-2 focus:ring-forge-dark focus:ring-offset-2"
        >
          VSCode Extension
        </Link>
        <Link
          href={LINKS.openVsx}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-md border border-forge-light bg-white px-5 py-2.5 text-sm font-medium text-forge-dark shadow-sm transition hover:bg-forge-light-hover focus:outline-none focus:ring-2 focus:ring-forge-dark focus:ring-offset-2"
        >
          Open VSX
        </Link>
      </div>

      {showPlaygroundModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="playground-modal-title"
        >
          <div
            className="absolute inset-0 bg-forge-dark/60"
            onClick={() => setShowPlaygroundModal(false)}
            aria-hidden="true"
          />
          <div className="relative w-full max-w-sm rounded-lg border border-forge-light bg-white p-6 shadow-lg">
            <h2
              id="playground-modal-title"
              className="text-lg font-semibold text-forge-dark"
            >
              {PLAYGROUND_MODAL_TITLE}
            </h2>
            <p className="mt-2 text-sm text-forge-dark/80">
              {PLAYGROUND_MODAL_MESSAGE}
            </p>
            <button
              type="button"
              onClick={() => setShowPlaygroundModal(false)}
              className="mt-4 rounded-md bg-forge-accent px-4 py-2 text-sm font-medium text-white transition hover:bg-forge-accent-hover focus:outline-none focus:ring-2 focus:ring-forge-accent focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
