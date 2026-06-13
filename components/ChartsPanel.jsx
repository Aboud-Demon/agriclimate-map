const chartTitles = [
  "Temperature Trend",
  "Rainfall Trend",
  "Soil Trend",
];

export default function ChartsPanel() {
  return (
    <div className="grid gap-3">
      {chartTitles.map((title) => (
        <div
          key={title}
          className="rounded-[1.5rem] border-2 border-dashed border-[var(--color-outline-soft)] bg-[var(--color-surface-1)] p-5"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
            {title}
          </p>
          <div className="mt-4 flex h-36 items-center justify-center rounded-[1rem] bg-[var(--color-surface-2)] px-5 text-center text-sm text-[var(--color-foreground-muted)]">
            Chart will appear after selecting a location.
          </div>
        </div>
      ))}
    </div>
  );
}
