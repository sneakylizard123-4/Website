import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import projectsData from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Featured Projects",
  description: "Featured embedded systems and electronics projects.",
};

export default function FeaturedPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl font-bold">Featured Projects</h1>
      <p className="mb-8 text-muted-foreground">
        Highlights from my embedded systems and electronics work.
      </p>
      <ProjectList
        projects={projectsData.projects}
        defaultCategory="featured"
      />
    </div>
  );
}
