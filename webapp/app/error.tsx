"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60dvh] w-full max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mb-4 font-heading text-3xl font-bold">
        This page hit a snag
      </h1>
      <p className="mb-8 text-muted-foreground">
        An unexpected error occurred while rendering this page.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset}>Try again</Button>
        <Button variant="outline" render={<Link href="/" />} nativeButton={false}>
          Back home
        </Button>
      </div>
    </div>
  );
}
