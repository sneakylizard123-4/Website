"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function layerProgress(
  progress: number,
  fadeIn: number,
  fadeOut: number,
  rampUp = 0.1,
  rampDown = 0.1,
) {
  if (progress < fadeIn) return easeOutCubic(clamp((progress - fadeIn) / rampUp));
  if (progress > fadeOut) return 1 - easeOutCubic(clamp((progress - fadeOut) / rampDown));
  return 1;
}

export function MeshHandAssembly() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.scrollHeight - window.innerHeight;
      setProgress(clamp(-rect.top / total));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sch = layerProgress(progress, 0.02, 0.25, 0.1, 0.08);
  const pcb = layerProgress(progress, 0.18, 0.48, 0.1, 0.08);
  const render = layerProgress(progress, 0.42, 0.78, 0.1, 0.1);
  const title = clamp(
    progress < 0.08 ? easeOutCubic(progress / 0.08) : progress < 0.18 ? 1 : 1 - easeOutCubic(clamp((progress - 0.18) / 0.08)),
  );
  const cta = clamp(progress > 0.82 ? easeOutCubic((progress - 0.82) / 0.18) : 0);

  const LABELS = [
    { label: "Schematic", opacity: sch },
    { label: "Bare PCB", opacity: pcb },
    { label: "Assembled Board", opacity: render },
  ];
  const active = LABELS.reduce((a, b) => (b.opacity > a.opacity ? b : a));

  return (
    <div ref={containerRef} className="relative h-[550vh]">
      <div className="sticky top-0 flex h-dvh items-center justify-center overflow-hidden">
        {/* Gradient backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-primary/[0.03]" />

        {/* ─── Title ─── */}
        <div
          className="absolute left-1/2 top-[12vh] z-10 -translate-x-1/2 text-center transition-none"
          style={{ opacity: title, transform: `translate(-50%,${24 * (1 - title)}px)` }}
        >
          <p className="mb-2 text-xs tracking-widest text-muted-foreground uppercase">Project</p>
          <h1 className="font-heading text-[clamp(2rem,6vw,4rem)] font-extrabold leading-tight">
            Mesh_Hand V1
          </h1>
          <p className="mt-2 text-muted-foreground">Handheld Meshtastic Node with GPS</p>
        </div>

        {/* ─── Schematic ─── */}
        <div
          className="absolute inset-0 z-20 flex items-center justify-center transition-none"
          style={{ opacity: sch, transform: `translateY(${40 * (1 - sch)}px) scale(${0.92 + 0.08 * sch})` }}
        >
          <div className="relative">
            <Image
              src="/images/projects/mesh-hand/sch-root.png"
              alt="Mesh_Hand schematic"
              width={720}
              height={540}
              className="max-h-[58vh] w-auto rounded-xl border border-border shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* ─── PCB ─── */}
        <div
          className="absolute inset-0 z-30 flex items-center justify-center transition-none"
          style={{ opacity: pcb, transform: `scale(${0.88 + 0.12 * pcb})` }}
        >
          <div className="relative">
            <Image
              src="/images/projects/mesh-hand/pcb.png"
              alt="Mesh_Hand bare PCB"
              width={720}
              height={540}
              className="max-h-[58vh] w-auto rounded-xl border border-border shadow-2xl"
            />
          </div>
        </div>

        {/* ─── 3-D Render ─── */}
        <div
          className="absolute inset-0 z-40 flex items-center justify-center transition-none"
          style={{ opacity: render, transform: `scale(${0.9 + 0.1 * render})` }}
        >
          <Image
            src="/images/projects/mesh-hand/render-purple.png"
            alt="Mesh_Hand 3D render"
            width={960}
            height={720}
            className="max-h-[68vh] w-auto rounded-2xl shadow-2xl"
          />
        </div>

        {/* ─── Active layer label ─── */}
        {active.opacity > 0.5 && (
          <div className="absolute bottom-[18vh] left-1/2 z-50 -translate-x-1/2">
            <span className="rounded-full border border-border bg-surface/80 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
              {active.label}
            </span>
          </div>
        )}

        {/* ─── CTA ─── */}
        <div
          className="absolute bottom-[10vh] left-1/2 z-50 -translate-x-1/2 transition-none"
          style={{ opacity: cta, transform: `translate(-50%,${20 * (1 - cta)}px)` }}
        >
          <Button render={<Link href="/projects/mesh_hand-v1/docs/" />} size="lg" nativeButton={false}>
            Read the Docs
            <ArrowRight className="ml-1.5 h-4 w-4" />
          </Button>
        </div>

        {/* ─── Scroll progress ─── */}
        <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2">
          <div className="h-1 w-28 rounded-full bg-border/60 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary/80 transition-none"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
