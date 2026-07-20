"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FxCanvas } from "@/components/fx-canvas";

export default function NotFound() {
  return (
    <>
      <FxCanvas />
      <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
        <h1 className="font-heading text-[clamp(5rem,18vw,12rem)] font-black leading-none">
          <span className="bg-gradient-to-br from-primary via-teal-400 to-purple-400 bg-clip-text text-transparent [background-size:200%_200%] animate-[gradientShift_4s_ease_infinite]">
            404
          </span>
        </h1>
        <p className="mt-4 max-w-md text-muted-foreground">
          This page doesn&apos;t exist or has been moved somewhere else.
        </p>
        <Button render={<Link href="/" />} className="mt-8">
          &larr; Back to Home
        </Button>
      </div>

      <style jsx global>{`
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </>
  );
}
