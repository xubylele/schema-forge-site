"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    const m = (error as { message?: unknown }).message;
    if (typeof m === "string") return m;
  }
  try {
    return JSON.stringify(error);
  }
  catch {
    return "An unknown error occurred";
  }
}

interface Props {
  children: ReactNode;
}

interface State {
  error: unknown;
}

export class PlaygroundErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: unknown): State {
    return { error };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("Playground error:", error, info);
  }

  render() {
    if (this.state.error !== null) {
      return (
        <div
          className="rounded-lg border border-red-200 bg-red-50 p-6 dark:border-red-800 dark:bg-red-950/30"
          role="alert"
        >
          <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">
            Playground failed to load
          </h3>
          <p className="mt-2 font-mono text-sm text-red-700 dark:text-red-300">
            {errorMessage(this.state.error)}
          </p>
        </div>
      );
    }
    return this.props.children;
  }
}
