import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: BlankIndex,
});

function BlankIndex() {
  return (
    <main
      data-lovable-blank-page-placeholder
      className="flex min-h-screen items-center justify-center bg-background px-4"
    >
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Blank canvas
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Tell me what you'd like to build next.
        </p>
      </div>
    </main>
  );
}
