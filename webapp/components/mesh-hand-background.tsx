"use client";

import { Suspense, useRef, useState, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function clamp(v: number, min = 0, max = 1) {
  return Math.max(min, Math.min(max, v));
}

function BoardModel({ progress }: { progress: number }) {
  const { scene } = useGLTF("/Website/models/mesh-hand.glb");
  const ref = useRef<THREE.Group>(null);

  const purpleMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#6366f1"),
        roughness: 0.35,
        metalness: 0.6,
        emissive: new THREE.Color("#312e81"),
        emissiveIntensity: 0.15,
      }),
    [],
  );

  useMemo(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        (child as THREE.Mesh).material = purpleMat;
      }
    });
  }, [scene, purpleMat]);

  useFrame((_state, delta) => {
    if (!ref.current) return;
    const t = progress;

    // Rotation driven by scroll
    ref.current.rotation.y = t * Math.PI * 1.2 + 0.3;
    ref.current.rotation.x = Math.sin(t * Math.PI * 0.5) * 0.2 - 0.3;

    // Subtle idle spin
    ref.current.rotation.y += delta * 0.15;

    // Scale: start small, grow in, then hold
    const targetScale = t < 0.1 ? 0.6 + t * 4 : t < 0.5 ? 1.0 : 1.0 + (t - 0.5) * 0.2;
    const s = ref.current.scale.x;
    const newS = THREE.MathUtils.lerp(s, targetScale, 0.08);
    ref.current.scale.setScalar(newS);

    // Vertical offset
    ref.current.position.y = THREE.MathUtils.lerp(
      ref.current.position.y,
      t < 0.2 ? -0.5 + t * 1.5 : 0,
      0.06,
    );
  });

  return (
    <group ref={ref} position={[0, -0.5, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function Lights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#e0e7ff" />
      <directionalLight position={[-3, 2, -4]} intensity={0.4} color="#818cf8" />
      <pointLight position={[0, 3, 0]} intensity={0.6} color="#a5b4fc" />
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <boxGeometry args={[1, 0.1, 1]} />
      <meshStandardMaterial color="#312e81" wireframe />
    </mesh>
  );
}

function Scene({ progress }: { progress: number }) {
  return (
    <>
      <Lights />
      <Suspense fallback={<LoadingFallback />}>
        <BoardModel progress={progress} />
      </Suspense>
    </>
  );
}

export function MeshHandBackground() {
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

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 h-[500vh]">
      <div className="sticky top-0 h-dvh w-full">
        {/* 3D Canvas */}
        <Canvas
          camera={{ position: [0, 1.5, 3.5], fov: 40 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
          dpr={[1, 1.5]}
        >
          <Scene progress={progress} />
        </Canvas>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/80 dark:from-background/70 dark:via-transparent dark:to-background/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 dark:from-background/40 dark:via-transparent dark:to-background/40" />

        {/* Layer label */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
          <span className="rounded-full border border-border/30 bg-background/60 px-4 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md">
            3D Model
          </span>
        </div>
      </div>
    </div>
  );
}
