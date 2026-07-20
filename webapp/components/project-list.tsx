"use client";

import { useState, useMemo } from "react";
import { ProjectCard } from "@/components/project-card";
import { ProjectToolbar } from "@/components/project-toolbar";

export interface Project {
  id: string;
  title: string;
  description: string;
  status: string;
  date: string;
  image: string;
  hoverImage?: string;
  imageAlt: string;
  tags: string[];
  sections: string[];
}

interface ProjectListProps {
  projects: Project[];
  defaultCategory: string;
}

export function ProjectList({ projects, defaultCategory }: ProjectListProps) {
  const allCategories = useMemo(() => {
    const cats = new Set<string>();
    projects.forEach((p) => p.sections.forEach((s) => cats.add(s)));
    return ["All", ...Array.from(cats).sort()];
  }, [projects]);

  const [category, setCategory] = useState(defaultCategory);
  const [sortBy, setSortBy] = useState("newest");
  const [filter, setFilter] = useState("");

  const filtered = useMemo(() => {
    let list = projects;

    if (category !== "All") {
      list = list.filter((p) => p.sections.includes(category.toLowerCase()));
    }

    if (filter) {
      const q = filter.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    list = [...list].sort((a, b) => {
      if (sortBy === "newest") return b.date.localeCompare(a.date);
      if (sortBy === "oldest") return a.date.localeCompare(b.date);
      return a.title.localeCompare(b.title);
    });

    return list;
  }, [projects, category, sortBy, filter]);

  return (
    <div>
      <ProjectToolbar
        categories={allCategories}
        activeCategory={category}
        onCategoryChange={setCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        filter={filter}
        onFilterChange={setFilter}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard
            key={p.id}
            title={p.title}
            description={p.description}
            status={p.status}
            date={p.date}
            image={p.image}
            hoverImage={p.hoverImage}
            imageAlt={p.imageAlt}
            tags={p.tags}
            href={`/projects/${p.id}`}
          />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="py-12 text-center text-muted-foreground">No projects found.</p>
      )}
    </div>
  );
}
