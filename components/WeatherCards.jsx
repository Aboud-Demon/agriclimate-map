const cards = [
  "Average Temperature",
  "Maximum Temperature",
  "Minimum Temperature",
  "Rainfall",
  "Humidity",
  "Wind Speed",
];

export default function WeatherCards() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {cards.map((label) => (
        <div
          key={label}
          className="rounded-[1.3rem] border border-[var(--color-outline-soft)] bg-white p-4"
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
  );
}
