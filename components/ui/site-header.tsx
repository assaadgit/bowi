import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./button";
import { NavigationSheet } from "./navigation-sheet";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="md:hidden">
            <NavigationSheet />
          </div>
          <Link href="/" className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-box"
            >
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
              <line x1="12" y1="22.08" x2="12" y2="12"></line>
            </svg>
            <span className="font-bold">Convergence</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <Link
              href="#"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Proxy
            </Link>
            <Link
              href="#"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Use Cases
            </Link>
            <Link
              href="#"
              className="text-foreground/60 transition-colors hover:text-foreground/80"
            >
              Company
            </Link>
          </nav>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          <Button
            variant="outline"
            asChild
            className="ml-2 hidden sm:inline-flex"
          >
            <Link href="#">Enterprise Waitlist</Link>
          </Button>
          <Button asChild className="ml-2">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}