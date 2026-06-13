import Navbar from "@/components/Navbar";
import ReportPreview from "@/components/ReportPreview";

export default function ReportPage() {
  return (
    <div className="report-page-shell min-h-screen bg-[var(--color-background)] text-[var(--color-foreground)]">
      <Navbar />
      <main className="report-page-main mx-auto max-w-[1400px] px-4 py-6 lg:px-6">
        <ReportPreview />
      </main>
    </div>
  );
}
