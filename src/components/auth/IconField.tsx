"use client";

import {
  useId,
  useState,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { cn } from "@/lib/utils";

interface IconFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label: string;
  leftIcon: ReactNode;
  hint?: string;
  passwordToggle?: boolean;
}

export default function IconField({
  label,
  leftIcon,
  hint,
  passwordToggle,
  type = "text",
  className,
  id,
  name,
  ...rest
}: IconFieldProps) {
  const reactId = useId();
  const inputId = id ?? name ?? reactId;
  const [visible, setVisible] = useState(false);
  const effectiveType = passwordToggle && visible ? "text" : type;

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={inputId}
        className="font-display text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--color-text-muted)] ml-1"
      >
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-faint)] pointer-events-none">
          {leftIcon}
        </span>
        <input
          id={inputId}
          name={name}
          type={effectiveType}
          className={cn(
            "w-full py-3.5 rounded-xl text-sm",
            "bg-[var(--color-surface)] shadow-[var(--shadow-neu-inset-soft)]",
            "text-[var(--color-text)] placeholder:text-[var(--color-text-faint)]",
            "border border-transparent",
            "focus:outline-none focus:border-[var(--color-primary)] focus:bg-white",
            "transition-colors",
            passwordToggle ? "pl-12 pr-12" : "pl-12 pr-4",
            className,
          )}
          {...rest}
        />
        {passwordToggle ? (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-lg text-[var(--color-text-faint)] hover:text-[var(--color-text)] hover:bg-[var(--color-secondary)] transition-colors"
            aria-label={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
          >
            {visible ? (
              <IconEyeOff size={18} stroke={1.8} />
            ) : (
              <IconEye size={18} stroke={1.8} />
            )}
          </button>
        ) : null}
      </div>
      {hint ? (
        <span className="text-[11px] text-[var(--color-text-faint)] ml-1">
          {hint}
        </span>
      ) : null}
    </div>
  );
}
