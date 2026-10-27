"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export interface ProjectVersion {
  label: string;
  href: string;
}

interface VersionSwitchProps {
  versions: ProjectVersion[];
  current: string;
  className?: string;
}

export function VersionSwitch({ versions, current, className }: VersionSwitchProps) {
  if (versions.length < 2) return null;

  return (
    <div
      role="group"
      aria-label="Project version"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-border/50 bg-background/70 p-0.5 text-xs backdrop-blur-md",
        className
      )}
    >
      {versions.map((version) => {
        const active = version.label === current;
        return (
          <Link
            key={version.label}
            href={version.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            {version.label}
          </Link>
        );
      })}
    </div>
  );
}
