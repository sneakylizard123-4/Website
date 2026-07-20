import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import projectsData from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Archive",
  description: "Completed and archived projects.",
};

export default function ArchivePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl font-bold">Archive</h1>
      <p className="mb-8 text-muted-foreground">
        Completed and archived projects.
      </p>
      <ProjectList
        projects={projectsData.projects}
        defaultCategory="archive"
      />
    </div>
  );
}
