"use client";

import Editor, { type OnMount, useMonaco } from "@monaco-editor/react";
import {
  diffSchemas,
  generateSql,
  parseSchema,
  schemaToState,
  validateSchema,
} from "@xubylele/schema-forge-core/browser";
import type { Operation, StateFile } from "@xubylele/schema-forge-core/browser";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EXAMPLE_SCHEMA } from "@/lib/exampleSchema";

type Monaco = Parameters<OnMount>[1];

const EMPTY_STATE: StateFile = { version: 1, tables: {} };

type Baseline = { dsl: string; state: StateFile };

function operationLabel(op: Operation): string {
  switch (op.kind) {
    case "create_table":
      return `Add table \`${op.table.name}\``;
    case "drop_table":
      return `Drop table \`${op.tableName}\``;
    case "add_column":
      return `Add column \`${op.column.name}\` to \`${op.tableName}\``;
    case "drop_column":
      return `Drop column \`${op.columnName}\` from \`${op.tableName}\``;
    case "column_type_changed":
      return `Change type of \`${op.tableName}.${op.columnName}\`: ${op.fromType} → ${op.toType}`;
    case "column_nullability_changed":
      return `Change nullability of \`${op.tableName}.${op.columnName}\`: ${op.from ? "nullable" : "not null"} → ${op.to ? "nullable" : "not null"}`;
    case "column_default_changed":
      return `Change default of \`${op.tableName}.${op.columnName}\`: ${op.fromDefault ?? "none"} → ${op.toDefault ?? "none"}`;
    case "column_unique_changed":
      return `Change unique on \`${op.tableName}.${op.columnName}\`: ${op.from} → ${op.to}`;
    case "drop_primary_key_constraint":
      return `Drop primary key on \`${op.tableName}\``;
    case "add_primary_key_constraint":
      return `Add primary key on \`${op.tableName}.${op.columnName}\``;
    default:
      return String((op as Operation).kind);
  }
}

const MONACO_OPTIONS = {
  language: "schema-forge",
  theme: "schema-forge-dark",
  fontSize: 14,
  lineNumbers: "on" as const,
  minimap: { enabled: true },
  scrollBeyondLastLine: false,
  wordWrap: "off" as const,
  automaticLayout: true,
};

function registerSchemaForgeLanguage(monaco: Monaco) {
  // #region agent log
  fetch("http://127.0.0.1:7817/ingest/e4ec8f1f-610e-4729-860f-01d0f80b4773", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf6fec" },
    body: JSON.stringify({
      sessionId: "bf6fec",
      hypothesisId: "A",
      location: "SchemaEditor.tsx:registerSchemaForgeLanguage:entry",
      message: "registerSchemaForgeLanguage called",
      data: { alreadyRegistered: monaco.languages.getLanguages().some((l: { id: string }) => l.id === "schema-forge") },
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
  if (monaco.languages.getLanguages().some((l: { id: string }) => l.id === "schema-forge")) {
    return;
  }

  monaco.languages.register({ id: "schema-forge" });

  monaco.languages.setMonarchTokensProvider("schema-forge", {
    defaultToken: "",
    tokenPostfix: ".sf",

    keywords: ["table"],
    types: [
      "uuid",
      "varchar",
      "text",
      "int",
      "boolean",
      "timestamptz",
      "date",
    ],
    modifiers: ["pk", "unique", "nullable", "default", "fk", "null"],

    tokenizer: {
      root: [
        [/\s*\/\/.*$/, "comment"],
        [/\s*#.*$/, "comment"],
        [/\bnot\s+null\b/, "modifier"],
        [/\btable\b/, "keyword"],
        [
          /\b(uuid|varchar|text|int|boolean|timestamptz|date)\b/,
          "type",
        ],
        [/\b(pk|unique|nullable|default|fk)\b/, "modifier"],
        [/[{}]/, "delimiter.bracket"],
        [/\w+\.\w+/, "identifier"],
        [/\w+/, "identifier"],
      ],
    },
  });

  monaco.editor.defineTheme("schema-forge-dark", {
    base: "vs-dark",
    inherit: true,
    colors: {
      "editor.foreground": "#d4d4d4",
      "editor.background": "#1e1e1e",
    },
    rules: [
      { token: "keyword", foreground: "569cd6" },
      { token: "type", foreground: "4ec9b0" },
      { token: "modifier", foreground: "dcdcaa" },
      { token: "comment", foreground: "6a9955", fontStyle: "italic" },
      { token: "delimiter.bracket", foreground: "ffd700" },
    ],
  });
  // #region agent log
  fetch("http://127.0.0.1:7817/ingest/e4ec8f1f-610e-4729-860f-01d0f80b4773", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf6fec" },
    body: JSON.stringify({
      sessionId: "bf6fec",
      hypothesisId: "C",
      location: "SchemaEditor.tsx:defineTheme:after",
      message: "defineTheme schema-forge-dark completed",
      data: {},
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

export function SchemaEditor() {
  const monaco = useMonaco();
  const [value, setValue] = useState(EXAMPLE_SCHEMA);
  const [baseline, setBaselineState] = useState<Baseline | null>(null);

  const { parsedSchema, parseError, validationError } = useMemo(() => {
    if (!value.trim()) {
      return { parsedSchema: null, parseError: null, validationError: null };
    }
    try {
      const schema = parseSchema(value);
      try {
        validateSchema(schema);
        return {
          parsedSchema: schema,
          parseError: null,
          validationError: null,
        };
      }
      catch (err) {
        return {
          parsedSchema: null,
          parseError: null,
          validationError: err instanceof Error ? err.message : String(err),
        };
      }
    }
    catch (err) {
      return {
        parsedSchema: null,
        parseError: err instanceof Error ? err.message : String(err),
        validationError: null,
      };
    }
  }, [value]);

  const oldState = baseline?.state ?? EMPTY_STATE;
  const { diff, generatedSql } = useMemo(() => {
    if (!parsedSchema) return { diff: { operations: [] as Operation[] }, generatedSql: "" };
    const d = diffSchemas(oldState, parsedSchema);
    return { diff: d, generatedSql: generateSql(d, "postgres") };
  }, [parsedSchema, oldState]);

  useEffect(() => {
    if (monaco) {
      // #region agent log
      fetch("http://127.0.0.1:7817/ingest/e4ec8f1f-610e-4729-860f-01d0f80b4773", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf6fec" },
        body: JSON.stringify({
          sessionId: "bf6fec",
          hypothesisId: "B",
          location: "SchemaEditor.tsx:useEffect:monaco",
          message: "useEffect: monaco ready, calling registerSchemaForgeLanguage",
          data: {},
          timestamp: Date.now(),
        }),
      }).catch(() => {});
      // #endregion
      registerSchemaForgeLanguage(monaco);
    }
  }, [monaco]);

  const handleEditorMount: OnMount = useCallback((editor, monacoInstance) => {
    // #region agent log
    fetch("http://127.0.0.1:7817/ingest/e4ec8f1f-610e-4729-860f-01d0f80b4773", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf6fec" },
      body: JSON.stringify({
        sessionId: "bf6fec",
        hypothesisId: "A",
        location: "SchemaEditor.tsx:onMount:beforeRegister",
        message: "onMount: before registerSchemaForgeLanguage",
        data: {},
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    registerSchemaForgeLanguage(monacoInstance);
    const model = editor.getModel();
    if (model) monacoInstance.editor.setModelLanguage(model, "schema-forge");
    // #region agent log
    fetch("http://127.0.0.1:7817/ingest/e4ec8f1f-610e-4729-860f-01d0f80b4773", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "bf6fec" },
      body: JSON.stringify({
        sessionId: "bf6fec",
        hypothesisId: "A",
        location: "SchemaEditor.tsx:onMount:beforeSetTheme",
        message: "onMount: before setTheme(schema-forge-dark)",
        data: {},
        timestamp: Date.now(),
      }),
    }).catch(() => {});
    // #endregion
    monacoInstance.editor.setTheme("schema-forge-dark");
  }, []);

  const handleSetBaseline = useCallback(async () => {
    if (!parsedSchema) return;
    const state = await schemaToState(parsedSchema);
    setBaselineState({ dsl: value, state });
  }, [parsedSchema, value]);

  const errorMessage = parseError ?? validationError;
  const baselineTableCount = baseline
    ? Object.keys(baseline.state.tables).length
    : 0;
  const sqlTitle = baseline
    ? "Migration SQL (baseline → current)"
    : "Generated SQL (from empty state)";

  return (
    <div className="flex flex-col gap-4">
      <Editor
        height="500px"
        language="schema-forge"
        theme="vs-dark"
        value={value}
        onChange={v => setValue(v ?? "")}
        options={MONACO_OPTIONS}
        onMount={handleEditorMount}
        loading={(
          <div
            className="flex items-center justify-center bg-[#1e1e1e] text-[#cccccc]"
            style={{ height: 500 }}
          >
            Loading editor…
          </div>
        )}
      />
      {errorMessage && (
        <div
          className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/30 dark:text-red-200"
          role="alert"
        >
          {errorMessage}
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {baseline
          ? (
              <>
                <span className="text-sm text-forge-dark/80">
                  Baseline set (
                  {baselineTableCount}
                  {" "}
                  table
                  {baselineTableCount !== 1
                    ? "s"
                    : ""}
                  )
                </span>
                <button
                  type="button"
                  onClick={() => setBaselineState(null)}
                  className="rounded border border-forge-dark/20 bg-forge-dark/5 px-3 py-1.5 text-sm font-medium text-forge-dark hover:bg-forge-dark/10 dark:border-forge-dark/30 dark:bg-forge-dark/10 dark:hover:bg-forge-dark/20"
                >
                  Clear baseline
                </button>
              </>
            )
          : (
              <button
                type="button"
                onClick={handleSetBaseline}
                disabled={!parsedSchema}
                className="rounded border border-forge-dark/20 bg-forge-dark/5 px-3 py-1.5 text-sm font-medium text-forge-dark hover:bg-forge-dark/10 disabled:cursor-not-allowed disabled:opacity-50 dark:border-forge-dark/30 dark:bg-forge-dark/10 dark:hover:bg-forge-dark/20"
              >
                Set as baseline
              </button>
            )}
      </div>
      {baseline && parsedSchema && (
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-medium text-forge-dark">Changes</h3>
          {diff.operations.length === 0
            ? (
                <p className="text-sm text-forge-dark/70">No changes from baseline.</p>
              )
            : (
                <ul className="list-inside list-disc space-y-1 text-sm text-forge-dark/90">
                  {diff.operations.map((op, i) => (
                    <li key={i}>{operationLabel(op)}</li>
                  ))}
                </ul>
              )}
        </div>
      )}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-forge-dark">{sqlTitle}</h3>
        <pre className="overflow-auto rounded-md border border-forge-dark/10 bg-[#1e1e1e] p-4 text-sm text-[#d4d4d4]">
          <code>
            {errorMessage
              ? "Fix schema errors to generate SQL"
              : generatedSql || "—"}
          </code>
        </pre>
      </div>
    </div>
  );
}
