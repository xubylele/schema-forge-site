"use client";

import Editor, { type OnMount, useMonaco } from "@monaco-editor/react";
import { useCallback, useEffect } from "react";
import { EXAMPLE_SCHEMA } from "@/lib/exampleSchema";

type Monaco = Parameters<OnMount>[1];

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

  useEffect(() => {
    if (monaco) registerSchemaForgeLanguage(monaco);
  }, [monaco]);

  const handleEditorMount: OnMount = useCallback((editor, monacoInstance) => {
    registerSchemaForgeLanguage(monacoInstance);
    const model = editor.getModel();
    if (model) monacoInstance.editor.setModelLanguage(model, "schema-forge");
    monacoInstance.editor.setTheme("schema-forge-dark");
  }, []);

  return (
    <Editor
      height="500px"
      defaultLanguage="schema-forge"
      defaultValue={EXAMPLE_SCHEMA}
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
  );
}
