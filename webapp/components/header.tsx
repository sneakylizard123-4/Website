"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV = [
  {
    label: "Projects",
    items: [
      { label: "Featured", href: "/projects/featured" },
      { label: "In Progress", href: "/projects/in-progress" },
      { label: "Archive", href: "/projects/archive" },
    ],
  },
  {
    label: "Links",
    items: [
      { label: "GitHub", href: "https://github.com/sneakylizard123-4", external: true },
      { label: "Instagram", href: "https://instagram.com/pn2222a_lab", external: true },
      { label: "All Links", href: "/links" },
    ],
  },
  {
    label: "More",
    items: [
      { label: "About", href: "/about" },
      { label: "Sponsors", href: "/sponsors" },
      { label: "Blog", href: "/blog" },
      { label: "Now", href: "/now" },
    ],
  },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
          <Image
            src="/images/logo.png"
            alt="pn2222a logo"
            width={24}
            height={24}
            className="rounded"
          />
          pn2222a
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main menu">
          {NAV.map((group) => (
            <DropdownMenu key={group.label}>
              <DropdownMenuTrigger className="inline-flex h-8 items-center gap-1 rounded-md px-3 text-sm font-medium text-foreground/70 transition-colors hover:bg-accent hover:text-foreground data-[state=open]:bg-accent data-[state=open]:text-foreground">
                {group.label}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={4}>
                {group.items.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    render={
                      "external" in item && item.external
                        ? <a href={item.href} target="_blank" rel="noopener noreferrer" />
                        : <Link href={item.href} />
                    }
                  >
                    {item.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
          <ThemeToggle />
        </nav>

        {/* Mobile */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden" aria-label="Mobile menu">
          {NAV.map((group) => (
            <div key={group.label} className="mb-2">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group.label}
              </p>
              {group.items.map((item) => (
                "external" in item && item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-sm text-foreground/70 transition-colors hover:bg-accent hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                )
              ))}
            </div>
          ))}
        </nav>
      )}
    </header>
  );
}
