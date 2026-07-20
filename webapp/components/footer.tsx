import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-4 py-8 text-center">
        <nav className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link href="/projects/featured" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <Link href="/now" className="transition-colors hover:text-foreground">
            Now
          </Link>
          <Link href="/links" className="transition-colors hover:text-foreground">
            Links
          </Link>
        </nav>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} pn2222a &middot; Built with Next.js
        </p>
      </div>
    </footer>
  );
}
