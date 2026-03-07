import fs from "fs";
import path from "path";

export type LatestRelease = {
  version: string;
  minorVersion: string;
  content: string;
};

const VERSION_HEADER = /^##\s+(\d+\.\d+\.\d+)\s*$/m;

/**
 * Parses CHANGELOG.md and returns the latest release (version + body).
 * Server-only; use in layout or server components.
 */
export function getLatestRelease(): LatestRelease | null {
  const changelogPath = path.join(process.cwd(), "CHANGELOG.md");
  if (!fs.existsSync(changelogPath)) return null;

  const raw = fs.readFileSync(changelogPath, "utf-8");
  const match = raw.match(VERSION_HEADER);
  if (!match) return null;

  const version = match[1];
  const minorVersion = version.split(".").slice(0, 2).join(".");

  const afterHeader = raw.slice(raw.indexOf(match[0]) + match[0].length);
  const nextSection = afterHeader.match(/\n##\s+/);
  const content = nextSection
    ? afterHeader.slice(0, nextSection.index).trim()
    : afterHeader.trim();

  return { version, minorVersion, content };
}
