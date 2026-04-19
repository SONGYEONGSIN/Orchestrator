import Link from "next/link";
import Logo from "@/components/brand/Logo";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-16 relative overflow-hidden">
      <div className="absolute top-[-8%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary)] opacity-[0.035] blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-8%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-warning)] opacity-[0.025] blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md card-base rounded-[28px] p-8 md:p-10 relative z-10">
        <div className="flex items-center gap-2.5 mb-6">
          <Logo size={36} />
          <span className="text-[15px] font-bold tracking-tight text-[var(--color-text)]">
            Orchestrator System
          </span>
        </div>
        <h1 className="text-xl font-bold text-[var(--color-text)] mb-2">
          새 비밀번호 설정
        </h1>
        <p className="text-sm text-[var(--color-text-muted)] mb-6">
          안전한 새 비밀번호를 입력해 주세요. 변경 후 자동으로 로그인됩니다.
        </p>
        <ResetPasswordForm />
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="text-xs font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
          >
            ← 로그인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
