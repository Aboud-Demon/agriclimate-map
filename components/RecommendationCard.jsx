import { useLanguage } from "@/components/LanguageProvider";

export default function RecommendationCard() {
  const { t } = useLanguage();

  return (
    <div className="rounded-[1.5rem] border border-[rgba(27,94,32,0.12)] bg-[linear-gradient(180deg,rgba(172,244,164,0.22),rgba(255,255,255,0.92))] p-5">
      <p className="text-sm leading-7 text-[var(--color-foreground-muted)] sm:text-[15px]">
        {t("map.recommendationsPlaceholder")}
      </p>
    </div>
  );
}
