import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl font-bold">Blog</h1>
      <p className="mb-8 text-muted-foreground">
        Thoughts, tutorials, and reflections on engineering, security, and
        building things.
      </p>

      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="text-lg font-medium text-foreground/60">
          Blog posts coming soon...
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Check back later for write-ups on embedded projects, CTF solutions, and
          hardware design deep-dives.
        </p>
      </div>
    </div>
  );
}
