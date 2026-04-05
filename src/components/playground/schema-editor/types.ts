import type { Operation, StateFile } from "@xubylele/schema-forge-core/browser";

export type Baseline = { dsl: string; state: StateFile };

export type BaselineControlsProps = {
  baseline: Baseline | null;
  baselineTableCount: number;
  hasParsedSchema: boolean;
  onSetBaseline: () => void;
  onClearBaseline: () => void;
};

export type ChangesSectionProps = {
  operations: Operation[];
  operationLabel: (op: Operation) => string;
};
