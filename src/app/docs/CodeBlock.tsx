export function CodeBlock({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <pre
      className={`overflow-x-auto rounded-lg border border-forge-light bg-white px-4 py-3 font-mono text-sm text-forge-dark ${className ?? ""}`}
    >
      <code>{children}</code>
    </pre>
  );
}
