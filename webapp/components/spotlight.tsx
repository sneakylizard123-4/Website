"use client";

import { useEffect, useRef } from "react";

export function Spotlight() {
  const elRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    function onMove(e: MouseEvent) {
      el!.style.setProperty("--mx", e.clientX + "px");
      el!.style.setProperty("--my", e.clientY + "px");
      el!.style.opacity = "1";
    }

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={elRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(600px circle at var(--mx,50%) var(--my,50%),color-mix(in srgb,var(--primary) 6%,transparent),transparent 60%)",
      }}
    />
  );
}
