import Link from "next/link";
import {
  IconSparkles,
  IconTrendingUp,
  IconShieldCheck,
} from "@tabler/icons-react";
import Logo from "@/components/brand/Logo";
import LoginTabs from "./LoginTabs";
import type { AuthTab } from "@/components/auth/TabSwitcher";

type SearchParams = Promise<{ tab?: string; error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tab, error } = await searchParams;
  const active: AuthTab = tab === "signup" ? "signup" : "signin";

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left: Brand panel (dashboard design language) */}
      <aside className="hidden lg:flex lg:w-[55%] relative bg-[var(--color-surface)] overflow-hidden">
        <div className="absolute top-[-15%] right-[-15%] w-[60%] h-[60%] bg-[var(--color-primary)] opacity-[0.08] blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[50%] h-[50%] bg-[var(--color-warning)] opacity-[0.06] blur-[160px] rounded-full pointer-events-none" />

        <div className="flex flex-col justify-between p-12 xl:p-16 relative z-10 w-full">
          <Link href="/" className="flex items-center gap-3 w-fit group">
            <Logo size={44} />
            <span className="text-[18px] font-bold tracking-tight text-[var(--color-text)] group-hover:opacity-80 transition-opacity">
              Orchestrator System
            </span>
          </Link>

          <div className="flex flex-col gap-5 max-w-md">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-secondary)] shadow-[var(--shadow-neu-soft)] text-[var(--color-primary)] font-display text-[11px] font-bold uppercase tracking-[0.25em] w-fit">
              <IconSparkles size={14} stroke={2.2} />
              Next-Gen Operations
            </div>
            <h2 className="text-4xl xl:text-5xl font-black leading-[1.1] tracking-tight text-[var(--color-text)]">
              운영 오케스트레이션을
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-dim)] to-[var(--color-warning)]">
                하나의 대시보드로
              </span>
            </h2>
            <p className="text-[var(--color-text-muted)] text-base leading-relaxed">
              서비스 관리, 계약, 인수인계, AI 분석까지 모든 운영 업무를 한 곳에
              모읍니다.
            </p>
          </div>

          {/* Dashboard-styled preview cards */}
          <div className="grid grid-cols-2 gap-4 max-w-md">
            <div className="card-base rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                  <IconTrendingUp size={18} stroke={2.2} />
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  운영점수
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black tabular-nums text-[var(--color-text)]">
                  +24%
                </span>
                <span className="text-[10px] font-bold text-[var(--color-success)]">
                  ↑ 이번 분기
                </span>
              </div>
            </div>
            <div className="card-base rounded-2xl p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-[var(--color-primary)]/10 flex items-center justify-center text-[var(--color-primary)]">
                  <IconShieldCheck size={18} stroke={2.2} />
                </div>
                <span className="text-[11px] font-semibold text-[var(--color-text-muted)] uppercase tracking-wider">
                  SLA
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black tabular-nums text-[var(--color-text)]">
                  99.98%
                </span>
                <span className="text-[10px] font-bold text-[var(--color-text-faint)]">
                  목표 대비
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Right: Auth panel */}
      <div className="flex-1 flex flex-col">
        <div className="lg:hidden flex items-center justify-center py-6 border-b border-[var(--color-secondary)]">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={36} />
            <span className="text-[16px] font-bold tracking-tight text-[var(--color-text)]">
              Orchestrator System
            </span>
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            <div className="card-base rounded-[28px] overflow-hidden">
              <LoginTabs active={active} oauthError={error} />
            </div>
            <p className="text-center text-[11px] text-[var(--color-text-faint)] mt-6">
              © 2026 Orchestrator System
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
