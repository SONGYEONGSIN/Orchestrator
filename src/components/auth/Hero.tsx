import { IconSparkles, IconArrowRight } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-8 pb-12 relative z-10">
      <div className="flex flex-col items-center text-center gap-6 md:gap-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-secondary)] shadow-[var(--shadow-neu-soft)] text-[var(--color-primary)] font-display text-[11px] font-bold uppercase tracking-[0.25em]">
          <IconSparkles size={14} stroke={2.2} />
          Next-Gen Operations
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-[var(--color-text)]">
          운영 오케스트레이션을
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-primary-dim)] to-[var(--color-warning)]">
            하나의 대시보드로
          </span>
        </h1>

        <p className="text-[var(--color-text-muted)] text-sm sm:text-base md:text-lg leading-relaxed lg:whitespace-nowrap">
          서비스 관리, 계약, 인수인계, AI 분석까지{" "}
          <span className="text-[var(--color-text)] font-semibold">
            Orchestrator System
          </span>
          에서 모든 운영 업무를 한 곳에 모읍니다.
        </p>

        <div className="flex gap-3 mt-4">
          <a
            href="/login"
            className="btn-primary inline-flex items-center gap-2 px-9 md:px-11 py-4 md:py-[18px] text-sm md:text-base !rounded-full"
          >
            지금 시작하기
            <IconArrowRight size={18} stroke={2.4} />
          </a>
        </div>
      </div>
    </section>
  );
}
