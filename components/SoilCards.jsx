const cards = [
  "Moisture",
  "Type",
  "pH",
  "Nitrogen",
  "Phosphorus",
  "Potassium",
];

export default function SoilCards() {
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-3">
        {cards.map((label) => (
          <div
            key={label}
            className="rounded-[1.2rem] border border-[var(--color-outline-soft)] bg-[var(--color-surface-2)] p-4 text-center"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-foreground-soft)]">
              {label}
            </p>
            <p className="mt-3 text-lg font-semibold tracking-[-0.02em] text-[var(--color-foreground)]">
              No data yet
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-sm text-[var(--color-foreground-muted)]">
        No data yet
      </p>
    </div>
  );
}
