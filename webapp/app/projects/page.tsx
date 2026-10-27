import type { Metadata } from "next";
import { ProjectList } from "@/components/project-list";
import projectsData from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Embedded systems, PCB design, firmware, and FPGA projects by pn2222a.",
  alternates: { canonical: "/projects/featured/" },
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="mb-2 font-heading text-3xl font-bold">Projects</h1>
      <p className="mb-8 text-muted-foreground">
        Highlights from my embedded systems and electronics work.
      </p>
      <ProjectList projects={projectsData.projects} defaultCategory="featured" />
    </div>
  );
}
