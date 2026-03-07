"use client";

import Editor, { type OnMount, useMonaco } from "@monaco-editor/react";
import {
  diffSchemas,
  generateSql,
  parseSchema,
  validateSchema,
} from "@xubylele/schema-forge-core/browser";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EXAMPLE_SCHEMA } from "@/lib/exampleSchema";

type Monaco = Parameters<OnMount>[1];

const EMPTY_STATE = { version: 1 as const, tables: {} };

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

  const generatedSql = useMemo(() => {
    if (!parsedSchema) return "";
    const diff = diffSchemas(EMPTY_STATE, parsedSchema);
    return generateSql(diff, "postgres");
  }, [parsedSchema]);

  useEffect(() => {
    if (monaco) registerSchemaForgeLanguage(monaco);
  }, [monaco]);

  const handleEditorMount: OnMount = useCallback((editor, monacoInstance) => {
    registerSchemaForgeLanguage(monacoInstance);
    const model = editor.getModel();
    if (model) monacoInstance.editor.setModelLanguage(model, "schema-forge");
    monacoInstance.editor.setTheme("schema-forge-dark");
  }, []);

  const errorMessage = parseError ?? validationError;

  return (
    <div className="flex flex-col gap-4">
      <Editor
        height="500px"
        language="schema-forge"
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
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium text-forge-dark">
          Generated SQL (from empty state)
        </h3>
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
