"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, CircleUserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/components/LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  const menuContainerRef = useRef(null);
  const { language, setLanguage, t } = useLanguage();

  const links = [
    { href: "/", label: t("nav.home") },
    { href: "/map", label: t("nav.map") },
    { href: "/report", label: t("nav.report") },
  ];

  useEffect(() => {
    function handlePointerDown(event) {
      if (!menuContainerRef.current?.contains(event.target)) {
        setOpenMenu(null);
      }
    }

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setOpenMenu(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const toggleMenu = (menuName) => {
    setOpenMenu((currentMenu) =>
      currentMenu === menuName ? null : menuName
    );
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--color-outline-soft)] bg-[rgba(251,251,226,0.88)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-4 py-4 lg:px-6">
        <div className="flex min-w-0 items-center gap-4 sm:gap-8">
          <Link
            href="/"
            className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-primary)] sm:text-2xl"
          >
            {t("common.appName")}
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

        <div
          ref={menuContainerRef}
          className="relative flex w-full flex-wrap items-center justify-end gap-2 sm:w-auto"
        >
          <div className="flex max-w-full items-center gap-1 rounded-2xl border border-[var(--color-outline-soft)] bg-white/70 p-1">
            <button
              type="button"
              onClick={() => setLanguage("en")}
              aria-label={t("common.english")}
              className={`rounded-xl px-2.5 py-2 text-sm font-medium sm:px-3 ${
                language === "en"
                  ? "bg-[var(--color-primary-strong)] text-white"
                  : "text-[var(--color-foreground-muted)] hover:bg-white"
              }`}
            >
              {t("common.english")}
            </button>
            <button
              type="button"
              onClick={() => setLanguage("ar")}
              aria-label={t("common.arabic")}
              className={`rounded-xl px-2.5 py-2 text-sm font-medium sm:px-3 ${
                language === "ar"
                  ? "bg-[var(--color-primary-strong)] text-white"
                  : "text-[var(--color-foreground-muted)] hover:bg-white"
              }`}
            >
              {t("common.arabic")}
            </button>
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("notifications")}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-outline-soft)] bg-white/70 text-[var(--color-primary)] ${
                openMenu === "notifications"
                  ? "shadow-[0_16px_28px_-22px_rgba(27,94,32,0.7)]"
                  : "hover:bg-white"
              }`}
              aria-label={t("nav.openNotifications")}
              aria-expanded={openMenu === "notifications"}
              aria-haspopup="dialog"
            >
              <Bell className="h-5 w-5" />
            </button>
            {openMenu === "notifications" ? (
              <div className="absolute right-0 top-14 z-50 w-72 rounded-[1.25rem] border border-[var(--color-outline-soft)] bg-white p-4 text-sm shadow-[0_22px_48px_-32px_rgba(27,94,32,0.45)]">
                <p className="font-semibold text-[var(--color-primary)]">
                  {t("nav.notifications")}
                </p>
                <p className="mt-2 leading-6 text-[var(--color-foreground-muted)]">
                  {t("nav.notificationsNote")}
                </p>
              </div>
            ) : null}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => toggleMenu("profile")}
              className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--color-outline-soft)] bg-white/70 text-[var(--color-primary)] ${
                openMenu === "profile"
                  ? "shadow-[0_16px_28px_-22px_rgba(27,94,32,0.7)]"
                  : "hover:bg-white"
              }`}
              aria-label={t("nav.openProfile")}
              aria-expanded={openMenu === "profile"}
              aria-haspopup="dialog"
            >
              <CircleUserRound className="h-5 w-5" />
            </button>
            {openMenu === "profile" ? (
              <div className="absolute right-0 top-14 z-50 w-72 rounded-[1.25rem] border border-[var(--color-outline-soft)] bg-white p-4 text-sm shadow-[0_22px_48px_-32px_rgba(27,94,32,0.45)]">
                <p className="font-semibold text-[var(--color-primary)]">
                  {t("common.appName")}
                </p>
                <p className="mt-2 font-medium text-[var(--color-foreground)]">
                  {t("nav.profileTitle")}
                </p>
                <p className="mt-2 leading-6 text-[var(--color-foreground-muted)]">
                  {t("nav.profileNote")}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
