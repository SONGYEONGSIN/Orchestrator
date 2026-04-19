"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export type AuthTab = "signin" | "signup";

const TABS: { key: AuthTab; label: string }[] = [
  { key: "signin", label: "로그인" },
  { key: "signup", label: "계정 생성" },
];

export default function TabSwitcher({ active }: { active: AuthTab }) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = (tab: AuthTab) => {
    const next = new URLSearchParams(params.toString());
    if (tab === "signin") next.delete("tab");
    else next.set("tab", tab);
    const qs = next.toString();
    router.replace(`/login${qs ? `?${qs}` : ""}#login-section`);
  };

  return (
    <div className="flex gap-1 p-1.5 bg-[var(--color-surface)] border-b border-[var(--color-secondary)]">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => handleClick(tab.key)}
            className={cn(
              "flex-1 py-3 rounded-xl text-sm font-bold transition-all relative",
              isActive
                ? "bg-white text-[var(--color-primary)] shadow-[0_2px_6px_rgba(15,23,42,0.08),0_1px_2px_rgba(15,23,42,0.05)]"
                : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-white/50",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
