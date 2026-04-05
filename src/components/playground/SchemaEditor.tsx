"use client";

import { EXAMPLE_SCHEMA } from "@/lib/exampleSchema";
import Editor, { useMonaco, type OnMount } from "@monaco-editor/react";
import type { Operation, StateFile } from "@xubylele/schema-forge-core/browser";
import {
  diffSchemas,
  generateSql,
  parseSchema,
  schemaToState,
  validateSchema,
} from "@xubylele/schema-forge-core/browser";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  BaselineControls,
  ChangesSection,
  type Baseline,
} from "./schema-editor";

type Monaco = Parameters<OnMount>[1];

const EMPTY_STATE: StateFile = { version: 1, tables: {} };

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
    case "create_index":
      return `Create index \`${op.index.name}\` on \`${op.tableName}\``;
    case "drop_index":
      return `Drop index \`${op.index.name}\` on \`${op.tableName}\``;
    case "create_view":
      return `Create view \`${op.view.name}\``;
    case "drop_view":
      return `Drop view \`${op.viewName}\``;
    case "replace_view":
      return `Replace view \`${op.view.name}\``;
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
  if (monaco.languages.getLanguages().some((l: { id: string }) => l.id === "schema-forge")) {
    return;
  }

  monaco.languages.register({ id: "schema-forge" });

  monaco.languages.setMonarchTokensProvider("schema-forge", {
    defaultToken: "",
    tokenPostfix: ".sf",

    keywords: ["table", "index", "view", "on", "as", "columns", "expression", "where"],
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
        [/\b(table|index|view|on|as|columns|expression|where)\b/, "keyword"],
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
      registerSchemaForgeLanguage(monaco);
    }
  }, [monaco]);

  const handleEditorMount: OnMount = useCallback((editor, monacoInstance) => {
    registerSchemaForgeLanguage(monacoInstance);
    const model = editor.getModel();
    if (model) monacoInstance.editor.setModelLanguage(model, "schema-forge");
    monacoInstance.editor.setTheme("schema-forge-dark");
  }, []);

  const handleSetBaseline = useCallback(async () => {
    if (!parsedSchema) return;
    const state = await schemaToState(parsedSchema);
    setBaselineState({ dsl: value, state });
  }, [parsedSchema, value]);

  const errorMessage = parseError ?? validationError;
  let baselineTableCount = 0;
  if (baseline) {
    baselineTableCount = Object.keys(baseline.state.tables).length;
  }

  let sqlTitle = "Generated SQL (from empty state)";
  if (baseline) {
    sqlTitle = "Migration SQL (baseline → current)";
  }

  let sqlOutput = generatedSql || "—";
  if (errorMessage) {
    sqlOutput = "Fix schema errors to generate SQL";
  }

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
        <BaselineControls
          baseline={baseline}
          baselineTableCount={baselineTableCount}
          hasParsedSchema={Boolean(parsedSchema)}
          onSetBaseline={handleSetBaseline}
          onClearBaseline={() => setBaselineState(null)}
        />
      </div>
      {baseline && parsedSchema && (
        <ChangesSection
          operations={diff.operations}
          operationLabel={operationLabel}
        />
      )}
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-forge-dark">{sqlTitle}</h3>
        <div className="overflow-auto rounded-md border border-forge-dark/10 bg-[#1e1e1e]">
          <SyntaxHighlighter
            language="sql"
            style={oneDark}
            wrapLongLines
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.875rem",
            }}
            codeTagProps={{
              style: {
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
              },
            }}
          >
            {sqlOutput}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
