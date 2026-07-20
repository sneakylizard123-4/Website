import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import projectsData from "@/data/projects.json";

export const metadata: Metadata = {
  title: "In Progress",
  description: "Currently active projects.",
};

export default function InProgressPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl font-bold">In Progress</h1>
      <p className="mb-8 text-muted-foreground">
        Projects I am currently working on.
      </p>
      <ProjectList
        projects={projectsData.projects}
        defaultCategory="in-progress"
      />
    </div>
  );
}
