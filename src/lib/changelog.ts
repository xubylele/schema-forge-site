import fs from "fs";
import path from "path";

export type LatestRelease = {
  version: string;
  minorVersion: string;
  content: string;
  /** Full changelog (all versions) for display when no section is expanded. */
  fullContent: string;
};

const VERSION_HEADER = /^##\s+(\d+\.\d+\.\d+)\s*$/m;

/**
 * Returns the full changelog body: from the first ## version line to
 * end of file.
 */
function extractFullContent(raw: string): string {
  const match = raw.match(VERSION_HEADER);
  if (!match) return raw.trim();
  const start = raw.indexOf(match[0]);
  return raw.slice(start).trim();
}

/**
 * Parses CHANGELOG.md and returns the latest release (version + body)
 * and full changelog. Server-only; use in layout or server components.
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

  const fullContent = extractFullContent(raw);

  return { version, minorVersion, content, fullContent };
}
