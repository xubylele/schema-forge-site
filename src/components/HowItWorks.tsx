import { arrowDown, arrowForward } from "ionicons/icons";
import { IonIcon } from "@/components/icons/IonIcon";

const INTRO = "Define your schema, run diff, get SQL.";

const STEPS = [
  {
    id: "schema",
    label: "schema.sf",
    description: "Your schema in the .sf DSL.",
  },
  {
    id: "diff",
    label: "schemaforge diff",
    description: "Compare versions and generate migration.",
  },
  {
    id: "migration",
    label: "migration.sql",
    description: "Apply to your database.",
  },
] as const;

const iconClassName = "shrink-0 opacity-40";

function ArrowDown() {
  return (
    <span className={`flex sm:hidden ${iconClassName}`} aria-hidden>
      <IonIcon src={arrowDown} size={20} />
    </span>
  );
}

function ArrowRight() {
  return (
    <span className={`hidden sm:flex ${iconClassName}`} aria-hidden>
      <IonIcon src={arrowForward} size={24} />
    </span>
  );
}

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-3xl px-4 pb-24 pt-12"
      aria-label="How it works"
    >
      <h2 className="text-2xl font-semibold tracking-tight text-forge-dark">
        How It Works
      </h2>
      <p className="mt-2 text-sm text-forge-dark/80">{INTRO}</p>

      <ol
        className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-stretch sm:gap-2"
        role="list"
      >
        {STEPS.flatMap((step, index) => [
          <li
            key={step.id}
            className="flex min-h-0 w-full max-w-sm flex-1 flex-col sm:max-w-none"
          >
            <div className="flex h-full flex-col rounded-lg border border-forge-light bg-white p-4 shadow-sm">
              <code className="font-mono text-sm font-semibold text-forge-dark">
                {step.label}
              </code>
              <p className="mt-1 text-sm text-forge-dark/80">
                {step.description}
              </p>
            </div>
          </li>,
          ...(index < STEPS.length - 1
            ? [
                <li
                  key={`arrow-${step.id}`}
                  className="flex shrink-0 flex-col items-center justify-center py-2 sm:flex-row sm:py-0 sm:px-1"
                  aria-hidden
                >
                  <ArrowDown />
                  <ArrowRight />
                </li>,
              ]
            : []),
        ])}
      </ol>
    </section>
  );
}
