import Logo from "@/components/brand/Logo";

export default function TopNav() {
  return (
    <nav className="w-full fixed top-0 z-50 bg-white shadow-[0_1px_0_rgba(15,23,42,0.06),0_4px_20px_-8px_rgba(15,23,42,0.08)]">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Logo size={44} />
          <span className="text-[18px] font-bold tracking-tight text-[var(--color-text)]">
            Orchestrator System
          </span>
        </div>
        <a
          href="/login"
          className="btn-secondary inline-flex items-center px-5 py-2 text-sm"
        >
          로그인
        </a>
      </div>
    </nav>
  );
}
