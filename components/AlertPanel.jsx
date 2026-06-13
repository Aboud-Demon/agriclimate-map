export default function AlertPanel() {
  return (
    <div className="rounded-[1.5rem] border border-[var(--color-outline-soft)] bg-[linear-gradient(180deg,rgba(255,218,214,0.42),rgba(255,255,255,0.9))] p-5">
      <p className="text-sm leading-7 text-[var(--color-foreground-muted)]">
        Alerts will appear after analyzing real API data.
      </p>
    </div>
  );
}
