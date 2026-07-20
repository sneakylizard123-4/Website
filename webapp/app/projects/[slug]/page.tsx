import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import projectsData from "@/data/projects.json";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData.projects.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.id === slug);
  if (!project) return { title: "Not Found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projectsData.projects.find((p) => p.id === slug);
  if (!project) notFound();

  const idx = projectsData.projects.indexOf(project);
  const prev = idx > 0 ? projectsData.projects[idx - 1] : null;
  const next = idx < projectsData.projects.length - 1 ? projectsData.projects[idx + 1] : null;

  const statusColor =
    project.status === "In Progress"
      ? "bg-primary/15 text-primary"
      : project.status === "Complete"
        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
        : "bg-muted text-muted-foreground";

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <Button render={<Link href="/projects/featured" />} variant="ghost" size="sm" className="mb-6">
        <ArrowLeft className="mr-1.5 h-4 w-4" />
        All Projects
      </Button>

      <article>
        {(project.image || project.hoverImage) && (
          <div className="relative mb-6 aspect-video overflow-hidden rounded-xl border border-border">
            <Image
              src={project.image}
              alt={project.imageAlt}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="font-heading text-3xl font-bold">{project.title}</h1>
          <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-medium ${statusColor}`}>
            {project.status}
          </span>
        </div>

        <p className="mb-1 text-sm text-muted-foreground">{project.date}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <Badge key={t} variant="secondary">
              {t}
            </Badge>
          ))}
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <h2>Overview</h2>
          <p>{project.description}</p>

          <h2>Details</h2>
          <p>Project details coming soon.</p>
        </div>
      </article>

      {/* Prev / Next navigation */}
      <nav className="mt-16 grid grid-cols-2 gap-4 border-t border-border pt-8">
        {prev ? (
          <Link
            href={`/projects/${prev.id}`}
            className="group rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-primary/30"
          >
            <span className="text-xs text-muted-foreground">&larr; Previous</span>
            <p className="mt-1 text-sm font-medium group-hover:text-primary">{prev.title}</p>
          </Link>
        ) : (
          <div />
        )}
        {next ? (
          <Link
            href={`/projects/${next.id}`}
            className="group rounded-xl border border-border bg-surface p-4 text-right transition-all hover:-translate-y-0.5 hover:border-primary/30"
          >
            <span className="text-xs text-muted-foreground">Next &rarr;</span>
            <p className="mt-1 text-sm font-medium group-hover:text-primary">{next.title}</p>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
}
