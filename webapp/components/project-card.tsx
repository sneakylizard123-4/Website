"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useEffect, useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  status: string;
  date: string;
  image: string;
  hoverImage?: string;
  imageAlt: string;
  tags: string[];
  href: string;
}

export function ProjectCard({
  title,
  description,
  status,
  image,
  hoverImage,
  imageAlt,
  tags,
  href,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    function onMove(e: MouseEvent) {
      const rect = card!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card!.style.setProperty("--mouse-x", x + "%");
      card!.style.setProperty("--mouse-y", y + "%");
    }

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  const statusColor =
    status === "In Progress"
      ? "bg-primary/15 text-primary"
      : status === "Complete"
        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
        : "bg-muted text-muted-foreground";

  return (
    <Link href={href} className="group block">
      <Card
        ref={cardRef}
        className="relative overflow-hidden rounded-xl border-border bg-surface p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
      >
        <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 [background:radial-gradient(400px_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),color-mix(in_srgb,var(--primary)_8%,transparent),transparent_60%)]" />

        <div className="relative z-10 flex gap-4">
          {(image || hoverImage) && (
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-0"
                sizes="56px"
              />
              {hoverImage && (
                <Image
                  src={hoverImage}
                  alt={imageAlt}
                  fill
                  className="object-cover opacity-0 transition-all duration-300 group-hover:scale-110 group-hover:opacity-100"
                  sizes="56px"
                />
              )}
            </div>
          )}
          <div className="min-w-0 flex-1">
            <h3 className="font-heading text-base font-semibold transition-colors group-hover:text-primary">
              {title}
            </h3>
            <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
              {description}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${statusColor}`}>
                {status}
              </span>
              {tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
