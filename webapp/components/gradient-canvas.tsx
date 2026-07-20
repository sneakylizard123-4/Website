"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/components/theme-provider";

const ORBS = [
  { x: 0.2, y: 0.3, r: 0.35, speed: 0.0003, phase: 0, color: [79, 70, 229] },
  { x: 0.7, y: 0.6, r: 0.3, speed: 0.0004, phase: 2, color: [78, 205, 196] },
  { x: 0.5, y: 0.8, r: 0.25, speed: 0.00035, phase: 4, color: [167, 139, 250] },
];

export function GradientCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolved } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let animId: number;

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas!.clientWidth;
      h = canvas!.clientHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      ctx!.scale(dpr, dpr);
    }

    function draw(t: number) {
      ctx!.clearRect(0, 0, w, h);
      const alpha = resolved === "dark" ? 0.18 : 0.12;

      for (const orb of ORBS) {
        const cx = w * (orb.x + Math.sin(t * orb.speed + orb.phase) * 0.08);
        const cy = h * (orb.y + Math.cos(t * orb.speed * 0.7 + orb.phase) * 0.06);
        const radius = Math.min(w, h) * orb.r;
        const [r, g, b] = orb.color;

        const grad = ctx!.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
        grad.addColorStop(1, "transparent");
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, w, h);
      }

      animId = requestAnimationFrame(draw);
    }

    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, [resolved]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <canvas ref={canvasRef} className="block size-full" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(var(--border)_1px,transparent_1px),linear-gradient(90deg,var(--border)_1px,transparent_1px)] [background-size:60px_60px]" />
    </div>
  );
}
