import type { BaselineControlsProps } from "./types";

export function BaselineControls({
  baseline,
  baselineTableCount,
  hasParsedSchema,
  onSetBaseline,
  onClearBaseline,
}: BaselineControlsProps) {
  if (baseline) {
    const tableSuffix = baselineTableCount === 1 ? "" : "s";

    return (
      <>
        <span className="text-sm text-forge-dark/80">
          Baseline set (
          {baselineTableCount}
          {" "}
          table
          {tableSuffix}
          )
        </span>
        <button
          type="button"
          onClick={onClearBaseline}
          className="rounded border border-forge-dark/20 bg-forge-dark/5 px-3 py-1.5 text-sm font-medium text-forge-dark hover:bg-forge-dark/10 dark:border-forge-dark/30 dark:bg-forge-dark/10 dark:hover:bg-forge-dark/20"
        >
          Clear baseline
        </button>
      </>
    );
  }

  return (
    <button
      type="button"
      onClick={onSetBaseline}
      disabled={!hasParsedSchema}
      className="rounded border border-forge-dark/20 bg-forge-dark/5 px-3 py-1.5 text-sm font-medium text-forge-dark hover:bg-forge-dark/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-forge-dark/30 dark:bg-forge-dark/10 dark:hover:bg-forge-dark/20"
    >
      Set as baseline
    </button>
  );
}
