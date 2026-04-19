import { IconBrandGithub, IconBrandX } from "@tabler/icons-react";
import Logo from "@/components/brand/Logo";

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-16 bg-white shadow-[0_-1px_0_rgba(15,23,42,0.06),0_-4px_20px_-8px_rgba(15,23,42,0.06)]">
      <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="flex items-center gap-2.5">
            <Logo size={28} />
            <span className="text-[15px] font-bold tracking-tight text-[var(--color-text)]">
              Orchestrator System
            </span>
          </div>
          <p className="text-[11px] text-[var(--color-text-faint)]">
            © 2026 Orchestrator System. All rights reserved.
          </p>
        </div>
        <nav className="flex gap-6 items-center">
          {[
            { label: "개인정보 처리방침", href: "#" },
            { label: "이용약관", href: "#" },
            { label: "API 상태", href: "#" },
            { label: "보안", href: "#" },
          ].map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex gap-3">
          <a
            href="#"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="X"
          >
            <IconBrandX size={18} stroke={1.8} />
          </a>
          <a
            href="#"
            className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="GitHub"
          >
            <IconBrandGithub size={18} stroke={1.8} />
          </a>
        </div>
      </div>
    </footer>
  );
}
