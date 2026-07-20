"use client";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

interface ProjectToolbarProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (c: string) => void;
  sortBy: string;
  onSortChange: (s: string) => void;
  filter: string;
  onFilterChange: (f: string) => void;
}

export function ProjectToolbar({
  categories,
  activeCategory,
  onCategoryChange,
  sortBy,
  onSortChange,
  filter,
  onFilterChange,
}: ProjectToolbarProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="gap-1" />}>
          {activeCategory}
          <ChevronDown className="h-3 w-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {categories.map((c) => (
            <DropdownMenuItem key={c} onClick={() => onCategoryChange(c)}>
              {c}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Input
        placeholder="Filter by name..."
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        className="h-8 max-w-[200px] text-sm"
      />

      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="outline" size="sm" className="gap-1" />}>
          {sortBy === "newest" ? "Newest" : sortBy === "oldest" ? "Oldest" : "A-Z"}
          <ChevronDown className="h-3 w-3" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => onSortChange("newest")}>Newest</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("oldest")}>Oldest</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onSortChange("alpha")}>A–Z</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
