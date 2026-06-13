"use client";

import Link from "next/link";
import { Bell, CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Map Analysis" },
  { href: "/report", label: "Report" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-outline-soft)] bg-[rgba(251,251,226,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-4 py-4 lg:px-6">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]"
          >
            AgriClimate Map
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            {links.map((link) => {
              const active =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(link.href));

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`border-b-2 pb-1 text-sm font-medium ${
                    active
                      ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                      : "border-transparent text-[var(--color-foreground-muted)] hover:text-[var(--color-primary)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-outline-soft)] bg-white/70 text-[var(--color-primary)]"
            aria-label="Notifications placeholder"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-outline-soft)] bg-white/70 text-[var(--color-primary)]"
            aria-label="User profile placeholder"
          >
            <CircleUserRound className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
