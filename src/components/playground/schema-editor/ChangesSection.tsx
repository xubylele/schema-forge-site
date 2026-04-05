import type { ChangesSectionProps } from "./types";

export function ChangesSection({
  operations, operationLabel,
}: ChangesSectionProps) {
  const hasOperations = operations.length > 0;

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-forge-dark">Changes</h3>
      {!hasOperations && (
        <p className="text-sm text-forge-dark/70">No changes from baseline.</p>
      )}
      {hasOperations && (
        <ul className="list-inside list-disc space-y-1 text-sm text-forge-dark/90">
          {operations.map((op, i) => (
            <li key={i}>{operationLabel(op)}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
