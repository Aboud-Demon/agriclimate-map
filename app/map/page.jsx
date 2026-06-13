"use client";

import dynamic from "next/dynamic";
import { LoaderCircle } from "lucide-react";

import Navbar from "@/components/Navbar";
import ResultPanel from "@/components/ResultPanel";

const MapSelector = dynamic(() => import("@/components/MapSelector"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[68vh] min-h-[520px] items-center justify-center rounded-[1.75rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-1)]">
      <div className="flex items-center gap-3 text-sm font-medium text-[var(--color-foreground-muted)]">
        <LoaderCircle className="h-5 w-5 animate-spin" />
        Loading interactive map
      </div>
    </div>
  ),
});

export default function MapPage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <main className="mx-auto flex max-w-[1600px] flex-col gap-6 px-4 py-6 lg:px-6">
        <div className="rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(245,245,220,0.72))] p-3 shadow-[0_25px_55px_-42px_rgba(27,94,32,0.5)] lg:p-4">
          <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_440px]">
            <MapSelector />
            <ResultPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
