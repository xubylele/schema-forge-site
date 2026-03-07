"use client";

import type { LatestRelease } from "@/lib/changelog";
import { useCallback, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const COOKIE_NAME = "schema-forge-seen-version";
const COOKIE_MAX_AGE_DAYS = 365;

function getStoredVersion(): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${COOKIE_NAME}=`));
  return match ? decodeURIComponent(match.split("=")[1] ?? "") : null;
}

function setStoredVersion(version: string): void {
  if (typeof document === "undefined") return;
  const maxAge = COOKIE_MAX_AGE_DAYS * 24 * 60 * 60;
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(version)};path=/;max-age=${maxAge};samesite=lax`;
}

/** Show modal when version increased (major, minor, or patch). */
function shouldShowModal(current: string, stored: string | null): boolean {
  if (!stored) return true;
  const c = current.split(".").map(Number);
  const s = stored.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const cv = c[i] ?? 0;
    const sv = s[i] ?? 0;
    if (cv > sv) return true;
    if (cv < sv) return false;
  }
  return false;
}

type Props = {
  release: LatestRelease | null;
};

export function WhatsNewModal({ release }: Props) {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => {
    if (release) setStoredVersion(release.version);
    setOpen(false);
  }, [release]);

  useEffect(() => {
    if (!release?.content) return;
    const stored = getStoredVersion();
    if (!shouldShowModal(release.version, stored)) return;
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, [release]);

  useEffect(() => {
    if (!open) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [open, handleClose]);

  if (!open || !release) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whats-new-title"
    >
      <div
        className="absolute inset-0 bg-forge-dark/70"
        onClick={handleClose}
      />
      <div className="relative z-10 w-full max-w-lg max-h-[85vh] overflow-hidden rounded-lg bg-forge-light shadow-xl flex flex-col">
        <div className="flex items-center justify-between border-b border-forge-dark/20 px-4 py-3">
          <h2
            id="whats-new-title"
            className="text-lg font-semibold text-forge-dark"
          >
            What&apos;s new in v{release.version}
          </h2>
          <button
            type="button"
            onClick={handleClose}
            className="rounded p-1 text-forge-dark hover:bg-forge-light-hover focus:outline-none focus:ring-2 focus:ring-forge-accent"
            aria-label="Close"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>
        <div className="overflow-y-auto px-4 py-3 text-forge-dark [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-1 [&_h3]:text-sm [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1">
          <ReactMarkdown>{release.content}</ReactMarkdown>
        </div>
        <div className="border-t border-forge-dark/20 px-4 py-3">
          <button
            type="button"
            onClick={handleClose}
            className="w-full rounded bg-forge-accent py-2 text-sm font-medium text-white hover:bg-forge-accent-hover focus:outline-none focus:ring-2 focus:ring-forge-accent focus:ring-offset-2 focus:ring-offset-forge-light"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
