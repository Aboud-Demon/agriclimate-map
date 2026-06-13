import Link from "next/link";
import {
  ArrowRight,
  CloudSun,
  Droplets,
  Leaf,
  ShieldAlert,
  Sprout,
  SunMedium,
} from "lucide-react";

import Navbar from "@/components/Navbar";

const features = [
  {
    title: "Historical Weather Analysis",
    description:
      "Review climate trends and long-term weather patterns before API-connected analysis is enabled.",
    icon: CloudSun,
  },
  {
    title: "Soil Properties",
    description:
      "Prepare for soil composition, pH, and nutrient insights with a clean analysis-ready workspace.",
    icon: Leaf,
  },
  {
    title: "UV & Solar Radiation",
    description:
      "Track solar exposure layers and radiation context once live environmental data is connected.",
    icon: SunMedium,
  },
  {
    title: "Seasonal Agricultural Alerts",
    description:
      "Surface future risk indicators and agricultural alert summaries in a structured dashboard view.",
    icon: ShieldAlert,
  },
  {
    title: "Smart Irrigation Recommendations",
    description:
      "Reserve space for irrigation guidance generated after real analysis and recommendation services are added.",
    icon: Droplets,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-[var(--color-outline-soft)] bg-[radial-gradient(circle_at_top_left,_rgba(145,215,138,0.18),_transparent_32%),linear-gradient(180deg,rgba(251,251,226,0.98)_0%,rgba(245,245,220,0.92)_100%)]">
          <div className="pointer-events-none absolute inset-0 opacity-50 [background-image:radial-gradient(var(--color-outline-soft)_0.8px,transparent_0.8px)] [background-size:24px_24px]" />
          <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-24">
            <div className="relative z-10 flex max-w-2xl flex-col justify-center">
              <span className="mb-6 inline-flex w-fit items-center rounded-full border border-[rgba(12,82,22,0.08)] bg-[var(--color-primary-soft)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">
                Environmental Intelligence Platform
              </span>
              <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] text-[var(--color-primary)] sm:text-6xl">
                Analyze land, weather, and soil intelligence from any map
                location
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-foreground-muted)]">
                AgriClimate Map is a data-ready agri-tech workspace for
                historical weather, soil, UV, and seasonal agricultural risk
                analysis.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/map"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[var(--color-primary-strong)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_-22px_rgba(27,94,32,0.7)] transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Start Analysis
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/report"
                  className="inline-flex items-center justify-center rounded-2xl border border-[var(--color-outline)] bg-white/80 px-6 py-4 text-sm font-semibold text-[var(--color-tertiary)] backdrop-blur-sm transition-colors hover:bg-[var(--color-surface-2)]"
                >
                  View Report Preview
                </Link>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(135deg,#163a1c_0%,#244f2e_35%,#5d4037_100%)] p-4 shadow-[0_30px_70px_-30px_rgba(27,94,32,0.5)]">
                <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:36px_36px]" />
                <div className="absolute -left-14 top-10 h-44 w-44 rounded-full bg-[rgba(145,215,138,0.2)] blur-3xl" />
                <div className="absolute -bottom-16 right-4 h-56 w-56 rounded-full bg-[rgba(255,219,208,0.16)] blur-3xl" />
                <div className="relative flex h-full items-end overflow-hidden rounded-[1.4rem] border border-white/10 bg-[linear-gradient(160deg,rgba(10,35,12,0.35),rgba(251,251,226,0.04))]">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.14),transparent_18%),radial-gradient(circle_at_75%_35%,rgba(172,244,164,0.08),transparent_22%),linear-gradient(125deg,rgba(248,239,196,0.08),transparent_42%)]" />
                  <div className="absolute inset-0 opacity-55 [background-image:linear-gradient(30deg,rgba(173,137,85,0.4)_12%,transparent_12%,transparent_50%,rgba(173,137,85,0.4)_50%,rgba(173,137,85,0.4)_62%,transparent_62%,transparent),linear-gradient(150deg,rgba(63,98,47,0.7)_18%,transparent_18%,transparent_50%,rgba(63,98,47,0.7)_50%,rgba(63,98,47,0.7)_68%,transparent_68%,transparent)] [background-size:180px_180px]" />
                  <div className="relative z-10 grid w-full gap-4 p-5 sm:grid-cols-[1fr_auto]">
                    <div className="self-end rounded-3xl border border-white/15 bg-white/12 p-5 text-white backdrop-blur-md">
                      <div className="flex items-center gap-3 text-sm font-medium text-[rgba(255,255,255,0.8)]">
                        <Sprout className="h-5 w-5 text-[var(--color-primary-soft)]" />
                        Analysis-ready location intelligence
                      </div>
                      <p className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                        Select a location to analyze
                      </p>
                      <p className="mt-2 max-w-sm text-sm leading-6 text-[rgba(255,255,255,0.72)]">
                        Map interaction, climate placeholders, and report-ready
                        sections are prepared for real API integration.
                      </p>
                    </div>
                    <div className="self-start rounded-3xl border border-[rgba(12,82,22,0.1)] bg-[rgba(251,251,226,0.92)] p-5 shadow-lg">
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
                        Soil Moisture
                      </p>
                      <p className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                        No data yet
                      </p>
                      <p className="mt-2 text-sm text-[var(--color-secondary)]">
                        Awaiting live analysis
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-[var(--color-outline-soft)] bg-[var(--color-surface-2)]">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
            <div className="mb-10 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-[-0.03em] text-[var(--color-primary)]">
                  Comprehensive Agricultural Insights
                </h2>
                <p className="mt-3 text-base leading-7 text-[var(--color-foreground-muted)]">
                  Built from the Stitch dashboard direction with clean empty
                  states, soft borders, and a professional earth-toned visual
                  system.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-16 rounded-full bg-[var(--color-primary-strong)]" />
                <span className="h-1.5 w-6 rounded-full bg-[var(--color-outline-soft)]" />
                <span className="h-1.5 w-6 rounded-full bg-[var(--color-outline-soft)]" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {features.map(({ title, description, icon: Icon }) => (
                <article
                  key={title}
                  className="group rounded-[1.6rem] border border-[var(--color-outline-soft)] bg-white p-6 shadow-[0_20px_40px_-34px_rgba(27,94,32,0.42)] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-surface-3)] text-[var(--color-primary)] transition-colors group-hover:bg-[var(--color-primary-strong)] group-hover:text-[var(--color-primary-soft)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-foreground-muted)]">
                    {description}
                  </p>
                  <div className="mt-6 rounded-2xl border border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-1)] p-4 text-sm text-[var(--color-foreground-soft)]">
                    No data yet
                  </div>
                </article>
              ))}

              <article className="flex min-h-[280px] flex-col justify-between rounded-[1.6rem] border border-[rgba(12,82,22,0.08)] bg-[linear-gradient(160deg,var(--color-primary-strong)_0%,var(--color-primary)_100%)] p-6 text-white shadow-[0_22px_50px_-28px_rgba(0,69,13,0.8)]">
                <div>
                  <p className="text-3xl font-semibold tracking-[-0.03em]">
                    Start Your Regional Analysis
                  </p>
                  <p className="mt-4 max-w-sm text-sm leading-7 text-[rgba(255,255,255,0.8)]">
                    Open the interactive map and select a location to prepare
                    the platform for future API-powered climate intelligence.
                  </p>
                </div>
                <Link
                  href="/map"
                  className="mt-8 inline-flex items-center justify-center rounded-2xl bg-white px-5 py-4 text-sm font-semibold text-[var(--color-primary)] transition-colors hover:bg-[var(--color-surface-2)]"
                >
                  Open Interactive Map
                </Link>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-[var(--color-background)] px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="overflow-hidden rounded-[2rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(135deg,rgba(245,245,220,0.92),rgba(255,255,255,0.85))] p-8 shadow-[0_24px_50px_-34px_rgba(27,94,32,0.38)] lg:p-14">
              <div className="relative overflow-hidden rounded-[1.5rem] border border-white/60 bg-[radial-gradient(circle_at_top,_rgba(145,215,138,0.18),transparent_30%),linear-gradient(135deg,rgba(255,255,255,0.72),rgba(239,239,215,0.9))] px-6 py-14 text-center lg:px-12">
                <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(var(--color-outline-soft)_1px,transparent_1px)] [background-size:20px_20px]" />
                <div className="relative z-10 mx-auto max-w-3xl">
                  <h2 className="text-4xl font-semibold tracking-[-0.04em] text-[var(--color-primary)]">
                    Ready to optimize your agricultural workflow?
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[var(--color-foreground-muted)]">
                    Move from a polished UI prototype into live climate,
                    satellite, and soil intelligence when the API layer is
                    ready.
                  </p>
                  <Link
                    href="/map"
                    className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[var(--color-primary-strong)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_36px_-22px_rgba(27,94,32,0.55)] transition-transform hover:-translate-y-0.5"
                  >
                    Access Full Dashboard
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
