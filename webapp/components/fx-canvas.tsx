"use client";

import { useRef, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  warmth: number;
  twinkle: number;
  _drawX?: number;
  _drawY?: number;
}

interface MatrixColumn {
  x: number;
  headY: number;
  speed: number;
  len: number;
  depth: number;
  chars: ({ x: number; y: number } | null)[];
}

export function FxCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };

    const isDark = () =>
      document.documentElement.classList.contains("dark");

    const effect: "blackhole" | "matrix" = Math.random() < 0.5 ? "blackhole" : "matrix";

    /* ─── resize ─── */
    let bh: {
      cx: number; cy: number; Rs: number; shadowR: number;
      diskInner: number; diskOuter: number; lensR: number;
      stars: Star[]; t: number; rotAngle: number;
    } = { cx: 0, cy: 0, Rs: 0, shadowR: 0, diskInner: 0, diskOuter: 0, lensR: 0, stars: [], t: 0, rotAngle: 0 };

    let mx: {
      columns: MatrixColumn[]; glyphs: string; t: number;
    } = { columns: [], glyphs: "", t: 0 };

    function initBlackHole() {
      const cx = w * 0.82;
      const cy = h * 0.78;
      const Rs = Math.min(w, h) * 0.055;
      const shadowR = Rs * 2.5;
      const diskInner = Rs * 3;
      const diskOuter = Rs * 16;
      const lensR = diskOuter * 1.5;

      const stars: Star[] = [];
      for (let i = 0; i < 800; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.3 + Math.random() * 1.4,
          warmth: Math.random(),
          twinkle: Math.random() * Math.PI * 2,
        });
      }

      bh = { cx, cy, Rs, shadowR, diskInner, diskOuter, lensR, stars, t: 0, rotAngle: 0 };
    }

    const GLYPH_SET = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const COL_W = 20;

    function initMatrix() {
      const cols = Math.ceil(w / COL_W) + 1;
      const columns: MatrixColumn[] = [];
      for (let i = 0; i < cols; i++) {
        columns.push({
          x: i * COL_W,
          headY: Math.random() * h * -1,
          speed: 1.5 + Math.random() * 4,
          len: 8 + Math.floor(Math.random() * 18),
          depth: 0.15 + Math.random() * 0.85,
          chars: [],
        });
      }
      mx = { columns, glyphs: GLYPH_SET, t: 0 };
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (effect === "blackhole") initBlackHole();
      else initMatrix();
    }

    /* ───────────────────────────────────────────
       EFFECT 1 — Interstellar black hole
       ─────────────────────────────────────────── */
    function drawDiskGradient(opacityScale: number) {
      const g = ctx.createRadialGradient(bh.cx, bh.cy, bh.diskInner, bh.cx, bh.cy, bh.diskOuter);
      g.addColorStop(0.00, `rgba(255,252,245,${0.95 * opacityScale})`);
      g.addColorStop(0.03, `rgba(255,240,190,${0.88 * opacityScale})`);
      g.addColorStop(0.10, `rgba(255,210,110,${0.70 * opacityScale})`);
      g.addColorStop(0.25, `rgba(255,150, 45,${0.50 * opacityScale})`);
      g.addColorStop(0.50, `rgba(230, 65, 12,${0.28 * opacityScale})`);
      g.addColorStop(0.75, `rgba(150, 22,  5,${0.12 * opacityScale})`);
      g.addColorStop(1.00, "rgba( 60,  5,  0, 0)");
      return g;
    }

    function drawBlackHole() {
      const { cx, cy, Rs, shadowR, diskInner, diskOuter, lensR, stars } = bh;

      bh.rotAngle += 0.00003;
      const tilt = 0.35 + Math.sin(bh.rotAngle) * 0.02;
      const dopplerAngle = bh.rotAngle * 0.5;

      ctx.clearRect(0, 0, w, h);

      if (!isDark()) {
        ctx.fillStyle = "#f8f9fa";
        ctx.fillRect(0, 0, w, h);
      }

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        let dx = s.x - cx;
        let dy = s.y - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        let angle = Math.atan2(dy, dx);

        if (dist < lensR && dist > shadowR * 0.3) {
          const warpFactor = Math.pow(1 - dist / lensR, 2.5) * 1.4;
          angle += warpFactor;
          s._drawX = cx + Math.cos(angle) * dist;
          s._drawY = cy + Math.sin(angle) * dist;
        } else {
          s._drawX = s.x;
          s._drawY = s.y;
        }

        const twinkle = 0.5 + 0.5 * Math.sin(s.twinkle + bh.t * 0.0008);
        const cr = Math.floor(200 + (255 - 200) * s.warmth);
        const cg = Math.floor(200 + (240 - 200) * s.warmth);
        const cb = Math.floor(255 + (180 - 255) * s.warmth);
        let alpha = twinkle * (isDark() ? 0.9 : 0.4);

        if (dist < diskOuter && dist > shadowR * 0.3) {
          const dimFactor = 0.05 + 0.95 * Math.pow(dist / diskOuter, 2);
          alpha *= dimFactor;
        }

        ctx.beginPath();
        ctx.arc(s._drawX!, s._drawY!, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha})`;
        ctx.fill();
      }

      const outerGlow = ctx.createRadialGradient(cx, cy, shadowR * 2, cx, cy, diskOuter * 1.1);
      outerGlow.addColorStop(0, "rgba(255,160,40,0.10)");
      outerGlow.addColorStop(0.4, "rgba(255,100,20,0.04)");
      outerGlow.addColorStop(1, "rgba(200,60,10,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, diskOuter * 1.1, 0, Math.PI * 2);
      ctx.fillStyle = outerGlow;
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, w, cy);
      ctx.clip();
      ctx.beginPath();
      ctx.ellipse(cx, cy, diskOuter, diskOuter * tilt, 0, 0, Math.PI * 2);
      ctx.fillStyle = drawDiskGradient(0.72);
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, shadowR, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, cy, w, h);
      ctx.clip();
      ctx.beginPath();
      ctx.ellipse(cx, cy, diskOuter, diskOuter * tilt, 0, 0, Math.PI * 2);
      ctx.fillStyle = drawDiskGradient(1.0);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(cx, cy, diskOuter, diskOuter * tilt, 0, 0, Math.PI * 2);
      ctx.clip();
      const dbx = Math.cos(dopplerAngle);
      const dby = Math.sin(dopplerAngle);
      const dopplerGrad = ctx.createLinearGradient(
        cx - dbx * diskOuter, cy - dby * diskOuter * tilt,
        cx + dbx * diskOuter, cy + dby * diskOuter * tilt
      );
      dopplerGrad.addColorStop(0, "rgba(255,255,220,0.22)");
      dopplerGrad.addColorStop(0.40, "rgba(255,200,100,0)");
      dopplerGrad.addColorStop(0.60, "rgba(255,200,100,0)");
      dopplerGrad.addColorStop(1, "rgba(255,120,40,0.12)");
      ctx.fillStyle = dopplerGrad;
      ctx.fillRect(cx - diskOuter, cy - diskOuter * tilt, diskOuter * 2, diskOuter * tilt * 2);
      ctx.restore();

      ctx.beginPath();
      ctx.arc(cx, cy, shadowR, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(255,245,215,0.55)";
      ctx.lineWidth = 1.8;
      ctx.stroke();

      const ringGlow = ctx.createRadialGradient(cx, cy, shadowR * 0.90, cx, cy, shadowR * 1.25);
      ringGlow.addColorStop(0, "rgba(255,245,215,0)");
      ringGlow.addColorStop(0.5, "rgba(255,245,215,0.20)");
      ringGlow.addColorStop(1, "rgba(255,210,120,0)");
      ctx.beginPath();
      ctx.arc(cx, cy, shadowR * 1.25, 0, Math.PI * 2);
      ctx.fillStyle = ringGlow;
      ctx.fill();

      bh.t++;
    }

    /* ───────────────────────────────────────────
       EFFECT 2 — Matrix rain with parallax + cursor bounce
       ─────────────────────────────────────────── */
    function updateMatrix() {
      const CR = 70;
      const CR2 = CR * CR;

      for (let i = 0; i < mx.columns.length; i++) {
        const col = mx.columns[i];
        col.headY += col.speed;

        if (col.headY - col.len * 16 > h) {
          col.headY = -20 - Math.random() * 80;
          col.speed = 1.5 + Math.random() * 4;
          col.len = 8 + Math.floor(Math.random() * 18);
        }

        for (let j = 0; j < col.len; j++) {
          const charY = col.headY - j * 16;
          if (charY < -30 || charY > h + 50) {
            col.chars[j] = null;
            continue;
          }

          let charX = col.x + COL_W / 2;

          const dx = charX - mouse.x;
          const dy = charY - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < CR2 && dist2 > 1) {
            const dist = Math.sqrt(dist2);
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = CR - dist;
            charX += nx * overlap * 0.5;
            charY -= overlap * 0.12 * (1 - dist / CR);
          }

          col.chars[j] = { x: charX, y: charY };
        }
      }
      mx.t++;
    }

    function drawMatrix() {
      ctx.clearRect(0, 0, w, h);

      if (!isDark()) {
        ctx.fillStyle = "#f8f9fa";
        ctx.fillRect(0, 0, w, h);
      }

      const isDk = isDark();
      ctx.font = "15px monospace";
      ctx.textAlign = "center";

      for (let i = 0; i < mx.columns.length; i++) {
        const col = mx.columns[i];

        for (let j = 0; j < col.len; j++) {
          const ch = col.chars[j];
          if (!ch) continue;

          const fadeIn = Math.min(1, j / 3);
          const fadeTail = Math.min(1, (col.len - 1 - j) / 4);
          let alpha = fadeIn * fadeTail;

          if (j === 0) {
            ctx.shadowBlur = 12;
            ctx.shadowColor = isDk ? "#0f0" : "#080";
            alpha = 1;
          }

          const glyph = mx.glyphs[(mx.t + i * 7 + j * 13) % mx.glyphs.length];

          ctx.fillStyle = isDk
            ? `rgba(0,255,65,${alpha})`
            : `rgba(0,100,35,${alpha})`;
          ctx.fillText(glyph, ch.x, ch.y);

          ctx.shadowBlur = 0;
        }
      }
    }

    /* ─── mouse tracking ─── */
    function onMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    /* ─── animation loop ─── */
    let raf: number;
    function loop() {
      if (effect === "blackhole") drawBlackHole();
      else {
        updateMatrix();
        drawMatrix();
      }
      raf = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
