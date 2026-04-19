"use client";

import { useState } from "react";
import { IconAlertCircle } from "@tabler/icons-react";
import { startMicrosoftOAuth } from "@/features/auth/oauth";

export default function MicrosoftButton({
  label = "Microsoft로 계속하기",
}: {
  label?: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    setLoading(true);
    setError(null);
    const err = await startMicrosoftOAuth();
    if (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#2F2F2F] text-white text-sm font-semibold tracking-wide shadow-[var(--shadow-neu-soft)] hover:bg-black hover:shadow-[var(--shadow-card-hover)] active:scale-[0.99] disabled:opacity-60 transition-all"
      >
        <svg width="18" height="18" viewBox="0 0 23 23" aria-hidden="true">
          <path d="M1 1h10v10H1z" fill="#F25022" />
          <path d="M12 1h10v10H12z" fill="#7FBA00" />
          <path d="M1 12h10v10H1z" fill="#00A4EF" />
          <path d="M12 12h10v10H12z" fill="#FFB900" />
        </svg>
        <span>{loading ? "이동 중..." : label}</span>
      </button>
      {error ? (
        <div className="flex items-center gap-1.5 ml-1">
          <IconAlertCircle size={12} className="text-[var(--color-danger)]" />
          <span className="text-[11px] text-[var(--color-danger)]">
            {error}
          </span>
        </div>
      ) : null}
    </div>
  );
}
